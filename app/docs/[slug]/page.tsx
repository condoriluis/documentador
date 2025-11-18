import { notFound } from "next/navigation";
import { getDocBySlug } from "@/data/docs";
import DocViewer from "@/components/DocViewer";
import { FileText } from "lucide-react";

export const dynamic = "force-static";

export default async function DocDetailPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <FileText className="size-5 text-primary" /> {doc.title}
        </h1>
        <p className="text-sm text-muted-foreground">{doc.description}</p>
      </div>
      <div className="rounded-lg border p-4">
        <DocViewer file={doc.file} />
      </div>
    </div>
  );
}