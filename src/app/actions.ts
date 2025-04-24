"use server";

import { SearchResult } from "@/types/search";
import { YouTubeVideoItem } from "@/types/youtube";
import { searchWithBrave } from "@/lib/services/braveSearch";
import { createYouTubeService } from "@/lib/services/youtube/youtubeService";
import { createStreamableValue } from "ai/rsc";
import {
  streamLLMResponse as streamCerebrasLLMResponse,
  generateRelatedQuestions as generateCerebrasRelatedQuestions,
  generateFollowUpSearchQuery as generateCerebrasFollowUpSearchQuery,
} from "@/lib/services/cerebrasLLM";
import { searchImagesWithBrave, ImageSearchResult } from "@/lib/services/braveImageSearch";
import { intentDetector, QueryIntent } from "@/lib/services/intentDetector";
import { getRedisClient } from "@/lib/redis";
import { manageCache, generateCacheKey, CACHE_TTL_SECONDS, CachedQueryData } from "@/lib/cache";

/**
 * Résultats complets de recherche avec streaming LLM
 */
export interface SearchResults {
  /** Résultats de recherche web */
  results: SearchResult[];
  messages: string;
  videos: SearchResult[];
  showVideos: boolean;
  news: SearchResult[];
  showNews: boolean;
  relatedQuestions: string[];
  showRelated: boolean;
  youtubeVideos: YouTubeVideoItem[];
  showYouTube: boolean;
  intentType: QueryIntent;
  followUpQuery: string | null;
}

/**
 * Résultats d'images avec état de chargement
 */
export interface ImageResultsStream {
  /** Tableau des résultats d'images */
  images: ImageSearchResult[];
  loading: boolean;
}

/**
 * Récupère les vidéos YouTube correspondant à une requête
 * @param query Termes de recherche
 * @param maxResults Nombre max de résultats (défaut: 10)
 * @returns Promise avec les vidéos trouvées ou tableau vide en cas d'erreur
 */
async function fetchYouTubeVideos(query: string, maxResults: number = 10): Promise<YouTubeVideoItem[]> {
  try {
    const youtubeService = createYouTubeService();
    return await youtubeService.searchVideos(query, maxResults);
  } catch (error) {
    console.error('Erreur lors de la recherche YouTube:', error);
    return [];
  }
}

/**
 * Récupère les résultats YouTube avec gestion du cache
 * @param query Termes de recherche 
 * @returns Streamable avec vidéos et état de chargement
 */
export async function fetchYouTubeResults(query: string) {
  const streamable = createStreamableValue<{ videos: YouTubeVideoItem[], loading: boolean } | null>(null);
  const cacheKey = generateCacheKey('query', query);

  (async () => {
    const data = await manageCache(cacheKey, 'youtubeResults', async () => {
      const videos = await fetchYouTubeVideos(query);
      return { videos: videos || [], loading: false };
    });

    if (data) {
      streamable.done(data);
    } else {
      streamable.error(new Error('Failed to fetch YouTube results after cache check'));
    }
  })();

  return streamable.value;
}

/**
 * Récupère les résultats d'images avec gestion du cache
 * @param query Termes de recherche
 * @param language Langue des résultats (défaut: "fr")
 * @returns Streamable avec images et état de chargement
 */
export async function fetchImageResults(query: string, language: string = "fr") {
  const streamable = createStreamableValue<ImageResultsStream | null>(null);
  const cacheKey = generateCacheKey('query', query, language);

  (async () => {
    const data = await manageCache(cacheKey, 'imageResults', async () => {
      const images = await searchImagesWithBrave(query, language);
      return { images: images || [], loading: false };
    });

    if (data) {
      streamable.done(data);
    } else {
      streamable.error(new Error('Failed to fetch image results after cache check'));
    }
  })();

  return streamable.value;
}

/**
 * Effectue une recherche complète avec streaming LLM via Cerebras
 * @param queryUser Termes de recherche
 * @param language Langue des résultats (défaut: "fr")
 * @returns Streamable avec tous les résultats
 */
