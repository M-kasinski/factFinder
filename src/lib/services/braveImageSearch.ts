import { decode } from "html-entities";

// Type pour les résultats d'images de Brave Search
interface BraveImageResult {
  title: string;
  url: string; // URL of the image page
  thumbnail: {
    src: string; // URL of the thumbnail
    height: number;
    width: number;
  };
  properties: {
    url: string; // URL of the full-size image
    // Add other properties like size, format if needed from API response
  };
  source: string; // Source domain
  // Add other relevant fields if needed from API response
}

interface BraveImageSearchResponse {
  results: BraveImageResult[];
  // Add other potential fields like query info, total results if needed
}

// Type simplifié pour nos résultats d'images
export interface ImageSearchResult {
  query: string;
  title: string;
  imageUrl: string; // Direct URL to the image
  thumbnailUrl: string; // URL to the thumbnail
  sourceUrl: string; // URL of the page containing the image
  sourceDomain: string; // Domain name of the source
}

// Classe pour gérer les appels à l'API Brave Search Images
class BraveImageSearchClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("BRAVE_IMAGES_API_KEY is missing.");
    }
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.search.brave.com/res/v1';
  }

  /**
   * Effectue une recherche d'images avec l'API Brave Search
   */
  async search(query: string, language: string = "fr"): Promise<BraveImageSearchResponse> {
    const params = new URLSearchParams({
      q: query,
      safesearch: 'strict', // Changer "moderate" à "strict" conformément à la documentation
      search_lang: language,
      country: language === "fr" ? "FR" : "US",
    });

    const response = await fetch(
      `${this.baseUrl}/images/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Subscription-Token': this.apiKey,
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Brave Image Search API error:", response.status, response.statusText, errorBody);
      throw new Error(`Brave Image Search API error: ${response.statusText}`);
    }

    return await response.json();
  }
}

/**
 * Fonction pour effectuer une recherche d'images avec Brave Search
 */
export async function searchImagesWithBrave(query: string, language: string = "fr"): Promise<ImageSearchResult[]> {
  try {
    const braveClient = new BraveImageSearchClient(process.env.BRAVE_IMAGES_API_KEY || "");
    const braveData = await braveClient.search(query, language);

    // Traiter les résultats d'images
    const imageResults: ImageSearchResult[] = braveData.results.map(result => ({
      query, // Ajouter la requête utilisée pour ces résultats
      title: decode(result.title),
      imageUrl: result.properties.url,
      thumbnailUrl: result.thumbnail.src,
      sourceUrl: result.url,
      sourceDomain: result.source,
    }));

    return imageResults;

  } catch (error) {
    console.error("Error fetching Brave image search results:", error);
    // Retourner un tableau vide en cas d'erreur pour ne pas bloquer l'UI complètement
    // ou relancer l'erreur si vous préférez la gérer plus haut
    return [];
    // throw new Error("Failed to fetch image search results from Brave Search");
  }
} 