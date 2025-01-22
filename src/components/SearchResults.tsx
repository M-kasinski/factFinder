"use client";

import { SearchResult } from "@/types/search";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClick?: () => void;
}

export function SearchResults({ results, isLoading, onClick }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-6 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-full mt-2" />
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sources</h2>
        <Button variant="outline" size="sm" onClick={onClick}>
          <Search className="h-4 w-4 mr-2" />
          Voir tous les résultats
        </Button>
      </div>
      <div className="space-y-4">
        {results.slice(0, 3).map((result, index) => (
          <Card key={index} className="p-4">
            <h3 className="font-medium text-primary">{result.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{result.source || new URL(result.url).hostname}</span>
              <span>•</span>
              <span>{result.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 