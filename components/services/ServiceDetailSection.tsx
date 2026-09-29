import { Check } from "lucide-react";
import { FlowingGradient } from "@/components/animations/FlowingGradient";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

export function ServiceDetailSection({
  service,
  reverse = false,
  bare = false,
}: {
  service: Service;
  reverse?: boolean;
  /** When true, renders without the alternating section background (used on single-service pages). */
  bare?: boolean;
}) {
  const Icon = iconMap[service.icon];

  return (
    <section
      id={service.slug}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-14",
        bare ? "bg-white" : reverse ? "bg-mint" : "bg-white",
      )}
    >
      <FlowingGradient />
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div className={cn(reverse && "lg:order-2")}>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
            {Icon ? <Icon className="h-7 w-7" /> : null}
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold text-deep-900">
            {service.title}
          </h2>
          <p className="mb-6 text-lg text-deep-500">{service.description}</p>
          <Button href="/contact">Enquire Now</Button>
        </div>

        <ul className={cn("flex flex-col gap-4", reverse && "lg:order-1")}>
          {service.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <span className="text-deep-700">{detail}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
