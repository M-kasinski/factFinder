import { YouTubeVideoItem } from '@/types/youtube';

// Données fictives pour YouTube API - utilisées en mode offline ou en dev
export const getMockYouTubeData = (query: string): YouTubeVideoItem[] => {
  // Simuler un léger délai pour l'effet d'API
  console.log(`Génération de données fictives YouTube pour: ${query}`);

  // Base de miniatures YouTube
  const thumbnailBase = 'https://i.ytimg.com/vi/';
  
  return [
    {
      id: 'dQw4w9WgXcQ',
      title: `Comment ${query} - Guide complet`,
      description: `Tout ce que vous devez savoir à propos de ${query} expliqué en détail.`,
      channelTitle: 'Tech Expliquée',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semaine
      thumbnails: {
        default: {
          url: `${thumbnailBase}dQw4w9WgXcQ/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}dQw4w9WgXcQ/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}dQw4w9WgXcQ/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    },
    {
      id: 'uFXz3Rc0UmA',
      title: `${query} expliqué en 10 minutes`,
      description: `Une explication concise de ${query} pour les débutants.`,
      channelTitle: 'Science Rapide',
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 semaines
      thumbnails: {
        default: {
          url: `${thumbnailBase}uFXz3Rc0UmA/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}uFXz3Rc0UmA/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}uFXz3Rc0UmA/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    },
    {
      id: '9bZkp7q19f0',
      title: `Les erreurs courantes à éviter avec ${query}`,
      description: `Dans cette vidéo, nous examinons les erreurs que font la plupart des gens avec ${query}.`,
      channelTitle: 'Conseils Pro',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 jours
      thumbnails: {
        default: {
          url: `${thumbnailBase}9bZkp7q19f0/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}9bZkp7q19f0/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}9bZkp7q19f0/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    },
    {
      id: 'JGwWNGJdvx8',
      title: `${query} : Avancé vs. Débutant`,
      description: `Comparaison des techniques débutantes et avancées pour ${query}.`,
      channelTitle: 'MasterClass Online',
      publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 mois
      thumbnails: {
        default: {
          url: `${thumbnailBase}JGwWNGJdvx8/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}JGwWNGJdvx8/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}JGwWNGJdvx8/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    },
    {
      id: 'kJQP7kiw5Fk',
      title: `L'histoire de ${query}`,
      description: `L'évolution de ${query} à travers les années.`,
      channelTitle: 'Histoire Moderne',
      publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 mois
      thumbnails: {
        default: {
          url: `${thumbnailBase}kJQP7kiw5Fk/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}kJQP7kiw5Fk/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}kJQP7kiw5Fk/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    },
    {
      id: 'CyW5XGZczQ0',
      title: `${query} vs les alternatives`,
      description: `Comparaison objective entre ${query} et les principales alternatives.`,
      channelTitle: 'Analyse Technique',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 jours
      thumbnails: {
        default: {
          url: `${thumbnailBase}CyW5XGZczQ0/default.jpg`,
          width: 120,
          height: 90
        },
        medium: {
          url: `${thumbnailBase}CyW5XGZczQ0/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `${thumbnailBase}CyW5XGZczQ0/hqdefault.jpg`,
          width: 480,
          height: 360
        }
      }
    }
  ];
};
