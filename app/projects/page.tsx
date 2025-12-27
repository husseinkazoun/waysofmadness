import { notFound } from "next/navigation";
import { SquarespacePage } from "@/components/squarespace-page";
import { loadSquarespaceHtml } from "@/lib/squarespace-content";

export default async function ProjectsPage() {
  const html = await loadSquarespaceHtml("projects");
  if (!html) return notFound();
  return <SquarespacePage html={html} />;
}
