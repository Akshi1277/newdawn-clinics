"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useRef } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { Topo } from "@/components/art/Topo";
import { bookHref } from "@/lib/links";
import { HeroLoupe } from "./HeroLoupe";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();

  // Scroll hand-off into the marquee band
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const topoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-ivory pb-20 pt-28 md:pb-24 md:pt-32 lg:pt-28"
    >
      {/* Contour field behind the portrait */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -right-[30%] top-[-10%] h-[120%] w-[110%] text-espresso md:-right-[12%] md:w-[72%]"
        style={reduce ? undefined : { scale: topoScale }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease, delay: 0.2 }}
      >
        <Topo variant="hero" className="h-full w-full" opacity={0.2} />
      </m.div>

      <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-0">
        {/* Headline */}
        <m.div className="relative z-[3] lg:col-span-7 lg:row-start-1 lg:pt-[3vh]" style={reduce ? undefined : { y: textY }}>
          <m.p
            className="label text-espresso/75"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
          >
            New Dawn Clinics
            <span className="mx-2 inline-block h-px w-8 translate-y-[-0.3em] bg-current align-middle" aria-hidden />
            Dr. Aditya Tolat<span className="hidden sm:inline"> · Dermatologist</span>
          </m.p>

          <SplitText
            as="h1"
            id="hero-title"
            trigger="mount"
            by="chars"
            delay={0.2}
            stagger={0.028}
            className="mt-8 font-serif text-[clamp(3.4rem,min(9.5vw,14svh),10rem)] leading-[0.98] tracking-[-0.03em] text-espresso md:mt-10 lg:mt-7"
            lines={[
              { text: "Your skin." },
              { text: "Understood.", italic: true, className: "pl-[0.5em] text-burgundy md:pl-[0.9em]" },
              { text: "Expertly cared for.", className: "mt-3 text-[0.42em] leading-[1] tracking-[-0.02em]" },
            ]}
          />
        </m.div>

        {/* Portrait under the loupe: sits between headline and copy on mobile */}
        <m.div
          className="relative mx-auto w-[88%] max-w-[560px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mr-0 lg:w-[min(100%,calc((100svh-10rem)*0.75))] lg:max-w-none lg:self-start lg:justify-self-end"
          style={reduce ? undefined : { y: artY }}
          initial={reduce ? false : { clipPath: "inset(20% -60% -60% -60%)", y: 40 }}
          animate={{ clipPath: "inset(-60% -60% -60% -60%)", y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.3 }}
        >
          <HeroLoupe />
        </m.div>

        {/* Copy + actions */}
        <m.div className="relative z-[3] lg:col-span-7 lg:row-start-2" style={reduce ? undefined : { y: textY }}>
          <m.p
            className="max-w-[38ch] text-lead text-espresso/85 lg:mt-8"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.0 }}
          >
            Skin, hair and aesthetic dermatology with Dr.&nbsp;Aditya Tolat at New Dawn Clinics, Bandra. Every consultation starts with a
            close look.
          </m.p>

          <m.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.15 }}
          >
            <Button href={bookHref()} size="lg">
              Book a Consultation
            </Button>
            <Button href="/#treatments" variant="outline" size="lg">
              Explore Treatments
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
