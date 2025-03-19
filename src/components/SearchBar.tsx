"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

// const suggestions = [
//   "Actualités UE",
//   "Politique européenne",
//   "Commission européenne",
//   "Parlement européen"
// ];

export function SearchBar({ onSearch, value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  // const handleSuggestionClick = (suggestion: string) => {
  //   setQuery(suggestion);
  //   onSearch(suggestion);
  // };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className={`relative rounded-full border backdrop-blur-sm ${
          isFocused 
            ? 'border-primary shadow-lg ring-2 ring-primary/20' 
            : 'border-input hover:border-primary/50 hover:shadow-md'
          } transition-all duration-300 bg-background/80`}>
          
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full py-3.5 md:py-4.5 pl-5 md:pl-6 pr-20 md:pr-24 rounded-full focus:outline-none text-lg md:text-xl bg-transparent"
            placeholder="Recherchez avec clarté..."
          />

          <div className="absolute inset-y-0 right-1.5 md:right-2.5 flex items-center space-x-1.5 md:space-x-2.5">
            {value && (
              <button 
                type="button"
                className="p-2 md:p-2.5 hover:bg-primary/10 rounded-full transition-colors"
                onClick={() => {
                  onChange('');
                  // Mettre le focus sur l'input après avoir effacé
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                aria-label="Effacer la recherche"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </button>
            )}
            <button 
              type="submit"
              className="p-2 md:p-2.5 hover:bg-primary/10 rounded-full transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5 md:h-6 md:w-6 text-primary/80 hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions */}
      {/* {isFocused && query && (
        <div className="absolute mt-2 w-full bg-background rounded-lg shadow-lg border border-border overflow-hidden z-50">
          {suggestions
            .filter(s => s.toLowerCase().includes(query.toLowerCase()))
            .map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-4 w-4 text-muted-foreground mr-3" />
                <span>{suggestion}</span>
              </div>
            ))
          }
        </div>
      )} */}
    </div>
  );
} 