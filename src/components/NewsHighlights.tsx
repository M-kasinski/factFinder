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
  serpResults?: SearchResult[]; // Ajouter les résultats SERP comme prop optionnelle
}

// Animation variants
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

// Skeleton loader pour l'article principal
const MainArticleSkeleton = () => (
  <div className="col-span-2 pr-4 animate-pulse">
    <div className="relative aspect-[3/2] max-w-xl w-[90%] overflow-hidden rounded-lg bg-muted">
      <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/10 to-transparent" />
      <div className="absolute bottom-0 p-3 space-y-2 w-full">
        <div className="h-5 bg-muted-foreground/20 rounded-lg w-3/4" />
        <div className="h-3 bg-muted-foreground/10 rounded-lg w-full" />
        <div className="h-3 bg-muted-foreground/10 rounded-lg w-2/3" />
        <div className="flex gap-2 mt-1">
          <div className="h-4 w-16 bg-primary/30 rounded-full" />
          <div className="h-4 w-10 bg-muted-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// Skeleton loader pour les articles secondaires
const SecondaryArticleSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex gap-3 h-full">
      <div className="relative h-24 w-32 flex-shrink-0 rounded-md bg-muted" />
      <div className="flex flex-col space-y-2 flex-1">
        <div className="h-4 bg-muted-foreground/20 rounded-lg w-full" />
        <div className="h-4 bg-muted-foreground/20 rounded-lg w-3/4" />
        <div className="h-3 bg-muted-foreground/10 rounded-lg w-1/2 mt-auto" />
      </div>
    </div>
  </div>
);

// Skeleton loader pour le carrousel mobile
const MobileSkeletonItem = () => (
  <div className="animate-pulse">
    <div className="h-full">
      <div className="overflow-hidden rounded-t-lg">
        <div className="aspect-video bg-muted" />
      </div>
      <div className="p-3 space-y-2 border border-t-0 rounded-b-lg border-muted">
        <div className="h-4 bg-muted-foreground/20 rounded-lg w-full" />
        <div className="h-3 bg-muted-foreground/10 rounded-lg w-2/3" />
        <div className="h-3 bg-muted-foreground/10 rounded-lg w-1/3" />
      </div>
    </div>
  </div>
);

// Composant de l'image principale optimisé pour éviter les re-renders
const MainNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const [useOriginal, setUseOriginal] = useState(true);
  const [hasError, setHasError] = useState(false);
  const hasOriginal = article.thumbnail?.original && article.thumbnail.original !== article.thumbnail?.src;
  const imageKey = `${article.url}-${useOriginal ? 'original' : 'compressed'}`;
  
  if (!article.thumbnail?.src || hasError) {
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
      key={imageKey}
      src={imageSrc}
      alt={article.title}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 1200px"
      className="object-cover transition-transform hover:scale-105"
      onError={() => {
        if (useOriginal && hasOriginal) {
          setUseOriginal(false);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}, (prevProps, nextProps) => {
  // Fonction de comparaison personnalisée pour React.memo
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src &&
    prevProps.article.thumbnail?.original === nextProps.article.thumbnail?.original
  );
});
MainNewsImage.displayName = "MainNewsImage";

// Composant d'image secondaire optimisé
const SecondaryNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const imageKey = article.url;
  
  if (!article.thumbnail?.src) {
    return (
      <div className="h-full w-full bg-muted flex items-center justify-center">
        <Newspaper className="h-6 w-6 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <Image
      key={imageKey}
      src={article.thumbnail.src}
      alt={article.title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 128px"
      className="object-cover"
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src
  );
});
SecondaryNewsImage.displayName = "SecondaryNewsImage";

// Composant d'image pour le carrousel mobile
const CarouselNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const imageKey = article.url;
  
  if (!article.thumbnail?.src) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
        <Newspaper className="h-10 w-10 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <Image
      key={imageKey}
      src={article.thumbnail.src}
      alt={article.title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 80vw, 0px"
      className="object-cover rounded-t-lg"
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src
  );
});
CarouselNewsImage.displayName = "CarouselNewsImage";

