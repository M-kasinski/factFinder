"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegalIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers les CGU par défaut
    router.push("/legal/terms");
  }, [router]);

  return null;
}
