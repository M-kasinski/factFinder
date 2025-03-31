"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CGURedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/legal/terms");
  }, [router]);

  return null;
}
