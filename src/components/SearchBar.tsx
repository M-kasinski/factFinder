"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ onSearch, value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("common");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    // Ferme le clavier en retirant le focus de l'input
    inputRef.current?.blur();
  };

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
            onBlur={() => setIsFocused(false)}
            // Ajout de enterKeyHint pour le clavier mobile
            enterKeyHint="search"
            className="w-full py-3.5 md:py-4.5 pl-5 md:pl-6 pr-20 md:pr-24 rounded-full focus:outline-none text-lg md:text-xl bg-transparent"
            placeholder={t("searchPlaceholder")}
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
                aria-label={t("clearSearch")}
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </button>
            )}
            <button 
              type="submit"
              className="p-2 md:p-2.5 hover:bg-primary/10 rounded-full transition-colors"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5 md:h-6 md:w-6 text-primary/80 hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
