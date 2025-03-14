"use client";

import { useState } from "react";
import { Search, Mic } from "lucide-react";

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
        <div className={`relative rounded-full border ${
          isFocused 
            ? 'border-primary shadow-lg' 
            : 'border-input hover:shadow-md'
          } transition-all duration-200 bg-background`}>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full py-3 md:py-4 pl-4 md:pl-5 pr-20 md:pr-24 rounded-full focus:outline-none text-lg md:text-xl bg-transparent"
            placeholder="Posez votre question..."
          />

          <div className="absolute inset-y-0 right-1 md:right-2 flex items-center space-x-1 md:space-x-2">
            <button 
              type="button"
              className="p-2 md:p-2.5 hover:bg-accent rounded-full"
              onClick={() => console.log('Voice search not implemented')}
            >
              <Mic className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </button>
            <button 
              type="submit"
              className="p-2 md:p-2.5 hover:bg-accent rounded-full"
            >
              <Search className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-primary transition-colors" />
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