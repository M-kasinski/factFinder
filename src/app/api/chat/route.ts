// API route for conversational chatbot powered by Vercel AI SDK
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 10;

// Handle POST requests from the client useChat hook
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: 'Tu es un assistant français pour ClaireVue, réponds de façon claire et concise.',
    messages,
  });
  return result.toDataStreamResponse();
} 