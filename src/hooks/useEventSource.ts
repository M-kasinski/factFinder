import { useState, useEffect } from "react";
import type { SearchResult } from "@/types/search";

interface WebMessage {
  results: SearchResult[];
  type?: string;
}

type MessageType = "web" | "message" | "end" | "videos";

type MessageData = [MessageType, string | WebMessage];

interface UseEventSourceProps {
  query: string;
  enabled?: boolean;
}

interface UseEventSourceReturn {
  results: SearchResult[];
  messages: string;
  videos: SearchResult[];
  showVideos: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query || !enabled) return;

    let pendingVideos: SearchResult[] = [];

    setIsLoading(true);
    setError(null);
    setResults([]);
    setMessages("");
    setVideos([]);
    setShowVideos(false);

    const evtSource = new EventSource(
      `http://localhost:3000/search?q=${encodeURIComponent(query)}`
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
          case "end":
            if (pendingVideos.length > 0) {
              setVideos(pendingVideos);
              setShowVideos(true);
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
    isLoading,
    error,
  };
}
