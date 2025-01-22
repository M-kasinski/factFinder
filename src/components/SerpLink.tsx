"use client";

import React from 'react';

interface SerpLinkProps {
  title: string;
  url: string;
  date: string;
  description: string;
  onClick?: () => void;
}

export function SerpLink({ title, url, date, description, onClick }: SerpLinkProps) {
  // Fonction pour formater l'URL en breadcrumb
  const formatBreadcrumb = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return (
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">{urlObj.hostname}</span>
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className="text-muted-foreground/60 mx-1">›</span>
              <span className="text-muted-foreground">{part}</span>
            </React.Fragment>
          ))}
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
      {/* URL Breadcrumb */}
      <div className="flex items-center gap-2 mb-1">
        {formatBreadcrumb(url)}
        <span className="text-muted-foreground/60">-</span>
        <span className="text-muted-foreground">{date}</span>
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
  );
} 