import { Faq } from "@/components/home/Faq";
import { BankingPartners } from "@/components/home/BankingPartners";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyArena } from "@/components/home/WhyArena";
import { ServiceTiles } from "@/components/services/ServiceTiles";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-16">
        <Container className="max-w-6xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-600">Our services</span>
          <h2 className="mb-6 mt-2 max-w-2xl font-display text-3xl font-bold text-deep-900 sm:text-4xl">
            Finance for MSMEs and growing businesses
          </h2>
          <ServiceTiles />
        </Container>
      </section>

      <ProcessTimeline />
      <WhyArena />
      <BankingPartners />
      <Testimonials />
      <Faq />
      <ClosingCta />
    </>
  );
}
