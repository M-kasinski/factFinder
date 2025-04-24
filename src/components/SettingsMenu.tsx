"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";

// Keys for local storage
const LOCAL_STORAGE_KEY_PROMO = 'showConversationFeature';
const LOCAL_STORAGE_KEY_POSITION = 'searchBarPosition'; // New key

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  // State for the promo toggle
  const [showPromo, setShowPromo] = useState(true);
  // State for the search bar position, defaulting to 'top'
  const [searchBarPosition, setSearchBarPosition] = useState<'top' | 'bottom'>('top');

  // Effect to load settings from local storage on mount (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load promo setting
      const savedPromoValue = localStorage.getItem(LOCAL_STORAGE_KEY_PROMO);
      setShowPromo(savedPromoValue === null ? true : JSON.parse(savedPromoValue));

      // Load position setting
      const savedPosition = localStorage.getItem(LOCAL_STORAGE_KEY_POSITION) as 'top' | 'bottom' | null;
      setSearchBarPosition(savedPosition === 'bottom' ? 'bottom' : 'top');
    }
  }, []);

  // Handler to update promo state and local storage
  const handlePromoToggleChange = (checked: boolean) => {
    setShowPromo(checked);
    if (typeof window !== 'undefined') {
      const newValue = JSON.stringify(checked);
      localStorage.setItem(LOCAL_STORAGE_KEY_PROMO, newValue);
      window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_KEY_PROMO,
        newValue: newValue,
        storageArea: localStorage,
      }));
    }
  };

  // Handler to update position state and local storage
  const handlePositionChange = (checked: boolean) => {
    const newPosition = checked ? 'bottom' : 'top';
    setSearchBarPosition(newPosition);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY_POSITION, newPosition);
      window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_KEY_POSITION,
        newValue: newPosition,
        storageArea: localStorage,
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">{t("settings.title")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("settings.title")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span>{t("settings.language")}</span>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center justify-between">
            <span>{t("settings.theme")}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="pr-4">
              {t("settings.showConversationFeature")}
            </span>
            <Switch
              checked={showPromo}
              onCheckedChange={handlePromoToggleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="pr-4">
              {t("settings.searchBarPosition")} ({searchBarPosition === 'top' ? t('settings.positionTop', 'Top') : t('settings.positionBottom', 'Bottom')})
            </span>
            <Switch
              checked={searchBarPosition === 'bottom'}
              onCheckedChange={handlePositionChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 