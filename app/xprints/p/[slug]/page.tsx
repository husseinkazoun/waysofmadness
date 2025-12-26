import Image from "next/image";
import { notFound } from "next/navigation";
import { storeProducts, getProductBySlug } from "@/lib/store-products";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return storeProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product
      ? `${product.name} | Prints | Nader Bahsoun`
      : "Print | Nader Bahsoun",
  };
}

export default async function XPrintDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-medium text-white">{product.name}</h1>
              <p className="mt-2 text-2xl text-zinc-300">
                €{product.price.toFixed(2)} – €{product.maxPrice.toFixed(2)}
              </p>
            </div>

            {/* Size Options */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
                Available Sizes
              </h2>
              <div className="space-y-2">
                {product.sizes.map((size) => (
                  <div
                    key={size.size}
                    className="flex items-center justify-between border border-white/10 bg-zinc-900/50 px-4 py-3"
                  >
                    <span className="text-white">{size.size}</span>
                    <span className="text-zinc-400">€{size.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 border-t border-white/10 pt-8">
              <div className="flex justify-between">
                <span className="text-zinc-500">Edition</span>
                <span className="text-white">{product.edition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Material</span>
                <span className="text-white">{product.material}</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-zinc-400 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Contact to Purchase */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-zinc-500 mb-4">
                To purchase, please contact directly:
              </p>
              <a
                href="mailto:naderbahsoun@gmail.com?subject=Print%20Inquiry"
                className="inline-block bg-white text-black px-8 py-3 font-medium transition hover:bg-zinc-200"
              >
                Contact for Purchase
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
