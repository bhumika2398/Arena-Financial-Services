"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scrolls to the element named in the URL hash (e.g. /contact#enquiry,
 * /about#leadership, /#why-arena) after navigation. It retries for a short
 * while because images, fonts and the preloader can change the page height
 * after the first attempt.
 */
export function ScrollToHash() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    let tries = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const attempt = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      if (++tries < 4) timers.push(setTimeout(attempt, 350));
    };
    timers.push(setTimeout(attempt, 100));
    return () => timers.forEach(clearTimeout);
  }, [pathname, reduced]);

  return null;
}
