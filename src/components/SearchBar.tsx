"use client";

import { useState, useRef } from "react";
import { Search, X, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
  isThreadMode?: boolean;
  onToggleThread?: () => void;
  threadAvailable?: boolean;
  showThreadToggle?: boolean;
}

export function SearchBar({ onSearch, value, onChange, isThreadMode = false, onToggleThread = () => {}, threadAvailable = false, showThreadToggle = false }: SearchBarProps) {
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
        <div className={`flex items-center gap-1 md:gap-2 rounded-full border backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 transition-all duration-300 bg-background/80 ${
            isThreadMode
              ? 'border-primary shadow-sm ring-2 ring-primary/30'
              : isFocused
                ? 'border-primary shadow-lg ring-2 ring-primary/20'
                : 'border-input hover:border-primary/50 hover:shadow-md'
          }`}>  
          {/* Mobile Thread Toggle Button (Inside) */}
          {showThreadToggle && (
            <button
              type="button"
              aria-pressed={isThreadMode}
              aria-label={isThreadMode ? t('stopConversation') : t('continueConversation')}
              onClick={() => {
                onToggleThread?.();
                onChange('');
                inputRef.current?.focus();
              }}
              disabled={!threadAvailable}
              className={`md:hidden p-1.5 rounded-full transition-colors ${ // Adjusted padding
                isThreadMode ? 'bg-primary/20 text-primary' : 'text-primary/60 hover:bg-primary/10 hover:text-primary'
              } ${!threadAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          )}
          {/* Input flex */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            enterKeyHint="search"
            className="flex-1 bg-transparent focus:outline-none text-base md:text-lg px-2 py-2"
            placeholder={isThreadMode
              ? 'Continuer la conversation sur le sujet'
              : t('searchPlaceholder')}
          />
          {/* Clear button */}
          {value && (
            <button
              type="button"
              className="p-1 md:p-2 hover:bg-primary/10 rounded-full transition-colors"
              onClick={() => { onChange(''); setTimeout(() => inputRef.current?.focus(), 0); }}
              aria-label={t('clearSearch')}
            >
              <X className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </button>
          )}
          {/* Mobile: search submit icon */}
          <button
            type="submit"
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label={t('search')}
          >
            <Search className="h-5 w-5 text-primary/80 hover:text-primary transition-colors" />
          </button>
          {/* Desktop: thread toggle + search */}
          <div className="hidden md:flex items-center space-x-1">
            {showThreadToggle && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-pressed={isThreadMode}
                    aria-label={isThreadMode ? t('stopConversation') : t('continueConversation')}
                    onClick={() => {
                      onToggleThread?.();
                      onChange('');
                      inputRef.current?.focus();
                    }}
                    disabled={!threadAvailable}
                    className={`p-2 rounded-full transition-colors ${
                      isThreadMode ? 'bg-primary/20 text-primary' : 'text-primary/80 hover:bg-primary/10 hover:text-primary'
                    } ${!threadAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isThreadMode ? t('stopConversation') : t('continueConversation')}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label={t('search')}
            >
              <Search className="h-5 w-5 text-primary/80 hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
