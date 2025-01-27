"use client";

import React, { useState } from 'react';
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

const ImageWithFallback = ({ src, alt, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="object-contain"
        {...props}
      />
    </div>
  );
};

export function SerpLink({ title, url, date, description, onClick, meta_url, profile, thumbnail }: SerpLinkProps) {
  // Fonction pour formater l'URL en breadcrumb
  const formatBreadcrumb = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return (
        <div className="flex items-center gap-2 text-sm max-w-[500px] overflow-hidden">
          <span className="text-muted-foreground truncate">{profile?.name || urlObj.hostname}</span>
          {pathParts.length > 0 && (
            <div className="flex items-center gap-1 overflow-hidden">
              {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span className="text-muted-foreground/60 mx-1 flex-shrink-0">›</span>
                  <span className="text-muted-foreground truncate">{part}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      );
    } catch {
      return <span className="text-muted-foreground">{url}</span>;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="max-w-2xl cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* URL Breadcrumb with Favicon */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              {meta_url?.favicon && (
                <div className="w-4 h-4 relative flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={meta_url.favicon}
                    alt={profile?.name || "site icon"}
                    fill
                    sizes="16px"
                    className="object-contain"
                  />
                </div>
              )}
              {formatBreadcrumb(url)}
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
          <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
              src={thumbnail.src}
              alt={title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
} 