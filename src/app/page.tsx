"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { SettingsMenu } from "@/components/SettingsMenu";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ConversationFeature } from "@/components/landing/ConversationFeature";

// Key for local storage - must match the one in SettingsMenu
const LOCAL_STORAGE_KEY = 'showConversationFeature';

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation(["common", "home"]);
  const [isClient, setIsClient] = useState(false);
  // State to control ConversationFeature visibility, default true
  const [showConversationFeature, setShowConversationFeature] = useState(true);

  // Effect to load setting and handle client-side hydration
  useEffect(() => {
    setIsClient(true); // Handle hydration
    // Load setting from local storage (client-side)
    if (typeof window !== 'undefined') {
      const loadSetting = () => {
        const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        setShowConversationFeature(savedValue === null ? true : JSON.parse(savedValue));
      };

      loadSetting(); // Initial load

      // Listener for changes triggered by SettingsMenu (or other tabs)
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === LOCAL_STORAGE_KEY) {
          loadSetting(); // Reload setting when the relevant key changes
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Retourner un chargement minimal pendant l'hydratation côté client
  if (!isClient) {
    return <div className="flex-1 flex flex-col"></div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="container relative flex-1 mx-auto px-4 pb-8 md:pb-16">
        <div className="absolute top-4 right-4">
          <SettingsMenu />
        </div>

        <div className="flex flex-col items-center pt-16">
          <div className="text-center space-y-4 mb-8 md:mb-10">
            <div className="flex flex-col items-center justify-center gap-0 md:gap-1 text-primary animate-fade-in">
              <Image 
                src="/spiral_svg.svg" 
                alt="ClaireVue Logo" 
                width={200} 
                height={200} 
                className="w-32 h-32 md:w-[200px] md:h-[200px]"
                priority
              />
              <h1 className="-mt-4 md:-mt-8 text-3xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pr-1">
                ClaireVue
              </h1>
            </div>
            <p className="text-lg md:text-2xl font-semibold text-primary/90 max-w-[600px] mx-auto animate-fade-in-up px-2 md:px-4">
              {t("home:slogan")}
            </p>
          </div>

          <div className="w-full max-w-[95%] md:max-w-2xl mx-auto transform transition-all duration-200 hover:scale-[1.02] animate-fade-in-up delay-100 px-0 md:px-0 mb-32">
            <SearchBar
              onSearch={handleSearch}
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>

          {/* Conditionally render Conversation Feature section */}
          {isClient && showConversationFeature && <ConversationFeature />}
        </div>

        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4B9FFF] to-[#E0F7FA] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4B9FFF] to-[#E0F7FA] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
}
