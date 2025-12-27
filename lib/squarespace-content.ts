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
  "header",
  "icons",
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

export async function loadSquarespaceHeader(): Promise<string | null> {
  return loadSquarespaceHtml("header");
}

export async function loadSquarespaceIcons(): Promise<string | null> {
  return loadSquarespaceHtml("icons");
}
