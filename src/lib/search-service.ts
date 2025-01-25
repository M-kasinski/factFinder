import type { SearchResult } from "@/types/search";
import mockData from "@/data/mock-data.json";

export interface SearchResponse {
  results: SearchResult[];
  messages: string[];
}

// Simule un délai d'API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function performSearch(query: string): Promise<SearchResponse> {
  // En mode développement, retourne les données de test
  if (process.env.NODE_ENV === "development") {
    await delay(1000); // Simule la latence
    console.log('Recherche pour:', query);
    return {
      results: mockData.results,
      messages: ["Voici les résultats de votre recherche"]
    };
  }

  // En production, cette partie utiliserait l'EventSource
  throw new Error("API non implémentée en production");
}

export function createSearchEventSource(query: string): EventSource {
  return new EventSource(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
} 