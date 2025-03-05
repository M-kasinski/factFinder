# FactFinder

![FactFinder Logo](public/factfinder-logo.png)

## 🇫🇷 Français

### À propos

FactFinder est un moteur de recherche moderne qui combine la puissance de Brave Search avec l'intelligence artificielle pour fournir des résultats de recherche pertinents et des analyses générées par un LLM (Large Language Model). L'application est conçue pour offrir une expérience utilisateur fluide et intuitive, avec un affichage en temps réel des résultats et des réponses générées.

### Fonctionnalités principales

- **Recherche Web avec Brave Search** : Accès à des résultats de recherche web de haute qualité
- **Analyse par IA** : Génération de réponses concises et factuelles basées sur les résultats de recherche
- **Streaming en temps réel** : Affichage progressif des résultats et des réponses générées
- **Questions connexes** : Suggestions de questions liées pour approfondir l'exploration d'un sujet
- **Interface utilisateur moderne** : Design épuré avec support des thèmes clair/sombre
- **Expérience responsive** : Optimisé pour tous les appareils (desktop, tablette, mobile)

### Technologies utilisées

- **Frontend** : Next.js 15 (App Router), React, TypeScript
- **Styling** : Tailwind CSS, shadcn/ui
- **IA et LLM** : AI SDK, Cerebras LLM
- **Animations** : Framer Motion
- **Gestion des paquets** : pnpm

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/factfinder.git
cd factfinder

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les clés API nécessaires dans .env.local

# Lancer le serveur de développement
pnpm dev
```

### Configuration

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
BRAVE_SEARCH_API_KEY=votre_clé_api_brave_search
CEREBRAS_API_KEY=votre_clé_api_cerebras
```

### Utilisation

1. Lancez l'application avec `pnpm dev`
2. Ouvrez votre navigateur à l'adresse `http://localhost:3000`
3. Entrez votre requête dans la barre de recherche
4. Explorez les résultats, l'analyse IA et les questions connexes

### Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

## 🇬🇧 English

### About

FactFinder is a modern search engine that combines the power of Brave Search with artificial intelligence to provide relevant search results and LLM-generated analyses. The application is designed to offer a smooth and intuitive user experience, with real-time display of results and generated responses.

### Key Features

- **Web Search with Brave Search**: Access to high-quality web search results
- **AI Analysis**: Generation of concise and factual responses based on search results
- **Real-time Streaming**: Progressive display of results and generated responses
- **Related Questions**: Suggestions of related questions to deepen the exploration of a topic
- **Modern User Interface**: Clean design with light/dark theme support
- **Responsive Experience**: Optimized for all devices (desktop, tablet, mobile)

### Technologies Used

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **AI and LLM**: AI SDK, Cerebras LLM
- **Animations**: Framer Motion
- **Package Management**: pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/factfinder.git
cd factfinder

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Fill in the necessary API keys in .env.local

# Start the development server
pnpm dev
```

### Configuration

Create a `.env.local` file at the root of the project with the following variables:

```
BRAVE_SEARCH_API_KEY=your_brave_search_api_key
CEREBRAS_API_KEY=your_cerebras_api_key
```

### Usage

1. Start the application with `pnpm dev`
2. Open your browser at `http://localhost:3000`
3. Enter your query in the search bar
4. Explore the results, AI analysis, and related questions

### License

This project is licensed under the MIT License. See the LICENSE file for details.
