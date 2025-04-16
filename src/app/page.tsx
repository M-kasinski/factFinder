"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { Eye, Shield, BarChart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation(["common", "home"]);
  const [isClient, setIsClient] = useState(false);

  // Ce useEffect est nécessaire pour éviter les erreurs d'hydratation avec Next.js
  useEffect(() => {
    setIsClient(true);
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
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex flex-col items-center pt-16 md:pt-0 md:justify-center min-h-[calc(100vh-130px)]">
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

          <div className="w-full max-w-[95%] md:max-w-2xl mx-auto transform transition-all duration-200 hover:scale-[1.02] animate-fade-in-up delay-100 mb-10 md:mb-12 px-0 md:px-0">
            <SearchBar
              onSearch={handleSearch}
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 w-full max-w-5xl mx-auto animate-fade-in-up delay-200 px-2 md:px-4 pb-10">
            <div className="group p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-[0_0_15px_#4B9FFF4D] hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("home:features.clearVision.title")}
                </h3>
              </div>
              <p className="text-sm md:text-base text-foreground/90 pl-[2.8rem]">
                {t("home:features.clearVision.description")}
              </p>
            </div>
            
            <div className="group p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-[0_0_15px_#4B9FFF4D] hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("home:features.verifiedSources.title")}
                </h3>
              </div>
              <p className="text-sm md:text-base text-foreground/90 pl-[2.8rem]">
                {t("home:features.verifiedSources.description")}
              </p>
            </div>
            
            <div className="group p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-[0_0_15px_#4B9FFF4D] hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <BarChart className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("home:features.smartAnalysis.title")}
                </h3>
              </div>
              <p className="text-sm md:text-base text-foreground/90 pl-[2.8rem]">
                {t("home:features.smartAnalysis.description")}
              </p>
            </div>
          </div>
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
