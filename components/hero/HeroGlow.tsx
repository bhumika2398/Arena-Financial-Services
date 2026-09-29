"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Dramatic near-black backdrop for the Hero: a vertical emerald-teal beam
 * shooting down from the top with a soft radial bloom, plus a faint grain
 * texture (same feTurbulence technique as NetworkGrowth/TimelinePath/Faq)
 * for tactile depth. Pure CSS/SVG — no extra deps.
 */
export function HeroGlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Near-black base wash — kept fairly light so the video layer
          stacked underneath (see Hero.tsx) actually reads through clearly;
          the beam/vignette below still carry the "dramatic dark hero"
          feel without needing this wash to be near-opaque. */}
      <div className="absolute inset-0 bg-deep-alt2/40" />

      {/* Vertical glowing beam, core + outer bloom */}
      <div
        className={
          "absolute left-1/2 top-[-10%] h-[70%] w-[140%] -translate-x-1/2 sm:h-[85%] sm:w-[90%] lg:w-[60%] " +
          "bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(6,133,98,0.55),rgba(86,149,120,0.22)_45%,transparent_75%)] " +
          "blur-2xl sm:blur-3xl " +
          (prefersReducedMotion ? "opacity-70" : "animate-pulse-glow")
        }
      />
      <div
        className={
          "absolute left-1/2 top-[-15%] h-[45%] w-[60%] -translate-x-1/2 sm:w-[35%] lg:w-[24%] " +
          "bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(205,243,227,0.5),transparent_70%)] " +
          "blur-xl sm:blur-2xl " +
          (prefersReducedMotion ? "opacity-80" : "animate-pulse-glow")
        }
      />

      {/* Soft corner wash to add dimension without competing with the beam */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(1,63,74,0.5),transparent_55%)]" />

      {/* Faint grain texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <filter id="heroGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#heroGrain)"
          className={prefersReducedMotion ? "" : "animate-grain"}
        />
      </svg>

      {/* Faint grid lines for extra depth, barely visible */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 64px)",
        }}
      />

      {/* Vignette so headline text stays readable — this is the ONLY
          top-to-bottom darkening gradient in the Hero stack; HeroAnimation's
          own vignette was removed to avoid the two compounding into a
          near-opaque bottom edge that crushed the video underneath. */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-alt2/15 via-transparent to-deep-alt2/55" />
    </div>
  );
}
