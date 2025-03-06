import { Newspaper } from "lucide-react";
import { SearchResult } from "@/types/search";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
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

interface NewsHighlightsProps {
  news: SearchResult[];
  isVisible: boolean;
}

// Composant de l'image principale optimisé pour éviter les re-renders
const MainNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const [useOriginal, setUseOriginal] = useState(true);
  const hasOriginal = article.thumbnail?.original && article.thumbnail.original !== article.thumbnail?.src;
  
  if (!article.thumbnail?.src) {
    return (
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <Newspaper className="h-12 w-12 text-muted-foreground/50" />
      </div>
    );
  }
  
  // Déterminer la source de l'image en fonction de la disponibilité et de l'état
  const imageSrc = useOriginal && hasOriginal && article.thumbnail.original
    ? article.thumbnail.original
    : article.thumbnail.src;
  
  return (
    <Image
      src={imageSrc}
      alt={article.title}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 1200px"
      className="object-cover transition-transform hover:scale-105"
      onError={() => {
        // Si on utilisait l'original et qu'il y a une erreur, utiliser l'image compressée
        if (useOriginal && hasOriginal) {
          setUseOriginal(false);
        }
      }}
    />
  );
});
MainNewsImage.displayName = "MainNewsImage";

// Composant d'image secondaire optimisé
const SecondaryNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  if (!article.thumbnail?.src) {
    return (
      <div className="h-full w-full bg-muted flex items-center justify-center">
        <Newspaper className="h-6 w-6 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <Image
      src={article.thumbnail.src}
      alt={article.title}
      fill
      sizes="(max-width: 768px) 100vw, 128px"
      className="object-cover"
    />
  );
});
SecondaryNewsImage.displayName = "SecondaryNewsImage";

// Composant d'image pour le carrousel mobile
const CarouselNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  if (!article.thumbnail?.src) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
        <Newspaper className="h-10 w-10 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <Image
      src={article.thumbnail.src}
      alt={article.title}
      fill
      sizes="(max-width: 768px) 80vw, 0px"
      className="object-cover rounded-t-lg"
    />
  );
});
CarouselNewsImage.displayName = "CarouselNewsImage";

function NewsHighlightsComponent({ news, isVisible }: NewsHighlightsProps) {
  if (!isVisible || news.length === 0) return null;

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Limiter à 4 articles max pour l'affichage initial
  const displayedNews = news.slice(0, Math.min(4, news.length));
  const mainArticle = displayedNews[0]; // L'article principal (à la une)
  const secondaryArticles = displayedNews.slice(1); // Les articles secondaires
  
  // Version desktop
  const DesktopView = () => (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {/* Article principal (à la une) */}
      {mainArticle && (
        <motion.div 
          className="col-span-2" 
          variants={item}
        >
          <Link href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <MainNewsImage article={mainArticle} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-bold">{mainArticle.title}</h3>
                <p className="mt-1 text-sm opacity-90 line-clamp-2">{mainArticle.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs bg-primary/70 px-2 py-0.5 rounded-full">
                    {mainArticle.meta_url?.hostname || 'Source'}
                  </span>
                  {mainArticle.age && (
                    <span className="text-xs opacity-80">{mainArticle.age}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Articles secondaires */}
      {secondaryArticles.map((article) => (
        <motion.div key={article.url} variants={item}>
          <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="flex gap-3 h-full">
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md">
                <SecondaryNewsImage article={article} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium line-clamp-2 text-sm">{article.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {article.meta_url?.hostname || 'Source'}
                </p>
                {article.age && (
                  <span className="mt-auto text-xs text-muted-foreground">{article.age}</span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  // Version mobile (carrousel)
  const MobileView = () => (
    <div className="md:hidden mt-4">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true
        }}
      >
        <CarouselContent>
          {news.map((article, index) => (
            <CarouselItem key={article.url} className="basis-5/6 pl-1 first:pl-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <CardHeader className="relative aspect-video p-0">
                      <CarouselNewsImage article={article} />
                    </CardHeader>
                    <CardContent className="p-3">
                      <CardTitle className="line-clamp-2 text-sm">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-1 mt-1 text-xs">
                        {article.meta_url?.hostname || 'Source'}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 text-xs text-muted-foreground">
                      {article.age}
                    </CardFooter>
                  </Card>
                </Link>
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
  );

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">À la une</h2>
      </div>

      <DesktopView />
      <MobileView />
    </motion.div>
  );
}

// Utiliser React.memo pour éviter les re-renders inutiles
export const NewsHighlights = React.memo(NewsHighlightsComponent); 