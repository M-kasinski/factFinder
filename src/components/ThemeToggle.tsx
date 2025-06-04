"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("themeToggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="legacy-light">
            {t("settings.legacyLight")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="legacy-dark">
            {t("settings.legacyDark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="standard-light">
            {t("settings.standardLight")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="standard-dark">
            {t("settings.standardDark")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
