import Image from "next/image";
import { pageImages } from "@/lib/page-images";

export default function AboutPage() {
  const portrait = pageImages["about"]?.[0];

  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px] space-y-8">
        <h1 className="text-4xl font-medium text-white">About</h1>
        <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            Nader Bahsoun (b. 1995) is a self-taught multidisciplinary artist
            from southern Lebanon whose work delves into memory, identity, and
            the complexities of history through photography, archival research,
            and documentary methods. With a focus on photography, his practice
            seeks to uncover, recontextualize, and transform remnants of the
            past into dynamic narratives that challenge how memory is seen and
            understood.
          </p>
        </div>
        {portrait ? (
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={portrait}
              alt="Portrait"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 1500px, 100vw"
              priority
              unoptimized={portrait.startsWith("https://images.squarespace-cdn.com/")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
