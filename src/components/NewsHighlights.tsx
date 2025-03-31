import { Newspaper } from "lucide-react";
import { SearchResult } from "@/types/search";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

interface NewsHighlightsProps {
  news: SearchResult[];
  isVisible: boolean;
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

// Composant de l'image principale optimisé pour éviter les re-renders
const MainNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const [useOriginal, setUseOriginal] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // S'assurer que thumbnail existe avant d'accéder à ses propriétés
  const hasOriginal = article.thumbnail?.original && article.thumbnail.original !== article.thumbnail.src;
  const imageKey = `${article.url}-${useOriginal ? 'original' : 'compressed'}`;
  
  // Vérification plus stricte de la validité de l'image
  const sourceValid = article.thumbnail?.src && typeof article.thumbnail.src === 'string' && article.thumbnail.src.startsWith('http');
  const originalValid = article.thumbnail?.original && typeof article.thumbnail.original === 'string' && article.thumbnail.original.startsWith('http');
  
  if (!sourceValid || hasError) {
    // Ne jamais afficher de placeholder, retourner null
    return null;
  }
  
  // Déterminer la source de l'image en fonction de la disponibilité et de l'état
  const imageSrc = useOriginal && hasOriginal && originalValid && article.thumbnail?.original
    ? article.thumbnail.original
    : article.thumbnail?.src;
  
