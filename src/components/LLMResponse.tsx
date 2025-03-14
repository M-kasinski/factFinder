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
  <div className="animate-pulse space-y-4">
    <div className="flex items-center gap-2">
      <BrainCircuit className="h-5 w-5 text-primary/40" />
      <div className="h-6 w-36 bg-muted-foreground/20 rounded-lg" />
    </div>
    
    <div className="rounded-lg border border-border p-6 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/10 to-transparent" />
      <div className="relative z-10 space-y-3">
        <div className="h-5 bg-muted-foreground/20 rounded-md w-3/4" />
        <div className="h-4 bg-muted-foreground/10 rounded-md w-full" />
        <div className="h-4 bg-muted-foreground/10 rounded-md w-11/12" />
        <div className="h-4 bg-muted-foreground/10 rounded-md w-3/4" />
        <div className="pt-2 space-y-2">
          <div className="h-4 bg-muted-foreground/10 rounded-md w-full" />
          <div className="h-4 bg-muted-foreground/10 rounded-md w-5/6" />
        </div>
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