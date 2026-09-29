import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";
import { StoryReveal } from "@/components/animations/StoryReveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";
import { processSteps, teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Arena Financial Services' story, mission, and the leadership team behind our financial advisory services.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-14 pt-28">
        <SectionVideoBackground src="/videos/finance_video_1.mp4" />
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Our Story
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built on Trust, Driven by Your Financial Success
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            Founded in 2011, Arena Financial Services has grown from a single-city
            advisory desk into a trusted financial partner for tens of
            thousands of individuals and businesses across the country.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <Card className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-deep-900">
              Our Mission
            </h2>
            <p className="text-deep-500">
              To simplify access to loans, insurance, and investment products
              through transparent advice and a genuinely client-first
              process — helping every client make confident financial
              decisions.
            </p>
          </Card>
          <Card className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-deep-900">
              Our Vision
            </h2>
            <p className="text-deep-500">
              To be the most trusted financial services partner in the
              region, known for integrity, expertise, and long-term
              relationships built on real outcomes.
            </p>
          </Card>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-mint py-16">
        <StoryReveal />
        <Container className="relative z-10 flex flex-col gap-12">
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones Along the Way"
          />
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-deep-200 md:left-0 md:top-6 md:h-px md:w-full" />
            <div className="grid gap-10 md:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.id} className="relative flex gap-4 md:flex-col md:gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-deep-900 font-display text-lg font-bold text-primary-400">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-lg font-bold text-deep-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-deep-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the Team Behind Arena Financial Services"
            subtitle="Experienced advisors dedicated to guiding you through every financial decision."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="flex flex-col gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-deep-900 font-display text-xl font-bold text-primary-400">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-display text-lg font-bold text-deep-900">
                  {member.name}
                </h3>
                <span className="text-sm font-semibold text-primary-600">
                  {member.role}
                </span>
                <p className="text-sm text-deep-500">{member.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
