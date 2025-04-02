import { createHash } from "crypto";
import { getRedisClient } from "./redis"; // Importer depuis le même répertoire
import { SearchResults, ImageResultsStream } from "@/app/actions"; // Attention: Dépendance circulaire potentielle ou besoin de déplacer les types
import { YouTubeVideoItem } from "@/types/youtube"; // Importer directement le type

// --- Types Déplacés ---
// Il est préférable de déplacer ces types hors de actions.ts vers un fichier dédié (e.g., src/types/cache.ts ou src/types/index.ts)
// Pour l'instant, on les importe, mais une refactorisation des types serait idéale.

/**
 * Structure de données unifiée pour le cache Redis par requête.
 */
export interface CachedQueryData {
  searchResults?: SearchResults;
  imageResults?: ImageResultsStream;
  youtubeResults?: { videos: YouTubeVideoItem[]; loading: boolean };
}

// --- Constantes et Helpers Déplacés ---

export const CACHE_TTL_SECONDS = 60 * 60 * 24 * 3; // 3 jours

/**
 * Génère une clé de cache standardisée.
 * @param type Le type de clé (e.g., 'query').
 * @param query La requête utilisateur.
 * @param language La langue (optionnelle).
 * @returns La clé de cache générée.
 */
export const generateCacheKey = (type: string, query: string, language?: string): string => {
    const keyData = language ? query + language : query;
    const hash = createHash('sha256').update(keyData).digest('hex');
    return `${type}:${hash}`; // e.g., query:hash123
};


/**
 * Gère la récupération et la mise à jour du cache pour un type de données spécifique
 * dans l'objet de cache unifié (CachedQueryData).
 * Utilise une approche optimiste : tente de récupérer du cache, sinon fetch, puis met à jour le cache.
 *
 * @param cacheKey La clé Redis pour l'objet CachedQueryData global.
 * @param dataType La clé spécifique dans CachedQueryData à récupérer/mettre à jour (e.g., 'imageResults').
 * @param fetchData Fonction asynchrone pour récupérer les données fraîches si elles ne sont pas dans le cache.
 * @returns Les données (du cache ou fraîchement récupérées) ou null en cas d'échec complet.
 */
export async function manageCache<T>(
  cacheKey: string,
  dataType: keyof CachedQueryData,
  fetchData: () => Promise<T>
): Promise<T | null> {
  let redisClient;
  let cachedQueryData: CachedQueryData = {};

  try {
    redisClient = await getRedisClient();
    const rawCachedData = await redisClient.get(cacheKey);

    if (rawCachedData) {
      cachedQueryData = JSON.parse(rawCachedData);
      if (cachedQueryData[dataType]) {
        console.log(`Cache hit for ${dataType} with key: ${cacheKey}`);
        return cachedQueryData[dataType] as T;
      }
      console.log(`Cache miss for ${dataType}, found other data for key: ${cacheKey}`);
    } else {
      console.log(`Cache miss for key: ${cacheKey}`);
    }

    console.log(`Fetching fresh data for ${dataType}...`);
    const newData = await fetchData();

    // Si fetchData réussit mais retourne null/undefined, on ne met pas à jour le cache pour ce type
    if (newData === null || newData === undefined) {
        console.warn(`fetchData for ${dataType} returned null/undefined, skipping cache update for this type.`);
        return null; // ou retourner newData ? A décider selon le comportement désiré. Ici on retourne null.
    }


    const updatedCacheData: CachedQueryData = { ...cachedQueryData, [dataType]: newData };

    try {
      await redisClient.set(cacheKey, JSON.stringify(updatedCacheData), {
        EX: CACHE_TTL_SECONDS,
      });
      console.log(`Cached updated data for ${dataType} with key: ${cacheKey}`);
    } catch (cacheError) {
      console.error(`Failed to cache updated data for key ${cacheKey}:`, cacheError);
      // Continuer même si la mise en cache échoue
    }

    return newData;

  } catch (error) {
    console.error(`Error during cache management for ${dataType} with key ${cacheKey}:`, error);
    try {
      console.warn(`Redis failed for ${dataType}, attempting to fetch data directly...`);
      // Tenter la récupération directe, mais on ne pourra pas mettre en cache
      const fallbackData = await fetchData();
       if (fallbackData === null || fallbackData === undefined) {
           return null;
       }
       return fallbackData;
    } catch (fetchError) {
      console.error(`Direct fetch for ${dataType} also failed after Redis error:`, fetchError);
      return null;
    }
  }
} 