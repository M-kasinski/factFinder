"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  
  // Si aucune recherche n'a été initiée (ni chargement ni contenu), ne rien afficher
  if (!streamingContent && !isLoading) return null;
  
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* <h2 className="text-lg font-semibold flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Lightbulb className="h-4 w-4" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t("tabs.answer")}
          </span>
        </h2> */}
        {onShowResults && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShowResults}
            className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300"
          >
            <Search className="h-4 w-4 mr-2" />
            {t("results.viewMore")}
          </Button>
        )}
      </div>

      {isLoading && !streamingContent ? (
        <div className="rounded-lg border border-border/50 p-6 bg-card/80 backdrop-blur-sm relative overflow-hidden min-h-[150px] group hover:border-primary/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="relative z-10 space-y-3 animate-pulse">
            <div className="h-5 bg-primary/10 rounded-md w-3/4" />
            <div className="h-4 bg-primary/5 rounded-md w-full" />
            <div className="h-4 bg-primary/5 rounded-md w-11/12" />
            <div className="h-4 bg-primary/5 rounded-md w-3/4" />
          </div>
        </div>
      ) : (
        <Card className="p-6 min-h-[150px] bg-card/90 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 group">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {streamingContent ? (
              <ReactMarkdown>{streamingContent}</ReactMarkdown>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-primary/60 text-sm">
                {t("generating")}
              </div>
            )}
          </div>
        </Card>
      )}
    </motion.div>
  );
} 