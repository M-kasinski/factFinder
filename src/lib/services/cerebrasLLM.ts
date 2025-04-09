import { cerebras } from "@ai-sdk/cerebras";
import { streamText, generateText } from "ai";
import { SearchResult } from "@/types/search";

/**
 * Fonction pour streamer une réponse LLM basée sur les résultats de recherche
 */
export function streamLLMResponse(
  query: string,
  searchResults: SearchResult[],
  language: string = "fr"
) {
  try {
    // Construire le contexte à partir des résultats de recherche
    const context = searchResults
      .map((result, index) => {
        return `citation source:[${index + 1}](${result.url})\ntitle:${result.title}\nContent: ${
          result.extra_snippet
        }\n`;
      })
      .join("\n");

    // Définir les prompts selon la langue
    const prompts = {
      fr: `
Tu es un assistant de recherche factuel et précis. Réponds à la question de l'utilisateur en te basant uniquement sur les informations fournies dans les résultats de recherche ci-dessous.
Mets en gras les mots clés **mots clés** dans la réponse.
Si les résultats de recherche ne contiennent pas suffisamment d'informations pour répondre à la question, indique-le clairement.
Ne fabrique pas d'informations et cite les sources en utilisant les urls (lien au format markdown) entre parenthèses [1](URL), [2](URL), etc.
exemples: question: "Quel est le plus grand volcan de la planète ?", réponse: "Le plus grand volcan de la planète est le mont Everest, avec une hauteur de 8848 mètres. [1](https://fr.wikipedia.org/wiki/Mont_Everest)"

Question: ${query}

Résultats de recherche:
${context}

Réponds de manière concise, factuelle et en français.
`,
      en: `
You are a factual and precise search assistant. Answer the user's question based solely on the information provided in the search results below.
Put key terms in bold using **key terms** in your response.
If the search results don't contain enough information to answer the question, clearly state this.
Don't make up information and cite sources using markdown links in parentheses [1](URL), [2](URL), etc.
exemples: question: "What is the largest volcano on the planet?", response: "The largest volcano on the planet is Mount Everest, with a height of 8848 meters. [1](https://en.wikipedia.org/wiki/Mount_Everest)"

Question: ${query}

Search results:
${context}

Answer in a concise, factual manner in English.
`
    };

    // Utiliser streamText pour générer une réponse en streaming
    return streamText({
      model: cerebras("llama3.1-8b"),
      prompt: prompts[language as keyof typeof prompts] || prompts.fr,
    });
  } catch (error) {
    console.error("Error streaming LLM response:", error);
    throw error;
  }
}

/**
 * Fonction pour générer des questions connexes basées sur les résultats de recherche
 */
export async function generateRelatedQuestions(query: string, context: string, language: string = "fr") {
  try {
    // Définir les prompts selon la langue
    const prompts = {
      fr: `
Tu es un assistant de recherche qui aide à explorer un sujet. Basé sur la question de l'utilisateur et la réponse du LLM, génère 5 questions connexes que l'utilisateur pourrait vouloir explorer ensuite.
Ces questions doivent être pertinentes, intéressantes et formulées de manière concise.

Question originale: ${query}

Contexte:
${context}

Génère exactement 5 questions connexes et courte, une par ligne, sans numérotation ni préfixe. Chaque question doit être concise et en français.
`,
      en: `
You are a search assistant helping to explore a topic. Based on the user's question and the LLM's response, generate 5 related questions that the user might want to explore next.
These questions should be relevant, interesting, and concisely formulated.

Original question: ${query}

Context:
${context}

Generate exactly 5 short related questions, one per line, without numbering or prefix. Each question should be concise and in English.
`
    };

    // Utiliser le modèle pour générer les questions
    const result = await generateText({
      model: cerebras("llama3.1-8b"),
      prompt: prompts[language as keyof typeof prompts] || prompts.fr,
    });

    // Traiter la réponse pour obtenir un tableau de questions
    const responseText = await result.text;
    const questions = responseText
      .split("\n")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0 && q.endsWith("?"))
      .slice(0, 5);

    return questions;
  } catch (error) {
    console.error("Error generating related questions:", error);
    return [];
  }
}
