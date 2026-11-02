"use client";

import { Reveal } from "@/components/motion/Reveal";

const PRINCIPLES = [
  {
    num: "01",
    word: "Understand",
    text: "Every skin, hair or scalp concern deserves a thorough clinical assessment before choosing an intervention.",
  },
  {
    num: "02",
    word: "Personalise",
    text: "Treatment discussions weigh your skin type, medical history, daily routine and suitability.",
  },
  {
    num: "03",
    word: "Communicate",
    text: "You should understand the options, realistic timelines and limitations clearly before starting.",
  },
  {
    num: "04",
    word: "Care",
    text: "Thoughtful dermatology looks after long-term skin barrier health well beyond the first visit.",
  },
];

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="border-t border-line bg-ivory py-24 text-espresso md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="approach-title" className="max-w-[18ch] font-serif text-display-l">
            Dermatology, <span className="italic text-burgundy">approached thoughtfully.</span>
          </h2>
          <p className="label text-espresso/70">The New Dawn approach</p>
        </div>

        <ol className="mt-16 grid border-t border-espresso/15 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.word}
              as="li"
              delay={i * 0.06}
              className="flex flex-col border-b border-espresso/15 py-10 sm:px-6 sm:first:pl-0 sm:nth-[2n]:border-l sm:nth-[2n]:border-espresso/15 lg:border-l lg:first:border-l-0 lg:last:pr-0"
            >
              <span className="label text-terracotta">{p.num}</span>
              <div className="mt-12">
                <h3 className="font-serif text-[clamp(2.2rem,3.4vw,3.25rem)] italic leading-[1.04] text-espresso">{p.word}.</h3>
                <p className="mt-4 max-w-[32ch] text-espresso/85">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
