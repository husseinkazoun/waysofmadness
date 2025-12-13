import Link from "next/link";
import Image from "next/image";
import { projectPages } from "@/lib/content";
import { pageImages } from "@/lib/page-images";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-[6vw] py-20 md:px-[4vw]">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-white">Projects</h1>
        </div>
        <div className="grid grid-cols-1 gap-[11px] md:grid-cols-2 lg:grid-cols-3">
          {projectPages.map((project) => (
            <Link
              key={project.slug}
              href={`/${project.slug}`}
              className="group relative aspect-[4/3] overflow-hidden bg-zinc-900"
            >
              {pageImages[project.slug]?.[0] ? (
                <Image
                  src={pageImages[project.slug][0]}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  unoptimized={pageImages[project.slug][0].startsWith("https://images.squarespace-cdn.com/")}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="text-lg font-medium text-white">{project.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
