import { Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { financialConsultants, teamMembers } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function TeamSection() {
  return (
    <section className="bg-white py-10">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Founders of Arena Financial Services"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <Card key={member.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-deep-900 font-display text-xl font-bold text-primary-400">
                  {initials(member.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-deep-900">
                    {member.name}
                  </h3>
                  <span className="text-sm font-semibold text-primary-600">
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-deep-500">
                {member.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <a
                href={`mailto:${member.email}`}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-center font-display text-2xl font-bold text-deep-900">
            Financial Consultants
          </h3>
          <div className="mx-auto grid w-full max-w-2xl gap-4 sm:grid-cols-2">
            {financialConsultants.map((person) => (
              <Card key={person.id} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-deep-900 font-display text-base font-bold text-primary-400">
                  {initials(person.name)}
                </div>
                <div>
                  <p className="font-display font-bold text-deep-900">{person.name}</p>
                  <p className="text-sm text-deep-500">{person.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