  return (
    <Image
      key={imageKey}
      src={imageSrc as string}
      alt={article.title}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 1200px"
      className="object-cover transition-transform hover:scale-105"
      onError={() => {
        if (useOriginal && hasOriginal && originalValid) {
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
  const [hasError, setHasError] = useState(false);
  
  // Vérification plus stricte de la validité de l'image
  const sourceValid = article.thumbnail?.src && typeof article.thumbnail.src === 'string' && article.thumbnail.src.startsWith('http');
  
  if (!sourceValid || hasError) {
    return null; // Ne plus afficher de placeholder
  }
  
  return (
    <Image
      key={imageKey}
      src={article.thumbnail?.src as string}
      alt={article.title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 128px"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src
  );
});
SecondaryNewsImage.displayName = "SecondaryNewsImage";

// Composant d'image pour le scrolling mobile
const ScrollNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const imageKey = article.url;
  const [hasError, setHasError] = useState(false);
  
  // Vérification plus stricte de la validité de l'image
  const sourceValid = article.thumbnail?.src && typeof article.thumbnail.src === 'string' && article.thumbnail.src.startsWith('http');
  
  if (!sourceValid || hasError) {
    return null; // Ne plus afficher de placeholder
  }
  
  return (
    <Image
      key={imageKey}
      src={article.thumbnail?.src as string}
      alt={article.title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 80vw, 0px"
      className="object-cover rounded-t-lg"
      onError={() => setHasError(true)}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src
  );
});
ScrollNewsImage.displayName = "ScrollNewsImage";

// Composant pour l'article principal
const MainArticle = React.memo(({ article }: { article: SearchResult }) => {
  const { t } = useTranslation("common");
  
  if (!article || !article.thumbnail?.src) return null;
  
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
                {article.meta_url?.hostname || t("news.source")}
              </span>
              {article.age && <span className="text-xs opacity-80">{article.age}</span>}
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
}) => {
  // Filtrer les articles secondaires qui ont des miniatures valides
  const validSecondaryArticles = secondaryArticles.filter(article => 
    article.thumbnail?.src && article.thumbnail.src.startsWith('http')
  );
  
  // Filtrer l'article principal s'il n'a pas d'image valide
  const validMainArticle = mainArticle?.thumbnail?.src && mainArticle.thumbnail.src.startsWith('http') 
    ? mainArticle 
    : null;
  
  // Si aucun article valide, ne rien afficher
  if (!validMainArticle && validSecondaryArticles.length === 0) return null;
  
  // Utiliser le premier article secondaire valide comme article principal si l'article principal n'a pas d'image valide
  const displayedMainArticle = validMainArticle || (validSecondaryArticles.length > 0 ? validSecondaryArticles[0] : null);
  
  // Retirer l'article secondaire utilisé comme article principal des articles secondaires
  const remainingSecondaryArticles = validMainArticle 
    ? validSecondaryArticles 
    : validSecondaryArticles.slice(1);

  return (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {displayedMainArticle && <MainArticle article={displayedMainArticle} />}
      {remainingSecondaryArticles.map((article) => (
        <SecondaryArticle key={article.url} article={article} />
      ))}
    </div>
  );
});
DesktopView.displayName = "DesktopView";

// Version mobile optimisée
const MobileView = React.memo(({ displayData }: { displayData: SearchResult[] }) => {
  // Filtrer les articles qui ont des miniatures valides pour mobile avec un filtrage encore plus strict
  const [validArticles, setValidArticles] = useState<SearchResult[]>([]);
  
  // Mettre à jour validArticles quand displayData change avec un filtre plus strict
  useEffect(() => {
    setValidArticles(displayData.filter(
      article => article.thumbnail?.src && 
                 typeof article.thumbnail.src === 'string' && 
                 article.thumbnail.src.startsWith('http')
    ));
  }, [displayData]);
  
  // Gérer les erreurs d'image pour filtrer les articles
  const handleImageError = (article: SearchResult) => {
    setValidArticles(current => current.filter(item => item.url !== article.url));
  };
  
  // Si aucun article valide, ne rien afficher
  if (validArticles.length === 0) return null;
  
  return (
    <div className="md:hidden mt-4">
      <ScrollArea className="w-full relative" type="scroll">
        <div className="flex gap-3 pb-4 px-1 touch-pan-x overflow-x-auto whitespace-nowrap">
          {validArticles.map((article, index) => {
            // Vérification supplémentaire pour s'assurer que l'URL est valide
            if (!article.thumbnail?.src || !article.thumbnail.src.startsWith('http')) {
              return null;
            }
            
            return (
              <motion.div
                key={article.url}
                className="shrink-0 w-[240px] h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col">
                    <CardHeader className="relative aspect-video p-0 flex-shrink-0">
                      <Image
                        src={article.thumbnail.src as string}
                        alt={article.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 80vw, 0px"
                        className="object-cover rounded-t-lg"
                        onError={() => handleImageError(article)}
                      />
                    </CardHeader>
                    <CardContent className="p-3 flex-grow">
                      <CardTitle className="line-clamp-2 text-sm">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-1 mt-1 text-xs">
                        {article.meta_url?.hostname || 'Source'}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 text-xs text-muted-foreground h-8 flex-shrink-0">
                      {article.age || <span className="opacity-0">·</span>}
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-100" />
      </ScrollArea>
    </div>
  );
});
MobileView.displayName = "MobileView";

function NewsHighlightsComponent({ news, isVisible }: NewsHighlightsProps) {
  const { t } = useTranslation("common");
  
  // Ne rien afficher si le composant ne doit pas être visible ou s'il n'y a pas d'actualités
  if (!isVisible || news.length === 0) return null;

  // Filtrer les résultats Instagram
  const filterInstagram = (items: SearchResult[]) => items.filter(item => 
    !(item.meta_url?.hostname?.includes('instagram') || item.url.includes('instagram'))
  );

  const allDisplayData = filterInstagram(news);
  
  // NOUVEAU: Filtrer strictement tous les résultats sans image valide
  const validDisplayData = allDisplayData.filter(item => 
    item.thumbnail?.src && 
    typeof item.thumbnail.src === 'string' && 
    item.thumbnail.src.startsWith('http')
  );
  
  // Placeholder pour le chargement (ghost loading)
  const LoadingPlaceholder = () => {
    
    return (
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
          <ScrollArea className="w-full relative" type="scroll">
            <div className="flex gap-3 pb-4 px-1 touch-pan-x overflow-x-auto whitespace-nowrap">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-[240px] flex-shrink-0">
                  <div className="h-full">
                    <div className="overflow-hidden rounded-t-lg">
                      <div className="aspect-video bg-muted" />
                    </div>
                    <div className="p-3 space-y-2 border border-t-0 rounded-b-lg border-muted">
                      <div className="h-4 bg-muted-foreground/20 rounded-lg w-full" />
                      <div className="h-3 bg-muted-foreground/10 rounded-lg w-2/3" />
                      <div className="h-3 bg-muted-foreground/10 rounded-lg w-1/3" />
                      <div className="h-2" /> {/* Espace supplémentaire pour correspondre à la hauteur du footer */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="opacity-100" />
          </ScrollArea>
        </div>
      </div>
    );
  };

  // Afficher le placeholder si les données ne sont pas encore chargées ou si les données ne sont pas valides
  if (allDisplayData.length === 0 || validDisplayData.length === 0) {
    return <LoadingPlaceholder />;
  }
  
  // Limiter à 4 articles max pour l'affichage initial
  const displayedItems = validDisplayData.slice(0, Math.min(5, validDisplayData.length));
  const mainArticle = displayedItems[0];
  const secondaryArticles = displayedItems.slice(1);

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{t("news.headline")}</h2>
      </div>

      <DesktopView mainArticle={mainArticle} secondaryArticles={secondaryArticles} />
      <MobileView displayData={validDisplayData} />
    </motion.div>
  );
}

// Utiliser React.memo avec une fonction de comparaison personnalisée pour le composant principal
export const NewsHighlights = React.memo(NewsHighlightsComponent, (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.news === nextProps.news
  );
}); 