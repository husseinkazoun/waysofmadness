#!/usr/bin/env node
/**
 * Generate a checklist of potentially truncated copy entries.
 * Heuristic: values longer than 120 chars that do NOT end with punctuation.
 */
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "lib", "page-copy.ts");
const out = path.join(__dirname, "..", "spec", "truncated-copy.json");

function parseObject(text) {
  const objText = text
    .replace(/export const pageCopy[^=]*=/, "return")
    .replace(/;?\s*$/, "");
  // eslint-disable-next-line no-new-func
  const fn = new Function(objText);
  return fn();
}

function isTruncated(val) {
  if (!val) return false;
  if (val.length <= 120) return false;
  return !/[.!?]$/.test(val.trim());
}

function main() {
  const content = fs.readFileSync(src, "utf-8");
  const data = parseObject(content);
  const result = Object.fromEntries(
    Object.entries(data).map(([slug, copy]) => [
      slug,
      isTruncated(copy) ? "truncated-suspect" : "ok",
    ]),
  );
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + "\n", "utf-8");
  console.log(`Wrote checklist to ${out}`);
}

main();
