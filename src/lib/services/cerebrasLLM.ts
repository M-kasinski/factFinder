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

  const selectedPrompt = prompts[language as keyof typeof prompts] || prompts.fr;

  try {
    // Essayer avec le modèle principal
    return streamText({
      model: cerebras("llama-3.3-70b"),
      prompt: selectedPrompt,
    });
  } catch (error: unknown) {
    // Vérifier si l'erreur est une erreur 429 (Too Many Requests)
    // Note: La structure exacte de l'erreur peut varier. Adaptez si nécessaire.
    let isRateLimitError = false;
    let status: number | undefined;
    let message: string | undefined;

    if (typeof error === 'object' && error !== null) {
      const errObj = error as { status?: number; message?: string };
      if ('status' in errObj && typeof errObj.status === 'number') {
        status = errObj.status;
      }
      if ('message' in errObj && typeof errObj.message === 'string') {
        message = errObj.message;
      }
      isRateLimitError = status === 429 || (typeof message === 'string' && message.includes("429"));
    }

    if (isRateLimitError) {
      console.warn("Rate limit hit with llama-3.3-70b. Falling back to llama3.1-8b.");
      try {
        // Essayer avec le modèle de repli
        return streamText({
          model: cerebras("llama3.1-8b"), // Modèle de repli
          prompt: selectedPrompt,
        });
      } catch (fallbackError) {
        console.error("Error streaming LLM response with fallback model:", fallbackError);
        throw fallbackError; // Relancer l'erreur du modèle de repli
      }
    } else {
      // Si ce n'est pas une erreur 429, relancer l'erreur originale
      console.error("Error streaming LLM response:", error);
      throw error;
    }
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

Génère exactement 5 questions connexes et courtes, une par ligne, sans numérotation ni préfixe. Chaque question doit être concise et en français.
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

/**
 * Fonction utilitaire pour gérer le fallback LLM en cas d'erreur 429 (rate limit)
 * Essaye d'abord le modèle principal, puis un modèle de repli si nécessaire.
 */
async function withLLMFallback<T = unknown>({
  mainModel,
  fallbackModel,
  call,
}: {
  mainModel: string;
  fallbackModel: string;
  call: (model: string) => Promise<T>;
}): Promise<T> {
  try {
    return await call(mainModel);
  } catch (error: unknown) {
    let isRateLimitError = false;
    let status: number | undefined;
    let message: string | undefined;

    if (typeof error === 'object' && error !== null) {
      const errObj = error as { status?: number; message?: string };
      if ('status' in errObj && typeof errObj.status === 'number') {
        status = errObj.status;
      }
      if ('message' in errObj && typeof errObj.message === 'string') {
        message = errObj.message;
      }
      isRateLimitError = status === 429 || (typeof message === 'string' && message.includes("429"));
    }

    if (isRateLimitError) {
      console.warn(`Rate limit hit with ${mainModel}. Falling back to ${fallbackModel}.`);
      try {
        return await call(fallbackModel);
      } catch (fallbackError) {
        console.error("Error with fallback LLM model:", fallbackError);
        throw fallbackError;
      }
    } else {
      console.error("Error with LLM:", error);
      throw error;
    }
  }
}

/**
 * Fonction pour générer une seule suggestion de requête de recherche de suivi.
 */
export async function generateFollowUpSearchQuery(query: string, context: { query: string, response: string }, language: string = "fr"): Promise<string | null> {
  const prompts = {
    fr: `
Tu es un assistant de recherche qui aide à trouver la prochaine étape logique de recherche. Basé sur la question originale de l'utilisateur et le contexte fourni, génère UNE seule suggestion de requête de recherche pertinente que l'utilisateur pourrait entrer dans un moteur de recherche comme Google.
La requête doit être concise et directement utilisable pour une recherche.

Question originale: ${query}

Contexte:
${"question :" + context.query + "\n" + "réponse :" + context.response}

Génère exactement UNE requête de recherche en français, sans aucun préfixe ni explication.
`,
    en: `
You are a search assistant helping find the next logical search step. Based on the user's original question and the provided context, generate ONE relevant search query suggestion that the user could enter into a search engine like Google.
The query should be concise and directly usable for searching.

Original question: ${query}

Context:
${"question :" + context.query + "\n" + "response :" + context.response}

Generate exactly ONE search query in English, without any prefix or explanation.
`
  };
  const prompt = prompts[language as keyof typeof prompts] || prompts.fr;

  try {
    const result = await withLLMFallback({
      mainModel: "llama-3.3-70b",
      fallbackModel: "llama3.1-8b",
      call: (model) => generateText({
        model: cerebras(model),
        prompt
      }),
    });
    const responseText = await result.text;
    const followUpQuery = responseText.trim().split('\n')[0].replaceAll('"', '');
    if (followUpQuery && followUpQuery.length > 3) {
      return followUpQuery;
    }
    return null;
  } catch (error) {
    console.error("Error generating follow-up search query:", error);
    return null;
  }
}
