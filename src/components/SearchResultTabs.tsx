"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Link } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SerpLink } from "./SerpLink";
import { AnalysisHighlights } from "./AnalysisHighlights";
import SourcesComponent from "./SourcesComponent";
import { InstagramResults } from "./InstagramResults";
import { SearchResult } from "@/types/search";

interface SearchResultTabsProps {
  results: SearchResult[];
  isLoading: boolean;
  messages: string;
  streamingContent?: string;
  onTabChange?: (tab: string) => void;
}

export function SearchResultTabs({ 
  results = [], 
  isLoading, 
  messages,
  streamingContent,
  onTabChange
}: SearchResultTabsProps) {
  const [activeTab, setActiveTab] = useState("response");
  const [renderedResults, setRenderedResults] = useState<SearchResult[]>([]);

  // Mise à jour des résultats rendus quand les résultats changent
  useEffect(() => {
    if (results.length > 0) {
      setRenderedResults(results);
    }
  }, [results]);

  // Appeler le callback quand l'onglet change
  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  // Nombre de sources pour l'affichage du badge
  const sourceCount = renderedResults.length;
  
  // Formatage des résultats pour SerpLink
  const formatResult = (result: SearchResult) => {
    return {
      title: result.title,
      url: result.url,
      date: result.date || "",
      description: result.description,
      meta_url: result.meta_url?.favicon ? {
        favicon: result.meta_url.favicon
      } : undefined,
      thumbnail: result.thumbnail?.src ? {
        src: result.thumbnail.src
      } : undefined,
      age: result.age || "",
      onClick: () => window.open(result.url, '_blank')
    };
  };

  return (
    <Tabs 
      defaultValue="response" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-6 bg-card/80 backdrop-blur-sm">
        <TabsTrigger 
          value="response" 
          className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:font-medium"
        >
          <Lightbulb className="h-4 w-4" />
          <span>Réponse</span>
        </TabsTrigger>
        <TabsTrigger 
          value="sources" 
          className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:font-medium"
        >
          <Link className="h-4 w-4" />
          <span>Sources</span>
          {sourceCount > 0 && (
            <span className="ml-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
              {sourceCount}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="response" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-6">
          <AnalysisHighlights
            isLoading={isLoading}
            streamingContent={streamingContent || messages}
            results={results.filter(
              (result) => !result.meta_url?.hostname?.includes("instagram")
            )}
          />
          
          {!isLoading && (
            <>
              <SourcesComponent
                results={results}
                isLoading={isLoading}
                compact={true}
              />
              <InstagramResults
                results={results}
                isVisible={results.length > 0}
              />
            </>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="sources" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="border rounded-lg overflow-hidden bg-card/80 backdrop-blur-sm max-w-5xl mx-auto">
          <div className="p-4 border-b">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Link className="h-4 w-4 text-primary" />
              <span>Toutes les sources ({sourceCount})</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Liste complète des sources trouvées pour votre recherche
            </p>
          </div>
          
          {results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((result, index) => (
                <div 
                  key={result.url || index} 
                  className={`relative border-b last:border-b-0 border-border ${index % 2 === 0 ? 'bg-muted/10' : ''} hover:bg-accent/30 transition-colors group cursor-pointer`}
                  onClick={() => window.open(result.url, '_blank')}
                >
                  <div className="absolute left-4 top-4 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium group-hover:bg-primary/20 transition-colors">
                    {index + 1}
                  </div>
                  <div className="pl-12">
                    <SerpLink
                      {...formatResult(result)}
                      onClick={undefined}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground flex flex-col items-center gap-2">
              <Link className="h-8 w-8 text-muted-foreground/50" />
              <p>Aucun résultat disponible</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
} 