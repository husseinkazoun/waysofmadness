"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projectsSubmenu = [
    { slug: "archive-x", title: "Archive X" },
    { slug: "southern-birds-project", title: "Southern Birds" },
    { slug: "i-was-naver", title: "I Was Never" },
    { slug: "the-bleed-zine", title: "The Bleed Zine" },
    { slug: "three-decades-and-a-climax", title: "Three Decades and A Climax" },
  ];

  const coCreationsSubmenu = [
    { slug: "shabah-el-rih", title: "Shabah El Rih" },
    { slug: "snakes-and-ladders", title: "Snakes and Ladders" },
    { slug: "msafreen", title: "Mehrak" },
    { slug: "jal-el-bahr", title: "Jal El Bahr" },
    { slug: "unhearable-voices", title: "Unhearable Voices" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-[12px]">
      <div className="flex items-center justify-between px-[6vw] py-4 md:px-[4vw]">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-white transition hover:text-zinc-300"
        >
          Nader Bahsoun
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 text-sm text-zinc-400 md:flex">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("projects")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="transition hover:text-white">
              Projects
            </button>
            {hoveredMenu === "projects" && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-56 border border-white/10 bg-black/90 backdrop-blur-[12px] py-2 shadow-xl">
                  {projectsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="block px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Co-creations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("co-creations")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="transition hover:text-white">
              Co-creations
            </button>
            {hoveredMenu === "co-creations" && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-56 border border-white/10 bg-black/90 backdrop-blur-[12px] py-2 shadow-xl">
                  {coCreationsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="block px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/prints" className="transition hover:text-white">
            Prints
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <a
            href="https://instagram.com/naderbahsoun"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Instagram
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-sm text-zinc-400 transition hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-white/10 bg-black/90 backdrop-blur-[12px] px-[6vw] py-6 md:hidden">
          <div className="flex flex-col gap-4 text-sm text-zinc-400">
            <Link
              href="/"
              className="transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div>
              <span className="block text-zinc-400">Projects</span>
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {projectsSubmenu.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="text-xs text-zinc-500 transition hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-zinc-400">Co-creations</span>
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {coCreationsSubmenu.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="text-xs text-zinc-500 transition hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/prints"
              className="transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prints
            </Link>
            <Link
              href="/about"
              className="transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://instagram.com/naderbahsoun"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Instagram
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
