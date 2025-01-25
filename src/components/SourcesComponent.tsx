import React from 'react';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { SearchResult } from "@/types/search";

interface SourcesComponentProps {
  results: SearchResult[];
  onShowAll: () => void;
  isLoading?: boolean;
}

const SourcesComponent: React.FC<SourcesComponentProps> = ({ 
  results = [], 
  onShowAll,
  isLoading = false 
}) => {
  const visibleSources = results.slice(0, 3);
  const hiddenSources = results.slice(3);

  if (results.length === 0 && !isLoading) return null;

  const getSiteName = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const cardClasses = "shrink-0 w-[210px] sm:w-[180px] md:w-[200px] lg:w-[210px] h-[90px] dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-accent/50 transition-colors";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sources</h2>
      </div>

      <ScrollArea className="w-full relative" type="scroll">
        <div className="flex gap-2 pb-4 px-1 touch-pan-x">
          {visibleSources.map((source, index) => (
            <Card 
              key={index}
              className={cardClasses}
            >
              <CardContent className="p-3 h-full">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="flex items-center gap-2 h-full">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {source.meta_url?.favicon ? (
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
                      ) : null}
                      <Globe className={`h-3 w-3 text-primary ${source.meta_url?.favicon ? 'hidden' : ''}`} />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                      <h3 className="text-xs font-medium line-clamp-2 leading-tight">
                        {source.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="truncate">{source.source || getSiteName(source.url)}</span>
                        <span className="text-muted-foreground/60 flex-shrink-0">•</span>
                        <span className="flex-shrink-0">{source.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}

          {hiddenSources.length > 0 && (
            <Card 
              className={`${cardClasses} cursor-pointer`}
              onClick={onShowAll}
            >
              <CardContent className="p-3 h-full">
                <div className="flex items-center gap-3 h-full">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div className="absolute inset-0">
                      {hiddenSources.slice(0, 3).map((_, index) => (
                        <div
                          key={index}
                          className="absolute w-6 h-6 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center"
                          style={{
                            left: `${index * 4}px`,
                            top: `${index * 2}px`,
                            zIndex: 3 - index,
                          }}
                        >
                          {hiddenSources[index].meta_url?.favicon ? (
                            <Image
                              src={hiddenSources[index].meta_url.favicon}
                              alt={`${hiddenSources[index].source || getSiteName(hiddenSources[index].url)} favicon`}
                              width={12}
                              height={12}
                              className="h-3 w-3 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <Globe className={`h-3 w-3 text-primary ${hiddenSources[index].meta_url?.favicon ? 'hidden' : ''}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-xs font-medium">
                      +{hiddenSources.length} sources
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Voir tous les résultats
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0 sm:opacity-100" />
      </ScrollArea>
    </div>
  );
};

export default SourcesComponent; 