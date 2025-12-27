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

function processSquarespaceHtml(html: string): string {
  return html
    // Remove display:none from images (Squarespace hides them for their JS loader)
    .replace(/(<img[^>]*style="[^"]*?)display:\s*none;?/gi, "$1")
    // Remove empty style attributes
    .replace(/style="\s*"/gi, "")
    // Remove Squarespace's custom loader attribute that blocks native loading
    .replace(/\s*data-loader="sqs"/gi, "")
    // Remove data-load="false" that prevents loading
    .replace(/\s*data-load="false"/gi, "");
}

export async function loadSquarespaceHtml(name: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${name}.html`);
    const html = await readFile(filePath, "utf8");
    return processSquarespaceHtml(html);
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
