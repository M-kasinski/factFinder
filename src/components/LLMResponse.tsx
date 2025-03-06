"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BrainCircuit } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LLMResponseProps {
  isLoading: boolean;
  onShowResults?: () => void;
  streamingContent?: string;
}

// Skeleton loader pour la réponse LLM
const LLMResponseSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-2 mb-4">
      <BrainCircuit className="h-5 w-5 text-primary/50" />
      <div className="h-6 w-36 bg-muted-foreground/20 rounded-lg" />
    </div>
    
    <div className="space-y-3 pl-8 border-l-2 border-primary/30">
      <div className="h-4 bg-muted-foreground/10 rounded w-full" />
      <div className="h-4 bg-muted-foreground/10 rounded w-full" />
      <div className="h-4 bg-muted-foreground/10 rounded w-11/12" />
      <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-muted-foreground/10 rounded w-full" />
        <div className="h-4 bg-muted-foreground/10 rounded w-5/6" />
      </div>
    </div>
  </div>
);

export function LLMResponse({ 
  isLoading, 
  onShowResults,
  streamingContent = ""
}: LLMResponseProps) {
  // Si pas de contenu et pas en chargement, ne rien afficher
  if (!streamingContent && !isLoading) return null;
  
  // Afficher le skeleton loader pendant le chargement si pas de contenu en streaming
  if (isLoading && !streamingContent) {
    return <LLMResponseSkeleton />;
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