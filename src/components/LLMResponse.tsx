"use client";

import { LLMAnalysis } from "@/types/search";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain } from "lucide-react";
import Markdown from "react-markdown";

interface LLMResponseProps {
  analysis: LLMAnalysis | null;
  isLoading?: boolean;
}

export function LLMResponse({ analysis, isLoading }: LLMResponseProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Brain className="h-5 w-5" />
          Analyse IA
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            Confiance: {Math.round(analysis.confidence * 100)}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <Markdown>{analysis.summary}</Markdown>
        </div>
        
        {analysis.keyPoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Points clés :</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.keyPoints.map((point, index) => (
                <li key={index} className="prose prose-sm dark:prose-invert">
                  <Markdown>{point}</Markdown>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.sources.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Sources :</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.sources.map((source, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 