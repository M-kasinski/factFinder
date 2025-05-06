import { SearchResult } from "@/types/search";
import Levenshtein from "fast-levenshtein";

/**
 * Type pour l'intention de recherche détectée
 */
export type QueryIntent = "AI_ANSWER" | "DIRECT_SOURCE" | "ANSWER";

/**
 * Liste bilingue (FR / EN) de mots interrogatifs détectés en début de requête.
 * Pour les expressions composées (« how many », « combien de »), on se contente
 * du premier mot clé (« how », « combien »), suffisant pour classer en ANSWER.
 */
const INTERROGATIVE_PREFIX = /^(combien|comment|qu(?:e|and|oi|els?|elles?)|pourquoi|où|quel(?:le|les|s)?|how|what|when|why|where|which|who|whom|whose)\b/;

/**
 * Service pour détecter l'intention de recherche de l'utilisateur – amélioration rapide.
 * ▶  Nouveautés:
 *   1. Reconnaît les questions sans point d'interrogation (FR + EN).
 *   2. Seuil Levenshtein dynamique (<=2 ou <=3% de la longueur du mot).
 *   3. Extraction de domaine plus robuste (gère .co.uk, .gouv.fr, etc.).
 */
export class IntentDetector {
  /** Normalise la requête pour la comparaison */
  private normalizeQuery(query: string): string {
    return query.trim().toLowerCase();
  }

  /**
   * Normalise le nom de domaine pour la comparaison – garde le "core" du domaine.
   * Ex. "assure.ameli.fr" -> "ameli", "www.gov.co.uk" -> "gov".
   */
  private normalizeDomain(hostname: string | undefined): string | null {
    if (!hostname) return null;
    const cleaned = hostname.replace(/^www\./, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return parts[parts.length - 2]; // avant le TLD final
    }
    return parts.length > 1 ? parts[0] : cleaned;
  }

  /** Calcule un seuil levenshtein proportionnel à la longueur du mot */
  private dynThreshold(word: string): number {
    return Math.max(2, Math.round(word.length * 0.25)); // 25% ou 2 caractères mini
  }

  /** Classifie l'intention */
  public classifyQueryIntent(query: string, webResults: SearchResult[]): QueryIntent {
    const trimmed = this.normalizeQuery(query);

    // 1️⃣ Détection rapide de question (même sans '?')
    if (trimmed.endsWith("?") || INTERROGATIVE_PREFIX.test(trimmed)) {
      return "ANSWER";
    }

    // 2️⃣ Pas de résultat – on laisse l'IA répondre
    if (!webResults?.length) return "AI_ANSWER";

    const first = webResults[0];
    const domainCore = this.normalizeDomain(first.meta_url?.hostname);
    if (!domainCore) return "AI_ANSWER";

    const tokens = trimmed.split(/\s+/).filter(Boolean);
    let navigational = false;

    for (const tok of tokens) {
      const dist = Levenshtein.get(tok, domainCore);
      if (dist <= this.dynThreshold(tok) && tok.length > 2 && domainCore.length > 2) {
        navigational = true;
        break;
      }
    }

    // 3️⃣ Vérif concaténée uniquement si pas déjà navigationnel et peu de mots
    if (!navigational && tokens.length <= 3) {
      const concat = tokens.join("");
      const distC = Levenshtein.get(concat, domainCore);
      if (distC <= this.dynThreshold(concat) && concat.length > 3 && domainCore.length > 3) {
        navigational = true;
      }
    }

    return navigational ? "DIRECT_SOURCE" : "AI_ANSWER";
  }
}

export const intentDetector = new IntentDetector();

