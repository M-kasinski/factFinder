"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { readStreamableValue } from "ai/rsc";
import { fetchYouTubeResults, fetchImageResults } from "@/app/actions";
import { ImageSearchResult } from "@/lib/services/braveImageSearch";
import {
  Lightbulb,
  Link,
  Image as ImageIcon,
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
import { Trans, useTranslation } from "react-i18next";
import { ImageGallery } from "./ImageGallery";
import { QueryIntent } from "@/lib/services/intentDetector";

// Définir les valeurs possibles pour les onglets UI
type UITab = "response" | "answer" | "sources" | "images" | "videos";

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
  intentType?: QueryIntent;
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
  intentType,
}: SearchResultTabsProps) {
  const { t, i18n } = useTranslation("common");
  const [localActiveTab, setLocalActiveTab] = useState<UITab>("response");
  const initialTabSetForQuery = useRef<string | null>(null); // Ref pour savoir si on a déjà défini l'onglet pour la requête actuelle

  // États pour les vidéos YouTube
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [localYoutubeVideos, setLocalYoutubeVideos] =
    useState<YouTubeVideoItem[]>(youtubeVideos);
  const [loadingYoutube, setLoadingYoutube] = useState(false);

  // États pour les images
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [localImageResults, setLocalImageResults] = useState<
    ImageSearchResult[]
  >([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [currentQuery, setCurrentQuery] = useState("");

  const [renderedResults, setRenderedResults] = useState<SearchResult[]>([]);

  // Mise à jour des résultats rendus quand les résultats changent
  useEffect(() => {
    if (results.length > 0) {
      setRenderedResults(results);
    }
  }, [results]);

  // Mise à jour des vidéos YouTube quand elles changent
  useEffect(() => {
    if (youtubeVideos.length > 0) {
      setLocalYoutubeVideos(youtubeVideos);
      setYoutubeLoaded(showYouTube);
    }
  }, [youtubeVideos, showYouTube]);

  // Reset YouTube and Image state when the query changes
  useEffect(() => {
    const newQuery = results[0]?.query;
    if (results.length > 0 && newQuery && newQuery !== currentQuery) {
      setYoutubeLoaded(false);
      setLocalYoutubeVideos([]); // Clear previous videos
      setImagesLoaded(false); // Reset image loaded state
      setLocalImageResults([]); // Clear previous images
      setCurrentQuery(newQuery);
    }
  }, [currentQuery, results]);

  // NOUVEAU/MODIFIÉ: useEffect pour définir l'onglet initial basé sur intentType
  useEffect(() => {
    // Obtenir la query associée aux résultats actuels
    const queryFromResults = results[0]?.query;

    // Condition : Avoir une intention, une query associée aux résultats,
    // ET cette query doit être différente de celle pour laquelle on a déjà défini l'onglet.
    if (
      intentType &&
      queryFromResults &&
      initialTabSetForQuery.current !== queryFromResults
    ) {
      let targetTab: UITab = "response"; // Onglet par défaut

      switch (intentType) {
        case "DIRECT_SOURCE":
          targetTab = "sources";
          break;
        case "ANSWER":
          // Pour les questions, montrer l'onglet answer qui contient la réponse LLM
          targetTab = "answer";
          break;
        case "AI_ANSWER":
        default:
          // Pour une réponse IA standard
          targetTab = "response";
          break;
      }

      console.log(
        `[Initial Tab Setter] Query: "${queryFromResults}", Intent: ${intentType} -> Setting initial tab: ${targetTab}`
      );
      setLocalActiveTab(targetTab); // Définir l'état local
      initialTabSetForQuery.current = queryFromResults; // Mémoriser qu'on l'a fait pour cette query
    }
  }, [intentType, results]);

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

  // Nouvelle fonction pour charger les images
  const loadImageResults = useCallback(async () => {
    if (!currentQuery || loadingImages || imagesLoaded) return;

    setLoadingImages(true);

    try {
      const streamableValue = await fetchImageResults(
        currentQuery,
        i18n.language
      ); // Passer la langue

      // Lire les mises à jour du streamable
      for await (const update of readStreamableValue(streamableValue)) {
        if (update) {
          setLocalImageResults(update.images || []);
          setLoadingImages(update.loading);
        }
      }
      setImagesLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des résultats d'images:", error);
      // Gérer l'erreur, par exemple afficher un message
      setLoadingImages(false); // S'assurer que le chargement s'arrête en cas d'erreur
    }
  }, [currentQuery, loadingImages, imagesLoaded, i18n.language]);

  // Gérer le changement d'onglet
  const handleTabChange = useCallback(
    (tab: string) => {
      // S'assurer que la valeur est bien du type UITab
      const newTab = tab as UITab;
      setLocalActiveTab(newTab);
      initialTabSetForQuery.current = null; // Réinitialiser la ref pour permettre la sélection auto sur la prochaine nouvelle requête

      // Charger YouTube si nécessaire
      if (tab === "videos" && !youtubeLoaded && !loadingYoutube) {
        loadYouTubeVideos();
      }
      // Charger les Images si nécessaire
      else if (tab === "images" && !imagesLoaded && !loadingImages) {
        loadImageResults();
      }

      // Appeler le callback externe si disponible
      if (onTabChange) {
        onTabChange(tab);
      }
    },
    [
      onTabChange,
      youtubeLoaded,
      loadingYoutube,
      loadYouTubeVideos,
      imagesLoaded,
      loadingImages,
      loadImageResults,
    ]
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

  // Détermine si l'onglet image doit être activé (s'il y a une query)
  const canShowImageTab = !!currentQuery;

  return (
    <Tabs
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
          <span>{t("tabs.answer")}</span>
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
          <span>{t("tabs.response")}</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "answer" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="sources"
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative"
        >
          <Link className="h-4 w-4" />
          <span>{t("tabs.sources")}</span>
          {sourceCount > 0 && (
            <div className="ml-1 flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {sourceCount}
            </div>
          )}
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "sources" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="images"
          disabled={!canShowImageTab}
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative disabled:opacity-50"
        >
          <ImageIcon className="h-4 w-4" />
          <span>{t("tabs.images")}</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "images" ? "active" : "inactive"}
          ></div>
        </TabsTrigger>
        <TabsTrigger
          value="videos"
          disabled={!showVideos && !showYouTube && !currentQuery}
          className="flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none relative disabled:opacity-50"
        >
          <VideoIcon className="h-4 w-4" />
          <span>{t("tabs.videos")}</span>
          <div
            className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm transform origin-left transition-transform duration-200 ease-out data-[state=inactive]:scale-x-0 data-[state=active]:scale-x-100"
            data-state={localActiveTab === "videos" ? "active" : "inactive"}
          ></div>
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
        <div className="space-y-4">
          <LLMResponse
            isLoading={isLoading}
            streamingContent={streamingContent || messages}
          />
          <SourcesComponent
            results={results}
            isLoading={isLoading}
            onShowAll={() => setLocalActiveTab("sources")}
          />
        </div>
        <div className="mt-8">
          <RelatedQuestions
            questions={relatedQuestions}
            isVisible={showRelated}
            onQuestionClick={onQuestionClick || (() => {})}
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
              <Trans
                i18nKey="results.resultsFound"
                values={{ count: sourceCount }}
              />
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
              <p>{t("results.noResults")}</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent
        value="images"
        className="mt-6 focus-visible:outline-none focus-visible:ring-0"
      >
        <ImageGallery images={localImageResults} isLoading={loadingImages} />
      </TabsContent>

      <TabsContent
        value="videos"
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
