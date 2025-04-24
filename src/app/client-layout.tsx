"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { Footer } from "@/components/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

// Key for local storage
const SEARCH_BAR_POSITION_KEY = 'searchBarPosition';

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const [searchBarPosition, setSearchBarPosition] = useState<'top' | 'bottom'>('top');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updatePosition = () => {
      const savedPosition = localStorage.getItem(SEARCH_BAR_POSITION_KEY) as 'top' | 'bottom' | null;
      setSearchBarPosition(savedPosition === 'bottom' ? 'bottom' : 'top');
    };

    updatePosition();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SEARCH_BAR_POSITION_KEY && event.newValue) {
        setSearchBarPosition(event.newValue as 'top' | 'bottom');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isClient]);

  const hideFooter = isClient && pathname === '/search' && searchBarPosition === 'bottom';

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
} 