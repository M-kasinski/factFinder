"use client";

import React, { useState } from "react";
import { Image as AntImage } from "antd";
import { ImageSearchResult } from "@/lib/services/braveImageSearch";
import { Spinner } from "@/components/ui/spinner";
import { ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ImageGalleryProps {
  images: ImageSearchResult[];
  isLoading: boolean;
  className?: string;
}

export function ImageGallery({ images, isLoading, className = "" }: ImageGalleryProps) {
  const { t } = useTranslation("common");
  const fallbackSrc = "/image-placeholder.svg";
  // État pour suivre les images qui ont échoué au chargement
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Fonction pour marquer une image comme ayant échoué
  const handleImageError = (image: ImageSearchResult) => {
    setFailedImages(prev => ({
      ...prev,
      [image.imageUrl]: true
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner className="h-10 w-10 text-primary" />
        <p className="mt-4 text-muted-foreground">{t("results.loadingImages")}</p>
      </div>
    );
  }

  // Filtrer les images qui ont échoué au chargement
  const filteredImages = images.filter(img => !failedImages[img.imageUrl]);

  if (!filteredImages || filteredImages.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
        <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
        <p>{t("results.noImagesFound")}</p>
      </div>
    );
  }

  // Groupe les images pour l'aperçu en groupe (uniquement les images filtrées)
  const previewItems = filteredImages.map(img => ({
    src: img.imageUrl,
    alt: img.title,
  }));

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}>
      <AntImage.PreviewGroup
        items={previewItems}
        preview={{
          toolbarRender: (originalNode: React.ReactNode, { current, total }: { current: number; total: number }) => (
            <>
              {originalNode}
              <div className="ant-image-preview-toolbar-info">
                {current} / {total}
              </div>
            </>
          ),
        }}
      >
        {filteredImages.map((image, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <AntImage
              src={image.thumbnailUrl}
              alt={image.title}
              wrapperStyle={{ width: '100%', height: '100%' }}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              placeholder={
                <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              }
              fallback={fallbackSrc}
              preview={{
                src: image.imageUrl, // URL de l'image originale pour la prévisualisation
                mask: (
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-white text-sm">Voir</div>
                  </div>
                ),
              }}
              onError={() => handleImageError(image)}
            />
            {/* Info sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs truncate">{image.title}</p>
              <p className="text-white/70 text-[10px] truncate">{image.sourceDomain}</p>
            </div>
          </div>
        ))}
      </AntImage.PreviewGroup>
    </div>
  );
} 