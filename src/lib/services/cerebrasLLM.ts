import { cerebras } from "@ai-sdk/cerebras";
import { streamText, generateText } from "ai";
import { SearchResult } from "@/types/search";

/**
 * Fonction pour générer une réponse LLM basée sur les résultats de recherche
 */
export async function generateLLMResponse(
  query: string,
  searchResults: SearchResult[]
) {
  try {
    // Construire le contexte à partir des résultats de recherche
    const context = searchResults
      .map((result, index) => {
        return `[${index + 1}] ${result.title}\nURL: ${
          result.url
        }\nDescription: ${result.description}\n`;
      })
      .join("\n");

    // Construire le prompt pour le LLM
    const prompt = `
Tu es un assistant de recherche factuel et précis. Réponds à la question de l'utilisateur en te basant uniquement sur les informations fournies dans les résultats de recherche ci-dessous.
Si les résultats de recherche ne contiennent pas suffisamment d'informations pour répondre à la question, indique-le clairement.
Ne fabrique pas d'informations et cite les sources en utilisant les numéros entre crochets [1], [2], etc.

Question: ${query}

Résultats de recherche:
${context}

Réponds de manière concise, factuelle et en français.
`;

    // Utiliser streamText pour générer une réponse en streaming
    const result = await streamText({
      model: cerebras("llama-3.3-70b"),
      prompt,
    });

    // Retourner le texte généré
    return result.text;
  } catch (error) {
    console.error("Error generating LLM response:", error);
    return `Je n'ai pas pu générer une réponse basée sur les résultats de recherche. Veuillez consulter directement les sources.`;
  }
}

/**
 * Fonction pour streamer une réponse LLM basée sur les résultats de recherche
 */
export function streamLLMResponse(
  query: string,
  searchResults: SearchResult[]
) {
  try {
    // Construire le contexte à partir des résultats de recherche
    const context = searchResults
      .map((result, index) => {
        return `[${index + 1}] ${result.title}\nURL: ${result.url}\nContent: ${
          result.extra_snippet
        }\n`;
      })
      .join("\n");

    // Construire le prompt pour le LLM
    const prompt = `
Tu es un assistant de recherche factuel et précis. Réponds à la question de l'utilisateur en te basant uniquement sur les informations fournies dans les résultats de recherche ci-dessous.
Si les résultats de recherche ne contiennent pas suffisamment d'informations pour répondre à la question, indique-le clairement.
Ne fabrique pas d'informations et cite les sources en utilisant les numéros entre crochets et les urls (lien au format markdown) entre parenthèses [1](URL), [2](URL), etc.

Question: ${query}

Résultats de recherche:
${context}

Réponds de manière concise, factuelle et en français.
`;

    // Utiliser streamText pour générer une réponse en streaming
    return streamText({
      model: cerebras("llama3.3-70b"),
      prompt,
    });
  } catch (error) {
    console.error("Error streaming LLM response:", error);
    throw error;
  }
}

/**
 * Fonction pour générer des questions connexes basées sur les résultats de recherche
 */
export async function generateRelatedQuestions(query: string, context: string) {
  try {
    // // Construire le contexte à partir des résultats de recherche
    // const context = searchResults
    //   .slice(0, 5) // Limiter à 5 résultats pour le contexte
    //   .map((result) => {
    //     return `${result.title}\nContent: ${result.extra_snippet}\n`;
    //   })
    //   .join('\n');

    // Construire le prompt pour le LLM
    const prompt = `
Tu es un assistant de recherche qui aide à explorer un sujet. Basé sur la question de l'utilisateur et la réponse du LLM, génère 5 questions connexes que l'utilisateur pourrait vouloir explorer ensuite.
Ces questions doivent être pertinentes, intéressantes et formulées de manière concise.

Question originale: ${query}

Contexte:
${context}

Génère exactement 5 questions connexes et courte, une par ligne, sans numérotation ni préfixe. Chaque question doit être concise et en français.
`;

    // Utiliser le modèle pour générer les questions
    const result = await generateText({
      model: cerebras("llama3.1-8b"),
      prompt,
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
