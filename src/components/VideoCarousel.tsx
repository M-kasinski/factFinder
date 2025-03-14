import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SearchResult } from "@/types/search";

interface VideoCarouselProps {
  videos: SearchResult[];
  isVisible: boolean;
}

// Composant pour l'image de miniature vidéo
const VideoThumbnail = React.memo(({ video }: { video: SearchResult }) => {
  const [hasError, setHasError] = useState(false);
  
  if (!video.thumbnail?.src || hasError) {
    return (
      <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-t-lg">
        <Play className="h-10 w-10 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <>
      <Image
        src={video.thumbnail.src}
        alt={video.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover rounded-t-lg"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
          <Play className="h-4 w-4 text-white" fill="white" />
        </div>
      </div>
    </>
  );
});
VideoThumbnail.displayName = "VideoThumbnail";

// Composant pour une carte vidéo
const VideoCard = React.memo(({ video }: { video: SearchResult }) => (
  <Link href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
    <Card className="h-full overflow-hidden bg-card hover:bg-card/95 dark:hover:bg-card/90 transition-all duration-300 border-border/60 hover:border-primary/30 hover:shadow-lg">
      <div className="relative aspect-video">
        <VideoThumbnail video={video} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 text-xs px-2 py-1 bg-primary/90 text-primary-foreground rounded-full">
            <Play className="h-3 w-3" fill="currentColor" />
            <span>Regarder</span>
          </div>
        </div>
        {video.age && (
          <div className="absolute top-2 right-2 bg-background/80 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            {video.age}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <CardTitle className="line-clamp-2 text-sm group-hover:text-primary transition-colors">
          {video.title}
        </CardTitle>
        <CardDescription className="line-clamp-1 mt-1 text-xs">
          {video.meta_url?.hostname?.replace('www.', '') || video.source || video.description}
        </CardDescription>
      </CardContent>
    </Card>
  </Link>
));
VideoCard.displayName = "VideoCard";

// Composant de loading skeleton pour les vidéos (mobile)
const VideoSkeletonItem = () => (
  <div className="animate-pulse w-full h-full">
    <div className="border border-border/40 rounded-lg overflow-hidden h-full">
      <div className="aspect-video bg-muted relative">
        <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-9 w-9 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted-foreground/20 rounded w-full" />
        <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
        <div className="h-3 bg-muted-foreground/10 rounded w-1/2" />
      </div>
    </div>
  </div>
);

// Skeleton loader pour le carousel de vidéos
const VideoCarouselSkeleton = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Play className="h-5 w-5 text-primary/50" />
      <div className="h-6 w-28 bg-muted-foreground/20 rounded-lg animate-pulse" />
    </div>
    
    {/* Desktop skeleton - une seule ligne, uniformément espacée */}
    <div className="hidden sm:block">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="animate-pulse"
          >
            <div className="border border-border/40 rounded-lg overflow-hidden h-full">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted-foreground/20 rounded w-full" />
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                <div className="h-3 bg-muted-foreground/10 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Mobile skeleton */}
    <div className="sm:hidden">
      <ScrollArea className="w-full relative" type="scroll">
        <div className="flex gap-3 pb-4 touch-pan-x overflow-x-auto whitespace-nowrap">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-[240px] flex-shrink-0">
              <VideoSkeletonItem />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-100" />
      </ScrollArea>
    </div>
  </div>
);

function VideoCarouselComponent({ videos, isVisible }: VideoCarouselProps) {
  // Filtrer les vidéos qui ont des miniatures valides pour mobile
  const [validMobileVideos, setValidMobileVideos] = useState<SearchResult[]>([]);
  
  // Mettre à jour validMobileVideos quand les vidéos changent
  useEffect(() => {
    if (isVisible && videos.length > 0) {
      setValidMobileVideos(videos.filter(video => video.thumbnail?.src));
    }
  }, [videos, isVisible]);
  
  if (!isVisible) return null;
  
  // Afficher le skeleton loader si aucune vidéo n'est disponible
  if (videos.length === 0) {
    return <VideoCarouselSkeleton />;
  }

  // Filtrer les vidéos avec des miniatures valides pour desktop
  const validDesktopVideos = videos.filter(video => video.thumbnail?.src);
  
  // Gérer les erreurs d'image pour filtrer les vidéos
  const handleImageError = (video: SearchResult) => {
    setValidMobileVideos(current => current.filter(item => item.url !== video.url));
  };
  
  // Si aucune vidéo valide, ne rien afficher
  if (validDesktopVideos.length === 0 && validMobileVideos.length === 0) return null;

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Vidéos</h2>
      </div>

      {/* Version desktop moderne avec disposition en grille décalée */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {validDesktopVideos.slice(0, 8).map((video, index) => (
            <motion.div
              key={video.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`transform ${index % 2 === 0 ? 'lg:translate-y-4' : ''}`}
            >
              <VideoCard key={video.url} video={video} />
            </motion.div>
          ))}
        </div>
        
        {/* Voir plus de vidéos - s'affiche uniquement s'il y a plus de 8 vidéos */}
        {validDesktopVideos.length > 8 && (
          <div className="flex justify-center mt-6">
            <Link 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(validDesktopVideos[0]?.title || 'search')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-sm rounded-full transition-colors"
            >
              <span>Plus de vidéos</span>
              <Play className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>

      <div className="sm:hidden">
        {validMobileVideos.length > 0 ? (
          <ScrollArea className="w-full relative" type="scroll">
            <div className="flex gap-3 pb-4 px-1 touch-pan-x overflow-x-auto whitespace-nowrap">
              {validMobileVideos.map((video, index) => (
                <motion.div
                  key={video.url}
                  className="shrink-0 w-[240px] h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col">
                      <CardHeader className="relative aspect-video p-0 flex-shrink-0">
                        <Image
                          src={video.thumbnail?.src || ''}
                          alt={video.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 80vw, 0px"
                          className="object-cover rounded-t-lg"
                          onError={() => handleImageError(video)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" fill="white" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 flex-grow">
                        <CardTitle className="line-clamp-2 text-sm">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 mt-1 text-xs">
                          {video.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 text-xs text-muted-foreground h-8 flex-shrink-0">
                        {video.age || <span className="opacity-0">·</span>}
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="opacity-100" />
          </ScrollArea>
        ) : null}
      </div>
    </motion.div>
  );
}

// Utiliser React.memo pour éviter les re-renders inutiles
export const VideoCarousel = React.memo(VideoCarouselComponent); 
