import Image from "next/image";
import { pageImages } from "@/lib/page-images";

export default function Home() {
  const homeHero = pageImages["home"]?.[0];

  return (
    <div className="relative h-screen w-full">
      {homeHero ? (
        <Image
          src={homeHero}
          alt="Nader Bahsoun"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized={homeHero.startsWith("https://images.squarespace-cdn.com/")}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-zinc-900 text-zinc-400">
          No hero image found
        </div>
      )}
    </div>
  );
}
