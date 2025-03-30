"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>("");

  useEffect(() => {
    setCurrentLang(i18n.language || "fr");
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 p-2 hover:bg-primary/10 rounded-full transition-colors"
      aria-label="Changer de langue"
    >
      <Globe className="h-5 w-5 text-foreground/80" />
      <span className="text-sm font-medium uppercase">{currentLang}</span>
    </button>
  );
}
