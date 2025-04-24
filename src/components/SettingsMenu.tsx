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

// Key for local storage
const LOCAL_STORAGE_KEY = 'showConversationFeature';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  // State for the toggle, defaulting to true
  const [showPromo, setShowPromo] = useState(true);

  // Effect to load the setting from local storage on mount (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      // Default to true if not found or invalid
      setShowPromo(savedValue === null ? true : JSON.parse(savedValue));
    }
  }, []);

  // Handler to update state and local storage
  const handleToggleChange = (checked: boolean) => {
    setShowPromo(checked);
    if (typeof window !== 'undefined') {
      const newValue = JSON.stringify(checked);
      localStorage.setItem(LOCAL_STORAGE_KEY, newValue);
      // Manually dispatch a storage event to notify other components/tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_KEY,
        newValue: newValue,
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
              onCheckedChange={handleToggleChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 