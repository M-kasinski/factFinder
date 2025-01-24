"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { LLMResponse } from "@/components/LLMResponse";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDrawer } from "@/components/SearchDrawer";
import { performSearch } from "@/lib/search-service";
import type { SearchState } from "@/types/search";
import { toast } from "sonner";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SourcesComponent from "@/components/SourcesComponent";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    results: [],
    llmResponse: null,
  });

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    // Update URL with new search query
    const newUrl = `/search?q=${encodeURIComponent(query)}`;
    window.history.pushState({}, "", newUrl);

    setSearchState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const response = await performSearch(query);
      
      setSearchState({
        isLoading: false,
        results: response.results,
        llmResponse: response.llmAnalysis,
      });

      if (response.results.length === 0) {
        toast.info("Aucun résultat trouvé pour cette recherche.");
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: "Une erreur est survenue lors de la recherche.",
      }));
      toast.error("Une erreur est survenue lors de la recherche.");
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className={`container mx-auto px-4 transition-all duration-300 ${isDrawerOpen ? 'pr-[520px]' : ''}`}>
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
          <SearchBar onSearch={handleSearch} defaultValue={initialQuery} />
        </div>

        <div className="mt-8 space-y-6 max-w-4xl">
          <SourcesComponent 
            results={searchState.results}
            isLoading={searchState.isLoading}
            onShowAll={() => setIsDrawerOpen(true)}
          />
          <LLMResponse
            analysis={searchState.llmResponse}
            isLoading={searchState.isLoading}
            onShowResults={() => setIsDrawerOpen(true)}
          />
          <SearchResults
            results={searchState.results}
            isLoading={searchState.isLoading}
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
      </div>

      <SearchDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        results={searchState.results}
      />

      <div className="fixed inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
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