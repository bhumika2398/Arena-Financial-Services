"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { alsoAvailable, businessServices, emiTool } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tile = { href: string; title: string; text: string; kind: "service" | "tool" | "also" };

/**
 * Twelve square cards, four per row: the nine business services, the EMI
 * Calculator, then Home Loan and Personal Loan marked "Also available".
 * 1 column on phones, 2 on tablets, 4 on desktop, so no row is left short.
 */
export function ServiceTiles() {
  const reduced = useReducedMotion();
  const tiles: Tile[] = [
    ...businessServices.map((s) => ({ href: `/services/${s.slug}`, title: s.title, text: s.description, kind: "service" as const })),
    { href: `/services/${emiTool.slug}`, title: emiTool.title, text: emiTool.description, kind: "tool" as const },
    ...alsoAvailable.map((s) => ({ href: `/services/${s.slug}`, title: s.title, text: s.description, kind: "also" as const })),
  ];

  return (
    <ul className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((t, i) => (
        <motion.li
          key={t.href}
          className="h-full"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : (i % 4) * 0.08 }}
        >
          <Link
            href={t.href}
            className={cn(
              "brutal group relative flex h-full min-h-[15rem] flex-col rounded-[20px] p-6 lg:aspect-square",
              "bg-white",
            )}
          >
            <div className="flex items-start justify-between">
              <span
                className="font-display text-sm font-bold tabular-nums text-primary-600"
              >
                {t.kind === "service" ? String(i + 1).padStart(2, "0") : t.kind === "tool" ? "TOOL" : "ALSO AVAILABLE"}
              </span>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-deep-900 text-deep-900 transition-all duration-300 group-hover:rotate-45 group-hover:bg-deep-900 group-hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-10 font-display text-2xl font-bold leading-tight text-deep-900">
              {t.title}
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-deep-600">
              {t.text}
            </p>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
