"use client";

import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";

const STAGES = [
  { n: "01", t: "Book", d: "Get in touch with New Dawn Clinics by WhatsApp or phone." },
  { n: "02", t: "Consult", d: "Discuss your skin, hair or aesthetic concerns with Dr. Aditya." },
  { n: "03", t: "Assess", d: "Understand your concerns through an appropriate clinical assessment." },
  { n: "04", t: "Plan", d: "Explore suitable treatment approaches and what to realistically expect." },
  { n: "05", t: "Continue care", d: "Follow the recommended treatment and aftercare plan, with review over time." },
];

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="border-t border-line bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="journey-title" text="How a consultation works." className="max-w-[16ch] text-espresso" />
          <p className="label text-espresso/70">Five stages of care</p>
        </div>

        <ol
          tabIndex={0}
          aria-label="Five stages of your journey"
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto border-y border-espresso/15 px-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
        >
          {STAGES.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 0.05}
              className="flex w-[78vw] shrink-0 snap-start flex-col border-l border-espresso/15 px-6 py-10 first:border-l-0 sm:w-[46vw] lg:w-auto lg:px-7 lg:py-12 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-serif text-[clamp(3.2rem,4.5vw,4.75rem)] leading-[0.85] tracking-[-0.03em] text-terracotta">
                {s.n}
              </span>
              <div className="mt-12">
                <h3 className="font-serif text-[clamp(1.75rem,2.4vw,2.35rem)] leading-[1.08] text-espresso">{s.t}</h3>
                <p className="mt-3 max-w-[28ch] text-[0.98rem] leading-relaxed text-espresso/80">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
