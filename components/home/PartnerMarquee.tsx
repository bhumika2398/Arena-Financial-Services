"use client";

import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/lib/data";
import { cn } from "@/lib/utils";

const rows = [
  partners.slice(0, 5),
  partners.slice(5, 10),
  partners.slice(10, 15),
];

const rowAnimations = ["animate-marquee", "animate-marquee-reverse", "animate-marquee"];

function LogoPill({ name }: { name: string }) {
  return (
    // [PLACEHOLDER LOGO] — swap this pill for a real partner logo image.
    <div
      className="flex h-16 w-48 shrink-0 items-center justify-center rounded-xl border border-deep-100 bg-white px-4 text-center shadow-sm grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:shadow-md"
    >
      <span className="font-display text-sm font-bold text-deep-700">{name}</span>
    </div>
  );
}

function MarqueeRow({
  names,
  animationClass,
  reducedMotion,
  hideOnMobile,
}: {
  names: { id: string; name: string }[];
  animationClass: string;
  reducedMotion: boolean;
  hideOnMobile?: boolean;
}) {
  if (reducedMotion) {
    return (
      <div
        className={cn(
          "flex flex-wrap justify-center gap-4",
          hideOnMobile && "hidden sm:flex",
        )}
      >
        {names.map((partner) => (
          <LogoPill key={partner.id} name={partner.name} />
        ))}
      </div>
    );
  }

  const looped = [...names, ...names];

  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        hideOnMobile && "hidden sm:block",
      )}
    >
      <div
        className={cn(
          "flex w-max gap-4",
          animationClass,
          "group-hover:[animation-play-state:paused]",
        )}
      >
        {looped.map((partner, i) => (
          <LogoPill key={`${partner.id}-${i}`} name={partner.name} />
        ))}
      </div>
    </div>
  );
}

export function PartnerMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-deep-100 bg-white py-12">
      <Container className="mb-10">
        <SectionHeading
          eyebrow="30+ Banking & Financial Partners"
          title="Associated With"
          subtitle="We work with leading banks and NBFCs to get you the best-fit loan, faster."
        />
      </Container>

      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            names={row}
            animationClass={rowAnimations[i]}
            reducedMotion={Boolean(prefersReducedMotion)}
            hideOnMobile={i > 0}
          />
        ))}
      </div>
    </section>
  );
}

export { PartnerMarquee as AssociatedWith };
