"use client";

import { Heading } from "@/components/ui/Heading";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "01", t: "Book", d: "Get in touch with New Dawn Clinics by WhatsApp or phone." },
  { n: "02", t: "Consult", d: "Discuss your skin, hair or aesthetic concerns with Dr. Aditya." },
  { n: "03", t: "Assess", d: "Understand your concerns through an appropriate clinical assessment." },
  { n: "04", t: "Plan", d: "Explore suitable treatment approaches and what to realistically expect." },
  { n: "05", t: "Continue care", d: "Follow the recommended treatment and aftercare plan, with review over time." },
];

function Card({ s }: { s: (typeof STAGES)[number] }) {
  return (
    <li className="flex h-full shrink-0 snap-start flex-col border-l border-espresso/20 px-6 py-8 md:px-10 md:py-12">
      <span className="font-serif text-[clamp(4rem,7vw,6.5rem)] leading-[0.8] tracking-[-0.03em] text-terracotta">{s.n}</span>
      <div className="mt-auto pt-10">
        <h3 className="font-serif text-display-m text-espresso">{s.t}</h3>
        <p className="mt-4 max-w-[30ch] text-lead text-espresso/80">{s.d}</p>
      </div>
    </li>
  );
}

function Header({ pinned }: { pinned: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
      <Heading id="journey-title" text="What your journey looks like." className="max-w-[14ch] text-espresso" />
      <p className="label text-espresso/75">{pinned ? "Keep scrolling to follow the journey" : "Swipe to follow the journey"}</p>
    </div>
  );
}

/** Desktop: the five stages travel horizontally while the page scrolls vertically. */
function PinnedJourney() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Align the first card with the heading's left edge (max-w-[1600px] container + px-10).
  const gutter = "max(2.5rem, calc((100vw - 1600px) / 2 + 2.5rem))";

  return (
    <section ref={outer} aria-labelledby="journey-title" className="relative bg-ivory" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-20">
        <Header pinned />
        <m.ol
          ref={track}
          aria-label="Five stages of your journey"
          style={{ x, paddingLeft: gutter, paddingRight: gutter }}
          className="mt-10 flex h-[56vh] w-max [&>li]:w-[40vw] xl:[&>li]:w-[34vw]"
        >
          {STAGES.map((s) => (
            <Card key={s.n} s={s} />
          ))}
        </m.ol>
        <div aria-hidden className="mx-auto mt-8 w-full max-w-[1600px] px-10">
          <div className="h-px bg-espresso/15">
            <m.div className="h-full bg-terracotta" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (wide && !reduce) return <PinnedJourney />;

  return (
    <section aria-labelledby="journey-title" className="bg-ivory py-24 md:py-32">
      <Header pinned={false} />
      <ol
        tabIndex={0}
        aria-label="Five stages of your journey"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-0 overflow-x-auto scroll-smooth px-5 pb-4 md:scroll-px-10 [&>li]:w-[84vw] sm:[&>li]:w-[60vw] md:px-10"
      >
        {STAGES.map((s) => (
          <Card key={s.n} s={s} />
        ))}
      </ol>
    </section>
  );
}
