import Image from "next/image";
import { pageImages } from "@/lib/page-images";

export default function ContactPage() {
  const contactImg = pageImages["contact"]?.[0];

  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px] space-y-8">
        <h1 className="text-4xl font-medium text-white">Contact</h1>
        <div className="space-y-4 text-lg text-zinc-300">
          <p>Based in Beirut.</p>
          <div className="space-y-2">
            <p>
              Email:{" "}
              <a
                className="text-white underline decoration-zinc-500 underline-offset-4 transition hover:decoration-white"
                href="mailto:naderbahsoun@gmail.com"
              >
                naderbahsoun@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                className="text-white underline decoration-zinc-500 underline-offset-4 transition hover:decoration-white"
                href="tel:+96181345365"
              >
                +961 81 345 365
              </a>
            </p>
          </div>
        </div>
      {contactImg ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={contactImg}
            alt="Contact"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 1500px, 100vw"
            unoptimized={contactImg.startsWith("https://images.squarespace-cdn.com/")}
          />
        </div>
      ) : null}
      </div>
    </div>
  );
}
