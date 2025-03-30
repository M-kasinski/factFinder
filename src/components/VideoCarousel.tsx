import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { SearchResult } from "@/types/search";
import { useTranslation } from "react-i18next";

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
        <Play className="h-10 w-10 text-muted-foreground/30" />
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
        className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        onError={() => setHasError(true)}
        loading="lazy"
      />
      {/* Overlay au survol */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
        <Play className="h-10 w-10 text-white" fill="white" />
      </div>
    </>
  );
});
VideoThumbnail.displayName = "VideoThumbnail";

// Composant pour une carte vidéo
const VideoCard = React.memo(({ video }: { video: SearchResult }) => (
  <Link href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
    <Card className="h-full overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border border-border/60 hover:border-primary/30 flex flex-col">
      <div className="relative aspect-video flex-shrink-0">
        <VideoThumbnail video={video} />
        {video.age && (
          <div className="absolute top-2 right-2 bg-background/80 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
            {video.age}
          </div>
        )}
      </div>
      <CardContent className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="line-clamp-2 text-sm font-medium">
            {video.title}
          </CardTitle>
          <CardDescription className="line-clamp-1 mt-1 text-xs text-muted-foreground">
            {video.meta_url?.hostname?.replace('www.', '') || video.source || video.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  </Link>
));
VideoCard.displayName = "VideoCard";

// Skeleton loader unifié (grille pour desktop, carousel pour mobile)
const VideoSkeleton = () => {
  const { t } = useTranslation("common");
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-primary/50" />
        <div className="h-6 w-28 bg-muted-foreground/20 rounded-lg animate-pulse" />
      </div>

      {/* Skeleton Grille (Desktop) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="border border-border/40 rounded-lg overflow-hidden h-full">
              <div className="aspect-video bg-muted relative">
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

      {/* Skeleton Carrousel (Mobile) */}
      <div className="sm:hidden">
        <ScrollArea className="w-full relative" type="scroll">
          <div className="flex gap-3 pb-4 px-1 touch-pan-x overflow-x-auto whitespace-nowrap">
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
};

// Skeleton Item pour le carousel mobile
const VideoSkeletonItem = () => (
  <div className="animate-pulse w-full h-full">
    <div className="border border-border/40 rounded-lg overflow-hidden h-full">
      <div className="aspect-video bg-muted relative">
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


function VideoCarouselComponent({ videos, isVisible }: VideoCarouselProps) {
  const { t } = useTranslation("common");
  
  if (!isVisible) return null;

  // Filtrer les vidéos avec des miniatures valides
  // Note: La gestion d'erreur est maintenant dans VideoThumbnail, pas besoin de filtrer ici initialement
  const validVideos = videos; // On pourrait ajouter un filtre si nécessaire plus tard

  // Afficher le skeleton loader unifié si aucune vidéo n'est disponible
  if (validVideos.length === 0) {
    return <VideoSkeleton />;
  }

  // Limiter le nombre de vidéos affichées (par exemple, 8)
  const videosToShow = validVideos.slice(0, 8);

  return (
    <motion.div
      className="space-y-4" // Augmentation légère de l'espacement
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{t("tabs.videos")}</h2>
      </div>

      {/* Grille pour Desktop (sm et plus) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videosToShow.map((video: SearchResult, index: number) => (
          <motion.div
            key={video.url || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }} // Timing d'animation ajusté
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>

      {/* Carrousel pour Mobile (moins que sm) */}
      <div className="sm:hidden">
        <ScrollArea className="w-full relative" type="scroll">
          <div className="flex gap-3 pb-4 px-1 touch-pan-x overflow-x-auto whitespace-nowrap">
            {videosToShow.map((video: SearchResult, index: number) => (
              <motion.div
                key={video.url || index}
                className="shrink-0 w-[240px] h-full" // Largeur fixe pour les éléments du carrousel
                initial={{ opacity: 0, x: 20 }} // Animation différente pour le scroll horizontal
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-100" />
        </ScrollArea>
      </div>


      {/* Bouton "Voir plus" - commun aux deux layouts */}
      {validVideos.length > videosToShow.length && (
        <div className="flex justify-center pt-2">
          <Link
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(validVideos[0]?.title || 'search')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-sm rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <span>Plus de vidéos sur YouTube</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

// Utiliser React.memo pour éviter les re-renders inutiles
export const VideoCarousel = React.memo(VideoCarouselComponent);
