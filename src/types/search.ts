export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
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