import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VideoBackground } from "@/components/video/VideoBackground";
import { SITE } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-deep-950 py-20">
      <VideoBackground src="/videos/finance_video_1.mp4" poster="/videos/posters/finance_video_1.jpg" overlay={0.78} />
      <Container className="relative max-w-6xl">
        <div className="glass flex flex-col items-start justify-between gap-8 rounded-[24px] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="max-w-md font-display text-4xl font-bold text-white sm:text-5xl">Ready to fund your next step?</h2>
            <p className="mt-3 text-lg text-deep-100">Talk to an Arena advisor today.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/contact#enquiry" size="lg">
              Apply Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={SITE.phones[0].href} size="lg" variant="outlineLight">
              <Phone className="h-5 w-5" />
              Call {SITE.phones[0].label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
