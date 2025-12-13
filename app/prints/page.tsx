import Link from "next/link";
import { printsCategories } from "@/lib/content";

export default function PrintsPage() {
  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-white">Prints</h1>
        </div>
        <div className="grid grid-cols-1 gap-[11px] sm:grid-cols-2 md:grid-cols-3">
          {printsCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/prints/${category.slug}`}
              className="group block border border-white/10 bg-zinc-900/50 p-8 transition hover:border-white/30"
            >
              <h2 className="text-xl font-medium text-white transition group-hover:text-zinc-300">
                {category.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
