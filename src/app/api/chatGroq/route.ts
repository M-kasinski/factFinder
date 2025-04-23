import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq();

export const maxDuration = 10;


export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq('compound-beta'),
    system: 'Tu es un assistant français pour ClaireVue, réponds de façon claire et concise en markdown.', 
    messages,
  });

  return result.toDataStreamResponse();
} 