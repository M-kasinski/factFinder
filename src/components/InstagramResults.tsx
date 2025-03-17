import { SearchResult } from "@/types/search";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface InstagramResultsProps {
  results: SearchResult[];
  isVisible: boolean;
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const InstagramItem = React.memo(({ result }: { result: SearchResult }) => {
  console.log(result);
  return (
    <motion.div variants={item} className="w-full">
      <Card className="hover:border-primary/30 hover:shadow-md transition-all duration-300">
        <div className="flex p-4">
          <div className="flex-shrink-0 mr-4">
            <div className="relative w-10 h-10">
              <Image
                src="/Instagram_Glyph_Gradient.svg"
                alt="Instagram"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <CardDescription className="text-xs font-medium">
                {result.meta_url?.hostname?.replace("www.", "") ||
                  "instagram.com"}
              </CardDescription>
            </div>
            <CardTitle className="text-sm font-medium line-clamp-2 mb-1">
              {result.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {result.description}
            </p>
            <div className="flex items-center">
              <Link
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs inline-flex items-center gap-1 text-primary hover:underline"
              >
                Voir le post
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>
              {result.age && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {result.age}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});
InstagramItem.displayName = "InstagramItem";

// Skeleton loader pour les résultats Instagram
const InstagramSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-muted-foreground/20" />
      <div className="h-6 w-40 bg-muted-foreground/20 rounded-lg" />
    </div>

    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20 mr-4 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted-foreground/20 rounded w-24" />
              <div className="h-4 bg-muted-foreground/20 rounded w-full" />
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
              <div className="h-3 bg-muted-foreground/10 rounded w-1/3 mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function InstagramResultsComponent({
  results,
  isVisible,
}: InstagramResultsProps) {
  // État de chargement
  const [isLoading, setIsLoading] = React.useState(true);

  // Filtrer uniquement les résultats Instagram
  const instagramResults = results.filter(
    (result) =>
      result.meta_url?.hostname?.includes("instagram")
  );

  // Utiliser useEffect pour simuler le temps de chargement
  React.useEffect(() => {
    if (results.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [results]);

  // Afficher le skeleton loader pendant le chargement
  if (isLoading && isVisible) {
    return <InstagramSkeleton />;
  }

  // Ne rien afficher s'il n'y a pas de résultats Instagram ou si le composant ne doit pas être visible
  if (!isVisible || instagramResults.length === 0) return null;

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <div className="relative w-6 h-6">
          <Image
            src="/Instagram_Glyph_Gradient.svg"
            alt="Instagram Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold">Résultats Instagram</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {instagramResults.map((result) => (
          <InstagramItem key={result.url} result={result} />
        ))}
      </div>
    </motion.div>
  );
}

// Utiliser React.memo avec une fonction de comparaison personnalisée pour le composant principal
export const InstagramResults = React.memo(
  InstagramResultsComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isVisible === nextProps.isVisible &&
      prevProps.results === nextProps.results
    );
  }
);
