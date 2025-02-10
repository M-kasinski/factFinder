"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { Brain, Zap, Scale, Lightbulb } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="h-screen overflow-hidden">
      <div className="container relative h-full mx-auto px-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-center space-y-4 mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-3 text-primary animate-fade-in">
              <Brain className="h-8 w-8 md:h-12 md:w-12" />
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                FactFinder
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-primary/90 max-w-[600px] mx-auto animate-fade-in-up px-4">
              Make European Search Great Again
            </p>
          </div>

          <div className="w-full max-w-[90%] md:max-w-2xl mx-auto transform transition-all duration-200 hover:scale-105 animate-fade-in-up delay-100 mb-8 md:mb-12">
            <SearchBar
              onSearch={handleSearch}
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto animate-fade-in-up delay-200 px-4">
            <div className="group p-3 md:p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 md:gap-3">
                <Scale className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <p className="text-base md:text-lg font-medium text-primary">
                  Fast, sourced and unbiased answers.
                </p>
              </div>
            </div>
            <div className="group p-3 md:p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <p className="text-base md:text-lg font-medium text-primary">
                  Your search, your truth.
                </p>
              </div>
            </div>
            <div className="group p-3 md:p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 md:gap-3">
                <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <p className="text-base md:text-lg font-medium text-primary">
                  For enlightened and quick search.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </main>
  );
}
