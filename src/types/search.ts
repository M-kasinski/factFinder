export interface SearchResult {
  title: string;
  url: string;
  date: string;
  description: string;
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