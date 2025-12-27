"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
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
    { slug: "unhearable-voices", title: "Unhearable voices" },
  ];

  const projectPaths = projectsSubmenu.map((item) => `/${item.slug}`);
  const coCreationPaths = coCreationsSubmenu.map((item) => `/${item.slug}`);
  const isProjectsActive = projectPaths.includes(pathname);
  const isCoCreationsActive = coCreationPaths.includes(pathname);
  const isPrintsActive = pathname === "/xprints" || pathname.startsWith("/xprints/");
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `text-sm transition ${active ? "!text-black" : "!text-black/70 hover:!text-black"}`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-black/10 !bg-white">
      <div className="flex items-center justify-between px-[6vw] py-4 md:px-[4vw]">
        <Link
          href="/"
          className="font-display text-sm font-medium tracking-wide !text-black"
        >
          Nader Bahsoun
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={navLinkClass(isActive("/"))}
            >
              Home
            </Link>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu("projects")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button
                className={navLinkClass(isProjectsActive)}
                aria-expanded={hoveredMenu === "projects"}
                aria-controls="projects-menu"
              >
                Projects
              </button>
              {hoveredMenu === "projects" && (
                <div className="absolute left-0 top-full pt-2" id="projects-menu">
                  <div className="w-60 border border-black/10 !bg-white py-2 shadow-lg">
                    {projectsSubmenu.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                        className={`block px-4 py-2 text-sm transition hover:bg-black/5 ${
                          isActive(`/${item.slug}`)
                            ? "!text-black"
                            : "!text-black/70 hover:!text-black"
                        }`}
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
              <button
                className={navLinkClass(isCoCreationsActive)}
                aria-expanded={hoveredMenu === "co-creations"}
                aria-controls="co-creations-menu"
              >
                Co-creations
              </button>
              {hoveredMenu === "co-creations" && (
                <div
                  className="absolute left-0 top-full pt-2"
                  id="co-creations-menu"
                >
                  <div className="w-60 border border-black/10 !bg-white py-2 shadow-lg">
                    {coCreationsSubmenu.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                        className={`block px-4 py-2 text-sm transition hover:bg-black/5 ${
                          isActive(`/${item.slug}`)
                            ? "!text-black"
                            : "!text-black/70 hover:!text-black"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/xprints"
              aria-current={isPrintsActive ? "page" : undefined}
              className={navLinkClass(isPrintsActive)}
            >
              Prints
            </Link>
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={navLinkClass(isActive("/about"))}
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/waysoffmadness"
              target="_blank"
              rel="noopener noreferrer"
              className="!text-black/70 transition hover:!text-black"
              aria-label="Instagram"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.25-3.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="border border-black !bg-black px-4 py-1.5 text-xs uppercase tracking-[0.2em] !text-white transition hover:!bg-black/90"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-sm !text-black/70 transition hover:!text-black"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/10"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col gap-6 !bg-white px-6 py-8 text-sm !text-black/70 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] !text-black/50">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] !text-black/60 transition hover:!text-black"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                aria-current={isActive("/") ? "page" : undefined}
                className={navLinkClass(isActive("/"))}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <span className={navLinkClass(isProjectsActive)}>Projects</span>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {projectsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                      className={`text-xs transition ${
                        isActive(`/${item.slug}`)
                          ? "!text-black"
                          : "!text-black/60 hover:!text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <span className={navLinkClass(isCoCreationsActive)}>
                  Co-creations
                </span>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {coCreationsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                      className={`text-xs transition ${
                        isActive(`/${item.slug}`)
                          ? "!text-black"
                          : "!text-black/60 hover:!text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/xprints"
                aria-current={isPrintsActive ? "page" : undefined}
                className={navLinkClass(isPrintsActive)}
                onClick={() => setMobileMenuOpen(false)}
              >
                Prints
              </Link>
              <Link
                href="/about"
                aria-current={isActive("/about") ? "page" : undefined}
                className={navLinkClass(isActive("/about"))}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className={navLinkClass(isActive("/contact"))}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="https://instagram.com/waysoffmadness"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-black/60 transition hover:!text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instagram
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
