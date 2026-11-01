"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Topo } from "@/components/art/Topo";

const PRINCIPLES = [
  {
    word: "Understand",
    text: "Every skin concern deserves proper assessment.",
    bg: "#F3ECE2",
    fg: "#2A1F1A",
    blob: "#E4D6C6",
    radius: "58% 42% 46% 54% / 52% 44% 56% 48%",
  },
  {
    word: "Personalise",
    text: "Treatment discussions should consider individual needs, medical history and suitability.",
    bg: "#A9B19B",
    fg: "#2A1F1A",
    blob: "#C3C9B6",
    radius: "40% 60% 62% 38% / 46% 58% 42% 54%",
  },
  {
    word: "Communicate",
    text: "Patients should understand the options, expectations and limitations before treatment.",
    bg: "#CDA79C",
    fg: "#2A1F1A",
    blob: "#DDBDB2",
    radius: "50% 50% 34% 66% / 62% 40% 60% 38%",
  },
  {
    word: "Care",
    text: "A thoughtful approach extends beyond the initial consultation.",
    bg: "#5C5F43",
    fg: "#F3ECE2",
    blob: "#6E7253",
    radius: "50% 50% 50% 50% / 50% 50% 50% 50%",
  },
];

const N = PRINCIPLES.length;
// Colour stops: hold each colour, then blend across the boundary.
const stops = PRINCIPLES.flatMap((_, i) => [Math.max(0, i / N + (i ? 0.03 : 0)), Math.min(1, (i + 1) / N - 0.03)]);
const each = <K extends keyof (typeof PRINCIPLES)[number]>(k: K) => PRINCIPLES.flatMap((p) => [p[k], p[k]]);

function Word({ p, i, progress }: { p: (typeof PRINCIPLES)[number]; i: number; progress: MotionValue<number> }) {
  const s = i / N;
  const e = (i + 1) / N;
  const last = i === N - 1;
  const y = useTransform(
    progress,
    last ? [s - 0.04, s + 0.04] : [s - 0.04, s + 0.04, e - 0.04, e + 0.02],
    last ? ["105%", "0%"] : ["105%", "0%", "0%", "-105%"],
  );
  const textOpacity = useTransform(progress, last ? [s, s + 0.06] : [s, s + 0.06, e - 0.06, e - 0.01], last ? [0, 1] : [0, 1, 1, 0]);
  const yFirst = useTransform(progress, [e - 0.04, e + 0.02], ["0%", "-105%"]);
  // The first principle is visible from the start and leaves as the second arrives.
  const firstOpacity = useTransform(progress, [e - 0.06, e - 0.01], [1, 0]);
  return (
    <>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden text-center">
        <m.p
          className="font-serif text-[clamp(3rem,12.5vw,13.5rem)] uppercase leading-[0.95] tracking-[-0.03em]"
          style={{ y: i === 0 ? yFirst : y }}
        >
          {p.word}
          <span className="italic">.</span>
        </m.p>
      </div>
      <m.p
        className="absolute inset-x-0 bottom-[13vh] mx-auto max-w-[34ch] px-6 text-center text-lead"
        style={{ opacity: i === 0 ? firstOpacity : textOpacity }}
      >
        {p.text}
      </m.p>
    </>
  );
}

export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bg = useTransform(scrollYProgress, stops, each("bg"));
  const fg = useTransform(scrollYProgress, stops, each("fg"));
  const blob = useTransform(scrollYProgress, stops, each("blob"));
  const radius = useTransform(scrollYProgress, stops, each("radius"));
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const topoScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.35]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section aria-labelledby="approach-title" className="bg-sage py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 id="approach-title" className="font-serif text-display-l">
            Dermatology, <span className="italic">approached thoughtfully.</span>
          </h2>
          <ol className="mt-14 grid gap-px border-t border-espresso/20 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p.word} className="border-b border-espresso/20 py-8">
                <p className="font-serif text-display-m uppercase">{p.word}.</p>
                <p className="mt-3 max-w-[40ch] text-lead">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="approach-title" className="relative h-[320vh]">
      <m.div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: bg, color: fg }}>
        <m.div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[min(78vw,64vh)] -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: blob, borderRadius: radius, rotate }}
        />
        <m.div aria-hidden className="absolute inset-0" style={{ scale: topoScale }}>
          <Topo variant="approach" className="h-full w-full" opacity={0.18} />
        </m.div>

        <div className="relative z-10 mx-auto flex max-w-[1600px] items-start justify-between gap-6 px-5 pt-28 md:px-10">
          <h2 id="approach-title" className="max-w-[16ch] font-serif text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.05]">
            Dermatology, <span className="italic">approached thoughtfully.</span>
          </h2>
          <p className="label hidden opacity-75 md:block">The New Dawn approach</p>
        </div>

        {/* Screen-reader version */}
        <ol className="sr-only">
          {PRINCIPLES.map((p) => (
            <li key={p.word}>
              {p.word}. {p.text}
            </li>
          ))}
        </ol>

        <div aria-hidden className="absolute inset-0 z-10">
          {PRINCIPLES.map((p, i) => (
            <Word key={p.word} p={p} i={i} progress={scrollYProgress} />
          ))}
        </div>

        <div aria-hidden className="absolute inset-x-5 bottom-6 z-10 flex items-center gap-4 md:inset-x-10">
          <span className="label opacity-70">Understand</span>
          <span className="relative h-px flex-1 bg-current/25">
            <m.span className="absolute inset-y-0 left-0 bg-current" style={{ width: bar }} />
          </span>
          <span className="label opacity-70">Care</span>
        </div>
      </m.div>
    </section>
  );
}
