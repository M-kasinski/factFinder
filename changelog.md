# Changelog

## 2025-03-19 - SearchBar Improvements

### Added
- Créé le fichier `project-structure.md` avec une description complète de l'arborescence du projet

### Modified
- **SearchBar.tsx**: Remplacé l'icône de recherche vocale par un bouton de réinitialisation
  - Remplacé l'importation de `Mic` par `X` depuis lucide-react
  - Ajouté un bouton conditionnel avec l'icône X qui n'apparaît que lorsqu'il y a du texte
  - Le bouton de réinitialisation efface le contenu de la barre de recherche
  - Amélioré l'accessibilité avec un attribut aria-label approprié

### Enhanced
- **SearchBar.tsx**: Ajouté la fonctionnalité de focus automatique après réinitialisation
  - Importé `useRef` de React pour créer une référence à l'élément input
  - Ajouté une référence `inputRef` à l'élément input
  - Modifié le gestionnaire d'événements du bouton de réinitialisation pour mettre le focus sur l'input après avoir effacé le contenu
  - Utilisé `setTimeout` avec délai de 0ms pour assurer la mise à jour correcte de l'état

## Détails techniques

### Modifications du fichier SearchBar.tsx

#### Changement d'importation
```diff
- import { useState } from "react";
- import { Search, Mic } from "lucide-react";
+ import { useState, useRef } from "react";
+ import { Search, X } from "lucide-react";
```

#### Ajout de la référence
```diff
export function SearchBar({ onSearch, value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
+ const inputRef = useRef<HTMLInputElement>(null);
```

#### Ajout de la référence à l'input
```diff
<input
+ ref={inputRef}
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  ...
/>
```

#### Remplacement du bouton de recherche vocale
```diff
- <button 
-   type="button"
-   className="p-2 md:p-2.5 hover:bg-primary/10 rounded-full transition-colors"
-   onClick={() => console.log('Voice search not implemented')}
-   aria-label="Recherche vocale"
- >
-   <Mic className="h-5 w-5 md:h-6 md:w-6 text-primary" />
- </button>
+ {value && (
+   <button 
+     type="button"
+     className="p-2 md:p-2.5 hover:bg-primary/10 rounded-full transition-colors"
+     onClick={() => {
+       onChange('');
+       // Mettre le focus sur l'input après avoir effacé
+       setTimeout(() => inputRef.current?.focus(), 0);
+     }}
+     aria-label="Effacer la recherche"
+   >
+     <X className="h-5 w-5 md:h-6 md:w-6 text-primary" />
+   </button>
+ )}
```

## Comportement de l'interface

1. La barre de recherche affiche désormais un bouton X lorsqu'elle contient du texte
2. En cliquant sur le bouton X :
   - Le contenu de la barre de recherche est effacé
   - Le focus est automatiquement replacé sur la barre de recherche
   - L'utilisateur peut immédiatement commencer à saisir une nouvelle requête
3. Le bouton X disparaît lorsque la barre de recherche est vide

Cette modification améliore l'ergonomie et permet aux utilisateurs de réinitialiser et de saisir une nouvelle requête plus rapidement.
