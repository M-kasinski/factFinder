"use client";

import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { Brain } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container relative mx-auto px-4">
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 py-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-primary">
            <Brain className="h-12 w-12" />
            <h1 className="text-6xl font-bold tracking-tighter">
              FactFinder
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Explorez l&apos;actualité européenne avec précision et intelligence
          </p>
        </div>
        
        <div className="w-full max-w-2xl mx-auto scale-105 transform transition-all duration-200 hover:scale-110">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
}
