# Étapes de création du projet FactFinder

## Étape 1 : Initialisation du projet ✅
- [x] Création du projet Next.js avec App Router
- [x] Installation de Tailwind CSS
- [x] Installation de shadcn/ui
- [x] Configuration du thème et des dépendances de base

## Étape 2 : Structure du projet ✅
- [x] Mise en place de la structure des dossiers
- [x] Configuration du thème clair/sombre avec next-themes
- [x] Création des composants UI de base (Button, Input)
- [x] Implémentation de la page d'accueil avec la barre de recherche

## Étape 3 : Composants de recherche ✅
- [x] Création des types pour les résultats de recherche
- [x] Installation des composants Card et Skeleton
- [x] Création du composant SearchResults
- [x] Création du composant LLMResponse avec support Markdown
- [x] Intégration des états de chargement
- [x] Correction des composants UI (Input, styling)

## Étape 4 : Mode hors ligne et données de test ✅
- [x] Création des données fictives (mock-data.json)
- [x] Configuration des variables d'environnement
- [x] Création du service de recherche avec support hors ligne
- [x] Intégration des notifications toast
- [x] Tests du mode hors ligne

## Étape 5 : Page de résultats de recherche ✅
- [x] Création de la page de résultats (/search)
- [x] Refactoring de la page d'accueil pour la redirection
- [x] Amélioration du composant SearchBar avec defaultValue
- [x] Gestion des paramètres d'URL pour la recherche
- [x] Intégration du bouton de retour à l'accueil

## Étape 6 : Intégration des APIs ✅ (2025-01-24)
- [x] Configuration des clés d'API
- [x] Intégration de l'API de recherche Web avec EventSource
- [x] Création d'un hook personnalisé useEventSource
- [x] Adaptation des composants pour le streaming des résultats
- [x] Gestion des erreurs et des timeouts

## Étape 7 : Composant Sources ✅ (2025-01-24)
- [x] Création du composant `SourcesComponent` pour l'affichage des sources
- [x] Implémentation de l'affichage des 3 sources principales
- [x] Ajout de la carte avec les sources supplémentaires
- [x] Intégration dans la page de recherche
- [x] Optimisation de l'affichage horizontal (210px)
- [x] Support du défilement tactile pour mobile
- [x] Ajout de la barre de défilement desktop
- [x] Amélioration du design responsive
- [x] Optimisation de l'accessibilité

## Étape 8 : Implémentation de l'API EventSource (2025-01-24)
- [x] Création d'un hook personnalisé pour gérer l'EventSource
- [x] Intégration de l'API dans le service de recherche
- [x] Gestion des différents types de messages (results, message, end)
- [x] Stockage des résultats dans le state
- [x] Adaptation des composants pour utiliser les nouveaux résultats
- [x] Tests de l'intégration en temps réel

## Étape 9 : Streaming des réponses LLM (2025-01-24)
- [x] Modification du composant LLMResponse pour supporter le streaming
- [x] Ajout du support des messages en temps réel
- [x] Intégration avec le hook useEventSource
- [x] Amélioration de l'expérience utilisateur avec affichage progressif
- [x] Tests de l'affichage en streaming

## Étape : Optimisation du carrousel de vidéos (2025-01-25)
- [x] Modification du nombre de vidéos affichées sur desktop (4 au lieu de 3)
- [x] Mise à jour des types pour supporter les propriétés thumbnail et age
- [x] Optimisation de l'affichage responsive
- [x] Ajustement du comportement de défilement (1 vidéo à la fois)

## Étape : Optimisation du Responsive Design (2025-01-25)
- [x] Ajustement de la taille de la barre de recherche sur mobile
- [x] Optimisation des espacements et marges pour les petits écrans
- [x] Réduction de la taille des icônes et du texte sur mobile
- [x] Amélioration de l'ergonomie des boutons sur mobile
- [x] Ajustement du layout général pour une meilleure expérience sur tous les appareils
- [x] Optimisation des cards sur mobile (taille réduite, padding ajusté)
- [x] Correction du background de la première card (bg-car → bg-card)

## Étape : Intégration de Brave Search et API Serverless (2025-03-04)
- [x] Création d'une route API dans Next.js App Router pour Brave Search
- [x] Implémentation du streaming des résultats avec SSE (Server-Sent Events)
- [x] Création d'une action côté serveur pour remplacer useEventSource
- [x] Adaptation du format des résultats de Brave Search au format de l'application
- [x] Préparation pour l'intégration future avec un LLM
- [x] Optimisation de la gestion des erreurs et des timeouts
- [x] Utilisation de l'API Brave Search avec la clé d'API existante

## Étape : Refactoring de l'architecture (2025-03-04)
- [x] Simplification de l'architecture en supprimant la route API intermédiaire
- [x] Création d'un service BraveSearch dédié dans lib/services
- [x] Appel direct au service BraveSearch depuis les actions serveur
- [x] Suppression du code de streaming SSE devenu inutile
- [x] Préparation de la structure pour l'intégration future du LLM

## Étape : Amélioration du service BraveSearch (2025-03-04)
- [x] Refactoring du service BraveSearch en utilisant une classe client
- [x] Amélioration des paramètres de requête API (extra_snippets, text_decorations, etc.)
- [x] Optimisation de la gestion des erreurs
- [x] Meilleure organisation du code avec une séparation des responsabilités

## Étape : Implémentation du streaming avec l'AI SDK (2025-03-04)
- [x] Intégration de createStreamableValue pour streamer les résultats de recherche
- [x] Utilisation de readStreamableValue pour lire les mises à jour en temps réel
- [x] Amélioration de l'expérience utilisateur avec affichage progressif des résultats
- [x] Optimisation de la gestion des erreurs dans le flux de streaming
- [x] Préparation pour l'intégration future avec un LLM en streaming

## Étape : Intégration de Cerebras LLM (2025-03-04)
- [x] Installation du package @ai-sdk/cerebras
- [x] Création d'un service dédié pour Cerebras LLM
- [x] Implémentation d'un prompt RAG (Retrieval-Augmented Generation)
- [x] Intégration du LLM dans le flux de recherche
- [x] Affichage des réponses générées par le LLM dans l'interface
- [x] Optimisation de la gestion des erreurs pour le LLM

## Étape : Amélioration de l'UI/UX (2025-03-05)
- [x] Installation de framer-motion pour les animations
- [x] Amélioration du composant RelatedQuestions avec des animations
- [x] Implémentation de la génération de questions connexes
- [x] Intégration des questions connexes dans le flux de recherche
- [x] Amélioration de l'expérience utilisateur avec des transitions fluides

## Étape : Correction du streaming LLM (2025-03-05)
- [x] Correction de l'implémentation du streaming des réponses LLM
- [x] Utilisation de la fonction streamLLMResponse au lieu de generateLLMResponse
- [x] Mise à jour progressive du streamable avec les chunks de texte reçus
- [x] Amélioration de la gestion des erreurs pour le streaming LLM
- [x] Optimisation de l'expérience utilisateur avec un affichage en temps réel

## Étape : Documentation et configuration (2025-03-05)
- [x] Création d'un README bilingue (français et anglais)
- [x] Ajout d'un fichier .env.example pour faciliter la configuration
- [x] Création d'un fichier LICENSE avec la licence MIT
- [x] Documentation des fonctionnalités principales
- [x] Instructions d'installation et d'utilisation

