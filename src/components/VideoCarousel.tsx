import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
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

export function VideoCarousel({ videos, isVisible }: VideoCarouselProps) {
  if (!isVisible || !videos.length) return null;

  // Filtrer les vidéos valides (avec miniature)
  const validVideos = videos.filter(
    (video) => video.thumbnail?.src && video.title && video.description
  );

  // Ne rien afficher si aucune vidéo valide
  if (validVideos.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Vidéos</h2>
      </div>

      <div className="w-full py-2">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {validVideos.map((video, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href={video.url} target="_blank" rel="noopener noreferrer">
                  <Card className="h-[280px]">
                    <CardHeader className="relative aspect-video p-0">
                      <Image
                        src={video.thumbnail?.src || ""}
                        alt={video.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white" fill="white" />
                        </div>
                      </div>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
} 
