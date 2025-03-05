'use server';

import { SearchResult } from '@/types/search';
import { searchWithBrave } from '@/lib/services/braveSearch';

/**
 * Fonction pour récupérer les résultats de recherche
 */
export async function fetchSearchResults(query: string): Promise<{
  results: SearchResult[];
  messages: string;
  videos: SearchResult[];
  showVideos: boolean;
  relatedQuestions: string[];
  showRelated: boolean;
}> {
  try {
    // Appel direct au service BraveSearch
    const searchResults = await searchWithBrave(query);
    
    // Pour l'instant, nous n'avons pas de LLM ni de vidéos ou questions connexes
    // Ces fonctionnalités seront ajoutées ultérieurement
    
    return {
      results: searchResults,
      messages: "", // Sera rempli par le LLM plus tard
      videos: [], // Sera rempli par une recherche de vidéos plus tard
      showVideos: false,
      relatedQuestions: [], // Sera généré par le LLM plus tard
      showRelated: false,
    };
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
} 