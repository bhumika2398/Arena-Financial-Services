"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { LineChart, ShieldCheck, IndianRupee, TrendingUp } from "lucide-react";

/**
 * Standalone, swappable hero background: particle-network mesh + floating
 * glass cards with mouse parallax. Pure SVG/CSS/Framer Motion — no 3D deps,
 * so it stays light and GPU-friendly (transform/opacity only).
 */

type Node = { x: number; y: number; r: number };

const NODE_COUNT_DESKTOP = 22;
const NODE_COUNT_MOBILE = 10;
const LINK_DISTANCE = 22; // percentage units

function generateNodes(count: number, seed: number): Node[] {
  // Simple deterministic pseudo-random so SSR/CSR markup matches.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 1.2 + rand() * 1.8,
  }));
}

function buildLinks(nodes: Node[]) {
  const links: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < LINK_DISTANCE) {
        links.push([i, j]);
      }
    }
  }
  return links;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type FloatCard = {
  key: string;
  className: string;
  floatClass: string;
  depth: number; // parallax strength
  content: React.ReactNode;
  mobile?: boolean;
};

function FloatingCard({
  card,
  springX,
  springY,
  disableParallax,
  reducedMotion,
}: {
  card: FloatCard;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  disableParallax: boolean;
  reducedMotion: boolean;
}) {
  const x = useTransform(springX, (v) => v * card.depth);
  const y = useTransform(springY, (v) => v * card.depth);

  return (
    <motion.div
      variants={cardVariants}
      style={disableParallax ? undefined : { x, y }}
      className={`absolute rounded-2xl border border-white/15 bg-white/8 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm sm:backdrop-blur-md ${card.className} ${
        reducedMotion ? "" : card.floatClass
      }`}
    >
      {card.content}
    </motion.div>
  );
}

export function HeroAnimation({ showMesh = true }: { showMesh?: boolean }) {
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

  // Only animate once the hero has actually scrolled into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nodes = useMemo(
    () => generateNodes(isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP, 7),
    [isMobile],
  );
  const links = useMemo(() => buildLinks(nodes), [nodes]);

  // Mouse parallax (desktop only, disabled for reduced motion).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const shouldAnimate = inView && !prefersReducedMotion;

  const cards: FloatCard[] = [
    {
      key: "growth",
      className: "left-[6%] top-[18%] sm:left-[10%]",
      floatClass: "animate-float",
      depth: 18,
      content: (
        <>
          <div className="flex items-center gap-2 text-emerald-300">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-semibold">Portfolio Growth</span>
          </div>
          <p className="mt-1 font-display text-lg font-bold text-white">
            +24.6%
          </p>
        </>
      ),
    },
    {
      key: "approved",
      className: "right-[8%] top-[10%] sm:right-[12%]",
      floatClass: "animate-float-slow",
      depth: 26,
      content: (
        <>
          <div className="flex items-center gap-2 text-sage-300">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xs font-semibold">Loan Approved</span>
          </div>
          <p className="mt-1 font-display text-lg font-bold text-white">
            â‚¹12,50,000
          </p>
        </>
      ),
    },
    {
      key: "chart",
      className: "left-[4%] bottom-[14%] sm:left-[8%]",
      floatClass: "animate-float-slow",
      depth: 22,
      content: (
        <>
          <div className="flex items-center gap-2 text-sky-300">
            <LineChart className="h-4 w-4" />
            <span className="text-xs font-semibold">Market Trend</span>
          </div>
          <svg viewBox="0 0 80 28" className="mt-2 h-7 w-20">
            <polyline
              points="0,24 12,18 24,20 36,10 48,13 60,4 72,7 80,2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-300"
            />
          </svg>
        </>
      ),
    },
    {
      key: "shield",
      className: "right-[6%] bottom-[22%] sm:right-[16%]",
      floatClass: "animate-float",
      depth: 14,
      mobile: false,
      content: (
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-5 w-5 text-sage-300" />
          <span className="text-xs font-semibold">Bank-Grade Security</span>
        </div>
      ),
    },
  ];

  const visibleCards = isMobile ? cards.filter((c) => c.mobile !== false).slice(0, 2) : cards;

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Base gradient wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldAnimate || prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,149,120,0.14),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(6,133,98,0.18),transparent_55%)]"
      />

      {/* Particle network mesh */}
      {showMesh ? (
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {links.map(([a, b], i) => (
          <motion.line
            key={`link-${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#linkGradient)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { pathLength: 1, opacity: 0.5 }
                : prefersReducedMotion
                  ? { pathLength: 1, opacity: 0.3 }
                  : {}
            }
            transition={{ duration: 1.2, delay: 0.4 + i * 0.01 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r * 0.3}
            fill="url(#nodeGradient)"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              shouldAnimate || prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : {}
            }
            transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }}
          />
        ))}
        <defs>
          <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#569578" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#068562" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#cdf3e3" />
            <stop offset="100%" stopColor="#068562" />
          </radialGradient>
        </defs>
      </svg>
      ) : null}

      {/* Floating glass cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate || prefersReducedMotion ? "visible" : "hidden"}
        className="absolute inset-0"
      >
        {visibleCards.map((card) => (
          <FloatingCard
            key={card.key}
            card={card}
            springX={springX}
            springY={springY}
            disableParallax={Boolean(prefersReducedMotion) || isMobile}
            reducedMotion={Boolean(prefersReducedMotion)}
          />
        ))}
      </motion.div>

    </div>
  );
}
