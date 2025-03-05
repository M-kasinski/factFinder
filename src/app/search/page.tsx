"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { readStreamableValue } from "ai/rsc";
import { SearchBar } from "@/components/SearchBar";
import { LLMResponse } from "@/components/LLMResponse";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDrawer } from "@/components/SearchDrawer";
import { VideoCarousel } from "@/components/VideoCarousel";
import { RelatedQuestions } from "@/components/RelatedQuestions";
import { toast } from "sonner";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SourcesComponent from "@/components/SourcesComponent";
import { fetchSearchResults } from "@/app/actions";
import { SearchResult } from "@/types/search";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [searchValue, setSearchValue] = useState(initialQuery);
  
  // États pour stocker les résultats de recherche
  const [results, setResults] = useState<SearchResult[]>([]);
  const [messages, setMessages] = useState("");
  const [videos, setVideos] = useState<SearchResult[]>([]);
  const [showVideos, setShowVideos] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [showRelated, setShowRelated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fonction pour effectuer la recherche
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Appel à la fonction de recherche avec streaming
      const streamableValue = await fetchSearchResults(query);
      
      // Utiliser readStreamableValue pour lire les mises à jour du streamable
      for await (const update of readStreamableValue(streamableValue)) {
        if (update) {
          // Mettre à jour les états avec les valeurs streamées
          setResults(update.results || []);
          setMessages(update.messages || "");
          setVideos(update.videos || []);
          setShowVideos(update.showVideos || false);
          setRelatedQuestions(update.relatedQuestions || []);
          setShowRelated(update.showRelated || false);
          
          // Si nous avons des résultats, la recherche n'est plus en cours de chargement
          if (update.results && update.results.length > 0) {
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      console.error("Error performing search:", err);
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"));
      toast.error("Une erreur est survenue lors de la recherche.");
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // Mettre à jour l'URL avec la nouvelle requête
    const newUrl = `/search?q=${encodeURIComponent(query)}`;
    router.push(newUrl);
    
    // Mettre à jour les états locaux
    setCurrentQuery(query);
    setSearchValue(query);
    
    // Effectuer la recherche
    performSearch(query);
  };

  useEffect(() => {
    if (error) {
      toast.error("Une erreur est survenue lors de la recherche.");
    }
  }, [error]);

  // Écouter les changements de l'URL pour les requêtes externes
  useEffect(() => {
    const query = searchParams.get("q");
    if (query && query !== currentQuery) {
      setCurrentQuery(query);
      setSearchValue(query);
      performSearch(query);
    }
  }, [searchParams]);

  // Effectuer la recherche initiale si une requête est présente
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, []);

  return (
    <div
      className={`container mx-auto px-4 transition-all duration-300 ${
        isDrawerOpen ? "pr-[520px]" : ""
      }`}
    >
      <div className="flex flex-col gap-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="hover:bg-accent rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tighter">
                FactFinder
              </h1>
            </div>
          </div>

          <ThemeToggle />
        </div>

        <div className="w-full max-w-2xl">
          <SearchBar 
            onSearch={handleSearch} 
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <div className="mt-8 space-y-6 max-w-4xl">
          <SourcesComponent
            results={results}
            isLoading={isLoading}
            onShowAll={() => setIsDrawerOpen(true)}
          />
          <LLMResponse
            isLoading={isLoading}
            onShowResults={() => setIsDrawerOpen(true)}
            streamingContent={messages}
          />
          <VideoCarousel videos={videos} isVisible={showVideos} />
          <RelatedQuestions 
            questions={relatedQuestions} 
            isVisible={showRelated}
            onQuestionClick={handleSearch}
          />
        </div>
      </div>

      <SearchDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        results={results}
      />

      <div
        className="fixed inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
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
