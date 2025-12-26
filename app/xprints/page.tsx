import Link from "next/link";
import Image from "next/image";
import { storeProducts } from "@/lib/store-products";

export default function XPrintsPage() {
  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-white">Prints</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Fine art prints from the collection. All prints are unlimited editions on fine art matte paper.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {storeProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/xprints/p/${product.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="mt-3 space-y-1">
                <h2 className="text-lg font-medium text-white group-hover:text-zinc-300 transition">
                  {product.name}
                </h2>
                <p className="text-sm text-zinc-400">
                  From €{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
