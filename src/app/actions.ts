'use server';

import { SearchResult } from '@/types/search';
import { searchWithBrave } from '@/lib/services/braveSearch';
import { createStreamableValue } from 'ai/rsc';

/**
 * Type pour les résultats de recherche
 */
export interface SearchResults {
  results: SearchResult[];
  messages: string;
  videos: SearchResult[];
  showVideos: boolean;
  relatedQuestions: string[];
  showRelated: boolean;
}

/**
 * Fonction pour récupérer les résultats de recherche avec streaming
 */
export async function fetchSearchResults(query: string) {
  // Créer un streamable value avec un état initial
  const streamable = createStreamableValue<SearchResults>({
    results: [],
    messages: "Recherche en cours...",
    videos: [],
    showVideos: false,
    relatedQuestions: [],
    showRelated: false,
  });

  // Lancer la recherche en arrière-plan
  (async () => {
    try {
      // Appel direct au service BraveSearch
      const searchResults = await searchWithBrave(query);
      
      // Mettre à jour le streamable avec les résultats
      streamable.update({
        results: searchResults,
        messages: `Voici les résultats pour "${query}"`, // Sera remplacé par la réponse du LLM
        videos: [], // Sera rempli par une recherche de vidéos plus tard
        showVideos: false,
        relatedQuestions: [], // Sera généré par le LLM plus tard
        showRelated: false,
      });
      
      // Marquer le streamable comme terminé
      streamable.done({
        results: searchResults,
        messages: `Voici les résultats pour "${query}"`, // Sera remplacé par la réponse du LLM
        videos: [], // Sera rempli par une recherche de vidéos plus tard
        showVideos: false,
        relatedQuestions: [], // Sera généré par le LLM plus tard
        showRelated: false,
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
      streamable.error(error instanceof Error ? error : new Error('Une erreur est survenue'));
    }
  })();

  // Retourner la valeur streamable
  return streamable.value;
} 