"use client"

import { useState, useEffect } from 'react'

/**
 * Hook personnalisé pour détecter les média queries
 * @param query La media query à surveiller (ex: "(max-width: 768px)")
 * @returns Un booléen indiquant si la media query correspond
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Par défaut, on considère que c'est false côté serveur
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query)
      
      // Définir l'état initial
      setMatches(media.matches)
      
      // Callback pour mettre à jour l'état en cas de changement
      const listener = () => setMatches(media.matches)
      
      // Ajouter l'écouteur d'événement
      media.addEventListener('change', listener)
      
      // Nettoyer l'écouteur d'événement
      return () => media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
} 