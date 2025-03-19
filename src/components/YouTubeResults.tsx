import React, { memo } from 'react';
import { YouTubeVideoItem } from '@/types/youtube';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";

// Composant pour les résultats YouTube
const YouTubeResults: React.FC<{
  videos: YouTubeVideoItem[];
  isLoading?: boolean;
}> = ({ videos, isLoading = false }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isLoading) {
    return <YouTubeSkeletonLoader />;
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Vidéos YouTube
        </span>
        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
          {videos.length}
        </span>
      </h2>

      {isMobile ? (
        <MobileYouTubeLayout videos={videos} />
      ) : (
        <DesktopYouTubeLayout videos={videos} />
      )}
    </div>
  );
};

// Layout pour mobile avec disposition verticale
const MobileYouTubeLayout: React.FC<{ videos: YouTubeVideoItem[] }> = ({ videos }) => {
  // État pour suivre les vidéos avec des miniatures valides
  const [validVideos, setValidVideos] = React.useState<YouTubeVideoItem[]>([]);
  const [hasCheckedThumbnails, setHasCheckedThumbnails] = React.useState(false);

  // Filtrer les vidéos qui ont des miniatures valides
  React.useEffect(() => {
    setValidVideos(videos.filter(
      video => video.thumbnails && 
              typeof video.thumbnails.medium?.url === 'string' &&
              video.thumbnails.medium.url.startsWith('http')
    ));
    setHasCheckedThumbnails(true);
  }, [videos]);

  // Si aucune vidéo valide après filtrage
  if (hasCheckedThumbnails && validVideos.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4">
      {validVideos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <YouTubeMobileCard video={video} />
        </motion.div>
      ))}
    </div>
  );
};

// Layout pour desktop avec grille
const DesktopYouTubeLayout: React.FC<{ videos: YouTubeVideoItem[] }> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <YouTubeCard video={video} />
        </motion.div>
      ))}
    </div>
  );
};

// Carte pour une vidéo YouTube (version desktop)
interface YouTubeCardProps {
  video: YouTubeVideoItem;
}

const YouTubeCard = memo(({ video }: YouTubeCardProps) => {
  const [thumbnailError, setThumbnailError] = React.useState(false);
  
  if (thumbnailError) {
    return null;
  }

  // Formatter la date de publication
  const formattedDate = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: fr
  });

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md hover:scale-[1.01] transition duration-300 group max-w-md mx-auto w-full">
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex flex-col"
      >
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={video.thumbnails.medium.url}
            alt={video.title}
            fill
            className="object-cover group-hover:brightness-90"
            onError={() => setThumbnailError(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="bg-blue-500 p-3 rounded-full opacity-0 group-hover:opacity-95 transition-opacity duration-300 transform group-hover:scale-110">
              <ExternalLink className="text-white" size={24} />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            YouTube
          </div>
        </div>
        <CardContent className="flex-grow py-4 px-4">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
            {video.description}
          </p>
        </CardContent>
        <CardFooter className="pb-3 pt-0 px-4 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <span className="truncate max-w-[70%]">{video.channelTitle}</span>
          <span>{formattedDate}</span>
        </CardFooter>
      </a>
    </Card>
  );
});

YouTubeCard.displayName = 'YouTubeCard';

// Carte pour une vidéo YouTube (version mobile)
const YouTubeMobileCard = memo(({ video }: YouTubeCardProps) => {
  const [thumbnailError, setThumbnailError] = React.useState(false);
  
  if (thumbnailError) {
    return null;
  }

  // Formatter la date de publication
  const formattedDate = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: fr
  });

  return (
    <Card className="overflow-hidden flex flex-row hover:shadow-md transition duration-300 group">
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex flex-row"
      >
        {/* Miniature à gauche */}
        <div className="relative w-1/3 min-w-24 h-24">
          <Image
            src={video.thumbnails.medium.url}
            alt={video.title}
            fill
            className="object-cover group-hover:brightness-90"
            onError={() => setThumbnailError(true)}
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[8px] px-1 py-0.5 rounded">
            YouTube
          </div>
        </div>
        
        {/* Informations à droite */}
        <div className="w-2/3 flex flex-col p-3">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {video.title}
          </h3>
          <div className="mt-auto flex flex-row justify-between items-center text-xs text-gray-500">
            <span className="truncate max-w-[60%]">{video.channelTitle}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </a>
    </Card>
  );
});

YouTubeMobileCard.displayName = 'YouTubeMobileCard';

// Squelette de chargement
const YouTubeSkeletonLoader = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <div className="w-full">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex flex-col space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex flex-row">
              <Skeleton className="w-1/3 min-w-24 h-24" />
              <div className="w-2/3 p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col h-full">
            <Skeleton className="w-full h-40" />
            <div className="py-3 px-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="px-4 pb-3">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeResults;