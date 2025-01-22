"use client";

import { SearchResult } from "@/types/search";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!results.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Aucun résultat trouvé. Essayez une autre recherche.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-primary"
              >
                {result.title}
                <ExternalLink className="inline-block ml-1 h-4 w-4" />
              </a>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {result.source || new URL(result.link).hostname}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {result.snippet}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 