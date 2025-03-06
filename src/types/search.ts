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
}

export interface SearchState {
  isLoading: boolean;
  results: SearchResult[];
  error?: string;
} 