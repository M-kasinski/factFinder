import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Lightbulb, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SearchResult } from "@/types/search";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface AnalysisHighlightsProps {
  isLoading: boolean;
  onShowResults?: () => void;
  streamingContent?: string;
  results: SearchResult[];
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

// Composant d'image principale optimisé
const MainNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const [useOriginal, setUseOriginal] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  if (!article?.thumbnail?.src) return null;
  
  const hasOriginal = article.thumbnail?.original && article.thumbnail.original !== article.thumbnail.src;
  const imageKey = `${article.url}-${useOriginal ? 'original' : 'compressed'}`;
  
  const sourceValid = article.thumbnail?.src && typeof article.thumbnail.src === 'string' && article.thumbnail.src.startsWith('http');
  const originalValid = article.thumbnail?.original && typeof article.thumbnail.original === 'string' && article.thumbnail.original.startsWith('http');
  
  if (!sourceValid || hasError) {
    return null;
  }
  
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
});
MainNewsImage.displayName = "MainNewsImage";

// Composant d'image secondaire optimisé
const SecondaryNewsImage = React.memo(({ article }: { article: SearchResult }) => {
  const [hasError, setHasError] = useState(false);
  
  if (!article?.thumbnail?.src) return null;
  
  const sourceValid = article.thumbnail?.src && typeof article.thumbnail.src === 'string' && article.thumbnail.src.startsWith('http');
  
  if (!sourceValid || hasError) {
    return null;
  }
  
  return (
    <Image
      src={article.thumbnail.src}
      alt={article.title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 100vw, 128px"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}, (prevProps, nextProps) => {
  return prevProps.article.url === nextProps.article.url &&
    prevProps.article.thumbnail?.src === nextProps.article.thumbnail?.src;
});
SecondaryNewsImage.displayName = "SecondaryNewsImage";

// Composant pour l'article principal avec analyse LLM intégrée
const MainArticle = ({ article, isLoading, streamingContent }: { 
  article: SearchResult; 
  isLoading: boolean;
  streamingContent?: string;
}) => {
  const { t } = useTranslation("common");
  
  if (!article || !article.thumbnail?.src) return null;
  
  return (
    <motion.div variants={item} className="relative">
      <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
        <div className="grid md:grid-cols-7 gap-6 p-6">
          {/* Section analyse LLM (4 colonnes) */}
          <div className="md:col-span-4 relative">
            <div className="prose prose-sm dark:prose-invert max-w-none h-full pb-8">
              {isLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-5 bg-primary/10 rounded-md w-3/4" />
                  <div className="h-4 bg-primary/5 rounded-md w-full" />
                  <div className="h-4 bg-primary/5 rounded-md w-11/12" />
                  <div className="h-4 bg-primary/5 rounded-md w-3/4" />
                </div>
              ) : streamingContent ? (
                <ReactMarkdown>{streamingContent}</ReactMarkdown>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-primary/60 text-sm">
                  {t("generating")}
                </div>
              )}
            </div>
            {/* Badge IA en bas à gauche de la section analyse */}
            <div className="absolute bottom-0 left-0">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                <span>{t("analysis.ai")}</span>
              </div>
            </div>
          </div>

          {/* Section image principale (3 colonnes) */}
          <div className="md:col-span-3 relative">
            <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                <MainNewsImage article={article} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-3 text-white">
                  <h3 className="text-lg font-bold">{article.title}</h3>
                  <p className="mt-1 text-sm opacity-90 line-clamp-2">{article.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-primary/70 px-2 py-0.5 rounded-full">
                      {article.meta_url?.hostname || t("news.source")}
                    </span>
                    {article.age && (
                      <span className="text-xs opacity-80">{article.age}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Composant pour les articles secondaires
const SecondaryArticle = ({ article }: { article: SearchResult }) => {
  const { t } = useTranslation("common");
  
  if (!article || !article.thumbnail?.src) return null;

  return (
    <motion.div variants={item}>
      <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="flex gap-4">
          <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md bg-muted/50">
            <SecondaryNewsImage article={article} />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <h3 className="font-medium line-clamp-2 text-sm group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {article.description}
            </p>
            <div className="mt-auto pt-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {article.meta_url?.hostname || t("news.source")}
              </span>
              {article.age && (
                <span className="text-xs text-muted-foreground">• {article.age}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Composant pour le placeholder de chargement
const LoadingPlaceholder = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 animate-pulse">
        <div className="p-2 rounded-full bg-primary/10">
          <Lightbulb className="h-4 w-4 text-primary/50" />
        </div>
        <div className="h-6 w-48 bg-primary/10 rounded-lg" />
      </div>
      <div className="animate-pulse">
        <div className="h-9 w-40 bg-primary/5 rounded-lg" />
      </div>
    </div>

    <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border-primary/10">
      <div className="grid md:grid-cols-7 gap-6 p-6">
        {/* Section analyse LLM (4 colonnes) */}
        <div className="md:col-span-4 space-y-4 animate-pulse">
          <div className="h-4 bg-primary/10 rounded w-3/4" />
          <div className="h-4 bg-primary/5 rounded w-full" />
          <div className="h-4 bg-primary/5 rounded w-5/6" />
          <div className="h-4 bg-primary/5 rounded w-4/5" />
        </div>

        {/* Section image principale (3 colonnes) */}
        <div className="md:col-span-3">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-muted/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-0 p-3 space-y-2 w-full">
              <div className="h-5 bg-white/20 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-full" />
              <div className="h-3 bg-white/10 rounded w-2/3" />
              <div className="flex gap-2 mt-2">
                <div className="h-4 w-20 bg-primary/30 rounded-full" />
                <div className="h-4 w-16 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="flex gap-4">
            <div className="relative h-24 w-32 flex-shrink-0 rounded-md bg-muted/50" />
            <div className="flex flex-col flex-grow gap-2">
              <div className="h-4 bg-primary/10 rounded w-3/4" />
              <div className="h-3 bg-primary/5 rounded w-full" />
              <div className="h-3 bg-primary/5 rounded w-1/2 mt-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export function AnalysisHighlights({ 
  isLoading, 
  onShowResults,
  streamingContent = "",
  results = []
}: AnalysisHighlightsProps) {
  const { t } = useTranslation("common");
  const [showMore, setShowMore] = useState(false);
  
  // Réinitialiser showMore quand les résultats changent
  useEffect(() => {
    setShowMore(false);
  }, [results]);
  
  // Filtrer les résultats pour ne garder que ceux avec des images valides
  const validResults = results.filter(item => 
    item?.thumbnail?.src && 
    typeof item.thumbnail.src === 'string' && 
    item.thumbnail.src.startsWith('http')
  );

  // Si aucun résultat valide et pas de chargement, ne rien afficher
  if (validResults.length === 0 && !isLoading) return null;

  // Afficher le placeholder pendant le chargement
  if (isLoading && !streamingContent) {
    return <LoadingPlaceholder />;
  }

  const mainArticle = validResults[0];
  const secondaryArticles = validResults.slice(1);
  const displayedArticles = showMore ? secondaryArticles : secondaryArticles.slice(0, 3);
  const hasMoreArticles = secondaryArticles.length > 3;

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Lightbulb className="h-4 w-4" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t("analysis.title")}
          </span>
        </h2>
        {onShowResults && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShowResults}
            className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300"
          >
            <Search className="h-4 w-4 mr-2" />
            {t("results.viewAll")}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <MainArticle 
          article={mainArticle} 
          isLoading={isLoading} 
          streamingContent={streamingContent}
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedArticles.map((article) => (
              <SecondaryArticle key={article.url} article={article} />
            ))}
          </div>
          {hasMoreArticles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <Button
                variant="ghost"
                size="sm"
                className="bg-card/50 hover:bg-card/80 backdrop-blur-sm text-primary/80 hover:text-primary transition-all duration-300"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore 
                  ? t("results.seeLess")
                  : t("results.seeMore", { count: secondaryArticles.length - 3 })
                }
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 