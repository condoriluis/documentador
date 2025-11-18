"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Fuse from "fuse.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileText, Search } from "lucide-react";
import Link from "next/link";
import type { DocItem } from "@/data/docs";

type Props = {
  docs: DocItem[];
};

export default function CommandPalette({ docs }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          const next = !v;
          if (!next) setQuery("");
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(docs, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.3 },
        { name: "category", weight: 0.2 },
        { name: "slug", weight: 0.1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
      includeMatches: true,
    });
  }, [docs]);

  const results = useMemo(() => {
    if (!query) return docs.slice(0, 8).map((item) => ({ item, matches: undefined }));
    return fuse.search(query).map((r) => ({ item: r.item, matches: r.matches })).slice(0, 8);
  }, [query, fuse, docs]);

  function highlightText(text: string, indices: readonly [number, number][]): ReactNode {
    if (!indices || indices.length === 0) return text;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    indices.forEach(([start, end], idx) => {
      if (start > lastIndex) parts.push(text.slice(lastIndex, start));
      parts.push(
        <span key={`cp-${idx}`} className="bg-yellow-200 dark:bg-yellow-700 text-foreground">
          {text.slice(start, end + 1)}
        </span>
      );
      lastIndex = end + 1;
    });
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return <>{parts}</>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setQuery("");
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Search className="size-4" /> Buscar documentos
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe palabras clave…"
          />
          <ul className="divide-y rounded-md border">
            {results.map(({ item, matches }) => {
              const titleMatch = matches?.find((m) => m.key === "title");
              const descMatch = matches?.find((m) => m.key === "description");
              const titleNode = titleMatch ? highlightText(item.title, titleMatch.indices) : item.title;
              const descNode = descMatch ? highlightText(item.description, descMatch.indices) : item.description;
              return (
                <li key={item.slug} className="">
                  <Link
                    href={`/docs/${item.slug}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent"
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <FileText className="size-4 text-primary" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{titleNode}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{descNode}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">Sin resultados</li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}