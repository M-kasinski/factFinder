import { useState, useEffect, useRef } from 'react';

type Tab = 'response' | 'answer' | 'sources' | 'youtube';

/**
 * Détermine l'onglet initial à afficher en fonction de la requête
 * - Si la requête contient un point d'interrogation (?) → onglet "answer"
 * - Si la requête ne contient qu'un seul mot → onglet "sources"
 * - Pour toutes les autres requêtes → onglet "response" par défaut
 */
export function useInitialTab(query: string): Tab {
  const [initialTab, setInitialTab] = useState<Tab>('response');
  const previousQueryRef = useRef<string>('');

  useEffect(() => {
    // Si la requête est vide ou identique à la précédente, ne rien faire
    if (!query || query === previousQueryRef.current) return;
    
    // Mettre à jour la requête précédente
    previousQueryRef.current = query;

    // Nettoyer la requête pour l'analyse
    const trimmedQuery = query.trim();

    // Analyser la requête et définir l'onglet initial
    const tab = analyzeQuery(trimmedQuery);
    setInitialTab(tab);
    
    // Log pour le débogage
    console.log(`[useInitialTab] Query: "${trimmedQuery}" → Tab: ${tab}`);
  }, [query]);

  return initialTab;
}

/**
 * Analyse une requête et détermine l'onglet initial à afficher
 */
function analyzeQuery(query: string): Tab {
  // Si la requête contient un point d'interrogation, c'est probablement une question
  if (query.includes('?')) {
    return 'answer';
  }

  // Si la requête ne contient qu'un seul mot, diriger vers les sources
  const wordCount = query.split(/\s+/).filter(Boolean).length;
  if (wordCount === 1) {
    return 'sources';
  }

  // Par défaut, utiliser l'onglet "response"
  return 'response';
} 