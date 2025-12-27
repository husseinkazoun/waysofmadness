import { notFound } from "next/navigation";
import { SquarespacePage } from "@/components/squarespace-page";
import { loadSquarespaceHtml } from "@/lib/squarespace-content";

export default async function Home() {
  const html = await loadSquarespaceHtml("home");
  if (!html) return notFound();
  return <SquarespacePage html={html} />;
}
