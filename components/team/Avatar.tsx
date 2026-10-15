import Image from "next/image";
import { cn } from "@/lib/utils";

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

/**
 * Initials avatar that switches to a photo when one exists at
 * /public/images/team/<slug>.jpg (the Team page checks for the file at build
 * time and passes `photo`).
 */
export function Avatar({
  name,
  photo,
  className,
}: {
  name: string;
  photo?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-deep-900 font-display font-bold text-primary-400",
        className,
      )}
    >
      {photo ? (
        <Image src={photo} alt={name} fill sizes="96px" className="object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </div>
  );
}
