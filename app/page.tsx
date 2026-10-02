import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <ScrollToHash />
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessTimeline />
      
      <Testimonials />
      <PartnerMarquee />
      <Faq />
      <CtaBanner />
    </>
  );
}
