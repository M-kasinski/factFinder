"use client";

import React, { useState, memo } from 'react';
import Image, { ImageProps } from 'next/image';
import { decode } from 'he';
import { useTranslation } from 'react-i18next';

interface SerpLinkProps {
  title: string;
  url: string;
  date?: string;
  description: string;
  onClick?: () => void;
  meta_url?: {
    favicon: string;
  };
  profile?: {
    name: string;
  };
  thumbnail?: {
    src: string;
  };
}

type ImageWithFallbackProps = Omit<ImageProps, 'src'> & {
  src: string;
  alt: string;
};

// Composant mémorisé pour les images avec fallback
const ImageWithFallback = memo(({ src, alt, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="object-contain"
        loading="lazy"
        {...props}
      />
    </div>
  );
});
ImageWithFallback.displayName = 'ImageWithFallback';

// Composant mémorisé pour le favicon
const Favicon = memo(({ favicon, profileName }: { favicon: string; profileName: string }) => (
  <div className="w-4 h-4 relative flex-shrink-0 overflow-hidden">
    <ImageWithFallback
      src={favicon}
      alt={profileName || "site icon"}
      fill
      sizes="16px"
      className="object-contain"
    />
  </div>
));
Favicon.displayName = 'Favicon';

// Composant mémorisé pour la miniature
const Thumbnail = memo(({ src, title }: { src: string; title: string }) => (
  <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-muted">
    <ImageWithFallback
      src={src}
      alt={title}
      fill
      sizes="96px"
      className="object-cover"
    />
  </div>
));
Thumbnail.displayName = 'Thumbnail';

// Fonction pour déterminer si deux props sont égales (pour la mémorisation)
const arePropsEqual = (prevProps: SerpLinkProps, nextProps: SerpLinkProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.url === nextProps.url &&
    // prevProps.date === nextProps.date && // Supprimé car date n'est plus utilisé
    prevProps.description === nextProps.description &&
    prevProps.meta_url?.favicon === nextProps.meta_url?.favicon &&
    prevProps.profile?.name === nextProps.profile?.name &&
    prevProps.thumbnail?.src === nextProps.thumbnail?.src
  );
};

// Fonction pour formater l'URL en breadcrumb
const formatUrlAsBreadcrumb = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/').filter(part => part !== '');
    // Affiche le nom d'hôte et les parties du chemin
    return `${parsedUrl.hostname} ${pathParts.length > 0 ? '› ' + pathParts.join(' › ') : ''}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) { 
    // Retourne l'URL telle quelle si elle est invalide
    return url;
  }
};

// Composant principal SerpLink mémorisé
// Supprimer 'date' de la déstructuration des props
const SerpLinkComponent = ({ title, url, description, onClick, meta_url, profile, thumbnail }: SerpLinkProps) => {
  // Utilise la fonction pour formater l'URL
  const breadcrumbUrl = formatUrlAsBreadcrumb(url);

  return (
    // Remplacer div par a et ajouter href, target, rel
    <a 
      href={url}
      target="_blank" // Ouvre dans un nouvel onglet
      rel="noopener noreferrer" // Pour la sécurité
      onClick={onClick} // Garde le onClick s'il a une fonction spécifique
      className="block max-w-2xl w-full p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150" // Ajout de block et styles de survol
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Section Profile Name (si présent) - Favicon et Date supprimés */}
          {profile?.name && (
            <div className="text-sm mb-1"> 
              {profile.name}
            </div>
          )}

          {/* Breadcrumb URL avec Favicon */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate mt-1">
            {meta_url?.favicon && (
              <Favicon favicon={meta_url.favicon} profileName={profile?.name || ""} />
            )}
            <span>{breadcrumbUrl}</span> {/* Envelopper le texte dans un span pour un meilleur alignement */}
          </div>

          {/* Title */}
          <h3 className="text-lg text-primary hover:underline mt-1 font-medium line-clamp-2"> {/* Taille ajustée et poids de police */}
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {decode(description)}
          </p>
        </div>

        {/* Thumbnail */}
        {thumbnail?.src && (
          <Thumbnail src={thumbnail.src} title={title} />
        )}
      </div>
    </a> // Ajout de la balise fermante <a> ici
  );
};

// Export du composant mémorisé
export const SerpLink = memo(SerpLinkComponent, arePropsEqual);