## Étape : Nettoyage et corrections (2025-03-05)
- [x] Correction des dépendances manquantes dans les hooks useEffect
- [x] Optimisation avec useCallback pour éviter les dépendances circulaires
- [x] Suppression des services de recherche basés sur les mocks
- [x] Suppression des données de test (mock-data.json)
- [x] Nettoyage du code pour n'utiliser que les actions serveur
- [x] Correction du problème de requêtes multiples avec l'utilisation d'un drapeau (isSearchingRef)
- [x] Fusion des useEffect pour une meilleure gestion des recherches
- [x] Optimisation des vérifications pour éviter les recherches redondantes

## Étape : Implémentation du carrousel de vidéos animé (2025-03-05)
- [x] Mise à jour du service BraveSearch pour extraire les vidéos de la réponse API
- [x] Adaptation de l'action serveur fetchSearchResults pour traiter les vidéos
- [x] Ajout d'animations avec framer-motion au composant VideoCarousel
- [x] Implémentation d'un effet d'apparition progressive similaire aux questions connexes
- [x] Amélioration de l'expérience utilisateur avec des transitions fluides pour les vidéos
- [x] Optimisation de l'affichage des miniatures vidéo

## Étape : Correction du chargement initial des recherches (2025-03-06)
- [x] Correction du problème empêchant le déclenchement de la recherche lors du chargement initial
- [x] Ajout d'un indicateur spécifique pour le premier rendu de la page
- [x] Optimisation de la logique pour détecter et traiter correctement les requêtes dans l'URL
- [x] Amélioration de la gestion des recherches lors du refresh ou de la navigation depuis la page d'accueil
- [x] Élimination des problèmes de requêtes non déclenchées

## Étape : Correction du carrousel de vidéos (2025-03-06)
- [x] Correction du problème d'affichage où toutes les vidéos étaient visibles simultanément
- [x] Restructuration de l'intégration entre Framer Motion et le composant Carousel
- [x] Optimisation des options de configuration du carrousel (alignement, défilement, boucle)
- [x] Amélioration du positionnement des boutons de navigation
- [x] Uniformisation de la taille des cartes vidéo pour une meilleure cohérence visuelle
- [x] Conservation des animations d'apparition progressive avec délai séquentiel

## Étape : Implémentation des actualités (2025-03-06)
- [x] Mise à jour du service BraveSearch pour extraire les actualités de la réponse API
- [x] Adaptation de l'action serveur fetchSearchResults pour traiter les actualités
- [x] Création du composant NewsHighlights avec un design "À la une"
- [x] Implémentation d'une version desktop avec article principal et articles secondaires
- [x] Création d'une version mobile avec carrousel de cartes pour les actualités
- [x] Ajout d'animations avec framer-motion pour une apparition progressive
- [x] Intégration du composant dans la page de recherche

## Étape : Amélioration des images d'actualités (2025-03-06)
- [x] Implémentation d'un mécanisme de fallback intelligent pour les images d'actualités
- [x] Ajout d'un état local pour gérer la transition de l'image originale vers l'image compressée
- [x] Optimisation du chargement des images avec vérification de la qualité
- [x] Gestion des erreurs avec fallback automatique vers les images de plus basse résolution
- [x] Amélioration de l'expérience utilisateur en évitant les images cassées ou non chargées
- [x] Implémentation d'une solution élégante pour éviter l'affichage d'images floues

## Étape : Optimisation des performances des composants média (2025-03-06)
- [x] Correction des erreurs de lint dans le service BraveSearch
- [x] Implémentation de React.memo pour éviter les re-renders inutiles des composants
- [x] Extraction des composants d'images en sous-composants mémorisés
- [x] Ajout d'attributs de taille et priorité pour optimiser le chargement des images
- [x] Utilisation de clés uniques (URL) pour les éléments de liste pour améliorer la réconciliation React
- [x] Refactorisation du composant SourcesComponent avec sous-composants mémorisés pour les sources et favicons
- [x] Optimisation du composant SerpLink avec extraction des miniatures et favicons en composants mémorisés
- [x] Implémentation d'une fonction de comparaison personnalisée pour la mémorisation efficace des résultats de recherche
- [x] Amélioration de la gestion des erreurs et des fallbacks pour les favicons
- [x] Ajout de l'attribut loading="lazy" pour différer le chargement des images hors-écran
- [x] Élimination du problème de rechargement des images lors de la frappe dans l'input de recherche
- [x] Optimisation du rendu conditionnel pour réduire la charge de travail du DOM

## Étape : Optimisation de la configuration des images Next.js (2025-03-06)
- [x] Modification de `next.config.ts` pour accepter les images de toutes les sources
- [x] Configuration des patterns génériques pour les URLs HTTP et HTTPS
- [x] Simplification de la gestion des domaines autorisés avec wildcards
- [x] Amélioration de la compatibilité avec les différentes sources d'images
- [x] Élimination des restrictions inutiles pour les domaines d'images
- [x] Optimisation pour une meilleure utilisation du composant Image de Next.js

## Étape : Amélioration de l'expérience mobile pour les résultats de recherche (2025-03-06)
- [x] Création d'un hook personnalisé useMediaQuery pour détecter les appareils mobiles
- [x] Implémentation du composant ResponsiveSearchDrawer adaptatif pour desktop et mobile
- [x] Intégration du composant Drawer de shadcn/ui pour l'affichage des résultats sur mobile
- [x] Optimisation de la présentation des résultats selon la taille d'écran
- [x] Amélioration de l'ergonomie sur mobile avec un drawer qui s'ouvre depuis le bas
- [x] Adaptation des SerpLinks pour les afficher correctement dans les deux contextes
- [x] Conservation de l'affichage du drawer latéral traditionnel sur desktop

## Étape : Correction du Drawer mobile pour les résultats de recherche (2025-03-06)
- [x] Résolution du problème de décalage du contenu principal par le drawer mobile
- [x] Amélioration de l'affichage des résultats dans le drawer mobile
- [x] Ajout d'une vérification pour s'assurer que des résultats sont disponibles avant d'afficher le drawer
- [x] Optimisation de la hauteur maximale du drawer pour une meilleure expérience utilisateur
- [x] Amélioration de la gestion des états d'ouverture et de fermeture du drawer
- [x] Élimination des effets de transition qui causaient des problèmes de mise en page
- [x] Ajout d'un message informatif lorsqu'aucun résultat n'est disponible

## Étape : Refonte de l'affichage des résultats sur mobile (2025-03-06)
- [x] Création d'un nouveau composant MobileSearchResults utilisant Dialog de shadcn/ui
- [x] Remplacement du composant Drawer par Dialog pour éviter les problèmes de mise en page
- [x] Résolution des erreurs d'accessibilité et amélioration de l'expérience utilisateur
- [x] Séparation claire entre les implémentations mobile et desktop
- [x] Amélioration de la présentation des résultats de recherche sur mobile
- [x] Optimisation du comportement modal pour une meilleure expérience utilisateur
- [x] Ajout d'un message explicite lorsqu'aucun résultat n'est disponible

## Étape : Implémentation d'un modal personnalisé pour les résultats sur mobile (2025-03-06)
- [x] Abandon des composants Dialog et Drawer de shadcn/ui qui causaient des problèmes de mise en page
- [x] Création d'un modal personnalisé avec un positionnement fixe absolu pour garantir la superposition
- [x] Implémentation d'une solution de blocage du défilement du body lors de l'ouverture du modal
- [x] Amélioration de l'animation d'entrée avec un effet de slide-in depuis le bas
- [x] Optimisation de l'expérience utilisateur en ajoutant une fermeture par clic sur l'overlay
- [x] Résolution définitive du problème de décalage de la page lors de l'ouverture des résultats
- [x] Adaptation du design pour correspondre à l'interface générale de l'application

