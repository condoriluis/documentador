import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { RootProvider } from './providers';
import { ThemeSwitch } from '@/components/ui/theme-switch';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Documentador",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <RootProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-56px)]">{children}
            <div className="fixed left-3 bottom-3 sm:left-4 sm:bottom-4 z-50 pointer-events-auto">
              <ThemeSwitch />
            </div>
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
