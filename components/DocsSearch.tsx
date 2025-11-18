"use client";

import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import DocumentCard from "@/components/DocumentCard";
import type { DocItem } from "@/data/docs";

type Props = {
  docs: DocItem[];
  initialCategory?: string;
  initialQuery?: string;
};

export default function DocsSearch({ docs, initialCategory, initialQuery }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState<string>(initialQuery ?? "");
  const [debouncedQ, setDebouncedQ] = useState<string>(q);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQ) params.set("q", debouncedQ);
    else params.delete("q");
    if (initialCategory) params.set("c", initialCategory);
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedQ, pathname]);

  const filteredByCategory = useMemo(() => {
    return initialCategory ? docs.filter((d) => d.category === initialCategory) : docs;
  }, [docs, initialCategory]);

  const fuse = useMemo(() => {
    return new Fuse(filteredByCategory, {
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
  }, [filteredByCategory]);

  const results = useMemo(() => {
    if (!debouncedQ) return filteredByCategory.map((item) => ({ item, matches: undefined }));
    return fuse.search(debouncedQ).map((r) => ({ item: r.item, matches: r.matches }));
  }, [debouncedQ, fuse, filteredByCategory]);

  function highlightText(text: string, indices: readonly [number, number][]): ReactNode {
    if (!indices || indices.length === 0) return text;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    indices.forEach(([start, end], idx) => {
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }
      parts.push(
        <span key={`h-${idx}`} className="bg-yellow-200 dark:bg-yellow-700 text-foreground">
          {text.slice(start, end + 1)}
        </span>
      );
      lastIndex = end + 1;
    });
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return <>{parts}</>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Buscar por título, descripción o categoría" />
        <div className="text-sm text-muted-foreground">{results.length} resultados</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(({ item, matches }) => {
          const titleMatch = matches?.find((m) => m.key === "title");
          const descMatch = matches?.find((m) => m.key === "description");
          const catMatch = matches?.find((m) => m.key === "category");
          const titleNode = titleMatch ? highlightText(item.title, titleMatch.indices) : undefined;
          const descriptionNode = descMatch ? highlightText(item.description, descMatch.indices) : undefined;
          const categoryNode = catMatch ? highlightText(item.category, catMatch.indices) : undefined;
          return (
            <DocumentCard
              key={item.slug}
              doc={item}
              titleNode={titleNode}
              descriptionNode={descriptionNode}
              categoryNode={categoryNode}
            />
          );
        })}
      </div>
    </div>
  );
}