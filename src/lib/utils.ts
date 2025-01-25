import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LLMAnalysis } from "@/types/search"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function messagesToLLMAnalysis(messages: string[]): LLMAnalysis {
  return {
    summary: messages.join("\n"),
    keyPoints: [],
    sources: [],
    confidence: 1
  }
}
