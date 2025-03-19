import { YouTubeSearchResponse, YouTubeVideoItem } from '@/types/youtube';
import { getMockYouTubeData } from './mockYouTubeData';
import { decode } from 'html-entities';

export class YouTubeService {
  private apiKey: string;
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Recherche des vidéos sur YouTube en fonction d'une requête
   * @param query Terme de recherche
   * @param maxResults Nombre maximum de résultats (par défaut: 10)
   */
  async searchVideos(query: string, maxResults: number = 10): Promise<YouTubeVideoItem[]> {
    // Si pas d'API key ou env de développement, utiliser les données fictives
    if (!this.apiKey || process.env.USE_MOCK_DATA === 'true') {
      console.log('Utilisation des données YouTube fictives');
      return getMockYouTubeData(query);
    }
    
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
        key: this.apiKey,
        relevanceLanguage: 'fr',
        videoDuration: 'medium' // Pour privilégier les vidéos de durée moyenne
      });

      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.warn(`Erreur API YouTube: ${errorData.error?.message || response.statusText}. Utilisation des données fictives.`);
        return getMockYouTubeData(query);
      }

      const data: YouTubeSearchResponse = await response.json();
      
      // Filtrer les résultats pour ne garder que les vidéos
      return data.items
        .filter(item => item.id.kind === 'youtube#video' && !!item.id.videoId)
        .map(item => ({
          id: item.id.videoId as string,
          title: decode(item.snippet.title),
          description: decode(item.snippet.description),
          channelTitle: decode(item.snippet.channelTitle),
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails
        }));
    } catch (error) {
      console.error('Erreur lors de la recherche YouTube:', error);
      console.log('Utilisation des données YouTube fictives suite à une erreur');
      return getMockYouTubeData(query);
    }
  }

  /**
   * Récupère des détails supplémentaires sur des vidéos (vues, likes, etc.)
   * Cette fonction peut être implémentée plus tard si nécessaire
   */
  async getVideoDetails(videoIds: string[]): Promise<Record<string, unknown>[]> {
    // À implémenter si nécessaire pour obtenir des statistiques comme
    // le nombre de vues, likes, etc.
    console.log(`Détails vidéo demandés pour : ${videoIds.join(', ')}`);
    return [];
  }
}

// Fonction pour créer une instance du service
export function createYouTubeService(): YouTubeService {
  const apiKey = process.env.YOUTUBE_API_KEY || '';
  
  if (!apiKey) {
    console.warn('⚠️ Clé API YouTube non configurée. La recherche YouTube ne fonctionnera pas.');
  }
  
  return new YouTubeService(apiKey);
}
