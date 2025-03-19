export interface SearchResult {
  extra_snippet: string[];
  title: string;
  url: string;
  date: string;
  description: string;
  source?: string;
  thumbnail?: {
    src?: string;
    original?: string;
  };
  age?: string;
  meta_url?: {
    favicon?: string;
    hostname: string;
    netloc: string;
    scheme: string;
    path: string;
  };
  isNews?: boolean;
  query?: string; // Terme de recherche utilisé pour obtenir ce résultat
}

export interface SearchState {
  isLoading: boolean;
  results: SearchResult[];
  error?: string;
} 