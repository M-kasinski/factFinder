"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function DarkClassSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "legacy-dark" || resolvedTheme === "standard-dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return null;
}
