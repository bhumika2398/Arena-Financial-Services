import type { Metadata } from "next";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Container } from "@/components/ui/Container";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about loans, eligibility, EMI and working with Arena Financial Services.",
};

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-10 pt-24">
        <SectionVideoBackground src="/videos/finance_video_1.mp4" />
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Help Centre
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Questions, Answered
          </h1>
        </Container>
      </section>
      <Faq />
      <CtaBanner />
    </>
  );
}
