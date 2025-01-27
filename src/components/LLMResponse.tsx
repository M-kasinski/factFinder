"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LLMResponseProps {
  isLoading: boolean;
  onShowResults?: () => void;
  streamingContent?: string;
}

export function LLMResponse({ 
  isLoading, 
  onShowResults,
  streamingContent = ""
}: LLMResponseProps) {
  if (isLoading && streamingContent.length === 0) {
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
          {streamingContent && <ReactMarkdown>{streamingContent}</ReactMarkdown>}
        </div>
      </Card>
    </div>
  );
} 