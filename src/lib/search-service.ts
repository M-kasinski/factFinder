import type { SearchResult, LLMAnalysis } from "@/types/search";
import mockData from "@/data/mock-data.json";

interface SearchResponse {
  results: SearchResult[];
  llmAnalysis: LLMAnalysis;
}

// Simule un délai d'API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function performSearch(query: string): Promise<SearchResponse> {
  // Simule un appel API
  await delay(1000);

  // En mode développement, retourne les données de test
  if (process.env.NODE_ENV === "development") {
    console.log('Recherche pour:', query); // Pour debug
    return {
      results: mockData.results,
      llmAnalysis: mockData.llmAnalysis
    };
  }

  // En production, cette partie appellerait l'API réelle
  throw new Error("API non implémentée en production");
} 