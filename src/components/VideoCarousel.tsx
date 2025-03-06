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

function VideoCarouselComponent({ videos, isVisible }: VideoCarouselProps) {
  if (!isVisible || !videos.length) return null;

  // Filtrer les vidéos valides (avec miniature)
  const validVideos = videos.filter(
    (video) => video.thumbnail?.src && video.title && video.description
  );

  // Ne rien afficher si aucune vidéo valide
  if (validVideos.length === 0) return null;

  // Animation variants pour le conteneur
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Vidéos</h2>
      </div>

      <div className="w-full py-2">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1
          }}
        >
          <CarouselContent>
            {validVideos.map((video, index) => (
              <CarouselItem key={video.url} className="md:basis-1/2 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full px-1"
                >
                  <VideoCard video={video} />
                </motion.div>
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
