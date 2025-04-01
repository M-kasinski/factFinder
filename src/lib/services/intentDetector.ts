import { SearchResult } from "@/types/search";
import Levenshtein from "fast-levenshtein";

/**
 * Type pour l'intention de recherche détectée
 */
export type QueryIntent = 'AI_ANSWER' | 'DIRECT_SOURCE' | 'ANSWER';

/**
 * Service pour détecter l'intention de recherche de l'utilisateur
 */
export class IntentDetector {
  /**
   * Normalise la requête pour la comparaison
   */
  private normalizeQuery(query: string): string {
    return query.trim().toLowerCase();
  }

  /**
   * Normalise le nom de domaine pour la comparaison
   */
  private normalizeDomain(hostname: string | undefined): string | null {
    if (!hostname) return null;
    // Enlève www. et le TLD (.com, .fr, etc.) pour une comparaison plus robuste
    const cleanedHost = hostname.replace(/^www\./, '');
    const parts = cleanedHost.split('.');
    
    //retourne la partie principale (ex: 'ameli' pour 'assure.ameli.fr')
    if (parts.length > 2) {
        return parts[1];
    }
    // Retourne la partie principale (ex: 'amazon' pour 'amazon.fr')
    return parts.length > 1 ? parts[0] : cleanedHost;
  }

  /**
   * Classifie l'intention de la requête à partir des résultats de recherche
   * @param query La requête de l'utilisateur
   * @param webResults Les résultats de recherche web
   * @returns L'intention détectée (AI_ANSWER, DIRECT_SOURCE ou ANSWER)
   */
  public classifyQueryIntent(query: string, webResults: SearchResult[]): QueryIntent {
    const trimmedQuery = this.normalizeQuery(query); // Normaliser une seule fois au début

    // --- LOGIQUE 0 : Détection de Question (Priorité Haute) ---
    if (trimmedQuery.endsWith('?')) {
      console.log(`Intent Signal (Question Mark): Query ends with '?'`);
      return 'ANSWER'; // Retourner ANSWER directement si la requête se termine par ?
    }

    // --- Initialisation et Gardes (si ce n'est pas une question) ---
    if (!webResults || webResults.length === 0) {
      return 'AI_ANSWER'; // Pas de résultats, on ne peut pas classifier -> Défaut IA
    }

    const firstResult = webResults[0];
    const normalizedDomainBase = this.normalizeDomain(firstResult.meta_url?.hostname);
    // Utiliser trimmedQuery déjà calculé
    const queryWords = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    if (!normalizedDomainBase) {
      return 'AI_ANSWER'; // Impossible d'extraire le domaine -> Défaut IA
    }

    const LEVENSHTEIN_THRESHOLD = 2; // Seuil à ajuster
    let isNavigational = false; // Flag pour le résultat

    // --- LOGIQUE 1 : Comparaison Mot par Mot ---
    for (const word of queryWords) {
      const dist = Levenshtein.get(word, normalizedDomainBase);
      console.log(`Word Check - Distance between '${word}' and '${normalizedDomainBase}': ${dist}`);
      // Si la distance est 0 (match exact) OU très faible
      if (dist <= LEVENSHTEIN_THRESHOLD) {
        // Condition supplémentaire : vérifier que le mot comparé est significatif
        if (word.length > 2 && normalizedDomainBase.length > 2) {
          isNavigational = true;
          console.log(`Intent Signal (Word): Word '${word}' matched domain '${normalizedDomainBase}' with distance ${dist}`);
          break; // Sortir dès qu'un match est trouvé
        }
      }
    }

    // --- LOGIQUE 2 : Vérification par Concaténation (si Logique 1 n'a pas réussi ET requête courte) ---
    // On ajoute cette vérification si la première n'a rien donné ET si la requête est courte (2 ou 3 mots)
    if (!isNavigational && (queryWords.length === 2 || queryWords.length === 3)) {
      const concatenatedQuery = queryWords.join(''); // Ex: ["atnt", "paris"] -> "atntparis"
      const distConcat = Levenshtein.get(concatenatedQuery, normalizedDomainBase);
      console.log(`Concat Check - Distance between '${concatenatedQuery}' and '${normalizedDomainBase}': ${distConcat}`);

      // Vérifier si la distance est suffisamment faible
      if (distConcat <= LEVENSHTEIN_THRESHOLD) {
        // Vérifier si les chaînes comparées ne sont pas trop courtes
        if (concatenatedQuery.length > 3 && normalizedDomainBase.length > 3) {
          isNavigational = true;
          console.log(`Intent Signal (Concat): Concatenated query '${concatenatedQuery}' matched domain '${normalizedDomainBase}' with distance ${distConcat}`);
        }
      }
    }

    // --- Décision Finale (si ce n'était pas une question) ---
    return isNavigational ? 'DIRECT_SOURCE' : 'AI_ANSWER';
  }
}

// Exportation d'une instance unique du service
export const intentDetector = new IntentDetector(); 