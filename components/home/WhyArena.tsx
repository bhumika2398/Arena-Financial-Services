import { BookOpen, Handshake, MessageSquareText, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: "01",
    title: "Understand",
    description:
      "Before anything else, you should know which financing routes could apply to what you are trying to do, and how each one actually works — secured against unsecured, a fixed schedule against a revolving limit, shorter tenure against longer.",
  },
  {
    step: "02",
    title: "Compare",
    description:
      "Two products can both fit and still lead to very different costs and commitments. We lay out the trade-offs so the choice is yours to make with the full picture, not a nudge toward whatever is easiest to place.",
  },
  {
    step: "03",
    title: "Prepare",
    description:
      "Most applications stall on missing paperwork, not on the merits. Knowing the document list and what a lender will scrutinise — before you apply — is usually what keeps things moving.",
  },
  {
    step: "04",
    title: "Proceed",
    description:
      "When you decide to go ahead, you share your details once. Arena takes the case to a lender that fits and stays your point of contact through assessment, sanction and disbursal.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Information first",
    description:
      "The calculators, the Finance Finder and the service pages are all usable without giving us your contact details. You decide when to get in touch.",
  },
  {
    icon: Scale,
    title: "Honest about what we are",
    description:
      "Arena helps you navigate financing. The lender is a bank or an NBFC, and the lender decides. We never present an estimate as an approval or imply a guarantee.",
  },
  {
    icon: MessageSquareText,
    title: "Plain language",
    description:
      "Financial terms explained the way a knowledgeable person would explain them to a friend — short sentences, concrete examples, no jargon for its own sake.",
  },
  {
    icon: Handshake,
    title: "One process, one contact",
    description:
      "From working out what fits, to assembling documents, to dealing with the lender, it is the same point of contact throughout.",
  },
];

/** Deliberately plain: text-led, no glow/glass, so it reads as serious and credible. */
export function WhyArena() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <Container className="flex max-w-5xl flex-col gap-8 sm:gap-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 className="text-balance font-display text-3xl font-bold text-deep-900 sm:text-4xl">
            Clear advice. No unnecessary complexity.
          </h2>
          <p className="text-lg leading-relaxed text-deep-500">
            The financing process is confusing enough on its own. Arena&apos;s
            job is to make the part before the application — and the
            application itself — easier to understand and get through.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-600">
            Four things, in order
          </h3>
          <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.step} className="flex gap-5 border-t border-deep-100 pt-4">
                <span className="font-display text-2xl font-bold text-primary-600">
                  {s.step}
                </span>
                <div>
                  <h4 className="mb-1 font-display text-lg font-bold text-deep-900">
                    {s.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-deep-500">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-600">
            What makes the experience different
          </h3>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <f.icon className="mt-0.5 h-6 w-6 shrink-0 text-deep-700" strokeWidth={1.5} />
                <div>
                  <h4 className="mb-1 font-display text-lg font-bold text-deep-900">
                    {f.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-deep-500">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-deep-200 bg-deep-50/40 p-5 sm:p-6">
          <h3 className="mb-3 font-display text-lg font-bold text-deep-900">
            On numbers we cannot yet verify
          </h3>
          <p className="text-sm leading-relaxed text-deep-500">
            You will not find customer counts, disbursal totals or success rates
            on this site until they are verified. Where a figure would normally
            sit, we have left it out rather than round something up. Trust
            should come from how clearly the process is explained and how
            straight the advice is — not from a statistic.
          </p>
        </aside>
      </Container>
    </section>
  );
}