export async function fetchSearchResults(queryUser: string, language: string = "fr", history: { query: string, response: string } | null = null) {
  const streamable = createStreamableValue<SearchResults | null>(null);
  let followUpQuery: string | null = null;
  if (history) {
    followUpQuery = await generateCerebrasFollowUpSearchQuery(queryUser, history, language);
  }
  const query = followUpQuery ? followUpQuery : queryUser;
  const cacheKey = generateCacheKey('query', query, language);

  (async () => {
    let redisClient;
    let cachedQueryData: CachedQueryData = {};

    try {
      try {
        redisClient = await getRedisClient();
        const rawCachedData = await redisClient.get(cacheKey);
        if (rawCachedData) {
          cachedQueryData = JSON.parse(rawCachedData);
          if (cachedQueryData.searchResults) {
            console.log(`Cache hit for full searchResults with key: ${cacheKey}`);
            streamable.done(cachedQueryData.searchResults);
            return;
          }
          console.log(`Cache miss for searchResults, found other data for key: ${cacheKey}`);
        } else {
          console.log(`Cache miss for key: ${cacheKey}`);
        }
      } catch (redisError) {
        console.error(`Redis GET failed for key ${cacheKey}:`, redisError);
        redisClient = null;
      }

      console.log(`Fetching fresh data for searchResults...`);
      const searchResponse = await searchWithBrave(query, language);
      const searchResults = searchResponse.results;
      const videoResults = searchResponse.videos || [];
      const newsResults = searchResponse.news || [];
      const youtubeVideos: YouTubeVideoItem[] = [];
      const intent = history ? 'AI_ANSWER' : intentDetector.classifyQueryIntent(query, searchResults);

      streamable.update({
        results: searchResults,
        messages: "",
        videos: videoResults,
        showVideos: videoResults.length > 0,
        news: newsResults,
        showNews: newsResults.length > 0,
        relatedQuestions: [],
        showRelated: false,
        youtubeVideos,
        showYouTube: false,
        intentType: intent,
        followUpQuery: followUpQuery,
      });

      const llmStream = streamCerebrasLLMResponse(query, searchResults, language);
      let accumulatedText = "";
      const reader = llmStream.textStream.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedText += value;
          streamable.update({
            results: searchResults,
            messages: accumulatedText,
            videos: videoResults,
            showVideos: videoResults.length > 0,
            news: newsResults,
            showNews: newsResults.length > 0,
            relatedQuestions: [],
            showRelated: false,
            youtubeVideos,
            showYouTube: false,
            intentType: intent,
            followUpQuery: followUpQuery,
          });
        }
      } finally {
        reader.releaseLock();
      }

      const relatedQuestions = await generateCerebrasRelatedQuestions(
        query,
        accumulatedText,
        language
      );

      const finalResult: SearchResults = {
        results: searchResults,
        messages: accumulatedText,
        videos: videoResults,
        showVideos: videoResults.length > 0,
        news: newsResults,
        showNews: newsResults.length > 0,
        relatedQuestions,
        showRelated: relatedQuestions.length > 0,
        youtubeVideos,
        showYouTube: false,
        intentType: intent,
        followUpQuery: followUpQuery,
      };

      const updatedCacheData: CachedQueryData = { ...cachedQueryData, searchResults: finalResult };
      if (redisClient) {
        try {
          await redisClient.set(cacheKey, JSON.stringify(updatedCacheData), {
            EX: CACHE_TTL_SECONDS,
          });
          console.log(`Cached final searchResults for key: ${cacheKey}`);
        } catch (cacheError) {
          console.error(`Failed to cache final searchResults for key ${cacheKey}:`, cacheError);
        }
      } else {
        console.warn(`Skipping cache update for ${cacheKey} because Redis client is not available.`);
      }

      streamable.done(finalResult);

    } catch (error) {
      console.error("Error in fetchSearchResults (unified cache):", error);
      streamable.error(
        error instanceof Error ? error : new Error("Une erreur est survenue lors de la recherche")
      );
    }
  })();

  return streamable.value;
}
