"use client";

import React from 'react';
import Image from 'next/image';

interface SerpLinkProps {
  title: string;
  url: string;
  date?: string;
  description: string;
  onClick?: () => void;
  metaUrl?: {
    favicon: string;
  };
  profile?: {
    name: string;
  };
  thumbnail?: {
    src: string;
  };
}

export function SerpLink({ title, url, date, description, onClick, metaUrl, profile, thumbnail }: SerpLinkProps) {
  // Fonction pour formater l'URL en breadcrumb
  const formatBreadcrumb = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return (
        <div className="flex items-center gap-1 text-sm max-w-[500px] overflow-hidden">
          <div className="flex items-center gap-2">
            {metaUrl?.favicon && (
              <div className="w-4 h-4 relative flex-shrink-0">
                <Image
                  src={metaUrl.favicon}
                  alt={profile?.name || "site icon"}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-muted-foreground truncate">{profile?.name || urlObj.hostname}</span>
          </div>
          <div className="flex items-center gap-1 overflow-hidden">
            {pathParts.map((part, index) => (
              <React.Fragment key={index}>
                <span className="text-muted-foreground/60 mx-1 flex-shrink-0">›</span>
                <span className="text-muted-foreground truncate">{part}</span>
              </React.Fragment>
            ))}
          </div>
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
        <div className="flex-1">
          {/* URL Breadcrumb */}
          <div className="flex items-center gap-2 mb-1">
            {formatBreadcrumb(url)}
            {date && (
              <>
                <span className="text-muted-foreground/60">-</span>
                <span className="text-muted-foreground">{date}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl text-primary hover:underline mt-1 font-normal">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Thumbnail */}
        {thumbnail?.src && (
          <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={thumbnail.src}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
} 