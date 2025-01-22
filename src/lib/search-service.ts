import mockData from '@/data/mock-data.json';
import type { SearchResult, LLMAnalysis } from '@/types/search';

interface SearchResponse {
  results: SearchResult[];
  llmAnalysis: LLMAnalysis | null;
}

interface MockData {
  queries: Record<string, SearchResponse>;
}

function normalizeString(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

function findBestMatch(query: string): SearchResponse | null {
  console.log('Recherche pour la requête:', query);
  console.log('Données mock disponibles:', Object.keys(mockData.queries));

  const normalizedQuery = normalizeString(query);
  console.log('Requête normalisée:', normalizedQuery);

  const mockQueries = (mockData as MockData).queries;
  
  // Recherche exacte
  if (mockQueries[normalizedQuery]) {
    console.log('Correspondance exacte trouvée');
    return mockQueries[normalizedQuery];
  }

  // Recherche partielle
  for (const key of Object.keys(mockQueries)) {
    const normalizedKey = normalizeString(key);
    console.log('Comparaison avec:', normalizedKey);
    if (normalizedQuery.includes(normalizedKey) || normalizedKey.includes(normalizedQuery)) {
      console.log('Correspondance partielle trouvée avec:', key);
      return mockQueries[key];
    }
  }

  console.log('Aucune correspondance trouvée');
  return null;
}

export async function performSearch(query: string): Promise<SearchResponse> {
  console.log('=== Début de la recherche ===');
  console.log('Mode test:', process.env.NODE_ENV === 'test');
  console.log('USE_MOCK_DATA:', process.env.NEXT_PUBLIC_USE_MOCK_DATA);

  // Utiliser les données mock uniquement si explicitement activé
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  if (!useMockData) {
    throw new Error("API de recherche non implémentée");
  }

  // Simuler un délai plus court pour les tests
  const delay = process.env.NODE_ENV === 'test' ? 100 : 1500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const mockResponse = findBestMatch(query);
  
  if (mockResponse) {
    console.log('Résultats trouvés:', mockResponse.results.length);
    return mockResponse;
  }
  
  console.log('Aucun résultat trouvé');
  return {
    results: [],
    llmAnalysis: null
  };
} 