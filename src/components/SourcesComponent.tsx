"use client";
import React from 'react';
import { Globe, LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import type { SearchResult } from "@/types/search";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SourcesComponentProps {
  results: SearchResult[];
  onShowAll?: () => void;
  isLoading?: boolean;
}

// Fonction utilitaire pour obtenir le nom du site à partir d'une URL
const getSiteName = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

// Composant mémorisé pour le favicon d'une source
const SourceFavicon = React.memo(({ source }: { source: SearchResult }) => {
  if (!source.meta_url?.favicon) {
    return <Globe className="h-3 w-3 text-primary" />;
  }

  return (
    <>
      <Image
        src={source.meta_url.favicon}
        alt={`${source.source || getSiteName(source.url)} favicon`}
        width={12}
        height={12}
        className="h-3 w-3 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <Globe className="h-3 w-3 text-primary hidden" />
    </>
  );
});
SourceFavicon.displayName = 'SourceFavicon';

// Composant mémorisé pour une carte source individuelle
const SourceCard = React.memo(({ source, cardClasses }: { source: SearchResult, cardClasses: string }) => (
  <Card className={cardClasses}>
    <CardContent className="p-2 h-full">
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="flex items-start gap-2 h-full">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <SourceFavicon source={source} />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-between h-full mt-1">
            <h3 className="text-xs font-medium line-clamp-2 leading-tight">
              {source.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1">
              <span className="truncate">{source.source || getSiteName(source.url)}</span>
              <span className="text-muted-foreground/60 flex-shrink-0">•</span>
              <span className="flex-shrink-0">{source.date}</span>
            </div>
          </div>
        </div>
      </a>
    </CardContent>
  </Card>
));
SourceCard.displayName = 'SourceCard';

// Composant mémorisé pour les sources supplémentaires (carte +X sources)
const MoreSourcesCard = React.memo(({ 
  hiddenSources, 
  cardClasses, 
  onShowAll 
}: { 
  hiddenSources: SearchResult[], 
  cardClasses: string, 
  onShowAll: () => void 
}) => {
  const { t } = useTranslation("common");
  
  return (
    <Card 
      className={`${cardClasses} cursor-pointer hover:bg-primary/5 transition-colors`}
      onClick={onShowAll}
    >
      <CardContent className="p-2 h-full">
        <div className="flex items-start gap-3 h-full">
          <div className="relative w-5 h-5 flex-shrink-0 mt-1">
            <div className="absolute inset-0">
              {hiddenSources.slice(0, 3).map((source, index) => (
                <div
                  key={source.url}
                  className="absolute w-5 h-5 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center"
                  style={{
                    left: `${index * 3}px`,
                    top: `${index * 2}px`,
                    zIndex: 3 - index,
                  }}
                >
                  <SourceFavicon source={source} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-xs font-medium mt-1 text-foreground">
              +{hiddenSources.length} sources
            </p>
            <p className="text-[10px] text-primary/70">
              {t("results.viewMore")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
MoreSourcesCard.displayName = 'MoreSourcesCard';

// Skeleton loader pour les sources
const SourcesSkeleton = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-full bg-primary/10">
        <LinkIcon className="h-3.5 w-3.5 text-primary/70" />
      </div>
      <div className="h-6 w-28 bg-primary/10 rounded-lg animate-pulse" />
    </div>
    
    {/* --- Desktop Skeleton --- */}
    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {[...Array(4)].map((_, index) => (
        <div 
          key={`desktop-skeleton-${index}`}
          className="animate-pulse w-full h-[70px] border border-primary/10 rounded-lg bg-card/70 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="p-2 h-full flex flex-col relative z-10">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5" />
              <div className="h-4 bg-primary/10 rounded-md w-3/4" />
            </div>
            <div className="mt-2 flex-1">
              <div className="h-3 bg-primary/5 rounded-md w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* --- Mobile Skeleton --- */}
    <div className="sm:hidden w-full overflow-hidden">
      <div className="flex space-x-3 pb-2">
        {[...Array(3)].map((_, index) => (
          <div 
            key={`mobile-skeleton-${index}`}
            className="animate-pulse w-[200px] h-[70px] border border-primary/10 rounded-lg bg-card/70 backdrop-blur-sm relative overflow-hidden flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
            <div className="p-2 h-full flex flex-col relative z-10">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5" />
                <div className="h-4 bg-primary/10 rounded-md w-3/4" />
              </div>
              <div className="mt-2 flex-1">
                <div className="h-3 bg-primary/5 rounded-md w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SourcesComponent: React.FC<SourcesComponentProps> = React.memo(({ 
  results = [], 
  onShowAll,
  isLoading = false
}) => {
  // const { t } = useTranslation("common");
  
  // Afficher le skeleton loader pendant le chargement
  if (isLoading) {
    return <SourcesSkeleton />;
  }
  
  // Masquer le composant s'il n'y a pas de résultats
  if (!results?.length) return null;
  
  // Calculer les sources uniques en se basant sur l'hostname des URL
  const domains = results
    .map(result => result.meta_url?.hostname)
    .filter(Boolean) as string[];
  
  // Compter les occurrences de chaque domaine
  const domainCounts = domains.reduce((acc, domain) => {
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Trier les domaines par nombre d'occurrences
  const sortedDomains = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([domain, count]) => ({ domain, count }));
  
  // Ne rien afficher s'il n'y a pas de domaines uniques
  if (!sortedDomains.length) return null;

  // Toujours afficher exactement 3 sources + bouton voir plus
  const maxVisible = 3;
  const visibleSources = results.slice(0, maxVisible);
  const hiddenSources = results.slice(maxVisible);

  // Utiliser une largeur fixe pour chaque carte, qui s'adapte à la taille de l'écran
  const cardClasses = "h-[70px] backdrop-blur-sm bg-card/80 hover:bg-card transition-colors border-primary/10 hover:border-primary/20";
  // Classes spécifiques pour les cartes dans le slider mobile
  const mobileCardClasses = `${cardClasses} w-[200px] flex-shrink-0`; 
  // Classes spécifiques pour les cartes dans la grille desktop
  const desktopCardClasses = `${cardClasses} w-full`;

  // Fonction pour rediriger vers l'onglet Sources
  const handleShowMore = () => {
    if (onShowAll) {
      onShowAll();
    }
  };

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-primary/10">
          <LinkIcon className="h-3.5 w-3.5 text-primary/70" />
        </div>
        <h2 className="text-base font-semibold">{t("tabs.sources")}</h2>
      </div> */}
      
      {/* --- Desktop Grid --- */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {visibleSources.map((source, index) => (
          <motion.div
            key={source.url + '-desktop'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            <SourceCard source={source} cardClasses={desktopCardClasses} />
          </motion.div>
        ))}
        
        {hiddenSources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + visibleSources.length * 0.05 }}
          >
            <MoreSourcesCard 
              hiddenSources={hiddenSources} 
              cardClasses={desktopCardClasses} 
              onShowAll={handleShowMore} 
            />
          </motion.div>
        )}
      </div>

      {/* --- Mobile Slider --- */}
      <div className="sm:hidden w-full overflow-x-auto pb-2">
        <div className="flex space-x-3">
          {visibleSources.map((source, index) => (
            <motion.div
              key={source.url + '-mobile'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="flex-shrink-0" // Important pour que motion.div ne force pas la largeur
            >
              <SourceCard source={source} cardClasses={mobileCardClasses} />
            </motion.div>
          ))}
          
          {hiddenSources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + visibleSources.length * 0.05 }}
              className="flex-shrink-0" // Important pour que motion.div ne force pas la largeur
            >
              <MoreSourcesCard 
                hiddenSources={hiddenSources} 
                cardClasses={mobileCardClasses} 
                onShowAll={handleShowMore} 
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

SourcesComponent.displayName = 'SourcesComponent';

export default SourcesComponent; 