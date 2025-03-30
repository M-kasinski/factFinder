"use client";

import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("common");
  
  return (
    <footer className="w-full py-4 px-4 border-t border-border/40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start text-sm text-muted-foreground">
          <span>{t("footer.createdWith")}</span>
          <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
          <span>{t("footer.because")}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 md:mt-0">
          <a href="/cgu" className="hover:underline">{t("footer.termsOfService")}</a> 
          <span>{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
