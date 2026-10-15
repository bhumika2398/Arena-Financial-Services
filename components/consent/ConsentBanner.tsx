"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { readConsent, useConsent } from "@/lib/consent";

type WithFlag = { __preloaderDone?: boolean };

export function ConsentBanner() {
  const reduced = useReducedMotion();
  const { accept, essentialOnly } = useConsent();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Show on first visit — but only once the preloader has finished.
  useEffect(() => {
    let cancelled = false;
    const show = () => {
      if (!cancelled && !readConsent()) setOpen(true);
    };
    if ((window as unknown as WithFlag).__preloaderDone) show();
    else window.addEventListener("arena:preloader-done", show, { once: true });
    const reopen = () => setOpen(true);
    const close = () => setOpen(false);
    window.addEventListener("arena:consent-open", reopen);
    window.addEventListener("arena:consent-change", close);
    return () => {
      cancelled = true;
      window.removeEventListener("arena:preloader-done", show);
      window.removeEventListener("arena:consent-open", reopen);
      window.removeEventListener("arena:consent-change", close);
    };
  }, []);

  // While visible: reserve space so it never hides page content, and expose
  // its height (mobile bar only) so sticky bars / back-to-top sit above it.
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.style.removeProperty("--consent-h");
      document.body.style.paddingBottom = "";
      return;
    }
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const h = el.offsetHeight;
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      root.style.setProperty("--consent-h", mobile ? `${h}px` : "0px");
      document.body.style.paddingBottom = `${h + 16}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--consent-h");
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={ref}
          key="consent"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-deep-200 bg-white p-4 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] print:hidden sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[30rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border sm:shadow-xl"
        >
          <p className="text-sm leading-relaxed text-deep-700">
            We use cookies to run this site and to understand how it is used. By continuing you
            agree to our{" "}
            <Link href="/terms-of-use" className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={accept} className="min-h-11 flex-1">
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={essentialOnly} className="min-h-11 flex-1">
              Essential only
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
