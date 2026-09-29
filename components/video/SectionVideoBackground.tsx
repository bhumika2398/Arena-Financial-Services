"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reusable section background video: lazy-mounted (IntersectionObserver),
 * skipped entirely on mobile widths and reduced-motion, with a CSS-gradient
 * poster placeholder standing in for a real extracted video frame (no
 * ffmpeg available in this environment — swap `posterClassName` for a real
 * `poster` frame once one is available).
 */
export function SectionVideoBackground({
  src,
  overlayClassName,
  posterClassName,
  videoClassName,
  className,
}: {
  src: string;
  /** Gradient overlay between the video and content, tuned for legibility. */
  overlayClassName?: string;
  /** CSS-gradient placeholder shown instead of/before the video. */
  posterClassName?: string;
  /** Extra classes on the <video> itself — e.g. "opacity-25" to blend it
   *  under another background layer (glow/gradient) stacked on top. */
  videoClassName?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const canLoadVideo = !isMobile && !prefersReducedMotion && inView;

  return (
    <div ref={rootRef} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* CSS-gradient placeholder "poster" — replace with a real extracted
          video frame once ffmpeg (or an editor export) is available. */}
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(6,133,98,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(1,63,74,0.55),transparent_55%)] bg-deep-900",
          posterClassName,
        )}
      />

      {canLoadVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
          src={src}
        />
      ) : null}

      {/* Deep-palette scrim so foreground text/content stays legible */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-deep-950/70 via-deep-950/50 to-deep-950/80",
          overlayClassName,
        )}
      />
    </div>
  );
}