## Étape : Amélioration du défilement horizontal du composant Sources sur mobile (2025-03-07)
- [x] Remplacement de la grille responsive par un conteneur à défilement horizontal
- [x] Utilisation de la classe `no-scrollbar` pour masquer la barre de défilement tout en permettant le défilement
- [x] Implémentation du défilement tactile fluide avec `snap-x` pour un arrêt précis sur chaque carte
- [x] Uniformisation de la largeur des cartes de sources à 250px pour une meilleure expérience sur mobile
- [x] Ajout de la classe `snap-mandatory` pour garantir l'alignement lors du défilement
- [x] Conservation de la présentation visuelle des sources identique sur desktop et mobile
- [x] Optimisation de l'interaction tactile pour une expérience utilisateur améliorée

## Étape : Amélioration de l'affichage des questions connexes sur mobile (2025-03-06)
- [x] Correction du problème de débordement des questions connexes sur les écrans mobiles
- [x] Ajout de la propriété line-clamp-2 pour limiter à deux lignes le texte des questions longues
- [x] Implémentation de break-words pour gérer correctement les mots longs sans débordement
- [x] Optimisation de la structure des boutons pour s'adapter aux écrans de petite taille
- [x] Utilisation de flex-wrap pour permettre le retour à la ligne du contenu des boutons
- [x] Ajustement des marges et paddings pour un affichage optimal sur mobile
- [x] Conservation de l'icône de flèche avec un alignement correct sur toutes les tailles d'écran

## Étape : Refonte complète des questions connexes pour compatibilité mobile (2025-03-06)
- [x] Remplacement complet de l'implémentation des boutons des questions connexes
- [x] Abandon du composant Button de shadcn/ui au profit d'une structure HTML plus contrôlable
- [x] Utilisation explicite de overflow-hidden à plusieurs niveaux pour empêcher tout débordement
- [x] Application de flexbox avec min-width-0 pour garantir que le texte reste dans son conteneur
- [x] Optimisation des marges et espacements pour un affichage cohérent sur tous les appareils
- [x] Utilisation de la fonction cn() pour une meilleure organisation des classes Tailwind
- [x] Séparation claire des styles de structure et des styles visuels pour une meilleure maintenabilité

## Étape : Correction des problèmes de défilement sur mobile (2025-03-06)
- [x] Suppression de l'écouteur d'événement qui bloquait la propagation du défilement
- [x] Ajout de l'attribut -webkit-overflow-scrolling: touch pour améliorer le défilement sur iOS
- [x] Ajustement de la hauteur maximale du contenu du drawer pour une meilleure expérience
- [x] Application de overflow-auto au conteneur principal pour garantir le défilement de la page
- [x] Simplification de la gestion du défilement pour éviter les conflits entre composants
- [x] Restauration du comportement de défilement natif pour une expérience utilisateur optimale

## Étape : Restauration et optimisation des défilements (2025-03-06)
- [x] Simplification du composant RelatedQuestions pour éviter les blocages de défilement
- [x] Suppression des classes overflow-hidden trop restrictives
- [x] Amélioration du défilement horizontal des sources avec overflow-x-auto et whitespace-nowrap
- [x] Affichage permanent de la barre de défilement horizontale pour une meilleure UX sur mobile
- [x] Nettoyage des modifications qui pouvaient interférer avec le défilement de la page
- [x] Retour à une configuration de base plus robuste pour les conteneurs principaux
- [x] Conservation des optimisations de mise en page des questions connexes tout en rétablissant le défilement

## Étape : Nettoyage des composants et dépendances inutiles (2025-03-06)
- [x] Suppression du composant Dialog de shadcn/ui qui n'est plus utilisé
- [x] Désinstallation de la dépendance @radix-ui/react-dialog
- [x] Conservation uniquement du composant Drawer qui est effectivement utilisé
- [x] Nettoyage des fichiers de composants pour éliminer tout code mort
- [x] Simplification de la structure du projet en gardant uniquement les éléments nécessaires
- [x] Optimisation de la taille du bundle en évitant les importations inutiles
- [x] Finalisation de l'architecture pour une meilleure maintenabilité

## Étape : Expérience - Utilisation du composant NewsHighlights avec des résultats SERP (2025-03-06)
- [x] Adaptation du composant NewsHighlights pour accepter des résultats SERP en prop optionnelle
- [x] Implémentation d'une logique conditionnelle pour utiliser les résultats SERP quand il n'y a pas d'actualités
- [x] Limitation du nombre de résultats SERP à 5 maximum pour l'affichage
- [x] Modification du titre du composant ("Résultats" au lieu de "À la une") quand les résultats SERP sont utilisés
- [x] Mise à jour de la page de recherche pour passer les résultats SERP au composant
- [x] Optimisation du code pour éviter les duplications et les erreurs de rendu
- [x] Conservation du même design et des mêmes animations pour une expérience utilisateur cohérente
- [x] Amélioration de la condition d'affichage pour montrer les résultats SERP même si showNews est false
- [x] Filtrage des résultats SERP pour ne garder que ceux qui ont des images (thumbnail)
- [x] Utilisation de l'image source comme image originale pour améliorer la qualité visuelle des résultats web

## Étape : Optimisation du composant Sources (2025-03-07)
- [x] Amélioration de l'alignement du favicon avec le titre du site
- [x] Réduction de la hauteur des cartes sources pour un affichage plus compact
- [x] Modification du comportement de collapse des titres (passage de line-clamp-2 à line-clamp-1)
- [x] Harmonisation du squelette de chargement (loading skeleton) avec le composant réel
- [x] Réduction de la taille des éléments (favicon, padding, espacement)
- [x] Correction de l'alignement vertical des éléments pour une meilleure présentation
- [x] Optimisation générale de l'affichage pour une expérience utilisateur plus cohérente

## Étape : Correction de l'affichage des ellipsis et alignement des icônes (2025-03-07)
- [x] Remplacement de line-clamp-1 overflow-ellipsis par truncate pour assurer l'affichage des points de suspension
- [x] Ajustement de l'alignement vertical des icônes (passage de mt-[2px] à mt-0.5)
- [x] Harmonisation de tous les composants pour maintenir le même alignement visuel
- [x] Mise à jour du skeleton loader avec les mêmes ajustements
- [x] Vérification visuelle de l'affichage correct des ellipsis sur les titres tronqués
- [x] Amélioration de la cohérence visuelle entre les différentes cartes de sources

## Étape : Amélioration de l'affichage des actualités sur mobile (2025-03-07)
- [x] Remplacement du Carousel par un ScrollArea pour les actualités sur mobile
- [x] Simplification de l'interface de défilement horizontal pour une meilleure lisibilité
- [x] Suppression des boutons de navigation précédent/suivant pour un défilement tactile plus intuitif
- [x] Harmonisation de l'approche avec le composant SourcesComponent
- [x] Ajout d'une barre de défilement horizontale discrète pour indiquer la position
- [x] Optimisation du rendu avec React.memo pour éviter les re-renders inutiles
- [x] Amélioration de l'expérience utilisateur sur les écrans tactiles

## Étape : Harmonisation de l'affichage des vidéos sur mobile (2025-03-07)
- [x] Remplacement du Carousel par un ScrollArea pour les vidéos sur mobile
- [x] Application de la même approche de défilement horizontal que pour les actualités et les sources
- [x] Suppression des boutons de navigation précédent/suivant pour un défilement tactile plus intuitif
- [x] Ajout d'une barre de défilement horizontale discrète pour indiquer la position
- [x] Ajout d'animations d'apparition progressive avec délai séquentiel
- [x] Mise à jour du skeleton loader pour correspondre à la nouvelle interface
- [x] Amélioration de la cohérence visuelle et fonctionnelle entre tous les composants de l'application

