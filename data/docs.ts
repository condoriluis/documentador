export type DocItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  file: string;
};

import docsData from "./docs.json";

export const docs: DocItem[] = docsData as DocItem[];

export function getDocBySlug(slug: string): DocItem | undefined {
  return docs.find((d) => d.slug === slug);
}

export function getCategories(): string[] {
  const set = new Set<string>();
  docs.forEach((d) => set.add(d.category));
  return Array.from(set).sort();
}