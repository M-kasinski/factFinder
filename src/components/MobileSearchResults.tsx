"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { SerpLink } from "./SerpLink";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export interface SearchResult {
  title: string;
  url: string;
  date: string;
  description: string;
  meta_url?: {
    favicon?: string;
    hostname?: string;
  };
  profile?: {
    name?: string;
  };
  thumbnail?: {
    src?: string;
  };
  source?: string;
}

interface MobileSearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  results?: SearchResult[];
}

export function MobileSearchResults({ isOpen, onClose, results = [] }: MobileSearchResultsProps) {
  // État local pour contrôler le drawer
  const [open, setOpen] = useState(false);

  // Supprimer l'effet useEffect qui empêche la propagation du scroll
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Gérer la fermeture du drawer
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Formater les résultats pour SerpLink
  const formatResult = (result: SearchResult) => {
    return {
      title: result.title,
      url: result.url,
      date: result.date || "",
      description: result.description,
      meta_url: result.meta_url?.favicon ? {
        favicon: result.meta_url.favicon
      } : undefined,
      profile: result.profile?.name ? {
        name: result.profile.name
      } : undefined,
      thumbnail: result.thumbnail?.src ? {
        src: result.thumbnail.src
      } : undefined,
      onClick: () => window.open(result.url, '_blank')
    };
  };

  const hasResults = Array.isArray(results) && results.length > 0;

  // Style CSS pour isoler le drawer du reste de la page
  const drawerStyles = `
    [vaul-drawer] {
      position: fixed !important;
      z-index: 50;
      isolation: isolate;
    }
    [vaul-drawer-content] {
      position: fixed !important;
      max-height: 85vh !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      transform: none !important;
    }
    .drawer-inner-content {
      position: relative !important;
      max-height: calc(85vh - 5rem) !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch;
    }
  `;

  return (
    <>
      <style jsx global>{drawerStyles}</style>
      <div className="md:hidden">
        <Drawer
          open={open && hasResults}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
            if (!newOpen) onClose();
          }}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerHeader className="border-b sticky top-0 bg-background z-10">
              <div className="flex items-center justify-between">
                <DrawerTitle>Résultats ({results.length})</DrawerTitle>
                <DrawerClose asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full" 
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Liste des sources trouvées pour votre recherche
              </p>
            </DrawerHeader>
            <div className="drawer-inner-content">
              {hasResults ? (
                <div className="divide-y divide-border">
                  {results.map((result, index) => (
                    <SerpLink
                      key={result.url || index}
                      {...formatResult(result)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                  <p>Aucun résultat disponible</p>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
} 