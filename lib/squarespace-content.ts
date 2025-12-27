import path from "path";
import { readFile, readdir } from "fs/promises";

const CONTENT_DIR = path.join(process.cwd(), "content", "squarespace");

const STATIC_PAGE_NAMES = new Set([
  "home",
  "about",
  "projects",
  "co-creations",
  "xprints",
  "contact",
]);

export async function loadSquarespaceHtml(name: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${name}.html`);
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function listSquarespaceSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_DIR);
    return entries
      .filter((entry) => entry.endsWith(".html"))
      .map((entry) => entry.replace(/\.html$/, ""))
      .filter((entry) => !STATIC_PAGE_NAMES.has(entry))
      .sort();
  } catch {
    return [];
  }
}