## Étape : Amélioration de la gestion des erreurs d'images dans les actualités sur mobile (2025-03-07)
- [x] Implémentation d'un filtrage des articles sans miniatures valides sur mobile
- [x] Gestion des erreurs de chargement d'images pour masquer les articles concernés
- [x] Ajout d'un état local pour suivre les articles avec des images valides
- [x] Synchronisation des articles affichés entre desktop et mobile
- [x] Optimisation de l'expérience utilisateur en évitant d'afficher des cartes sans images
- [x] Mise en place d'un filtre préalable des articles sans images dès le chargement initial
- [x] Ajout d'une condition pour masquer complètement la section si aucun article valide n'est disponible

## Étape : Extension de la gestion des erreurs d'images aux vidéos (2025-03-07)
- [x] Application de la même approche de filtrage des miniatures invalides aux vidéos
- [x] Implémentation de la détection d'erreurs d'images dans les composants VideoThumbnail
- [x] Création d'un filtrage distinct pour les vidéos en version desktop et mobile
- [x] Gestion dynamique des erreurs de chargement d'images sur mobile avec suppressions automatiques
- [x] Amélioration de l'expérience utilisateur en évitant d'afficher des vidéos sans miniatures
- [x] Optimisation des Hooks React pour respecter les règles d'appel (pas de hooks conditionnels)
- [x] Masquage automatique de la section si aucune vidéo valide n'est disponible sur les deux versions

## Étape : Uniformisation de la gestion des erreurs d'images sur toutes les plateformes (2025-03-07)
- [x] Ajout de la détection d'erreurs d'images pour les articles secondaires en version desktop
- [x] Filtrage des articles secondaires sans miniatures valides dans la vue desktop
- [x] Implémentation d'un placeholder pour les images secondaires qui échouent au chargement
- [x] Extension du masquage conditionnel à la vue desktop pour éviter l'affichage d'une section vide
- [x] Harmonisation complète de la gestion des erreurs d'images entre mobile et desktop
- [x] Amélioration de l'expérience utilisateur en évitant d'afficher des liens avec des images cassées
- [x] Vérification du bon fonctionnement des filtres d'images sur tous les types de composants

## Étape : Uniformisation des hauteurs des cartes sur mobile (2025-03-07)
- [x] Restructuration des cartes d'actualités et de vidéos sur mobile avec un layout Flexbox
- [x] Implémentation d'une hauteur fixe pour les CardFooter contenant les dates
- [x] Ajout d'un caractère invisible pour maintenir la hauteur des cartes sans date
- [x] Utilisation des propriétés flex-grow et flex-shrink pour mieux contrôler la distribution de l'espace
- [x] Harmonisation visuelle entre les différents composants (NewsHighlights et VideoCarousel)
- [x] Suppression du composant MobileSkeletonItem devenu obsolète
- [x] Mise à jour des skeletons de chargement pour correspondre au nouveau format

## Étape : Implémentation de la détection d'intention (2025-03-20)
- [x] Installation des bibliothèques fast-levenshtein et @types/fast-levenshtein
- [x] Création du type QueryIntent ('AI_ANSWER' | 'DIRECT_SOURCE')
- [x] Implémentation des fonctions de normalisation (normalizeQuery, normalizeDomain)
- [x] Développement de l'algorithme de détection d'intention basé sur la distance de Levenshtein
- [x] Mise à jour de l'interface SearchResults pour inclure le champ intentType
- [x] Intégration de la détection d'intention dans les fonctions fetchSearchResults et fetchGeminiLLMResponse
- [x] Configuration d'un seuil Levenshtein optimal (LEVENSHTEIN_THRESHOLD = 2)
- [x] Implémentation de la détection d'intention navigationnelle vs informationnelle
- [x] Ajout de logs pour suivre la classification d'intention en temps réel

## Étape : Adaptation de l'interface en fonction de l'intention (2025-03-20)
- [x] Mise à jour de la page de recherche pour utiliser l'intentType reçu de l'API
- [x] Ajout d'un état local detectedIntent dans le composant SearchPageContent
- [x] Implémentation d'une logique conditionnelle pour sélectionner l'onglet approprié en fonction de l'intention
- [x] Ajout de logs pour suivre la détection d'intention et les changements d'onglets
- [x] Configuration d'une règle pour afficher l'onglet "Sources" si l'intention est DIRECT_SOURCE
- [x] Réinitialisation de l'intention détectée lors d'une nouvelle recherche
- [x] Optimisation de l'UX en évitant les changements d'onglets pendant le chargement
- [x] Prévention des conflits entre la détection d'intention et la sélection manuelle d'onglets

## Étape : Amélioration de la détection d'intention avec vérification par concaténation (2025-03-20)
- [x] Refactorisation de la fonction classifyQueryIntent pour une structure plus claire
- [x] Ajout d'une nouvelle logique de détection basée sur la concaténation des mots de la requête
- [x] Implémentation de la vérification des noms de domaine composés (ex: "atnt paris" → "atntparis")
- [x] Optimisation de la détection pour les requêtes courtes (2-3 mots)
- [x] Amélioration des logs pour distinguer les détections par mot et par concaténation
- [x] Validation que les chaînes comparées sont suffisamment significatives (longueur > 3)
- [x] Conservation de la logique initiale avec amélioration de la robustesse
- [x] Élimination des faux positifs avec des conditions de validation plus strictes

## Étape : Refactorisation de la détection d'intention en service dédié (2025-04-01)
- [x] Création d'un nouveau service IntentDetector dans lib/services
- [x] Déplacement de toute la logique de détection d'intention depuis actions.ts vers le service dédié
- [x] Implémentation du modèle Singleton avec export d'une instance unique du service
- [x] Conversion en classe avec méthodes privées (normalizeQuery, normalizeDomain) et publique (classifyQueryIntent)
- [x] Amélioration de la documentation avec JSDoc complet
- [x] Export du type QueryIntent directement depuis le service
- [x] Mise à jour des fichiers actions.ts pour utiliser le nouveau service
- [x] Réduction de la taille et complexité du fichier actions.ts
- [x] Amélioration de la structure et de la maintenabilité du code

## Étape : Ajout de la détection de questions et suppression du hook useInitialTab (2025-04-01)
- [x] Ajout du type d'intention 'ANSWER' pour les requêtes se terminant par un point d'interrogation
- [x] Implémentation d'une priorité haute pour la détection de questions dans le service IntentDetector
- [x] Vérification précoce de la présence du caractère '?' dans la requête
- [x] Suppression du hook useInitialTab devenu redondant
- [x] Refactorisation de la page de recherche pour utiliser uniquement l'intention détectée côté backend
- [x] Implémentation d'un switch complet pour gérer tous les types d'intentions possibles (DIRECT_SOURCE, ANSWER, AI_ANSWER)
- [x] Amélioration des logs pour le suivi de la détection et de la sélection d'onglets
- [x] Simplification du code client avec une logique de détermination d'onglet centralisée
- [x] Correction des problèmes de typages pour assurer la cohérence

## Étape : Recentrage de la gestion des onglets dans SearchResultTabs (2025-04-01)
- [x] Déplacement de la gestion de l'état des onglets dans SearchResultTabs pour autonomie du composant
- [x] Implémentation d'une initialisation unique de l'onglet actif par requête via intentType
- [x] Utilisation d'une ref pour mémoriser la requête pour laquelle l'onglet a déjà été défini
- [x] Suppression du contrôle externe de l'onglet actif depuis la page parente
- [x] Optimisation de l'expérience utilisateur en donnant contrôle total après initialisation
- [x] Réinitialisation de la ref lors d'un changement manuel d'onglet par l'utilisateur
- [x] Amélioration des logs pour visualiser le processus d'initialisation des onglets
- [x] Introduction d'une distinction explicite entre initialisation automatique et sélection manuelle
- [x] Modification du type UITab pour une meilleure cohérence entre les composants

