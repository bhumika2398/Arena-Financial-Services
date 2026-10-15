"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { prefix: "Over", value: 3000, label: "Happy customers" },
  { prefix: "Over", value: 100, label: "Cr disbursals" },
  { prefix: "More than", value: 5, label: "Cities" },
  { prefix: "More than", value: 20, label: "Banks and NBFCs" },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      // Reduced motion: jump straight to the final value.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} aria-label={String(to)}>
      {reduced && !inView ? to : n}
    </span>
  );
}

export function TransparencySection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-10">
      <Container className="flex max-w-5xl flex-col gap-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex max-w-3xl flex-col gap-4"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-primary-600">
            Our Policy
          </span>
          <h2 className="font-display text-3xl font-bold text-deep-900 sm:text-4xl">
            Transparency is our Policy
          </h2>
          <div className="flex flex-col gap-3 leading-relaxed text-deep-500">
            <p>
              Arena Financial Services was founded in 2008 and since inception
              we have successfully maintained an excellent track record for our
              services.
            </p>
            <p>
              Transparency and Customer satisfaction is our priority. Our
              financial experts help you with documentation, and services are
              rendered at your doorstep making the whole loan process
              hassle-free.
            </p>
            <p>
              We provide our expert advice proactively to our clients in
              selecting the right bank and also plan their finances better in
              advance instead of relying on the channels or Banks. We are
              authorised channel partner with more than 20 Banks and
              NBFC&apos;s and we make sure that the customer gets the best
              possible deal from the Market. Our sound partnership and more
              than a decade old industry experience enables us to negotiate the
              best deals on your behalf and offer you the most cost-effective
              rates.
            </p>
            <p>
              Whether you are trying to expand your business, buying
              machinery, developing infrastructure or buying your first flat,
              buying a car, getting married, investing in a holiday home or
              planning your retirement and so on, Arena Financial Services can
              make it happen. We help clients achieve their goals by providing
              the right funding.
            </p>
            <p>
              We pride ourselves on our approach to arranging the ideal finance
              solutions required by borrowers and have many satisfied clients.
              We follow strict{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600"
              >
                privacy policy
              </Link>{" "}
              as we consider the trust of our clients of paramount value.
            </p>
            <p>
              We have been graced numerous industry awards and accolades which
              is a testament to our expertise and high levels of quality of
              service.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-deep-200 bg-deep-200 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : i * 0.08 }}
              className="flex flex-col gap-1 bg-white p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-deep-400">
                {s.prefix}
              </span>
              <span className="font-display text-4xl font-bold tabular-nums text-primary-600">
                <CountUp to={s.value} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-deep-700">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
