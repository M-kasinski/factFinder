"use client";

import { LLMAnalysis } from "@/types/search";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LLMResponseProps {
  analysis: LLMAnalysis | null;
  isLoading: boolean;
  onShowResults?: () => void;
}

export function LLMResponse({ analysis, isLoading, onShowResults }: LLMResponseProps) {
  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analyse</h2>
        {onShowResults && (
          <Button variant="outline" size="sm" onClick={onShowResults}>
            <Search className="h-4 w-4 mr-2" />
            Voir les sources
          </Button>
        )}
      </div>

      <Card className="p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{analysis.summary}</ReactMarkdown>
          
          {analysis.keyPoints.length > 0 && (
            <>
              <h3>Points clés :</h3>
              <ul>
                {analysis.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Indice de confiance : {Math.round(analysis.confidence * 100)}%
          </div>
        </div>
      </Card>
    </div>
  );
} 