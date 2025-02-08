import { useState, useEffect } from "react";
import type { SearchResult } from "@/types/search";

interface WebMessage {
  results: SearchResult[];
  type?: string;
}

interface RelatedMessage {
  questions: string[];
}

type MessageType = "web" | "message" | "end" | "videos" | "related";

type MessageData = [MessageType, string | WebMessage | RelatedMessage];

interface UseEventSourceProps {
  query: string;
  enabled?: boolean;
}

interface UseEventSourceReturn {
  results: SearchResult[];
  messages: string;
  videos: SearchResult[];
  showVideos: boolean;
  relatedQuestions: string[];
  showRelated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export function useEventSource({
  query,
  enabled = true,
}: UseEventSourceProps): UseEventSourceReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [messages, setMessages] = useState<string>("");
  const [videos, setVideos] = useState<SearchResult[]>([]);
  const [showVideos, setShowVideos] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [showRelated, setShowRelated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query || !enabled) return;

    let pendingVideos: SearchResult[] = [];
    let pendingQuestions: string[] = [];

    setIsLoading(true);
    setError(null);
    setResults([]);
    setMessages("");
    setVideos([]);
    setShowVideos(false);
    setRelatedQuestions([]);
    setShowRelated(false);

    const evtSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(query)}`
    );

    evtSource.onmessage = (event) => {
      try {
        const [type, message]: MessageData = JSON.parse(event.data);

        switch (type) {
          case "web":
            setResults((message as WebMessage).results);
            break;
          case "message":
            setMessages((prev) => prev + (message as string));
            break;
          case "videos":
            pendingVideos = (message as WebMessage).results;
            break;
          case "related":
            pendingQuestions = (message as RelatedMessage).questions;
            break;
          case "end":
            if (pendingVideos.length > 0) {
              setVideos(pendingVideos);
              setShowVideos(true);
            }
            if (pendingQuestions.length > 0) {
              setRelatedQuestions(pendingQuestions);
              setShowRelated(true);
            }
            evtSource.close();
            setIsLoading(false);
            break;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to parse message")
        );
      }
    };

    evtSource.onerror = () => {
      setError(new Error("EventSource failed"));
      setIsLoading(false);
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, [query, enabled]);

  return {
    results,
    messages,
    videos,
    showVideos,
    relatedQuestions,
    showRelated,
    isLoading,
    error,
  };
}
