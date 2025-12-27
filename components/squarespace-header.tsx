import { loadSquarespaceHeader, loadSquarespaceIcons } from "@/lib/squarespace-content";

export async function SquarespaceHeader() {
  const [headerHtml, iconsHtml] = await Promise.all([
    loadSquarespaceHeader(),
    loadSquarespaceIcons(),
  ]);

  if (!headerHtml) return null;

  const combined = `${iconsHtml ?? ""}${headerHtml}`;

  return (
    <div
      className="contents"
      dangerouslySetInnerHTML={{ __html: combined }}
    />
  );
}
