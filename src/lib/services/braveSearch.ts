import { SearchResult } from "@/types/search";

// Type pour les résultats de Brave Search
interface BraveSearchResponse {
  web: {
    results: Array<{
      title: string;
      url: string;
      description: string;
      extra_snippets: string[];
      age: string;
      meta_url: {
        favicon?: string;
        hostname: string;
        netloc: string;
        scheme: string;
        path: string;
      };
      profile: {
        name: string;
      };
      thumbnail: {
        src: string;
      };
    }>;
  };
  videos?: {
    results: Array<{
      title: string;
      url: string;
      description?: string;
      age?: string;
      page_age?: string;
      meta_url: {
        favicon?: string;
        hostname: string;
        netloc: string;
        scheme: string;
        path: string;
      };
      thumbnail: {
        src: string;
        original: string;
      };
    }>;
  };
  news?: {
    results: Array<{
      title: string;
      url: string;
      description: string;
      page_age?: string;
      profile?: {
        name: string;
        url?: string;
        img?: string;
      };
      meta_url: {
        favicon?: string;
        hostname: string;
        netloc: string;
        scheme: string;
        path: string;
      };
      thumbnail?: {
        original: string;
        src?: string;
      };
    }>;
  };
}

// Classe pour gérer les appels à l'API Brave Search
class BraveSearchClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.search.brave.com/res/v1';
  }

  /**
   * Effectue une recherche avec l'API Brave Search
   */
  async search(query: string): Promise<BraveSearchResponse> {
    const params = new URLSearchParams({
      q: query,
      count: '10',
      safesearch: 'off',
      extra_snippets: '1',
      country: 'FR',
      text_decorations: '0',
    });

    const response = await fetch(
      `${this.baseUrl}/web/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Subscription-Token': this.apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Brave Search API error: ${response.statusText}`);
    }

    return await response.json();
  }
}

/**
 * Fonction pour effectuer une recherche avec Brave Search
 */
export async function searchWithBrave(query: string): Promise<{
  results: SearchResult[]; 
  videos: SearchResult[];
  news: SearchResult[];
}> {
  try {
    const braveClient = new BraveSearchClient(process.env.BRAVE_API_KEY || "");
    const braveData = await braveClient.search(query);

    // Traiter les résultats web
    const searchResults: SearchResult[] = braveData.web.results.map(result => ({
      title: result.title,
      url: result.url,
      date: result.age,
      description: result.description,
      extra_snippet: result.extra_snippets,
      age: result.age,
      meta_url: {
        favicon: result.meta_url.favicon,
        hostname: result.meta_url.hostname,
        netloc: result.meta_url.netloc,
        scheme: result.meta_url.scheme,
        path: result.meta_url.path,
      },
      profile: {
        name: result.profile?.name,
      },
      thumbnail: result.thumbnail ? {
        src: result.thumbnail?.src,
        original: result.thumbnail?.src,
      } : undefined,
    }));

    // Extraire les vidéos si elles existent
    const videoResults: SearchResult[] = braveData.videos?.results.map(video => ({
      title: video.title,
      url: video.url,
      date: video.age || video.page_age || "",
      description: video.description || "",
      extra_snippet: [], // Champ requis par le type SearchResult
      age: video.age || video.page_age || "",
      meta_url: {
        favicon: video.meta_url.favicon,
        hostname: video.meta_url.hostname,
        netloc: video.meta_url.netloc,
        scheme: video.meta_url.scheme,
        path: video.meta_url.path,
      },
      thumbnail: {
        src: video.thumbnail?.src,
        original: video.thumbnail?.src,
      },
    })) || [];

    // Extraire les actualités (news) si elles existent
    const newsResults: SearchResult[] = braveData.news?.results.map(news => ({
      title: news.title,
      url: news.url,
      date: news.page_age || "",
      description: news.description,
      extra_snippet: [], // Champ requis par le type SearchResult
      age: news.page_age || "",
      meta_url: {
        favicon: news.meta_url.favicon,
        hostname: news.meta_url.hostname,
        netloc: news.meta_url.netloc,
        scheme: news.meta_url.scheme,
        path: news.meta_url.path,
      },
      profile: {
        name: news.profile?.name || news.meta_url.hostname,
      },
      thumbnail: news.thumbnail ? {
        src: news.thumbnail?.src || "",
        original: news.thumbnail?.original || "",
      } : undefined,
      isNews: true, // Indicateur pour identifier les actualités
    })) || [];

    return {
      results: searchResults,
      videos: videoResults,
      news: newsResults
    };
  } catch (error) {
    console.error("Error fetching Brave search results:", error);
    throw new Error("Failed to fetch search results from Brave Search");
  }
} 