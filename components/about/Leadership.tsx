import { ExternalLink } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import { Avatar } from "@/components/team/Avatar";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/lib/data";

/** Drop a photo at public/images/team/<slug>.jpg to replace the initials. */
function photoFor(slug: string) {
  return fs.existsSync(path.join(process.cwd(), "public", "images", "team", `${slug}.jpg`))
    ? `/images/team/${slug}.jpg`
    : null;
}

export function Leadership() {
  return (
    <section id="leadership" className="scroll-mt-24 border-t-2 border-deep-900 bg-mint py-16">
      <Container className="max-w-5xl">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Leadership</span>
        <div className="mt-6 flex flex-col gap-10">
          {leadership.map((p) => (
            <Reveal key={p.id}>
              <article className="brutal grid overflow-hidden rounded-[20px] bg-white md:grid-cols-[19rem_minmax(0,1fr)]">
                <div className="flex flex-col items-center gap-5 bg-deep-900 p-8 text-center md:items-start md:text-left">
                  <Avatar
                    name={p.name}
                    photo={photoFor(p.slug)}
                    className="h-44 w-44 text-5xl ring-4 ring-primary-300/70 md:h-48 md:w-48"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">{p.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-primary-300">{p.role}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="max-w-[62ch] leading-relaxed text-deep-600">{p.bio}</p>
                  {p.linkedin ? (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-sm group mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-[8px] bg-white px-4 font-semibold text-deep-900"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
