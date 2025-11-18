"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 text-muted-foreground" />

      <Input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Buscar documentos por título, descripción o categoría"}
        aria-label={placeholder ?? "Buscar documentos"}
        className={
          "pl-14 h-14 text-lg rounded-xl border border-input bg-transparent shadow-sm placeholder:opacity-80 focus:shadow-md transition-colors transition-shadow md:text-base"
        }
      />

    </div>
  );
}