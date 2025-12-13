#!/usr/bin/env node
/**
 * Scan lib/page-images.ts and output external image URLs for mirroring.
 * Writes results to ./spec/assets-to-mirror.txt
 */
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "lib", "page-images.ts");
const outPath = path.join(__dirname, "..", "spec", "assets-to-mirror.txt");

function main() {
  const content = fs.readFileSync(srcPath, "utf-8");
  const urlRegex = /https?:\/\/[^"']+/g;
  const urls = Array.from(new Set(content.match(urlRegex) || [])).filter((u) =>
    u.startsWith("http"),
  );

  const lines = urls.map((url) => {
    const filename = url.split("/").pop() || "file";
    const suggested = path.posix.join("public/assets", filename);
    return `${url} -> ${suggested}`;
  });

  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf-8");
  console.log(`Wrote ${lines.length} entries to ${outPath}`);
}

main();
