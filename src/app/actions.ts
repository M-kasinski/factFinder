"use server";

import { SearchResult } from "@/types/search";
import { YouTubeVideoItem } from "@/types/youtube";
import { searchWithBrave } from "@/lib/services/braveSearch";
import { createYouTubeService } from "@/lib/services/youtube/youtubeService";
import { createStreamableValue } from "ai/rsc";
import {
  streamLLMResponse as streamCerebrasLLMResponse,
  generateRelatedQuestions as generateCerebrasRelatedQuestions,
} from "@/lib/services/cerebrasLLM";
import {
  streamLLMResponse as streamGeminiLLMResponse,
  generateRelatedQuestions as generateGeminiRelatedQuestions,
} from "@/lib/services/geminiLLM";

/**
 * Type pour les résultats de recherche
 */
export interface SearchResults {
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
}

/**
 * Recherche des vidéos sur YouTube (fonction interne)
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
 * Action serveur pour récupérer les vidéos YouTube uniquement
 * Cette fonction est appelée lorsque l'utilisateur clique sur l'onglet YouTube
 */
export async function fetchYouTubeResults(query: string) {
  // Créer un streamable pour les vidéos YouTube
  const streamable = createStreamableValue<{ videos: YouTubeVideoItem[], loading: boolean }>({
    videos: [],
    loading: true
  });

  // Lancer la recherche en arrière-plan
  (async () => {
    try {
      // Récupérer les vidéos depuis YouTube
      const videos = await fetchYouTubeVideos(query);
      
      // Mettre à jour le streamable avec les résultats
      streamable.done({
        videos,
        loading: false
      });
    } catch (error) {
      console.error('Erreur lors de la recherche YouTube:', error);
      streamable.error(error instanceof Error ? error : new Error('Une erreur est survenue'));
    }
  })();

  return streamable.value;
}

/**
 * Fonction pour récupérer les résultats de recherche avec streaming en utilisant Gemini
 */
export async function fetchGeminiLLMResponse(query: string) {
  // Créer un streamable value avec un état initial
  const streamable = createStreamableValue<SearchResults>({
    results: [],
    messages: "",
    videos: [],
    showVideos: false,
    news: [],
    showNews: false,
    relatedQuestions: [],
    showRelated: false,
    youtubeVideos: [],
    showYouTube: false,
  });

  // Lancer la recherche en arrière-plan
  (async () => {
    try {
      // Appel au service de recherche principal seulement
      const searchResponse = await searchWithBrave(query);
      
      const searchResults = searchResponse.results;
      const videoResults = searchResponse.videos || [];
      const newsResults = searchResponse.news || [];
      
      // Pas de chargement des vidéos YouTube initialement
      const youtubeVideos: YouTubeVideoItem[] = [];

      // Mettre à jour le streamable avec les résultats de recherche initiaux
      streamable.update({
        results: searchResults,
        messages: "",
        videos: videoResults, // Afficher les vidéos Brave si disponibles
        showVideos: videoResults.length > 0,
        news: newsResults, // Afficher les news Brave si disponibles
        showNews: newsResults.length > 0,
        relatedQuestions: [],
        showRelated: false,
        youtubeVideos,
        showYouTube: false, // YouTube non chargé initialement
      });

      // Utiliser la version streaming du LLM Gemini
      const llmStream = streamGeminiLLMResponse(query, searchResults);

      // Variable pour accumuler le texte généré
      let accumulatedText = "";

      // Lire le stream chunk par chunk
      const reader = llmStream.textStream.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Accumuler le texte
          accumulatedText += value;

          // Mettre à jour le streamable avec le texte accumulé
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
          });
        }

        // Générer des questions connexes une fois que le LLM Gemini a terminé
        const relatedQuestions = await generateGeminiRelatedQuestions(
          query,
          accumulatedText
        );

        // Marquer le streamable comme terminé avec toutes les données
        streamable.done({
          results: searchResults,
          messages: accumulatedText,
          videos: videoResults,
          showVideos: videoResults.length > 0,
          news: newsResults,
          showNews: newsResults.length > 0,
          relatedQuestions,
          showRelated: relatedQuestions.length > 0,
          youtubeVideos,
          showYouTube: false, // Toujours false ici car non chargé
        });
      } catch (readerError) {
        console.error("Error reading Gemini LLM stream:", readerError);
        streamable.error(
          readerError instanceof Error
            ? readerError
            : new Error("Erreur lors de la lecture du stream LLM Gemini")
        );
      }
    } catch (error) {
      console.error("Error fetching Gemini search results:", error);
      streamable.error(
        error instanceof Error ? error : new Error("Une erreur est survenue lors de la recherche Gemini")
      );
    }
  })();

  // Retourner la valeur streamable
  return streamable.value;
}

/**
 * Fonction pour récupérer les résultats de recherche avec streaming
 */
export async function fetchSearchResults(query: string) {
  // Créer un streamable value avec un état initial
  const streamable = createStreamableValue<SearchResults>({
    results: [],
    messages: "",
    videos: [],
    showVideos: false,
    news: [],
    showNews: false,
    relatedQuestions: [],
    showRelated: false,
    youtubeVideos: [],
    showYouTube: false,
  });

  // Lancer la recherche en arrière-plan
  (async () => {
    try {
      // Appel au service de recherche principal seulement
      const searchResponse = await searchWithBrave(query);
      
      const searchResults = searchResponse.results;
      const videoResults = searchResponse.videos || [];
      const newsResults = searchResponse.news || [];
      
      // Pas de chargement des vidéos YouTube initialement
      const youtubeVideos: YouTubeVideoItem[] = [];

      // Mettre à jour le streamable avec les résultats de recherche, vidéos et news
      streamable.update({
        results: searchResults,
        messages: "",
        videos: [],
        showVideos: false,
        news: [],
        showNews: false,
        relatedQuestions: [],
        showRelated: false,
        youtubeVideos,
        showYouTube: youtubeVideos.length > 0,
      });

      // Utiliser la version streaming du LLM Cerebras
      const llmStream = streamCerebrasLLMResponse(query, searchResults);

      // Variable pour accumuler le texte généré
      let accumulatedText = "";

      // Lire le stream chunk par chunk
      const reader = llmStream.textStream.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Accumuler le texte
          accumulatedText += value;

          // Mettre à jour le streamable avec le texte accumulé
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
            showYouTube: youtubeVideos.length > 0,
          });
        }

        // Générer des questions connexes une fois que le LLM Cerebras a terminé
        const relatedQuestions = await generateCerebrasRelatedQuestions(
          query,
          accumulatedText
        );

        // Marquer le streamable comme terminé avec toutes les données
        streamable.done({
          results: searchResults,
          messages: accumulatedText,
          videos: videoResults,
          showVideos: videoResults.length > 0,
          news: newsResults,
          showNews: newsResults.length > 0,
          relatedQuestions,
          showRelated: relatedQuestions.length > 0,
          youtubeVideos,
          showYouTube: youtubeVideos.length > 0,
        });
      } catch (readerError) {
        console.error("Error reading LLM stream:", readerError);
        streamable.error(
          readerError instanceof Error
            ? readerError
            : new Error("Erreur lors de la lecture du stream LLM")
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      streamable.error(
        error instanceof Error ? error : new Error("Une erreur est survenue")
      );
    }
  })();

  // Retourner la valeur streamable
  return streamable.value;
}
