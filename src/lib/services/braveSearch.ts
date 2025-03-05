import { SearchResult } from "@/types/search";

// Type pour les résultats de Brave Search
interface BraveSearchResponse {
  web: {
    results: Array<{
     
      title: string;
      url: string;
      description: string;
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
export async function searchWithBrave(query: string): Promise<SearchResult[]> {
  try {
    // Récupérer la clé API
    const braveApiKey = process.env.BRAVE_API_KEY;
    
    if (!braveApiKey) {
      throw new Error("Brave API key is missing");
    }
    
    // Créer une instance du client Brave Search
    const braveClient = new BraveSearchClient(braveApiKey);
    
    // Effectuer la recherche
    const braveData = await braveClient.search(query);
    
    // Transformer les résultats au format SearchResult
    const searchResults: SearchResult[] = braveData.web.results.map(result => ({
      title: result.title,
      url: result.url,
      date: result.age,
      description: result.description,
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
      thumbnail: {
        src: result.thumbnail?.src,
      },
    }));


    return searchResults;
  } catch (error) {
    console.error('Error in Brave Search:', error);
    throw error;
  }
} 