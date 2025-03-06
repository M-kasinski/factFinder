"use client";

import React, { useState, memo } from 'react';
import Image, { ImageProps } from 'next/image';
import { decode } from 'he';

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
    prevProps.date === nextProps.date &&
    prevProps.description === nextProps.description &&
    prevProps.meta_url?.favicon === nextProps.meta_url?.favicon &&
    prevProps.profile?.name === nextProps.profile?.name &&
    prevProps.thumbnail?.src === nextProps.thumbnail?.src
  );
};

// Composant principal SerpLink mémorisé
const SerpLinkComponent = ({ title, date, description, onClick, meta_url, profile, thumbnail }: SerpLinkProps) => {
  return (
    <div 
      onClick={onClick}
      className="max-w-2xl cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              {meta_url?.favicon && (
                <Favicon favicon={meta_url.favicon} profileName={profile?.name || ""} />
              )}
              {profile?.name}
            </div>
            {date && (
              <>
                <span className="text-muted-foreground/60 flex-shrink-0">-</span>
                <span className="text-muted-foreground flex-shrink-0">{date}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl text-primary hover:underline mt-1 font-normal line-clamp-2">
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
    </div>
  );
};

// Export du composant mémorisé
export const SerpLink = memo(SerpLinkComponent, arePropsEqual); 