import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  if (!video.thumbnail?.src) {
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
  <Link href={video.url} target="_blank" rel="noopener noreferrer" className="block h-full">
    <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
      <CardHeader className="relative aspect-video p-0">
        <VideoThumbnail video={video} />
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="line-clamp-2 text-sm">
          {video.title}
        </CardTitle>
        <CardDescription className="line-clamp-1 mt-1 text-xs">
          {video.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-3 pt-0 text-xs text-muted-foreground">
        {video.age}
      </CardFooter>
    </Card>
  </Link>
));
VideoCard.displayName = "VideoCard";

// Composant de loading skeleton pour les vidéos
const VideoSkeletonItem = () => (
  <div className="animate-pulse">
    <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </div>
    <div className="mt-2 space-y-2">
      <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
      <div className="h-3 bg-muted-foreground/10 rounded w-1/2" />
    </div>
  </div>
);

// Skeleton loader pour le carousel de vidéos
const VideoCarouselSkeleton = () => (
  <div>
    <div className="flex items-center gap-2">
      <Play className="h-5 w-5 text-primary/50" />
      <div className="h-6 w-28 bg-muted-foreground/20 rounded-lg animate-pulse" />
    </div>
    
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <VideoSkeletonItem key={index} />
      ))}
    </div>
  </div>
);

function VideoCarouselComponent({ videos, isVisible }: VideoCarouselProps) {
  if (!isVisible) return null;
  
  // Afficher le skeleton loader si aucune vidéo n'est disponible
  if (videos.length === 0) {
    return <VideoCarouselSkeleton />;
  }

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

      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.url} video={video} />
        ))}
      </div>

      <div className="sm:hidden">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true
          }}
        >
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.url} className="basis-4/5 md:basis-1/3 lg:basis-1/4 pl-1 first:pl-0">
                <VideoCard video={video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-2">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
}

// Utiliser React.memo pour éviter les re-renders inutiles
export const VideoCarousel = React.memo(VideoCarouselComponent); 
