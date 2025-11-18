"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DocViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const ext = (file || "").split(".").pop()?.toLowerCase() ?? "";
  const isHtml = ext === "html" || ext === "htm";
  const fileLabel = isHtml ? "HTML" : "PDF";

  useEffect(() => {
    setLoaded(false);
    setError(null);
    setAvailable(null);

    const controller = new AbortController();
    const check = async () => {
      try {
        const res = await fetch(file, { method: "HEAD", signal: controller.signal });
        if (!res.ok) {
          setAvailable(false);
          setError(
            `No se encontró el archivo "${(file || "/").split("/").pop()}". Verifica que exista en /public${isHtml ? "/html" : "/pdfs"} (HTTP ${res.status}).`
          );
        } else {
          setAvailable(true);
        }
      } catch (e: any) {
        if (e.name === "AbortError") return;
        setAvailable(false);
        setError(`No se pudo verificar la disponibilidad del ${fileLabel}. ` + (e?.message ?? ""));
      }
    };
    check();
    return () => controller.abort();
  }, [file]);

  useEffect(() => {
    if (available !== true) return;
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [available, file]);

  useEffect(() => {
    const measure = () => {
      const maxWidth = 900;
      const padding = 32;
      const containerWidth = containerRef.current?.clientWidth ?? maxWidth;
      setWidth(Math.min(maxWidth, Math.max(300, containerWidth - padding)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-3">
        {/* Toolbar - responsive: column on small, row on larger screens */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-sm font-medium">Vista previa</div>
            <div className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground truncate max-w-[160px]">{(file || "/").split("/").pop()}</div>
          </div>
          {available === true ? (
            <div className="mt-2 sm:mt-0 flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={file} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${fileLabel} en nueva pestaña`}>
                  Abrir
                </a>
              </Button>
              <Button asChild size="sm">
                <a href={file} download aria-label={`Descargar ${fileLabel}`}>
                  Descargar
                </a>
              </Button>
            </div>
          ) : null}
        </div>

        {/* Viewer */}
        <div className="w-full rounded-md border bg-white shadow-sm overflow-hidden dark:bg-zinc-950">
          {/* Loading / Error overlay */}
          {available === null && !error ? (
            <div className="flex h-[28vh] sm:h-40 items-center justify-center bg-white/60 dark:bg-zinc-900/60">
              <div className="text-sm text-muted-foreground">Verificando disponibilidad del archivo…</div>
            </div>
          ) : available === true && !loaded && !error ? (
            <div className="flex h-[28vh] sm:h-40 items-center justify-center bg-white/60 dark:bg-zinc-900/60">
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary border-gray-200" />
                <div className="text-sm text-muted-foreground">Cargando vista previa…</div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="flex flex-col gap-2 rounded-md border p-4 text-sm bg-yellow-50 dark:bg-yellow-900/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-destructive mt-0.5" />
                <div>
                  <div className="font-medium text-sm text-foreground">Error al cargar la vista previa</div>
                  <div className="text-xs text-muted-foreground mt-1">{error}</div>
                </div>
              </div>
               <div className="text-xs text-muted-foreground">Sugerencias: verifica que el archivo exista en <code>/public{isHtml ? "/html" : "/pdfs"}</code>, confirme el nombre <strong>{(file || "/").split("/").pop()}</strong> y recarga la página.</div>
            </div>
          ) : (
            <div className="w-full overflow-hidden rounded-md">
              <iframe
                ref={iframeRef}
                src={file}
                title={`Vista previa ${fileLabel}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(`No se pudo cargar el ${fileLabel} en el visor integrado`) }
                className="w-full max-h-[80vh] min-h-[240px] h-[50vh] sm:h-[60vh] md:h-[72vh] lg:h-[64vh] bg-white dark:bg-zinc-950"
                style={{ border: "none" }}
                aria-label={`Visor de ${fileLabel}`} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}