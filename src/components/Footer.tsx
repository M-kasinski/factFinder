import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 border-t border-border/40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start text-sm text-muted-foreground">
          <span>Créé avec</span>
          <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
          <span>parce que vous méritez une recherche claire et transparente</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1 md:mt-0">
          © 2025 ClaireVue
        </div>
      </div>
    </footer>
  );
} 