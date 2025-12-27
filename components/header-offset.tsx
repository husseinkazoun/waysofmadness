"use client";

import { useEffect } from "react";

export function HeaderOffset() {
  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    const update = () => {
      const height = header.getBoundingClientRect().height;
      const value = `${height}px`;
      document.documentElement.style.setProperty("--header-fixed-top-offset", value);
      document.body.style.setProperty("--header-fixed-top-offset", value);
    };

    update();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => update());
      observer.observe(header);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", update);
      }
    };
  }, []);

  return null;
}
