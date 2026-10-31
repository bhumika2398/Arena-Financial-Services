"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed looping background video under a flat navy overlay.
 * - The poster image is the static fallback (small screens, reduced motion,
 *   and while the video loads), so nothing shifts when the video starts.
 * - The video only loads once the section is near the viewport and is paused
 *   whenever it scrolls out of view.
 */
export function VideoBackground({
  src,
  poster,
  overlay = 0.65,
  priority = false,
  className,
}: {
  src: string;
  poster: string;
  /** Opacity of the flat navy (#0B2447) overlay, 0-1. */
  overlay?: number;
  /** Preload the poster (use for the hero only). */
  priority?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = videoRef.current;
        if (v) {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const canPlay = !isMobile && !reduced && near;

  return (
    <div ref={rootRef} aria-hidden className={cn("absolute inset-0 overflow-hidden bg-deep-900", className)}>
      <Image src={poster} alt="" fill sizes="100vw" priority={priority} className="object-cover" />
      {canPlay ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          src={src}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(11, 36, 71, ${overlay})` }} />
    </div>
  );
}
