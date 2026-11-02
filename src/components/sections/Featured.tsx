"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useRef } from "react";
import { featured } from "@/config/site";
import type { FeaturedTreatment } from "@/config/types";
import { waTreatment } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { ART_ALT, Picture, resolveArt } from "@/components/ui/Picture";

function Panel({ f, i, total }: { f: FeaturedTreatment; i: number; total: number }) {
  const art = resolveArt(f.art, f.fallbackArt);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const dark = f.theme.fg.toLowerCase() === "#f3ece2";

  return (
    <section
      ref={ref}
      aria-labelledby={`feat-${f.slug}`}
      className={`relative border-t border-current/12 md:sticky md:top-0 md:h-[100svh] ${dark ? "on-dark" : ""}`}
      style={{ zIndex: i + 1 }}
    >
      <m.div
        className={`relative flex h-full flex-col overflow-hidden ${i > 0 ? "md:shadow-[0_-24px_50px_-24px_rgba(42,31,26,0.3)]" : ""}`}
        style={{ backgroundColor: f.theme.bg, color: f.theme.fg }}
      >
        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] items-center gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-0">
          <div className="md:col-span-7">
            <p className="label opacity-70">
              In-depth guide · {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h3 id={`feat-${f.slug}`} className="mt-5 font-serif text-[clamp(3rem,8vw,8rem)] leading-[1] tracking-[-0.03em]">
              <span className="block">{f.titleLines[0]}</span>
              <span className="block italic">{f.titleLines[1]}</span>
            </h3>
            <p className="mt-7 max-w-[44ch] text-lead opacity-90">{f.summary}</p>
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
            <m.figure style={reduce ? undefined : { y: artY }} className="mx-auto w-[84%] max-w-[460px] md:w-full">
              <div className="relative aspect-[4/5] overflow-hidden border border-current/15">
                <Picture name={art} sizes="(min-width: 768px) 36vw, 84vw" alt={ART_ALT[art]} className="h-full w-full object-cover" />
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
        <Panel key={f.slug} f={f} i={i} total={featured.length} />
      ))}
    </div>
  );
}
