import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { RootProvider } from './providers';
import { ThemeSwitch } from '@/components/ui/theme-switch';

export const metadata: Metadata = {
  title: "Sistema de Documentación | Nextjs v16, React, TypeScript",
  description: "Sistema estático profesional para documentar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Documentador</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="relative min-h-screen bg-gray-100 dark:bg-gray-900 ">
        <RootProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-56px)]">{children}
            <div className="fixed bottom-4 left-4 z-50">
              <ThemeSwitch />
            </div>
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