// Composant pour l'article principal
const MainArticle = React.memo(({ article }: { article: SearchResult }) => {
  if (!article) return null;
  
  return (
    <motion.div className="col-span-2 pr-4" variants={item}>
      <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[3/2] max-w-xl w-[90%] overflow-hidden rounded-lg">
          <MainNewsImage article={article} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-3 text-white">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="mt-1 text-xs opacity-90 line-clamp-2">{article.description}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs bg-primary/70 px-2 py-0.5 rounded-full">
                {article.meta_url?.hostname || 'Source'}
              </span>
              {article.age && (
                <span className="text-xs opacity-80">{article.age}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.article.url === nextProps.article.url;
});
MainArticle.displayName = "MainArticle";

// Composant pour les articles secondaires
const SecondaryArticle = React.memo(({ article }: { article: SearchResult }) => {
  return (
    <motion.div variants={item}>
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
  );
}, (prevProps, nextProps) => {
  return prevProps.article.url === nextProps.article.url;
});
SecondaryArticle.displayName = "SecondaryArticle";

// Version desktop optimisée
const DesktopView = React.memo(({ mainArticle, secondaryArticles }: { 
  mainArticle: SearchResult; 
  secondaryArticles: SearchResult[];
}) => (
  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    {mainArticle && <MainArticle article={mainArticle} />}
    {secondaryArticles.map((article) => (
      <SecondaryArticle key={article.url} article={article} />
    ))}
  </div>
));
DesktopView.displayName = "DesktopView";

// Version mobile optimisée
const MobileView = React.memo(({ displayData }: { displayData: SearchResult[] }) => (
  <div className="md:hidden mt-4">
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true
      }}
    >
      <CarouselContent>
        {displayData.map((article, index) => (
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
));
MobileView.displayName = "MobileView";

function NewsHighlightsComponent({ news, isVisible, serpResults = [] }: NewsHighlightsProps) {
  // Vérifier si nous devons utiliser les résultats SERP (pas d'actualités)
  const useSerpResults = news.length === 0 && serpResults.length > 0;
  
  // Déterminer si le composant doit être visible
  const shouldDisplay = isVisible || useSerpResults;
  
  // Ne rien afficher si le composant ne doit pas être visible
  if (!shouldDisplay) return null;

  // Utiliser les résultats SERP ou les actualités selon le cas
  const displayData = useSerpResults ? serpResults: news;
  
  // Limiter à 4 articles max pour l'affichage initial
  const displayedItems = displayData.slice(0, Math.min(5, displayData.length));
  const mainArticle = displayedItems[0];
  const secondaryArticles = displayedItems.slice(1);

  // Titre personnalisé selon le type de données affichées
  const sectionTitle = useSerpResults ? "Résultats" : "À la une";

  // Placeholder pour le chargement (ghost loading)
  const LoadingPlaceholder = () => (
    <div>
      <div className="flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary/50" />
        <div className="h-6 w-24 bg-muted-foreground/20 rounded-lg animate-pulse" />
      </div>
      
      {/* Desktop placeholder */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <MainArticleSkeleton />
        {[...Array(3)].map((_, index) => (
          <SecondaryArticleSkeleton key={index} />
        ))}
      </div>
      
      {/* Mobile placeholder */}
      <div className="md:hidden mt-4">
        <div className="flex overflow-x-auto gap-3 pb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-[240px] flex-shrink-0">
              <MobileSkeletonItem />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Afficher le placeholder si les données ne sont pas encore chargées
  if (displayData.length === 0) {
    return <LoadingPlaceholder />;
  }

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{sectionTitle}</h2>
      </div>

      <DesktopView mainArticle={mainArticle} secondaryArticles={secondaryArticles} />
      <MobileView displayData={displayData} />
    </motion.div>
  );
}

// Utiliser React.memo avec une fonction de comparaison personnalisée pour le composant principal
export const NewsHighlights = React.memo(NewsHighlightsComponent, (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.news === nextProps.news &&
    prevProps.serpResults === nextProps.serpResults
  );
}); 