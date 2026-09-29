"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/scrollToSection";

/**
 * Handles the "navigated here FROM another page via /#section" case: once
 * the Home page has actually mounted, check the URL hash and scroll to the
 * matching section. Same-page nav clicks (already on "/") are instead
 * handled directly in Navbar.tsx via scrollToSection, since a plain
 * `<Link href="/#section">` click while already on "/" doesn't reliably
 * trigger this — Next.js App Router's client-side nav treats a hash-only
 * change to the current route as a no-op route change and does not scroll
 * to the target element itself (this was the actual bug: it left the page
 * exactly where it was, or reset scroll via Link's default scroll-to-top
 * behavior, which read as "redirecting to the homepage").
 */
export function ScrollToHash() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    // A single rAF-delayed attempt isn't enough: heavier content still
    // loading in below the target (video backgrounds, the Hero's 3D
    // canvas, webfonts swapping in) can grow the page's height AFTER our
    // first scroll, leaving the final position off. Re-assert a few times
    // over the following ~600ms rather than trusting one attempt to win.
    const delays = [0, 150, 350, 600];
    const timers = delays.map((delay) =>
      window.setTimeout(() => {
        scrollToSection(hash, Boolean(prefersReducedMotion));
      }, delay),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
