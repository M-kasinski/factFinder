export interface SearchResult {
  title: string;
  url: string;
  date: string;
  description: string;
  source?: string;
  meta_url?: {
    favicon?: string;
    hostname: string;
    netloc: string;
    scheme: string;
    path: string;
  };
}

export interface LLMAnalysis {
  summary: string;
  keyPoints: string[];
  sources: string[];
  confidence: number;
}

export interface SearchState {
  isLoading: boolean;
  results: SearchResult[];
  llmResponse: LLMAnalysis | null;
  error?: string;
} 