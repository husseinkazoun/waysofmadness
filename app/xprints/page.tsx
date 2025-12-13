import Link from "next/link";
import { xprintSlugs } from "@/lib/content";

export default function XPrintsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white">XPrints</h1>
      <p className="text-lg text-zinc-300">
        These routes mirror your Squarespace store items under{" "}
        <strong>/xprints/p/*</strong>. Each detail page is scaffolded below.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {xprintSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/xprints/p/${slug}`}
            className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm shadow-lg shadow-black/30 transition hover:border-white/40"
          >
            <span className="block font-semibold text-white break-words">
              {slug}
            </span>
            <span className="mt-2 inline-block text-xs uppercase tracking-[0.2em] text-zinc-500">
              /xprints/p/{slug}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
