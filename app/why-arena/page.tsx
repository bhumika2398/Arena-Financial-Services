import type { Metadata } from "next";
import { WhyArena } from "@/components/home/WhyArena";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Why Arena",
  description:
    "Clear advice, no unnecessary complexity. See how Arena Financial Services helps you understand, compare, prepare and proceed with your financing.",
};

export default function WhyArenaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-10 pt-24">
        {/* Understated texture: faint fine-line grid + soft top wash, no glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 48px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"
        />
        <Container className="relative flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Our Approach
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Clear advice. No unnecessary complexity.
          </h1>
          <span aria-hidden className="h-px w-16 bg-primary-500/60" />
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            The financing process is confusing enough on its own. Arena&apos;s
            job is to make the part before the application — and the
            application itself — easier to understand and get through.
          </p>
        </Container>
      </section>
      <WhyArena />
      <CtaBanner />
    </>
  );
}
