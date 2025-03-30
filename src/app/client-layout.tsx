"use client";

import { ReactNode, useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <Footer />
    </>
  );
} 