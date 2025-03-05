'use server';

import { SearchResult } from '@/types/search';
import { searchWithBrave } from '@/lib/services/braveSearch';
import { createStreamableValue } from 'ai/rsc';
import { streamLLMResponse, generateRelatedQuestions } from '@/lib/services/cerebrasLLM';

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
      
      // Mettre à jour le streamable avec les résultats de recherche
      streamable.update({
        results: searchResults,
        messages: "Analyse des résultats...",
        videos: [],
        showVideos: false,
        relatedQuestions: [],
        showRelated: false,
      });

      // Utiliser la version streaming du LLM
      const llmStream = streamLLMResponse(query, searchResults);
      
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
            videos: [],
            showVideos: false,
            relatedQuestions: [],
            showRelated: false,
          });
        }
        
        // Générer des questions connexes une fois que le LLM a terminé
        const relatedQuestions = await generateRelatedQuestions(query, accumulatedText);
        
        // Marquer le streamable comme terminé avec toutes les données
        streamable.done({
          results: searchResults,
          messages: accumulatedText,
          videos: [],
          showVideos: false,
          relatedQuestions,
          showRelated: relatedQuestions.length > 0,
        });
      } catch (readerError) {
        console.error('Error reading LLM stream:', readerError);
        streamable.error(readerError instanceof Error ? readerError : new Error('Erreur lors de la lecture du stream LLM'));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      streamable.error(error instanceof Error ? error : new Error('Une erreur est survenue'));
    }
  })();

  // Retourner la valeur streamable
  return streamable.value;
} 