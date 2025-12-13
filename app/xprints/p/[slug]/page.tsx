import { notFound } from "next/navigation";
import { xprintSlugs } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return xprintSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const title = xprintSlugs.includes(slug)
    ? `${slug} | XPrints`
    : "XPrint";
  return { title };
}

export default async function XPrintDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!xprintSlugs.includes(slug)) return notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white break-words">
        {slug}
      </h1>
      <p className="text-lg text-zinc-300">
        Replace with product details from Squarespace: hero image, price, size,
        edition notes, and add-to-cart link (Stripe/Shopify/Vercel
        Checkout—your choice).
      </p>
      <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-zinc-300">
        <p>
          TODO: Drop the product gallery here. Images can come from{" "}
          <code className="rounded bg-white px-1 py-0.5">public/xprints/{slug}</code>{" "}
          or the Squarespace CDN (remote images are allowed in{" "}
          <code className="rounded bg-white px-1 py-0.5">next.config.ts</code>).
        </p>
      </div>
    </div>
  );
}