## Étape : Amélioration de la gestion de l'article principal en version desktop (2025-03-07)
- [x] Modification du comportement pour supprimer l'article principal s'il n'a pas d'image valide
- [x] Mise en place d'un mécanisme de promotion du premier article secondaire valide en article principal
- [x] Adaptation de la liste des articles secondaires pour éviter les doublons après promotion
- [x] Suppression intelligente des articles sans image plutôt que l'affichage de placeholders peu esthétiques
- [x] Harmonisation du comportement entre les versions mobile et desktop
- [x] Optimisation de l'expérience utilisateur avec une présentation plus soignée
- [x] Amélioration de la qualité visuelle globale de la section actualités

## Étape : Élimination complète des placeholders pour les images manquantes (2025-03-07)
- [x] Suppression du code affichant les placeholders (icône de journal) pour les images manquantes
- [x] Modification du composant MainNewsImage pour retourner null au lieu d'un placeholder
- [x] Simplification de la vérification de la validité de l'article principal
- [x] Renforcement du filtrage pour éviter tout affichage d'article sans image valide
- [x] Optimisation de la logique de remontée des articles secondaires en principal
- [x] Élimination des derniers cas où un placeholder pourrait apparaître
- [x] Amélioration de l'apparence générale en s'assurant qu'aucun espace vide n'est affiché 

