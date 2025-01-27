"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
// import { SearchResults } from "@/components/SearchResults";
import { LLMResponse } from "@/components/LLMResponse";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDrawer } from "@/components/SearchDrawer";
import { VideoCarousel } from "@/components/VideoCarousel";
import { useEventSource } from "@/hooks/useEventSource";
import { toast } from "sonner";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SourcesComponent from "@/components/SourcesComponent";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  const { results, messages, videos, showVideos, isLoading, error } = useEventSource({
    query: currentQuery,
    enabled: !!currentQuery,
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const newUrl = `/search?q=${encodeURIComponent(query)}`;
    window.history.pushState({}, "", newUrl);
    setCurrentQuery(query);
  };

  useEffect(() => {
    if (error) {
      toast.error("Une erreur est survenue lors de la recherche.");
    }
  }, [error]);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

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
          <SearchBar onSearch={handleSearch} defaultValue={initialQuery} />
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
          {/* <SearchResults
            results={results}
            isLoading={isLoading}
            onClick={() => setIsDrawerOpen(true)}
          /> */}
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
