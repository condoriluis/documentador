"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { DocItem } from "@/data/docs";

type Props = {
  doc: DocItem;
  titleNode?: React.ReactNode;
  descriptionNode?: React.ReactNode;
  categoryNode?: React.ReactNode;
};

function truncate(text: string, max = 31): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
}

export default function DocumentCard({ doc, titleNode, descriptionNode, categoryNode }: Props) {
  return (
    <Card className="transition-transform hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              {titleNode ?? truncate(doc.title)}

            </CardTitle>
            <CardDescription>{descriptionNode ?? doc.description}</CardDescription>
          </div>
          <span className="text-xs text-muted-foreground">{categoryNode ?? doc.category}</span>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button asChild size="sm">
          <Link href={`/docs/${doc.slug}`}>Ver documento</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={doc.file} target="_blank" rel="noopener noreferrer">
            Abrir documento
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}