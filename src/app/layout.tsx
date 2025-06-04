import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/next';
import I18nProvider from "@/i18n/I18nProvider";
import ClientLayout from "./client-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: "ClaireVue - La clarté à chaque recherche",
  description: "Un moteur de recherche français qui offre des résultats clairs, sourcés et impartiaux",
  icons: {
    icon: [
      { url: '/spiral_svg.svg', type: 'image/svg+xml' }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ClaireVue'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="legacy-light"
          themes={[
            "legacy-light",
            "legacy-dark",
            "standard-light",
            "standard-dark",
          ]}
          value={{
            "legacy-light": "legacy-light",
            "legacy-dark": "legacy-dark dark",
            "standard-light": "standard-light",
            "standard-dark": "standard-dark dark",
          }}
        >
          <I18nProvider>
            <TooltipProvider>
              <ClientLayout>
                <main className="flex-1 flex flex-col w-full">    
                  {children}
                  <Analytics />
                </main>
              </ClientLayout>
            </TooltipProvider>
            <Toaster richColors closeButton position="top-center" />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
