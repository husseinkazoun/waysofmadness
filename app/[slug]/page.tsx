import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectPages } from "@/lib/content";
import { pageImages } from "@/lib/page-images";
import { pageCopy } from "@/lib/page-copy";

type Params = { slug: string };
const siteUrl = "https://www.naderbahsounstudios.com";

export function generateStaticParams(): Params[] {
  return projectPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = projectPages.find((page) => page.slug === slug);
  if (!entry) return {};
  const images = pageImages[slug] ?? [];
  const copy = pageCopy[slug];
  const description =
    (copy && copy.slice(0, 160)) || "Photography project by Nader Bahsoun";
  const firstImage = images[0];

  return {
    title: `${entry.title} | Nader Bahsoun`,
    description,
    openGraph: {
      title: entry.title,
      description,
      url: `${siteUrl}/${slug}`,
      type: "article",
      images: firstImage ? [{ url: firstImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      images: firstImage ? [firstImage] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = projectPages.find((page) => page.slug === slug);
  if (!entry) return notFound();
  const images = pageImages[slug] ?? [];
  const copy = pageCopy[slug];

  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px] space-y-12">
        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-medium text-white md:text-5xl">
            {entry.title}
          </h1>
          {copy && (
            <div className="text-lg leading-relaxed text-zinc-300">
              {copy}
            </div>
          )}
        </div>

        {/* Images Gallery */}
        {images.length > 0 ? (
          <div className="grid grid-cols-8 gap-[11px] md:grid-cols-24">
            {images.map((src, idx) => {
              // Vary image widths to create visual interest like the original
              const getColumnSpan = (index: number) => {
                const patterns = [
                  "col-span-8 md:col-span-24", // Full width
                  "col-span-8 md:col-span-13", // ~Half
                  "col-span-8 md:col-span-10", // Smaller
                  "col-span-8 md:col-span-24", // Full width
                  "col-span-8 md:col-span-16", // Two-thirds
                  "col-span-8 md:col-span-8",  // Third
                ];
                return patterns[index % patterns.length];
              };

              return (
                <div key={src} className={getColumnSpan(idx)}>
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
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-500">
            No images available for this project
          </div>
        )}
      </div>
    </div>
  );
}
