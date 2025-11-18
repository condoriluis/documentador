import { docs, getCategories } from "@/data/docs";
import DocsSearch from "@/components/DocsSearch";
import Link from "next/link";

export const dynamic = "force-static";

export default function DocsPage({ searchParams }: { searchParams?: { c?: string; q?: string } }) {
  const category = searchParams?.c;
  const initialQuery = searchParams?.q;
  const categories = getCategories();
  const params = new URLSearchParams();
  if (initialQuery) params.set("q", initialQuery);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Explora, filtra y busca tus documentos.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/docs${initialQuery ? `?${(() => { const p=new URLSearchParams(params); p.delete('c'); return p.toString(); })()}` : ""}`}
            className={`rounded-full border px-3 py-1 text-sm ${!category ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent"}`}
          >
            Todos
          </Link>
          {categories.map((c) => {
            const p = new URLSearchParams(params);
            p.set("c", c);
            return (
              <Link
                key={c}
                href={`/docs?${p.toString()}`}
                className={`rounded-full border px-3 py-1 text-sm ${category === c ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent"}`}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </div>
      <DocsSearch docs={docs} initialCategory={category} initialQuery={initialQuery} />
    </div>
  );
}