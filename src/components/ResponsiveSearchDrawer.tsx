"use client";

import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SearchDrawer } from './SearchDrawer';
import { MobileSearchResults } from './MobileSearchResults';

// Cette interface doit correspondre au format des résultats de recherche
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

interface ResponsiveSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  results?: SearchResult[];
}

export function ResponsiveSearchDrawer({ isOpen, onClose, results = [] }: ResponsiveSearchDrawerProps) {
  // Utilisation du hook pour détecter si on est sur mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Si on est sur mobile, utiliser le composant MobileSearchResults
  if (isMobile) {
    return (
      <MobileSearchResults
        isOpen={isOpen}
        onClose={onClose}
        results={results}
      />
    );
  }

  // Sinon, afficher le drawer latéral classique
  return (
    <SearchDrawer 
      isOpen={isOpen}
      onClose={onClose}
      results={results}
    />
  );
} 