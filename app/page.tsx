import Link from "next/link";
import { FileText, Search, ShieldCheck, Download } from "lucide-react";

export default function Home() {
  return (
    <main className="relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-35">

        <div className="grid gap-20 lg:grid-cols-2 items-center">

          {/* -------------------------------------------
             LEFT HERO CONTENT
          -------------------------------------------- */}
          <div className="space-y-10">

            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs text-muted-foreground bg-white/5 backdrop-blur-md shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Plataforma de documentación profesional
            </span>

            <h1 className="text-5xl font-extrabold tracking-tight leading-tight sm:text-6xl">
              Organiza y consulta tus{" "}
              <span className="text-primary">documentos técnicos</span>
            </h1>

            <p className="max-w-prose text-lg text-muted-foreground leading-relaxed">
              Accede a manuales, procedimientos y documentación técnica en formato
              HTML desde un panel rápido, moderno y pensado para productividad.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition"
              >
                <FileText className="size-4" />
                Explorar documentación
              </Link>

              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm text-muted-foreground hover:bg-muted transition"
              >
                <Search className="size-4" />
                Buscar
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 pt-2">
              <Feature icon={<Search className="size-5 text-primary" />} title="Búsqueda avanzada" />
              <Feature icon={<FileText className="size-5 text-primary" />} title="Lectura inmediata" />
              <Feature icon={<Download className="size-5 text-primary" />} title="Descargas directas" />
              <Feature icon={<ShieldCheck className="size-5 text-primary" />} title="Contenido seguro" />
            </div>

          </div>

          {/* -------------------------------------------
             RIGHT SIDE — MODERN COVER CARD
          -------------------------------------------- */}
          <div className="relative">
            <div className="rounded-2xl border bg-card shadow-xl overflow-hidden backdrop-blur-xl">

              <div className="flex items-center gap-2 px-4 py-2 bg-muted/60 border-b">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
              </div>

              <picture>
                <source srcSet="/images/hero-docs-cover.jpg" type="image/jpg" />
                <img
                  src="/images/hero-docs-cover.jpg"
                  alt="Documentación"
                  className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                />
              </picture>

              <div className="p-6">
                <h3 className="text-lg font-semibold">Documentación centralizada</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Visualiza manuales, procedimientos y guías técnicas en formato HTML,
                  organizadas por categorías y listas para consultar rápidamente.
                </p>

                <div className="mt-5 flex justify-end items-center">
                  <Link
                    href="/docs"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Ver documentación →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </div>
  );
}
