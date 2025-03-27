/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState, useEffect, useCallback } from "react";
import { readStreamableValue } from "ai/rsc";
import { fetchYouTubeResults } from "@/app/actions";
import {
  Lightbulb,
  Link,
  Search,
  Image,
  Newspaper,
  MessageSquare,
  VideoIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SerpLink } from "./SerpLink";
import { AnalysisHighlights } from "./AnalysisHighlights";
import SourcesComponent from "./SourcesComponent";
import { InstagramResults } from "./InstagramResults";
import { SearchResult } from "@/types/search";
import { LLMResponse } from "./LLMResponse";
import { NewsHighlights } from "./NewsHighlights";
import { VideoCarousel } from "./VideoCarousel";
import { RelatedQuestions } from "./RelatedQuestions";
import YouTubeResults from "./YouTubeResults";
import { YouTubeVideoItem } from "@/types/youtube";

interface SearchResultTabsProps {
  results: SearchResult[];
  isLoading: boolean;
  messages: string;
  streamingContent?: string;
  onTabChange?: (tab: string) => void;
  news?: SearchResult[];
  showNews?: boolean;
  videos?: SearchResult[];
  showVideos?: boolean;
  relatedQuestions?: string[];
  showRelated?: boolean;
  youtubeVideos?: YouTubeVideoItem[];
  showYouTube?: boolean;
  onQuestionClick?: (query: string) => void;
  activeTab?: string;
}

