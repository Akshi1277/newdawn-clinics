"use client";

import { AnimatePresence, animate, m, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import manifest from "@/config/images.json";
import { Picture } from "@/components/ui/Picture";

const ease = [0.16, 1, 0.3, 1] as const;

/** What a dermatologist looks at. Positions are % of the 3:4 portrait. */
const SPOTS = [
  { id: "tone", label: "Tone & pigmentation", note: "Evenness, dark patches and melasma.", x: 58, y: 48 },
  { id: "texture", label: "Texture", note: "Surface smoothness, scarring and fine lines.", x: 40, y: 22 },
  { id: "pores", label: "Pores", note: "Congestion, oil and the early signs of acne.", x: 31, y: 47 },
  { id: "barrier", label: "Barrier & hydration", note: "How well skin holds moisture and resists irritation.", x: 55, y: 70 },
] as const;

const ZOOM = 2.3;

/**
 * Editorial portrait examined through a dermatologist's loupe. The lens follows
 * the pointer on desktop and tours the four areas on its own otherwise,
 * labelling what is being looked at.
 */
export function HeroLoupe() {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [lens, setLens] = useState(150);

  // Lens centre as % of the portrait
  const px = useMotionValue<number>(SPOTS[0].x);
  const py = useMotionValue<number>(SPOTS[0].y);
  const sx = useSpring(px, { stiffness: 140, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 22, mass: 0.6 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
      setLens(Math.round(Math.max(104, Math.min(170, el.clientWidth * 0.3))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-tour when the visitor isn't steering the lens.
  useEffect(() => {
    if (reduce || hovering) return;
    let i = active;
    const id = window.setInterval(() => {
      i = (i + 1) % SPOTS.length;
      animate(px, SPOTS[i].x, { duration: 1.6, ease });
      animate(py, SPOTS[i].y, { duration: 1.6, ease });
    }, 3200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, reduce]);

  // Label whichever area the lens is closest to.
  const pick = () => {
    const x = sx.get();
    const y = sy.get();
    let best = 0;
    let bd = Infinity;
    SPOTS.forEach((s, i) => {
      const d = (s.x - x) ** 2 + ((s.y - y) * 0.75) ** 2;
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    setActive((a) => (a === best ? a : best));
  };
  useMotionValueEvent(sx, "change", pick);
  useMotionValueEvent(sy, "change", pick);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = box.current!.getBoundingClientRect();
    px.set(Math.min(96, Math.max(4, ((e.clientX - r.left) / r.width) * 100)));
    py.set(Math.min(96, Math.max(4, ((e.clientY - r.top) / r.height) * 100)));
  };

  // Keyboard: arrow keys step the lens between the four areas.
  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    setHovering(true);
    const next = (active + dir + SPOTS.length) % SPOTS.length;
    animate(px, SPOTS[next].x, { duration: reduce ? 0 : 0.9, ease });
    animate(py, SPOTS[next].y, { duration: reduce ? 0 : 0.9, ease });
  };

  const left = useTransform(sx, (v) => `calc(${v}% - ${lens / 2}px)`);
  const top = useTransform(sy, (v) => `calc(${v}% - ${lens / 2}px)`);
  const bgX = useTransform(sx, (v) => -((v / 100) * size.w * ZOOM - lens / 2));
  const bgY = useTransform(sy, (v) => -((v / 100) * size.h * ZOOM - lens / 2));
  const bgPos = useMotionTemplate`${bgX}px ${bgY}px`;

  const full = manifest.portrait.widths[manifest.portrait.widths.length - 1];
  const spot = SPOTS[active];

  return (
    <div className="relative">
      <div
        ref={box}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onPointerMove={onMove}
        onKeyDown={onKey}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        tabIndex={0}
        role="group"
        aria-roledescription="interactive portrait"
        aria-label="Dermatologist’s lens. Use the arrow keys to move between the areas a dermatologist examines."
        className="relative aspect-[3/4] w-full cursor-none overflow-hidden rounded-t-[999px] bg-[#e7d8c6] shadow-[0_50px_100px_-50px_rgba(42,31,26,0.6)]"
      >
        <Picture
          name="portrait"
          priority
          sizes="(min-width: 1024px) 40vw, 88vw"
          alt="Editorial portrait: a woman with her eyes closed, fingertips resting on her cheek, in soft window light"
          className="h-full w-full object-cover"
        />

        {/* Loupe */}
        {size.w > 0 && (
          <m.div
            aria-hidden
            className="pointer-events-none absolute rounded-full ring-1 ring-ivory/90 shadow-[0_24px_50px_-14px_rgba(20,10,8,0.55),inset_0_0_0_6px_rgba(243,236,226,0.35)]"
            style={{
              width: lens,
              height: lens,
              left,
              top,
              backgroundImage: `url(/art/portrait-${full}.webp)`,
              backgroundSize: `${size.w * ZOOM}px ${size.h * ZOOM}px`,
              backgroundPosition: bgPos,
              backgroundRepeat: "no-repeat",
            }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 1.3 }}
          >
            {/* reticle */}
            <span className="absolute left-1/2 top-3 h-2.5 w-px -translate-x-1/2 bg-ivory/80" />
            <span className="absolute bottom-3 left-1/2 h-2.5 w-px -translate-x-1/2 bg-ivory/80" />
            <span className="absolute left-3 top-1/2 h-px w-2.5 -translate-y-1/2 bg-ivory/80" />
            <span className="absolute right-3 top-1/2 h-px w-2.5 -translate-y-1/2 bg-ivory/80" />
          </m.div>
        )}
      </div>

      {/* Readout */}
      <div
        className="relative z-[2] -mt-16 ml-[-8%] w-[min(22rem,88%)] bg-ivory/95 p-5 shadow-[0_30px_60px_-30px_rgba(42,31,26,0.45)] ring-1 ring-espresso/10 md:-mt-24 md:ml-[-18%] md:p-6"
        aria-live={hovering ? "polite" : "off"}
      >
        <p className="label text-espresso/80">What Dr. Aditya looks at</p>
        <div className="relative mt-3 h-[4.6rem] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={spot.id}
              initial={reduce ? false : { y: "60%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={reduce ? undefined : { y: "-60%", opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="font-serif text-[1.65rem] italic leading-[1.08] text-burgundy">{spot.label}</p>
              <p className="mt-2 text-[0.92rem] leading-snug text-espresso/85">{spot.note}</p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-4 text-right text-[0.78rem] text-espresso/75">Model image, not a patient.</p>
    </div>
  );
}
