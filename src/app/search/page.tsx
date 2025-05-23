"use client";

import { useEffect, useState, Suspense, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { readStreamableValue } from "ai/rsc";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultTabs } from "@/components/SearchResultTabs";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchSearchResults } from "@/app/actions";
import { SearchResult } from "@/types/search";
import { YouTubeVideoItem } from "@/types/youtube";
import Image from "next/image";
import { SettingsMenu } from "@/components/SettingsMenu";
import { useTranslation } from "react-i18next";
import { QueryIntent } from "@/lib/services/intentDetector";

// Local storage key for position
const SEARCH_BAR_POSITION_KEY = 'searchBarPosition';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation("common");
  const initialQuery = searchParams.get("q") || "";
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [searchValue, setSearchValue] = useState(initialQuery);
  const isSearchingRef = useRef(false);
  const isInitialRenderRef = useRef(true);
  // Conversation thread mode
  const [isThreadMode, setIsThreadMode] = useState(false);

  // États pour stocker les résultats de recherche
  const [results, setResults] = useState<SearchResult[]>([]);
  const [messages, setMessages] = useState("");
  const [videos, setVideos] = useState<SearchResult[]>([]);
  const [showVideos, setShowVideos] = useState(false);
  const [news, setNews] = useState<SearchResult[]>([]);
  const [showNews, setShowNews] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [showRelated, setShowRelated] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideoItem[]>([]);
  const [showYouTube, setShowYouTube] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [detectedIntent, setDetectedIntent] = useState<QueryIntent>('AI_ANSWER');
  const [followUpQuery, setFollowUpQuery] = useState<string | null>(null);
  // State for search bar position
  const [searchBarPosition, setSearchBarPosition] = useState<'top' | 'bottom'>('top');

  // Fonction pour effectuer la recherche avec useCallback
  const performSearch = useCallback(async (query: string, history: { query: string, response: string } | null = null) => {
    if (!query.trim() || isSearchingRef.current) return;

    // Marquer que nous sommes en train de rechercher pour éviter les doublons
    isSearchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Appel à la fonction de recherche avec streaming
      const streamableValue = await fetchSearchResults(query, i18n.language, history);

      // Utiliser readStreamableValue pour lire les mises à jour du streamable
      for await (const update of readStreamableValue(streamableValue)) {
        if (update) {
          // Mettre à jour les états avec les valeurs streamées
          setResults(update.results || []);
          setMessages(update.messages || "");
          setVideos(update.videos || []);
          setShowVideos(update.showVideos || false);
          setNews(update.news || []);
          setShowNews(update.showNews || false);
          setRelatedQuestions(update.relatedQuestions || []);
          setShowRelated(update.showRelated || false);
          setYoutubeVideos(update.youtubeVideos || []);
          setShowYouTube(update.showYouTube || false);
          setFollowUpQuery(update.followUpQuery || null);
          // Mettre à jour l'intention détectée si disponible
          if (update.intentType) {
            setDetectedIntent(update.intentType);
          }

          // Ne mettre isLoading à false que lorsque nous avons à la fois le message et des résultats
          // Cela évite un état transitoire où l'interface est ni en chargement ni avec du contenu
          if (update.messages && update.messages.length > 0) {
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      console.error("Error performing search:", err);
      setError(
        err instanceof Error ? err : new Error("Une erreur est survenue")
      );
      toast.error("Une erreur est survenue lors de la recherche.");
    } finally {
      // S'assurer que isLoading est toujours mis à false à la fin
      setIsLoading(false);
      // Marquer que nous avons terminé la recherche
      isSearchingRef.current = false;
    }
  }, [i18n.language]);

  const handleSearch = (query: string) => {
    if (!query.trim() || query === currentQuery) return;

    // Build history context if in thread mode
    const history = isThreadMode ? { query: currentQuery, response: messages } : null;

    // Reset states before starting the new search
    setResults([]);
    setMessages("");
    setVideos([]);
    setShowVideos(false);
    setNews([]);
    setShowNews(false);
    setRelatedQuestions([]);
    setShowRelated(false);
    setYoutubeVideos([]);
    setShowYouTube(false);
    setError(null);
    setIsLoading(true); // Show loading state immediately
    setFollowUpQuery(null);
    // Réinitialiser l'intention pour la nouvelle recherche (déjà fait avant)
    // setDetectedIntent('AI_ANSWER');

    // Mettre à jour l'URL avec la nouvelle requête
    const newUrl = `/search?q=${encodeURIComponent(query)}`;
    router.push(newUrl);

    // Mettre à jour les états locaux
    setCurrentQuery(query);
    setSearchValue(query);
    // Réinitialiser l'intention pour la nouvelle recherche
    setDetectedIntent('AI_ANSWER');

    // Effectuer la recherche
    performSearch(query, history);
    // Exit thread mode after submitting follow-up
    setIsThreadMode(false);
  };

  useEffect(() => {
    if (error) {
      toast.error("Une erreur est survenue lors de la recherche.");
    }
  }, [error]);

  // Un seul useEffect pour gérer les changements d'URL et la recherche initiale
  useEffect(() => {
    const query = searchParams.get("q") || "";

    // Si c'est le premier rendu et qu'il y a une requête, déclencher la recherche
    if (isInitialRenderRef.current && query) {
      isInitialRenderRef.current = false;
      setCurrentQuery(query);
      setSearchValue(query);
      performSearch(query);
    }
    // Sinon, ne faire la recherche que si la requête est différente de la requête actuelle
    // et si nous ne sommes pas déjà en train de rechercher
    else if (query && query !== currentQuery && !isSearchingRef.current) {
      setCurrentQuery(query);
      setSearchValue(query);
      performSearch(query);
    }
  }, [searchParams, currentQuery, performSearch]);

  // Effect to load search bar position and listen for changes
  useEffect(() => {
    const updatePosition = () => {
      if (typeof window !== 'undefined') {
        const savedPosition = localStorage.getItem(SEARCH_BAR_POSITION_KEY) as 'top' | 'bottom' | null;
        setSearchBarPosition(savedPosition === 'bottom' ? 'bottom' : 'top');
      }
    };
    updatePosition();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SEARCH_BAR_POSITION_KEY && event.newValue) {
         setSearchBarPosition(event.newValue as 'top' | 'bottom');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto px-4 pt-4">
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
           <div className="flex items-center gap-4">
              <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => router.push("/")}
                 className="hover:bg-primary/10 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>

              <div className="flex items-center">
                 <Image
                   src="/spiral_svg.svg"
                   alt="ClaireVue Logo"
                   width={32}
                   height={32}
                 />
                 <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                   ClaireVue
                 </h1>
              </div>
           </div>
           <SettingsMenu />
        </div>
      </div>

      <div className={`flex-grow w-full mx-auto px-4 pt-4 ${searchBarPosition === 'bottom' ? 'pb-4' : 'pb-4'}`}>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full h-full">

          {searchBarPosition === 'top' && (
            <div className="w-full order-1">
              <SearchBar
                onSearch={handleSearch}
                value={searchValue}
                onChange={setSearchValue}
                isThreadMode={isThreadMode}
                onToggleThread={() => setIsThreadMode(prev => !prev)}
                threadAvailable={messages.length > 0}
                showThreadToggle={true}
              />
              {followUpQuery && (
                <p className="mt-2 ml-4 text-sm text-gray-500 dark:text-gray-300">{t("followUpQuery", { query: followUpQuery })}</p>
              )}
            </div>
          )}

          <div className={`w-full ${searchBarPosition === 'top' ? 'order-2 mt-2' : 'order-1 flex-grow'}`}>
            <SearchResultTabs
              results={results}
              isLoading={isLoading}
              messages={messages}
              news={news}
              showNews={isLoading || showNews}
              videos={videos}
              showVideos={isLoading || showVideos}
              relatedQuestions={relatedQuestions}
              showRelated={isLoading || showRelated}
              youtubeVideos={youtubeVideos}
              showYouTube={isLoading || showYouTube}
              onQuestionClick={handleSearch}
              intentType={detectedIntent}
            />
          </div>
        </div>
      </div>

      {/* Search Bar (Bottom Position) - Moved outside main content's max-width */}
      {searchBarPosition === 'bottom' && (
        <div className="sticky bottom-0 bg-background pt-4 pb-[calc(2.2rem+env(safe-area-inset-bottom))] border-t z-10 shadow-up w-full">
          <div className="max-w-3xl mx-auto px-4">
            <SearchBar
              onSearch={handleSearch}
              value={searchValue}
              onChange={setSearchValue}
              isThreadMode={isThreadMode}
              onToggleThread={() => setIsThreadMode(prev => !prev)}
              threadAvailable={messages.length > 0}
              showThreadToggle={true}
            />
            {followUpQuery && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{t("followUpQuery", { query: followUpQuery })}</p>
            )}
          </div>
        </div>
      )}

      {searchBarPosition === 'top' && (
        <div
          className="fixed inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4B9FFF] to-[#E0F7FA] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
