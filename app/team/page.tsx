import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { TeamPage } from "@/components/team/TeamPage";
import { financialConsultants, teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people who run Arena Financial Services and look after your application.",
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Drop a photo at public/images/team/<slug>.jpg (e.g. vinod-kumar-tiwari.jpg) to replace the initials.
function photoFor(name: string) {
  const slug = slugify(name);
  return fs.existsSync(path.join(process.cwd(), "public", "images", "team", `${slug}.jpg`))
    ? `/images/team/${slug}.jpg`
    : null;
}

export default function Page() {
  const withPhoto = <T extends { name: string }>(list: T[]) => list.map((p) => ({ ...p, photo: photoFor(p.name) }));
  const [founder, ...rest] = withPhoto(teamMembers);
  return <TeamPage founder={founder} members={rest} consultants={withPhoto(financialConsultants)} />;
}
