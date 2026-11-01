"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { featured } from "@/config/site";
import type { FeaturedTreatment } from "@/config/types";
import { waTreatment } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";

const ART_ALT: Record<FeaturedTreatment["art"], string> = {
  cream: "Abstract artwork: a soft swirl of ivory cream",
  glass: "Abstract artwork: a translucent amber glass ribbon",
  texture: "Abstract artwork: macro study of fine surface relief",
  botanical: "Abstract artwork: sage leaves in soft shadow",
  strands: "Abstract artwork: fine golden strands flowing across deep green",
  arch: "Abstract artwork: warm light falling across a plaster arch",
};

function Panel({ f, i }: { f: FeaturedTreatment; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const dark = f.theme.fg.toLowerCase() === "#f3ece2";

  return (
    <section
      ref={ref}
      aria-labelledby={`feat-${f.slug}`}
      className={`relative md:sticky md:top-0 md:h-[100svh] ${dark ? "on-dark" : ""}`}
      style={{ zIndex: i + 1 }}
    >
      <m.div
        className={`relative flex h-full flex-col overflow-hidden ${i > 0 ? "md:shadow-[0_-30px_60px_-20px_rgba(42,31,26,0.35)]" : ""}`}
        style={{ backgroundColor: f.theme.bg, color: f.theme.fg }}
      >
        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] items-center gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-0">
          <div className="md:col-span-7">
            <h3 id={`feat-${f.slug}`} className="font-serif text-[clamp(3rem,8.4vw,8.5rem)] leading-[0.88] tracking-[-0.03em]">
              <span className="block">{f.titleLines[0]}</span>
              <span className="block">{f.titleLines[1]}</span>
            </h3>
            <p className="mt-8 max-w-[44ch] text-lead opacity-90">{f.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`/treatments/${f.slug}/`} variant={dark ? "light" : "solid"}>
                Read the guide
              </Button>
              <Button href={waTreatment(f.title.toLowerCase())} variant={dark ? "outline-light" : "outline"} icon="whatsapp">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <m.figure style={reduce ? undefined : { y: artY }} className="mx-auto w-[78%] max-w-[480px] md:w-full">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-t-[999px]`}>
                <Picture name={f.art} sizes="(min-width: 768px) 36vw, 78vw" alt={ART_ALT[f.art]} className="h-full w-full object-cover" />
              </div>
            </m.figure>
          </div>
        </div>
      </m.div>
    </section>
  );
}

export function Featured() {
  return (
    <div aria-label="Featured treatments" role="region" className="relative bg-espresso">
      <h2 className="sr-only">Featured treatments</h2>
      {featured.map((f, i) => (
        <Panel key={f.slug} f={f} i={i} />
      ))}
    </div>
  );
}
