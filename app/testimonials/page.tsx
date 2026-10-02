import type { Metadata } from "next";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Container } from "@/components/ui/Container";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Hear from clients who trusted Arena Financial Services with their loans and financial goals.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-10 pt-24">
        <SectionVideoBackground src="/videos/finance_video_1.mp4" />
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Client Stories
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            What Our Clients Say About Arena Finserv
          </h1>
        </Container>
      </section>
      <Testimonials />
      <CtaBanner />
    </>
  );
}
