import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 border-t border-border/40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <span>Créé avec</span>
          <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
          <span>pour transformer le web en contenu viral</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © 2025 FactFinder
        </div>
      </div>
    </footer>
  );
} 