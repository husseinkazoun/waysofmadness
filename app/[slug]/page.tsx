import { notFound } from "next/navigation";
import { SquarespacePage } from "@/components/squarespace-page";
import { listSquarespaceSlugs, loadSquarespaceHtml } from "@/lib/squarespace-content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await listSquarespaceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const html = await loadSquarespaceHtml(slug);
  if (!html) return notFound();
  return <SquarespacePage html={html} />;
}
