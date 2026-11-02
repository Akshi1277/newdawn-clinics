"use client";

import { AnimatePresence, animate, m, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import manifest from "@/config/images.json";
import { Picture } from "@/components/ui/Picture";

const ease = [0.16, 1, 0.3, 1] as const;

/** What a dermatologist looks at. Positions are % of the 3:4 portrait. */
const SPOTS = [
  { id: "tone", num: "01", label: "Tone & pigmentation", note: "Evenness, dark patches and melasma.", x: 46, y: 42 },
  { id: "texture", num: "02", label: "Texture", note: "Surface smoothness, scarring and fine lines.", x: 38, y: 24 },
  { id: "pores", num: "03", label: "Pores", note: "Congestion, oil and the early signs of acne.", x: 29, y: 39 },
  { id: "barrier", num: "04", label: "Barrier & hydration", note: "How well skin holds moisture and resists irritation.", x: 42, y: 55 },
] as const;

const ZOOM = 1.6;

/**
 * Editorial skin study with interactive clinical focus points. At rest, the portrait
 * remains unobstructed with subtle anatomical markers; hovering with a mouse opens
 * an optical loupe over the skin.
 */
export function HeroLoupe() {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pointerLens, setPointerLens] = useState(false);
  const [lens, setLens] = useState(136);

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
      setLens(Math.round(Math.max(108, Math.min(148, el.clientWidth * 0.28))));
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
      animate(px, SPOTS[i].x, { duration: 1.4, ease });
      animate(py, SPOTS[i].y, { duration: 1.4, ease });
    }, 3600);
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
    px.set(Math.min(94, Math.max(6, ((e.clientX - r.left) / r.width) * 100)));
    py.set(Math.min(94, Math.max(6, ((e.clientY - r.top) / r.height) * 100)));
  };

  const selectSpot = (index: number) => {
    setHovering(true);
    setActive(index);
    animate(px, SPOTS[index].x, { duration: reduce ? 0 : 0.7, ease });
    animate(py, SPOTS[index].y, { duration: reduce ? 0 : 0.7, ease });
  };

  // Keyboard: arrow keys step between the four areas.
  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + SPOTS.length) % SPOTS.length;
    selectSpot(next);
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
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") {
            setHovering(true);
            setPointerLens(true);
          }
        }}
        onPointerLeave={() => {
          setHovering(false);
          setPointerLens(false);
        }}
        onPointerMove={onMove}
        onKeyDown={onKey}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        tabIndex={0}
        role="group"
        aria-roledescription="interactive portrait"
        aria-label="Dermatologist’s lens. Use the arrow keys to move between the areas a dermatologist examines."
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-t-[999px] bg-[#d8c8b4] ring-1 ring-espresso/12 ${
          pointerLens ? "cursor-none" : "cursor-crosshair"
        }`}
      >
        <Picture
          name="portrait"
          priority
          sizes="(min-width: 1024px) 40vw, 88vw"
          alt="Editorial portrait: a South Asian woman with her eyes softly closed in warm window light"
          className="h-full w-full object-cover"
        />

        {/* Subtle anatomical pinpoint markers when optical lens is not actively hovered */}
        {!pointerLens &&
          SPOTS.map((s, i) => {
            const isCurrent = i === active;
            return (
              <span
                key={s.id}
                aria-hidden
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isCurrent
                      ? "size-2.5 bg-ivory ring-4 ring-ivory/35 shadow-[0_2px_8px_rgba(42,31,26,0.45)]"
                      : "size-1.5 bg-ivory/75 ring-1 ring-espresso/20"
                  }`}
                />
              </span>
            );
          })}

        {/* Optical loupe: blooms open only when actively inspecting with a mouse */}
        {size.w > 0 && pointerLens && (
          <m.div
            aria-hidden
            className="pointer-events-none absolute rounded-full ring-1 ring-ivory/90 shadow-[0_20px_45px_-12px_rgba(20,10,8,0.5)]"
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
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease }}
          />
        )}
      </div>

      {/* Integrated architectural ledger directly beneath the portrait */}
      <div
        className="border-x border-b border-espresso/15 bg-porcelain/90 px-4 py-3.5 backdrop-blur-sm md:px-5 md:py-4"
        aria-live={hovering ? "polite" : "off"}
      >
        <div className="flex items-center justify-between gap-3 border-b border-espresso/10 pb-2.5">
          <p className="label text-espresso/75">What Dr. Aditya looks at</p>
          <div className="flex items-center gap-1" role="group" aria-label="Clinical focus areas">
            {SPOTS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => selectSpot(i)}
                aria-label={s.label}
                aria-pressed={i === active}
                className={`rounded-full px-2 py-0.5 font-sans text-[0.68rem] font-semibold tracking-[0.08em] transition-colors ${
                  i === active ? "bg-espresso text-ivory" : "text-espresso/65 hover:text-espresso"
                }`}
              >
                {s.num}
              </button>
            ))}
          </div>
        </div>
        <div className="relative mt-2.5 min-h-[3.25rem] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={spot.id}
              initial={reduce ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -12, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <p className="font-serif text-[1.35rem] italic leading-[1.08] text-burgundy">{spot.label}</p>
              <p className="mt-0.5 text-[0.86rem] leading-snug text-espresso/85">{spot.note}</p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-2 text-right text-[0.72rem] text-espresso/70">Model image, not a patient.</p>
    </div>
  );
}
