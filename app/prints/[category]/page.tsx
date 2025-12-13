import Image from "next/image";
import { notFound } from "next/navigation";
import { printsCategories } from "@/lib/content";
import { pageImages } from "@/lib/page-images";

export function generateStaticParams() {
  return printsCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const entry = printsCategories.find((item) => item.slug === category);
  return {
    title: entry
      ? `${entry.title} | Prints | Nader Bahsoun`
      : "Prints | Nader Bahsoun",
  };
}

export default async function PrintCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entry = printsCategories.find((item) => item.slug === category);
  if (!entry) return notFound();
  const images = pageImages[`prints/${entry.slug}`] ?? [];

  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px] space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-medium text-white">{entry.title}</h1>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-8 gap-[11px] md:grid-cols-24">
            {images.map((src, idx) => (
              <div
                key={src}
                className="col-span-8 md:col-span-24"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={src}
                    alt={`${entry.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 1500px, 100vw"
                    priority={idx === 0}
                    unoptimized={src.startsWith("https://images.squarespace-cdn.com/")}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-500">
            No prints available in this collection yet
          </div>
        )}
      </div>
    </div>
  );
}