export function SearchResultTabs({
  results = [],
  isLoading,
  messages,
  streamingContent,
  onTabChange,
  news = [],
  showNews = false,
  videos = [],
  showVideos = false,
  relatedQuestions = [],
  showRelated = false,
  youtubeVideos = [],
  showYouTube = false,
  onQuestionClick,
  activeTab = "response",
}: SearchResultTabsProps) {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);

  // États pour les vidéos YouTube
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [localYoutubeVideos, setLocalYoutubeVideos] = useState<
    YouTubeVideoItem[]
  >(youtubeVideos);
  const [loadingYoutube, setLoadingYoutube] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const [renderedResults, setRenderedResults] = useState<SearchResult[]>([]);

  // Mise à jour des résultats rendus quand les résultats changent
  useEffect(() => {
    if (results.length > 0) {
      setRenderedResults(results);
    }
  }, [results]);

  // Mettre à jour la requête actuelle quand les résultats changent
  useEffect(() => {
    if (results.length > 0 && results[0].query) {
      setCurrentQuery(results[0].query);
    }
  }, [results]);

  // Mise à jour des vidéos YouTube quand elles changent
  useEffect(() => {
    if (youtubeVideos.length > 0) {
      setLocalYoutubeVideos(youtubeVideos);
      setYoutubeLoaded(showYouTube);
    }
  }, [youtubeVideos, showYouTube]);

  // Mettre à jour l'onglet local si la prop activeTab change
  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);

  // Fonction pour charger les vidéos YouTube
  const loadYouTubeVideos = useCallback(async () => {
    if (!currentQuery || loadingYoutube || youtubeLoaded) return;

    setLoadingYoutube(true);

    try {
      const streamableValue = await fetchYouTubeResults(currentQuery);

      // Lire les mises à jour du streamable
      for await (const update of readStreamableValue(streamableValue)) {
        if (update) {
          setLocalYoutubeVideos(update.videos || []);
          setLoadingYoutube(update.loading);
        }
      }

      setYoutubeLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos YouTube:", error);
      setLoadingYoutube(false);
    }
  }, [currentQuery, loadingYoutube, youtubeLoaded]);

  // Gérer le changement d'onglet
  const handleTabChange = useCallback(
    (tab: string) => {
      setLocalActiveTab(tab);

      // Si on active l'onglet YouTube et que les vidéos n'ont pas encore été chargées
      if (tab === "youtube" && !youtubeLoaded && !loadingYoutube) {
        loadYouTubeVideos();
      }

      // Appeler le callback externe si disponible
      if (onTabChange) {
        onTabChange(tab);
      }
    },
    [onTabChange, youtubeLoaded, loadingYoutube, loadYouTubeVideos]
  );

  // Nombre de sources pour l'affichage du badge
  const sourceCount = renderedResults.length;

  // Formatage des résultats pour SerpLink
  const formatResult = (result: SearchResult) => {
    return {
      title: result.title,
      url: result.url,
      date: result.date || "",
      description: result.description,
      meta_url: result.meta_url?.favicon
        ? {
            favicon: result.meta_url.favicon,
          }
        : undefined,
      thumbnail: result.thumbnail?.src
        ? {
            src: result.thumbnail.src,
          }
        : undefined,
      age: result.age || "",
      onClick: () => window.open(result.url, "_blank"),
    };
  };

  return (
    <Tabs
      defaultValue="response"
      value={localActiveTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="flex w-full justify-start space-x-6 border-b border-border bg-transparent p-0 shadow-none overflow-x-auto overflow-y-hidden no-scrollbar">
        <TabsTrigger
          value="response"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative"
        >
          <Lightbulb className="h-4 w-4" />
          <span>IA</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "response" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="answer"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Réponse</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "answer" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="sources"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative"
        >
          <Search className="h-4 w-4" />
          <span>Sources</span>
          {sourceCount > 0 && (
            <span className="ml-1 text-xs text-muted-foreground">
              ({sourceCount})
            </span>
          )}
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "sources" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="youtube"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative"
        >
          <VideoIcon className="h-4 w-4" />
          <span>YouTube</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "youtube" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="images"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none opacity-60 cursor-not-allowed pointer-events-none"
          disabled
        >
          <Image className="h-4 w-4" />
          <span>Images</span>
        </TabsTrigger>

        <TabsTrigger
          value="news"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none opacity-60 cursor-not-allowed pointer-events-none"
          disabled
        >
          <Newspaper className="h-4 w-4" />
          <span>Actualités</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="response"
        className="mt-6 focus-visible:outline-none focus-visible:ring-0"
      >
        <div className="space-y-8">
          <AnalysisHighlights
            isLoading={isLoading}
            streamingContent={streamingContent || messages}
            results={results.filter(
              (result) => !result.meta_url?.hostname?.includes("instagram")
            )}
          />

          {!isLoading && (
            <>
              <InstagramResults
                results={results}
                isVisible={results.length > 0}
              />

              <NewsHighlights news={news} isVisible={showNews} />

              <VideoCarousel videos={videos} isVisible={showVideos} />

              <RelatedQuestions
                questions={relatedQuestions}
                isVisible={showRelated}
                onQuestionClick={onQuestionClick || (() => {})}
              />
            </>
          )}
        </div>
      </TabsContent>

      <TabsContent
        value="answer"
        className="mt-6 focus-visible:outline-none focus-visible:ring-0"
      >
        <div className="space-y-8">
          <SourcesComponent
            results={results}
            isLoading={isLoading}
            onShowAll={() => setLocalActiveTab("sources")}
          />

          <LLMResponse
            isLoading={isLoading}
            streamingContent={streamingContent || messages}
          />
        </div>
      </TabsContent>

      <TabsContent
        value="sources"
        className="mt-6 focus-visible:outline-none focus-visible:ring-0"
      >
        <div>
          <div className="flex flex-col mb-4">
            <p className="text-xs text-muted-foreground">
              {sourceCount} résultats trouvés pour votre recherche
            </p>
          </div>

          {results.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.url || index}
                  className="relative group cursor-pointer"
                  onClick={() => window.open(result.url, "_blank")}
                >
                  <SerpLink {...formatResult(result)} onClick={undefined} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
              <Link className="h-8 w-8 text-muted-foreground/50" />
              <p>Aucun résultat disponible</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent
        value="youtube"
        className="mt-6 focus-visible:outline-none focus-visible:ring-0"
      >
        <YouTubeResults
          videos={youtubeLoaded ? localYoutubeVideos : []}
          isLoading={loadingYoutube}
        />
      </TabsContent>
    </Tabs>
  );
}
