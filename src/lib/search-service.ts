import type { SearchResult, LLMAnalysis } from "@/types/search";

interface SearchResponse {
  results: SearchResult[];
  llmAnalysis: LLMAnalysis;
}

interface MockData {
  results: SearchResult[];
  llmAnalysis: LLMAnalysis;
}

// Importe les données de test
const mockData: MockData = {
  results: [
    {
      title: "La Commission européenne dévoile son plan d'action pour l'IA",
      url: "https://europa.eu/commission/news/artificial-intelligence-strategy",
      date: "2024/03/15",
      description: "La Commission européenne a présenté aujourd'hui sa stratégie pour promouvoir une IA éthique et compétitive. Le plan prévoit un investissement de 20 milliards d'euros et de nouvelles réglementations pour encadrer le développement de l'intelligence artificielle.",
      source: "Commission européenne"
    },
    {
      title: "Réforme de la PAC : les nouveaux défis de l'agriculture européenne",
      url: "https://agriculture.europa.eu/policy/reform-2024",
      date: "2024/03/12",
      description: "La nouvelle Politique Agricole Commune entre en vigueur avec des objectifs ambitieux en matière de durabilité. Les agriculteurs devront s'adapter à de nouvelles normes environnementales tout en maintenant leur compétitivité.",
      source: "Direction Générale de l'Agriculture"
    },
    {
      title: "Le Parlement européen vote une loi historique sur la protection des données",
      url: "https://www.europarl.europa.eu/news/data-protection-act",
      date: "2024/03/10",
      description: "Les eurodéputés ont adopté à une large majorité une nouvelle législation renforçant la protection des données personnelles des citoyens européens. Cette loi impose des obligations strictes aux entreprises technologiques.",
      source: "Parlement européen"
    },
    {
      title: "Green Deal : l'UE accélère sa transition énergétique",
      url: "https://climate.ec.europa.eu/green-deal/implementation",
      date: "2024/03/08",
      description: "L'Union européenne renforce ses objectifs climatiques avec un nouveau paquet de mesures. Le plan prévoit une réduction des émissions de CO2 de 65% d'ici 2030 et encourage l'adoption massive des énergies renouvelables.",
      source: "Direction Climat UE"
    },
    {
      title: "Innovation : l'Europe lance un fonds de 10 milliards pour les startups",
      url: "https://invest-eu.europa.eu/innovation-fund",
      date: "2024/03/05",
      description: "Un nouveau fonds européen d'investissement vise à soutenir les startups innovantes dans les secteurs stratégiques. Cette initiative s'inscrit dans la volonté de l'UE de renforcer sa souveraineté technologique.",
      source: "Banque Européenne d'Investissement"
    }
  ],
  llmAnalysis: {
    summary: "Les récentes initiatives de l'Union européenne montrent une forte orientation vers l'innovation technologique et le développement durable. La Commission européenne met l'accent sur l'IA éthique, tandis que de nouvelles réglementations renforcent la protection des données. Le Green Deal et la réforme de la PAC illustrent l'engagement de l'UE pour la transition écologique.",
    keyPoints: [
      "Investissement majeur dans l'IA avec un focus sur l'éthique",
      "Renforcement de la protection des données personnelles",
      "Accélération de la transition énergétique via le Green Deal",
      "Réforme de la PAC orientée vers la durabilité",
      "Création d'un fonds d'innovation pour les startups"
    ],
    sources: [
      "Commission européenne",
      "Parlement européen",
      "Direction Climat UE",
      "Banque Européenne d'Investissement"
    ],
    confidence: 0.92
  }
};

// Simule un délai d'API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function performSearch(): Promise<SearchResponse> {
  // Simule un appel API
  await delay(1000);

  // En mode développement, retourne les données de test
  if (process.env.NODE_ENV === "development") {
    return mockData;
  }

  // En production, cette partie appellerait l'API réelle
  throw new Error("API non implémentée en production");
} 