import { useState, useEffect } from "react";

type MessageType = "results" | "message" | "end";
type MessageData = [MessageType, string | any[]];

interface UseEventSourceProps {
  query: string;
  enabled?: boolean;
}

interface UseEventSourceReturn {
  results: any[];
  messages: string;
  isLoading: boolean;
  error: Error | null;
}

export function useEventSource({
  query,
  enabled = true,
}: UseEventSourceProps): UseEventSourceReturn {
  const [results, setResults] = useState<any[]>([]);
  const [messages, setMessages] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query || !enabled) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    setMessages("");

    const evtSource = new EventSource(
      `http://localhost:3000/search?q=${encodeURIComponent(query)}`
    );

    evtSource.onmessage = (event) => {
      try {
        const [type, message]: MessageData = JSON.parse(event.data);

        switch (type) {
          case "results":
            setResults(message as any[]);
            break;
          case "message":
            setMessages((prev) => {
              const currentMessage = message as string;
              return prev + currentMessage;
            });
            break;
          case "end":
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
    isLoading,
    error,
  };
}
