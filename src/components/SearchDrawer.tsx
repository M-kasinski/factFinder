"use client";

import React from 'react';
import { X } from 'lucide-react';
import { SerpLink } from './SerpLink';

interface SearchResult {
  title: string;
  url: string;
  date: string;
  description: string;
}

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  results?: SearchResult[];
}

export function SearchDrawer({ isOpen, onClose, results = [] }: SearchDrawerProps) {
  return (
    <div 
      className={`fixed right-0 top-0 h-full bg-background border-l w-[500px] shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ marginLeft: 'auto' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Résultats de recherche</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results list */}
      <div className="divide-y divide-border overflow-auto h-[calc(100vh-64px)]">
        {results.map((result, index) => (
          <SerpLink
            key={index}
            {...result}
            onClick={() => window.open(result.url, '_blank')}
          />
        ))}
      </div>
    </div>
  );
} 