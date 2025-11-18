"use client";

import { FileText, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommandPalette from "@/components/CommandPalette";
import { docs } from "@/data/docs";

export default function Navbar() {
  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/docs" className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <span className="font-semibold">Docs</span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Inicio</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/docs">Documentos</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => {
              const evt = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
              window.dispatchEvent(evt);
            }}
          >
            <Search className="size-4" /> Buscar (Ctrl+K)
          </Button>
        </nav>
      </div>
      <CommandPalette docs={docs} />
    </header>
  );
}