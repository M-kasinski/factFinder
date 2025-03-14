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

export function LLMResponse({ 
  isLoading, 
  onShowResults,
  streamingContent = ""
}: LLMResponseProps) {
  // Si aucune recherche n'a été initiée (ni chargement ni contenu), ne rien afficher
  if (!streamingContent && !isLoading) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Analyse
        </h2>
        {onShowResults && (
          <Button variant="outline" size="sm" onClick={onShowResults}>
            <Search className="h-4 w-4 mr-2" />
            Voir les sources
          </Button>
        )}
      </div>

      {isLoading && !streamingContent ? (
        <div className="rounded-lg border border-border p-6 bg-muted relative overflow-hidden min-h-[150px]">
          <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/10 to-transparent" />
          <div className="relative z-10 space-y-3 animate-pulse">
            <div className="h-5 bg-muted-foreground/20 rounded-md w-3/4" />
            <div className="h-4 bg-muted-foreground/10 rounded-md w-full" />
            <div className="h-4 bg-muted-foreground/10 rounded-md w-11/12" />
            <div className="h-4 bg-muted-foreground/10 rounded-md w-3/4" />
            {/* <div className="pt-2 space-y-2">
              <div className="h-4 bg-muted-foreground/10 rounded-md w-full" />
              <div className="h-4 bg-muted-foreground/10 rounded-md w-5/6" />
            </div> */}
          </div>
        </div>
      ) : (
        <Card className="p-6 min-h-[150px]">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {streamingContent ? (
              <ReactMarkdown>{streamingContent}</ReactMarkdown>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                Génération de l&apos;analyse en cours...
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 