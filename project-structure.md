# Arborescence du Projet FactFinder

## Présentation du Projet
FactFinder est une application de recherche web développée avec Next.js qui utilise l'API Brave Search et intègre un modèle LLM (via Cerebras) pour analyser et présenter les résultats de recherche. L'application est conçue pour fournir une interface utilisateur en français et suit une architecture moderne basée sur Next.js avec App Router.

## Structure du Projet

```
/
├── .next/                      # Dossier généré par Next.js lors de la compilation
├── .git/                       # Gestion du versionnement Git
├── node_modules/               # Dépendances du projet
├── prompt_instruction/         # Instructions pour les modèles LLM
├── public/                     # Fichiers statiques accessibles publiquement
├── src/                        # Code source principal de l'application
│   ├── app/                    # Structure Next.js App Router
│   │   ├── api/                # Endpoints API de l'application
│   │   ├── search/             # Page de résultats de recherche
│   │   ├── actions.ts          # Server Actions Next.js
│   │   ├── globals.css         # Styles globaux de l'application
│   │   ├── layout.tsx          # Layout principal de l'application
│   │   ├── page.tsx            # Page d'accueil de l'application
│   │   └── theme-provider.tsx  # Fournisseur de thème (clair/sombre)
│   │
│   ├── components/             # Composants React réutilisables
│   │   ├── ui/                 # Composants UI génériques (shadcn/ui)
│   │   ├── SearchBar.tsx       # Barre de recherche
│   │   ├── SearchResults.tsx   # Affichage des résultats de recherche
│   │   ├── LLMResponse.tsx     # Affichage des réponses du modèle LLM
│   │   ├── NewsHighlights.tsx  # Mise en avant des actualités
│   │   ├── VideoCarousel.tsx   # Carrousel pour les vidéos
│   │   └── ...                 # Autres composants UI spécifiques
│   │
│   ├── data/                   # Données statiques et modèles de données
│   │
│   ├── hooks/                  # Hooks React personnalisés
│   │
│   ├── lib/                    # Bibliothèques et utilitaires
│   │   ├── services/           # Services d'API et intégrations externes
│   │   │   ├── braveSearch.ts  # Service d'intégration avec Brave Search
│   │   │   └── cerebrasLLM.ts  # Service d'intégration avec le LLM Cerebras
│   │   └── utils.ts            # Fonctions utilitaires générales
│   │
│   ├── test/                   # Tests unitaires et d'intégration
│   │
│   └── types/                  # Définitions TypeScript
│       └── search.ts           # Types liés à la fonctionnalité de recherche
│
├── .env.example                # Exemple de variables d'environnement
├── .env                        # Variables d'environnement (non versionnées)
├── .env.local                  # Variables d'environnement locales
├── .gitignore                  # Fichiers ignorés par Git
├── CLAUDE.md                   # Guide du projet
├── LICENSE                     # Licence du projet
├── README.md                   # Documentation principale du projet
├── components.json             # Configuration des composants shadcn/ui
├── eslint.config.mjs           # Configuration ESLint
├── next.config.ts              # Configuration Next.js
├── package.json                # Dépendances et scripts du projet
├── pnpm-lock.yaml              # Verrouillage des versions des dépendances
├── postcss.config.mjs          # Configuration PostCSS
├── steps.md                    # Documentation de l'évolution du projet
├── tailwind.config.ts          # Configuration Tailwind CSS
├── tsconfig.json               # Configuration TypeScript
└── vitest.config.ts            # Configuration Vitest (tests)
```

## Rôle des Principaux Dossiers et Fichiers

### Dossiers Principaux

- **src/app/**: Contient la structure principale de l'application Next.js selon l'architecture App Router.
  - La page d'accueil et la page de recherche s'y trouvent.
  - Les API routes sont définies dans le sous-dossier `api`.

- **src/components/**: Contient tous les composants React de l'application.
  - Les composants génériques et réutilisables sont dans `ui/`.
  - Les composants spécifiques comme `SearchBar`, `SearchResults`, etc. sont à la racine.

- **src/lib/services/**: Contient les services d'intégration avec des APIs externes.
  - `braveSearch.ts`: Intégration avec l'API Brave Search.
  - `cerebrasLLM.ts`: Intégration avec le modèle LLM de Cerebras.

- **src/types/**: Contient les définitions TypeScript pour le typage strict.
  - `search.ts`: Types spécifiques aux fonctionnalités de recherche.

- **prompt_instruction/**: Contient probablement les instructions pour les prompts envoyés aux modèles LLM.

### Fichiers Principaux

- **CLAUDE.md**: Guide du projet qui détaille les commandes, les conventions de code et la structure.

- **package.json**: Définit les dépendances du projet et les scripts disponibles.

- **next.config.ts**: Configuration de Next.js pour le projet.

- **tailwind.config.ts**: Configuration de Tailwind CSS pour les styles.

- **steps.md**: Documentation de l'évolution du projet et des étapes de développement.

## Commandes Utiles

- **Développement**: `pnpm dev` - Démarre le serveur de développement
- **Production**: `pnpm build` - Compile l'application pour la production
- **Tests**: `pnpm test` - Exécute tous les tests
- **Linting**: `pnpm lint` - Vérifie la qualité du code

## Conventions de Code

- Utilisation de TypeScript avec typage strict
- PascalCase pour les composants, camelCase pour les variables et fonctions
- Imports organisés : React d'abord, puis bibliothèques externes, puis chemins internes
- Utilisation de shadcn/ui avec Tailwind pour les styles
- Contenu utilisateur en français
- Gestionnaire de paquets : pnpm
