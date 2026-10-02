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
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Why Arena
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Straight Advice, Plainly Explained
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            How we help you understand, compare and prepare — before you apply.
          </p>
        </Container>
      </section>
      <WhyArena />
      <CtaBanner />
    </>
  );
}