## Étape : Renforcement du filtrage des images invalides (2025-03-07)
- [x] Implémentation d'un filtrage plus strict dans NewsHighlightsComponent
- [x] Vérification que les URL d'images commencent par "http" pour éviter les données invalides
- [x] Contrôle de type pour s'assurer que les sources d'images sont des chaînes de caractères valides
- [x] Filtrage proactif des résultats avant toute tentative d'affichage
- [x] Multiple couches de filtrage à différents niveaux (composant principal, sous-composants, composants d'image)
- [x] Vérification redondante pour garantir qu'aucun résultat sans image valide n'est affiché
- [x] Optimisation du comportement des tags "as string" pour éviter les erreurs TypeScript

## Étape : Traitement spécial des résultats Instagram (2025-03-07)
- [x] Création d'un nouveau composant InstagramResults pour afficher les résultats Instagram sans images
- [x] Implémentation d'un filtrage des résultats Instagram dans NewsHighlightsComponent
- [x] Utilisation d'un affichage simplifié basé sur des cartes textuelles pour les résultats Instagram
- [x] Intégration du nouveau composant InstagramResults dans la page de recherche après la section LLMResponse
- [x] Séparation claire des résultats Instagram des autres types de résultats
- [x] Amélioration de l'expérience utilisateur en évitant les placeholders d'images problématiques
- [x] Optimisation de l'affichage avec une grille responsive pour différentes tailles d'écran
- [x] Suppression définitive du problème d'affichage des placeholders pour les images Instagram

## Étape : Implémentation de l'onglet YouTube (2025-03-19)
- [x] Création du service d'intégration YouTube pour interroger l'API YouTube
- [x] Définition des types TypeScript pour les réponses de l'API YouTube
- [x] Mise à jour des actions serveur pour inclure les résultats YouTube
- [x] Développement du composant YouTubeResults avec versions mobile et desktop
- [x] Intégration dans SearchResultTabs avec un nouvel onglet actif
- [x] Ajout d'effets visuels et d'animations pour améliorer l'expérience utilisateur
- [x] Gestion des erreurs et fallback vers des données fictives
- [x] Formatage des dates avec date-fns pour afficher les dates relatives
- [x] Design responsive adapté aux différentes tailles d'écran
- [x] Intégration harmonieuse avec l'identité visuelle de ClaireVue
- [x] Filtrage intelligent des miniatures invalides

## Amélioration du texte du footer

- [x] Modification du texte du footer pour mieux correspondre à la mission d'un moteur de recherche
- [x] Remplacement de "transformer le web en contenu viral" par "pour une recherche web européenne fiable"
- [x] Conservation de l'icône cœur et de l'animation
- [x] Harmonisation du message avec l'identité de FactFinder en tant que moteur de recherche européen
- [x] Amélioration de la cohérence entre le texte du footer et le slogan "Make European Search Great Again"

## Ajout d'une touche d'humour au footer

- [x] Modification du texte du footer pour un ton plus ludique et décalé
- [x] Remplacement du texte par "parce que vous méritez mieux que Google"
- [x] Introduction d'une touche d'humour pour se démarquer des moteurs de recherche traditionnels
- [x] Positionnement de FactFinder comme une alternative amusante et audacieuse à Google
- [x] Conservation de l'icône cœur animée pour maintenir l'aspect chaleureux et sympathique
- [x] Création d'une identité de marque plus mémorable grâce à l'humour et à l'audace

## Prochaines étapes

# Rebranding de FactFinder vers ClaireVue

## Étape 1 : Planification du rebranding
- [x] Analyse de l'identité actuelle de FactFinder
- [x] Définition de la nouvelle identité "ClaireVue"
- [x] Choix du nouveau slogan "La clarté à chaque recherche"
- [x] Préparation d'un plan de migration en 4 MVP

## MVP 1 : Version rebrandée de base
- [x] Création d'un nouveau logo pour ClaireVue
  - Création d'un logo SVG représentant une loupe stylisée
  - Stockage du logo dans public/clairevue-logo.svg
  - Création d'un favicon SVG temporaire
- [x] Définition d'une nouvelle palette de couleurs
  - Passage à une palette de bleus clairs évoquant la clarté
  - Mise à jour des variables dans globals.css avec des teintes de bleu
  - Ajout d'animations CSS pour les effets de transition
- [x] Mise à jour de l'en-tête et du pied de page
  - Mise à jour du nom dans la page d'accueil
  - Changement des dégradés de couleur pour utiliser la nouvelle palette
  - Modification du message dans le footer
- [x] Modification des métadonnées et du favicon
  - Mise à jour du titre et de la description pour refléter la nouvelle marque
  - Ajout de la référence au favicon SVG dans layout.tsx
- [x] Mise à jour du nom du projet
  - Changement du nom dans package.json de "factfinder" à "clairevue"

## MVP 2 : Interface modernisée
- [x] Refonte de la barre de recherche
  - Ajout d'un effet de transparence subtil avec backdrop-blur
  - Amélioration des transitions et animations
  - Mise à jour du texte du placeholder
  - Optimisation de l'accessibilité avec des attributs aria-label
  - Utilisation de la nouvelle palette de couleurs
- [x] Mise à jour des icônes
  - Remplacement de l'icône Brain par un logo moderne avec loupe
  - Utilisation d'icônes plus pertinentes sur toutes les pages
  - Application cohérente des styles d'icônes dans tous les composants
- [x] Refonte des cartes de fonctionnalités
  - Ajout d'un effet de transparence avec backdrop-blur
  - Amélioration des effets de survol
  - Encapsulation des icônes dans des cercles colorés
  - Optimisation des espacements et des marges
  - Utilisation cohérente de la nouvelle palette de couleurs
- [x] Modernisation de la section "Analyse"
  - Harmonisation du design des cartes LLMResponse et Sources
  - Application des effets de transparence et backdrop-blur
  - Utilisation de gradients de texte pour les titres
  - Refonte des skeletons de chargement avec la nouvelle palette
  - Amélioration des transitions et animations
- [x] Harmonisation graphique de toutes les pages
  - Cohérence visuelle entre la page d'accueil et la page de recherche
  - Remplacement de tous les éléments "FactFinder" par "ClaireVue"
  - Mise à jour des dégradés de fond avec les nouvelles couleurs
  - Application uniforme de la nouvelle palette aux éléments d'interface

## MVP 3 : Développement des fonctionnalités
- [ ] Création d'une fonction "Résumé IA"

## Étape : Implémentation d'un système d'onglets pour les résultats de recherche (2025-03-07)
- [x] Installation du package @radix-ui/react-tabs pour créer un composant Tabs
- [x] Création d'un composant UI pour les onglets dans src/components/ui/tabs.tsx
- [x] Développement du composant SearchResultTabs qui regroupe les résultats
- [x] Ajout d'onglets "Réponse" et "Sources" pour organiser l'information
- [x] Intégration des SerpLinks dans l'onglet "Sources" avec badge de comptage
- [x] Adaptation du composant SourcesComponent pour supporter un mode compact
- [x] Remplacement des composants indépendants dans la page de recherche par le système d'onglets
- [x] Dépréciation progressive du composant ResponsiveSearchDrawer au profit des onglets
- [x] Amélioration de l'UX en centralisant les résultats dans une interface unifiée
- [x] Conservation de l'apparence visuelle cohérente avec le thème ClaireVue
- [x] Optimisation du mode d'affichage des sources : masquage des autres composants lorsque l'onglet "Sources" est actif
- [x] Amélioration du défilement pour l'onglet Sources en utilisant le défilement naturel de la page au lieu d'un conteneur de défilement distinct
- [x] Refonte de l'affichage des sources selon un format de moteur de recherche traditionnel (1 résultat par ligne)
- [x] Ajout d'indices numériques pour chaque résultat et alternance de couleurs pour une meilleure lisibilité
- [x] Uniformisation de la hauteur des résultats de recherche pour une présentation plus cohérente
- [x] Optimisation de l'affichage des descriptions pour éviter les coupures de phrases (passage à 3 lignes)

## Amélioration de l'expérience utilisateur et du message de marque
- [x] Modernisation des cartes de fonctionnalités sur la page d'accueil
  - Restructuration avec des titres et paragraphes explicatifs
  - Ajout d'effets de survol améliorés (scale, shadow, couleurs)
  - Application cohérente des gradients sur les titres
  - Amélioration de l'espacement et de la hiérarchie visuelle
- [x] Amélioration des messages de marque
  - Mise à jour du slogan principal pour plus d'impact
  - Création de nouveaux messages alignés avec l'identité "Vision claire"
  - Développement de descriptions détaillées pour chaque fonctionnalité
  - Optimisation des microtextes pour l'engagement utilisateur
- [x] Utilisation d'icônes plus significatives
  - Remplacement par des icônes plus pertinentes (Eye, Shield, BarChart)
  - Alignement avec les concepts de clarté, fiabilité et analyse
- [x] Optimisation de l'affichage mobile
  - Amélioration de l'espacement vertical pour éviter l'écrasement du contenu
  - Ajustement des tailles de texte et d'icônes pour une meilleure lisibilité sur mobile
  - Correction de l'alignement du footer et amélioration de son affichage sur mobile
  - Réduction des marges latérales pour maximiser l'espace d'affichage
  - Ajout d'un padding en haut pour éviter le chevauchement avec la barre de navigation
  - Meilleure organisation des cartes de fonctionnalités sur petit écran

## Étape : Modernisation de la section Analyse (2025-03-07)
- [x] Amélioration du composant LLMResponse
  - Ajout d'animations d'entrée avec framer-motion
  - Amélioration des effets de survol avec transitions fluides
  - Ajout d'effets de transparence et backdrop-blur
  - Optimisation des transitions avec duration-300
  - Harmonisation des icônes et des espacements
- [x] Modernisation du composant SourcesComponent
  - Ajout d'animations d'entrée avec un léger délai
  - Amélioration des effets de survol des icônes
  - Harmonisation des tailles d'icônes avec LLMResponse
  - Optimisation des transitions et animations
  - Cohérence visuelle avec la section Analyse
- [x] Harmonisation visuelle globale
  - Utilisation cohérente des gradients de texte
  - Uniformisation des effets de transparence
  - Standardisation des espacements et des marges
  - Amélioration de l'expérience utilisateur avec des transitions fluides
  - Création d'une identité visuelle cohérente pour la section Analyse

## Étape : Création du composant AnalysisHighlights (2025-03-07)
- [x] Création d'un nouveau composant combinant LLMResponse et NewsHighlights
- [x] Implémentation d'un layout en grille pour afficher l'analyse et l'article principal côte à côte
- [x] Ajout d'un badge "IA" avec effet de gradient et icône Sparkles
- [x] Harmonisation du style avec les autres composants (transparence, backdrop-blur, transitions)
- [x] Optimisation de l'affichage des images et du contenu
- [x] Amélioration de l'expérience utilisateur avec des animations fluides
- [x] Gestion intelligente des résultats sans images valides
- [x] Adaptation responsive pour les différentes tailles d'écran

## Amélioration de l'interactivité des résultats de recherche (2023-06-03)

- [x] Rendre toute la zone de chaque résultat de recherche cliquable
- [x] Appliquer un effet de survol uniforme à toute la zone du résultat
- [x] Amélioration de la transition avec une durée de 300ms
- [x] Ajout d'un effet de groupe pour que l'effet de survol soit cohérent sur tous les éléments
- [x] Suppression des effets de survol redondants dans le composant SerpLink

## Simplification de l'affichage des sources (2023-06-03)

- [x] Suppression de la numérotation des sources dans l'onglet "Sources"
- [x] Nettoyage de la présentation pour un affichage plus épuré
- [x] Meilleure cohérence visuelle avec les autres éléments de l'interface
- [x] Élimination des distractions visuelles pour se concentrer sur les informations essentielles

## Amélioration de l'ergonomie de l'interface (2023-06-03)

- [x] Repositionnement des onglets (tabs) pour les rapprocher de la barre de recherche
- [x] Réduction de l'espace vertical entre la barre de recherche et les onglets
- [x] Limitation de la largeur des onglets pour s'aligner avec la barre de recherche
- [x] Amélioration de la cohérence visuelle et de l'expérience utilisateur

## Amélioration des onglets dans le style de Google (2023-06-03)

- [x] Refonte complète des onglets pour ressembler à l'interface de Google Search
- [x] Suppression du fond et des bordures au profit d'un design plus épuré
- [x] Ajout d'un indicateur actif sous forme de ligne colorée sous l'onglet actif
- [x] Animation fluide de transition entre les onglets
- [x] Ajout d'onglets supplémentaires désactivés (Images, Vidéos, Actualités) pour une apparence plus complète
- [x] Harmonisation du style avec les conventions de design des moteurs de recherche modernes
- [x] Amélioration de l'espacement vertical pour une meilleure lisibilité

## Correction du scroll vertical indésirable (2023-06-03)

- [x] Ajout de la classe `overflow-y-hidden` à la liste des onglets pour empêcher le défilement vertical
- [x] Implémentation correcte de la classe `no-scrollbar` dans le fichier CSS global
- [x] Utilisation de webkit-scrollbar, ms-overflow-style et scrollbar-width pour une compatibilité multi-navigateurs
- [x] Élimination du petit espace de défilement vertical tout en conservant le défilement horizontal

## Création d'un nouvel onglet "Réponse" (2023-06-03)

- [x] Ajout d'un troisième onglet "Réponse" à l'interface de recherche
- [x] Séparation claire entre l'onglet "IA" (avec AnalysisHighlights) et l'onglet "Réponse" (LLM + Sources)
- [x] Organisation de l'onglet "Réponse" avec le composant SourcesComponent suivi de la réponse LLM
- [x] Utilisation de l'icône MessageSquare pour représenter cet onglet
- [x] Conservation des autres onglets et de leur fonctionnalité existante
- [x] Amélioration de la navigation entre les différentes vues des résultats

## Amélioration de l'affichage des sources dans les onglets (2023-06-03)

- [x] Correction du comportement du bouton "Voir plus" dans l'onglet "Réponse"
- [x] Implémentation d'un mode d'affichage avancé pour montrer jusqu'à 8 sources sans changer d'onglet
- [x] Ajout d'un bouton "Voir moins" pour réduire l'affichage après expansion
- [x] Comportement différencié entre les onglets "IA" (redirection vers Sources) et "Réponse" (expansion locale)
- [x] Augmentation du nombre de sources visibles par défaut dans l'onglet "Réponse" (4 au lieu de 3)
- [x] Meilleure expérience utilisateur en évitant les changements d'onglets inutiles

## Standardisation de l'affichage des sources (2023-06-03)

- [x] Simplification du composant SourcesComponent pour afficher exactement 3 sources + bouton "voir plus"
- [x] Uniformisation du comportement du bouton "voir plus" pour toujours rediriger vers l'onglet Sources
- [x] Suppression de la logique conditionnelle en fonction du mode compact/non-compact
- [x] Élimination du bouton "voir moins" devenu inutile
- [x] Amélioration de la cohérence de l'interface utilisateur entre tous les onglets
- [x] Suppression des paramètres non utilisés pour un code plus propre

## Optimisation de l'affichage des sources sur desktop (2023-06-03)

- [x] Amélioration de la visibilité du quatrième élément (bouton "voir plus")
- [x] Réduction de la largeur des cartes individuelles pour un meilleur affichage (de 210px à 180px)
- [x] Remplacement du composant ScrollArea par une div native avec overflow-x-auto
- [x] Augmentation de la largeur maximale du conteneur parent à 95vw
- [x] Optimisation des marges et du padding pour un meilleur espacement
- [x] Élimination des contraintes qui limitaient la visibilité de tous les éléments
- [x] Simplification du code en supprimant les dépendances inutiles

## Optimisation de l'interface responsive pour les sources (2023-06-03)

- [x] Suppression de la barre de défilement horizontal sur desktop pour les sources
- [x] Conservation du défilement horizontal uniquement sur mobile avec `overflow-x-auto`
- [x] Utilisation de `flex-wrap` sur desktop pour afficher les sources sur plusieurs lignes
- [x] Augmentation de la largeur des conteneurs sur desktop (max-w-7xl)
- [x] Élargissement des cartes de sources en desktop pour utiliser l'espace disponible
- [x] Augmentation de l'espacement entre les cartes sur desktop (`gap-4` au lieu de `gap-2`)
- [x] Application du centrage horizontal avec `mx-auto` pour améliorer l'équilibre visuel
- [x] Adaptation intelligente entre l'affichage mobile (scrollable) et desktop (multi-lignes)

## Refonte complète du composant Sources avec layout en grille (2023-06-03)

- [x] Remplacement complet du système flex par un layout en grille (grid) pour un affichage plus fiable
- [x] Utilisation de `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` pour garantir l'affichage de tous les éléments
- [x] Adaptation des cartes pour utiliser toute la largeur disponible dans chaque cellule de la grille
- [x] Élimination des problèmes de débordement et d'espacement irrégulier
- [x] Mise à jour du skeleton loader pour correspondre au nouveau format
- [x] Suppression des comportements responsives complexes qui causaient des problèmes
- [x] Meilleure adaptation aux différentes tailles d'écran avec des breakpoints standards

## Correction de l'architecture de l'interface et élimination des doublons (2023-06-04)

- [x] Refonte de l'architecture des composants dans la page de recherche
- [x] Déplacement de tous les composants de contenu (NewsHighlights, VideoCarousel, RelatedQuestions) dans SearchResultTabs
- [x] Élimination de la duplication des sections de contenu entre les différents onglets
- [x] Passage de toutes les données nécessaires via props au composant SearchResultTabs
- [x] Organisation cohérente du contenu avec une séparation claire entre les onglets
- [x] Amélioration de la maintenabilité en centralisant la gestion de l'interface
- [x] Élimination des imports inutilisés et nettoyage du code

## Amélioration de l'alignement et de la cohérence visuelle (2023-06-04)

- [x] Unification de l'alignement entre l'en-tête, la barre de recherche et les onglets
- [x] Ajout de `mx-auto` et `max-w-3xl` à l'en-tête pour l'aligner parfaitement avec les éléments suivants
- [x] Correction du conteneur principal avec `mx-auto` pour un centrage parfait
- [x] Optimisation des espacements entre les éléments (space-y-8) pour une meilleure respiration visuelle
- [x] Réduction des espacements entre les résultats de recherche dans l'onglet Sources pour une densité d'information optimale
- [x] Simplification de la structure des conteneurs pour éliminer les propriétés redondantes
- [x] Amélioration générale de la cohérence visuelle entre tous les éléments de l'interface

## Implémentation du mode automatique et intelligent pour les onglets (2023-06-05)

- [x] Création d'un hook personnalisé `useInitialTab` pour déterminer l'onglet initial en fonction du contenu de la requête
- [x] Implémentation de la logique de détection:
  - Si la requête contient un "?", activation de l'onglet "answer"
  - Si la requête ne contient qu'un seul mot, activation de l'onglet "sources"
  - Pour tous les autres types de requêtes, affichage par défaut de l'onglet "response"
- [x] Intégration du hook dans la page de recherche avec gestion de l'état de l'onglet actif
- [x] Ajout des propriétés `activeTab` et `onTabChange` à l'interface du composant `SearchResultTabs`
- [x] Mise en place d'une gestion propre de l'état local et des props dans le composant
- [x] Préservation totale du style et de l'apparence de l'interface utilisateur existante
- [x] Création d'une architecture évolutive permettant de modifier facilement l'algorithme de détection à l'avenir

## Amélioration du hook useInitialTab pour l'analyse des requêtes (2023-06-05)

- [x] Correction du hook useInitialTab pour analyser à nouveau la requête à chaque changement significatif
- [x] Remplacement du mécanisme `hasAnalyzedRef` par un suivi de la requête précédente via `previousQueryRef`
- [x] Mise en place d'une vérification pour éviter les analyses redondantes des requêtes identiques
- [x] Conservation de la même logique d'analyse pour déterminer l'onglet approprié
- [x] Amélioration de l'expérience utilisateur en adaptant automatiquement l'onglet actif à chaque nouvelle recherche
- [x] Optimisation du code pour une meilleure lisibilité et maintenance

## Étape : Correction de l'intégration Gemini (2025-03-04)
- [x] Correction des problèmes de compatibilité de types avec @ai-sdk/google
- [x] Migration vers le modèle gemini-pro pour une meilleure stabilité
- [x] Mise à jour des commentaires et de la documentation
- [x] Optimisation du code pour une meilleure maintenabilité

## Étape : Implémentation de l'internationalisation avec i18next (2025-03-30)
- [x] Installation des packages i18next, react-i18next, i18next-http-backend et i18next-browser-languagedetector
- [x] Création de la structure des fichiers de traduction dans public/locales/
- [x] Configuration du client i18next avec support navigateur et détection automatique de la langue
- [x] Création d'un composant I18nProvider pour gérer l'internationalisation
- [x] Correction des problèmes d'hydratation SSR/CSR avec stratégie de rendu conditionnel
- [x] Mise en place d'une API route pour servir les fichiers de traduction
- [x] Implémentation d'un ClientLayout pour éviter les erreurs d'hydratation des composants avec textes traduits
- [x] Restructuration de l'initialisation i18next pour éviter l'exécution côté serveur
- [x] Amélioration des composants pour utiliser les traductions avec useTranslation hook

## Étape : Internationalisation progressive des composants (2025-03-30)
- [x] Enrichissement des fichiers de traduction JSON avec de nouvelles clés
- [x] Ajout des traductions pour les onglets dans SearchResultTabs
- [x] Intégration des traductions dans le composant SerpLink
- [x] Ajout du support i18n dans SourcesComponent pour les libellés
- [x] Internationalisation du composant LLMResponse
- [x] Traduction des boutons et messages dans RelatedQuestions
- [x] Organisation des traductions par sections (footer, tabs, results, etc.)
- [x] Maintien de la structure de code propre avec imports correctement organisés
- [x] Tests et vérification du bon fonctionnement sur différentes langues
- [x] Correction des derniers problèmes d'hydratation

## Étape : Internationalisation complète de l'interface (2025-03-30)
- [x] Ajout de traductions pour le composant VideoCarousel
- [x] Internationalisation du composant NewsHighlights
- [x] Traduction des textes dans le composant AnalysisHighlights
- [x] Ajout de traductions pour les messages concernant les résultats
- [x] Organisation des fichiers de traduction en sections thématiques
- [x] Implémentation de la substitution de variables dans les traductions
- [x] Optimisation des composants pour éviter les traductions inutiles
- [x] Vérification de la cohérence des traductions entre les composants
- [x] Documentation des clés de traduction et de leur utilisation

## Étape : Utilisation du composant Trans pour la pluralisation dynamique dans AnalysisHighlights (2025-03-30)
- [x] Implémentation de la pluralisation dynamique dans le composant AnalysisHighlights
- [x] Vérification du bon fonctionnement de la pluralisation
- [x] Amélioration de l'expérience utilisateur avec des traductions adaptées

## Support multilingue (FR/EN)

1. Ajout du paramètre de langue dans les services :
   - Modification de `searchWithBrave` pour prendre en compte la langue (FR/US)
   - Adaptation des prompts LLM pour générer des réponses dans la langue sélectionnée
   - Mise à jour des questions connexes pour respecter la langue choisie

2. Intégration dans l'interface :
   - Utilisation de la langue sélectionnée dans le composant de recherche
   - Passage de la langue à travers toute la chaîne d'appels
   - Adaptation des résultats de recherche en fonction de la langue

## Étape : Correction de l'API de localisation (2025-03-04)
- [x] Correction du typage des paramètres de route dans l'API de localisation
- [x] Mise à jour de la structure des paramètres pour Next.js App Router
- [x] Optimisation de la gestion des erreurs

## Étape : Optimisation de l'internationalisation (2025-03-06)
- [x] Suppression de la route API redondante pour les fichiers de traduction
- [x] Conservation de la configuration i18next existante qui utilise les fichiers statiques
- [x] Optimisation de l'accès aux fichiers de traduction directement depuis le dossier public
- [x] Réduction de la complexité et amélioration des performances en éliminant une couche d'API
- [x] Simplification de l'architecture pour les fichiers de localisation

## Étape : Implémentation de l'API de recherche d'images (2025-03-04)
- [x] Création du service `braveImageSearch.ts` pour l'API Brave Image Search
- [x] Implémentation de la fonction `searchImagesWithBrave` pour effectuer des recherches d'images
- [x] Test et vérification du bon fonctionnement de la nouvelle API

## Étape : Ajout de la gestion du chargement et des erreurs (2025-03-04)
- [x] Implémentation d'un composant ImageGallery pour l'affichage des images avec prévisualisation
- [x] Test et vérification du bon fonctionnement de la nouvelle fonctionnalité

## Étape : Implémentation des pages légales (2025-03-31)
- [x] Création de la structure des pages juridiques avec /legal/terms et /legal/privacy
- [x] Mise en place d'un layout partagé pour les pages légales avec sélecteur de langue
- [x] Implémentation du contenu des CGU et de la politique de confidentialité en français et anglais
- [x] Intégration de react-markdown pour l'affichage formaté des documents légaux
- [x] Mise à jour du Footer pour inclure des liens vers les CGU et la politique de confidentialité
- [x] Redirection de l'ancienne route /cgu vers /legal/terms pour maintenir la compatibilité
- [x] Ajout des traductions nécessaires dans les fichiers de localisation
- [x] Optimisation de la navigation et de l'expérience utilisateur pour les pages légales
- [x] Installation du composant shadcn/ui dropdown-menu pour le sélecteur de langue

## Étape : Correction d'éléments d'interface (2025-03-07)
- [x] Correction de l'affichage du logo "ClaireVue" où le dernier 'e' apparaissait coupé
- [x] Suppression de la classe "tracking-tighter" qui compressait trop le texte
- [x] Ajout d'un padding-right pour assurer l'affichage complet du texte

## Étape 3: Restructurer l'API Route

- Déplacé la logique de l'API de `src/app/api/route.ts` vers `src/app/api/redis/route.ts` pour une meilleure organisation.

## Étape 8: Réinitialiser les états lors d'une nouvelle recherche

- **Fichier modifié:** `src/app/search/page.tsx`
- **Objectif:** Vider les résultats de la recherche précédente (résultats, messages, vidéos, actualités, questions associées, vidéos YouTube) lorsqu'une nouvelle recherche est lancée pour éviter d'afficher des données périmées.
- **Implémentation:** Ajout de l'appel aux fonctions `set...` pour réinitialiser les états correspondants au début de la fonction `handleSearch`.

## Amélioration de l'expérience mobile pour la barre de recherche

- Ajout de `enterKeyHint="search"` à l'input pour afficher un bouton "Rechercher" sur le clavier mobile (iOS).
- Ajout de `inputRef.current?.blur()` dans `handleSubmit` pour fermer automatiquement le clavier après la soumission de la recherche.

## Étape : Configuration PWA et affichage plein écran iOS (Date actuelle)
- [x] Création du fichier `public/manifest.json` avec les configurations de base PWA et le nom "ClaireVue"
- [x] Ajout des métadonnées `apple-mobile-web-app-capable` pour iOS
- [x] Ajout des métadonnées `apple-mobile-web-app-status-bar-style` pour la barre d'état iOS
- [x] Ajout des métadonnées `apple-mobile-web-app-title` ("ClaireVue") pour le titre de l'app sur l'écran d'accueil iOS
- [x] Ajout du lien vers le `manifest.json` dans `src/app/layout.tsx`
- [x] Ajout des métadonnées `appleWebApp` (avec title: 'ClaireVue') dans `src/app/layout.tsx` pour Next.js

## Étape : Correction du problème des balises manquantes dans le Root Layout (2025-04-08)
- [x] Identification du problème des balises `<html>` et `<body>` manquantes
- [x] Correction du fichier `src/app/legal/layout.tsx` qui rendait `null` pendant le montage
- [x] Mise à jour pour renvoyer un conteneur `<div>` avec les enfants pendant le montage
- [x] Résolution de l'erreur "The following tags are missing in the Root Layout: <html>, <body>"
- [x] Vérification que tous les layouts (y compris les layouts imbriqués) respectent la structure de Next.js