import type { Metadata } from "next";
import { Leadership } from "@/components/about/Leadership";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VideoBackground } from "@/components/video/VideoBackground";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arena Financial Services was founded in Bengaluru in 2021 to make business credit easier to access for MSMEs and growing companies.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-14 pt-28">
        <VideoBackground src="/videos/finance_video_4.mp4" poster="/videos/posters/finance_video_4.jpg" overlay={0.74} />
        <Container className="relative max-w-5xl">
          <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-300">
            <span aria-hidden className="h-px w-8 bg-primary-300" />
            About
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            About Arena Financial Services
          </h1>
        </Container>
      </section>

      {/* 3.1 Our story */}
      <section className="bg-white py-16">
        <Container className="grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
          <Reveal>
            <p
              aria-hidden
              className="select-none font-display text-[7rem] font-bold leading-none text-transparent sm:text-[9rem]"
              style={{ WebkitTextStroke: "1.5px var(--blue)" }}
            >
              {SITE.founded}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-deep-500">Founded in Bengaluru</p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Our story</span>
            <h2 className="mt-2 max-w-xl font-display text-3xl font-bold text-deep-900 sm:text-4xl">
              Built on trust, focused on your growth.
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-deep-600">
              Arena Financial Services was founded in Bengaluru in 2021 with one goal: to make business credit
              easier to access for MSMEs and growing companies. We work with 35+ banks and NBFCs to find funding
              that fits each business, and we guide clients through every step, from understanding their options
              to the money reaching their account.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3.2 Mission and vision */}
      <section className="bg-white pb-16">
        <Container className="grid max-w-5xl gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="brutal h-full rounded-[20px] bg-deep-900 p-8 text-white" style={{ boxShadow: "4px 4px 0 0 var(--blue)" }}>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-300">Mission</span>
              <p className="mt-3 font-display text-2xl font-bold leading-snug">
                To make business finance simple, transparent and accessible for every MSME we work with.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="brutal h-full rounded-[20px] bg-mint p-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Vision</span>
              <p className="mt-3 font-display text-2xl font-bold leading-snug text-deep-900">
                To be the most trusted business-finance partner for growing companies, known for straight advice
                and lasting relationships.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3.3 Leadership */}
      <Leadership />
    </>
  );
}
