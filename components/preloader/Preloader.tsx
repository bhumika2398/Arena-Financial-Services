"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "arena-preloader-shown";
// Words fade in, the bar fills from 0.3s to 1.8s, holds ~0.2s, then the screen
// fades out (~0.5s): about 2.5s in total.
const HOLD_MS = 2000;
const WORDS = ["Arena", "Financial", "Services"];

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  // null = not yet decided (avoids a flash before sessionStorage is read),
  // true/false once we know whether to render it at all.
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  // This only ever shows once per browser TAB session (sessionStorage persists
  // across reloads in the same tab, by design). To see it again during dev,
  // open a new tab, or run `sessionStorage.removeItem("arena-preloader-shown")`
  // in devtools and reload.
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // sessionStorage unavailable (privacy mode etc.) — just show it once.
    }

    if (alreadyShown) {
      // Must run post-mount: sessionStorage is only readable client-side,
      // and the initial render has to stay SSR-safe (null → nothing shown).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(false);
      return;
    }

    setShouldRender(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Non-fatal — worst case the preloader replays once more.
    }
  }, []);

  // Dismiss after the entrance has played.
  useEffect(() => {
    if (!shouldRender) return;
    const timer = setTimeout(() => setVisible(false), prefersReducedMotion ? 300 : HOLD_MS);
    return () => clearTimeout(timer);
  }, [shouldRender, prefersReducedMotion]);

  // Tell the consent banner when the preloader is gone (or was never shown).
  useEffect(() => {
    const finished = shouldRender === false || (shouldRender === true && !visible);
    if (!finished) return;
    const t = setTimeout(
      () => {
        (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
        window.dispatchEvent(new Event("arena:preloader-done"));
      },
      shouldRender === false ? 0 : 500,
    );
    return () => clearTimeout(t);
  }, [shouldRender, visible]);

  // Lock scroll while the preloader is up so the page can't be scrolled
  // underneath it during the reveal.
  useEffect(() => {
    if (shouldRender && visible) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [shouldRender, visible]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-deep-900 px-6"
        >
          <p className="flex flex-wrap items-center justify-center gap-x-[0.3em] text-center font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15 + i * 0.2, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Thin bar that fills left to right; reduced motion gets a plain fade with no bar */}
          {prefersReducedMotion ? null : (
            <div aria-hidden className="h-[2px] w-44 overflow-hidden bg-white/15 sm:w-60">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                style={{ originX: 0 }}
                className="h-full w-full bg-primary-300"
              />
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
