"use client";

import { Heading } from "@/components/ui/Heading";
import { AnimatePresence, m } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowUpRight, Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { treatmentCategories } from "@/config/site";
import type { TreatmentCategory } from "@/config/types";
import { waTreatment } from "@/lib/links";
import { AvailabilityTag } from "@/components/ui/AvailabilityTag";
import { Picture } from "@/components/ui/Picture";
import { CellField } from "@/components/art/CellField";
import { Strands } from "@/components/art/Strands";

const ease = [0.16, 1, 0.3, 1] as const;

function CategoryArt({ cat }: { cat: TreatmentCategory }) {
  if (cat.theme.art === "cells")
    return (
      <div className="absolute inset-0 bg-[#cfd2bf]">
        <div className="absolute inset-[8%] overflow-hidden rounded-full">
          <Picture
            name="botanical"
            sizes="(min-width: 1024px) 45vw, 90vw"
            alt=""
            className="h-full w-full object-cover opacity-90 mix-blend-multiply"
          />
        </div>
        <CellField className="absolute inset-0 h-full w-full text-olive-deep" cols={12} rows={10} seed={5} />
      </div>
    );
  if (cat.theme.art === "glass")
    return (
      <div className="absolute inset-0 bg-[#e3c6bb]">
        <div className="absolute inset-x-[14%] bottom-0 top-[10%] overflow-hidden rounded-t-full">
          <Picture name="glass" sizes="(min-width: 1024px) 40vw, 80vw" alt="" className="h-full w-full scale-110 object-cover" />
        </div>
      </div>
    );
  return (
    <div className="absolute inset-0 bg-forest">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,188,157,0.16),transparent_60%)]" />
      <Strands className="absolute inset-0 h-full w-full text-peach" count={34} />
    </div>
  );
}

export function Treatments() {
  const [active, setActive] = useState(0);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const reduce = useReducedMotionSafe();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const cat = treatmentCategories[active];
  const dark = cat.theme.art === "strands";

  const select = (i: number) => {
    setActive(i);
    setOpenItem(null);
  };

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const n = treatmentCategories.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <m.section
      id="treatments"
      aria-labelledby="treatments-title"
      className={`relative py-24 md:py-36 ${dark ? "on-dark" : ""}`}
      animate={{ backgroundColor: cat.theme.bg, color: cat.theme.fg }}
      initial={false}
      transition={{ duration: reduce ? 0 : 0.9, ease }}
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <Heading id="treatments-title" text="A closer look at your skin’s needs." className="max-w-[14ch]" />
          </div>
          <p className="measure opacity-80 lg:col-span-4">
            Choose an area to see the conditions and procedures you can ask Dr. Aditya about. Procedures are discussed only after an
            assessment, and the clinic confirms which are currently available.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Category navigation + list */}
          <div className="lg:col-span-6">
            <div
              role="tablist"
              aria-label="Treatment categories"
              className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto border-b border-current/20 px-5 lg:mx-0 lg:block lg:overflow-visible lg:border-b-0 lg:border-t lg:px-0"
            >
              {treatmentCategories.map((c, i) => {
                const selected = i === active;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`${uid}-tab-${c.id}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className="group relative flex shrink-0 items-center gap-4 py-4 text-left lg:w-full lg:border-b lg:border-current/20 lg:py-6"
                  >
                    {/* Active marker: a short rule that draws in beside the selected category (underline on small screens) */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-current transition-transform duration-700 ease-out-expo lg:static lg:h-px lg:w-10 lg:shrink-0 ${
                        selected ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <span
                      className={`font-serif leading-[1.08] tracking-[-0.02em] transition-[opacity,transform] duration-700 ease-out-expo text-[1.65rem] lg:text-[clamp(2rem,4.2vw,3.6rem)] ${
                        selected ? "italic opacity-100" : "opacity-65 group-hover:opacity-90 lg:group-hover:translate-x-2"
                      }`}
                    >
                      <span className="lg:hidden">{c.shortName}</span>{" "}
                      <span className="hidden lg:inline">{c.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${cat.id}`} className="mt-10">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={cat.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <p className="measure text-lead opacity-90">{cat.intro}</p>

                  {/* Mobile / tablet art */}
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden lg:hidden">
                    <CategoryArt cat={cat} />
                  </div>

                  <ul className="mt-8 border-t border-current/20">
                    {cat.treatments.map((t, ti) => {
                      const open = openItem === t.slug;
                      const pid = `${uid}-${t.slug}`;
                      return (
                        <m.li
                          key={t.slug}
                          className="border-b border-current/20"
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease, delay: 0.08 + ti * 0.035 }}
                        >
                          <h3 className="font-sans text-base font-normal">
                            <button
                              type="button"
                              aria-expanded={open}
                              aria-controls={pid}
                              onClick={() => setOpenItem(open ? null : t.slug)}
                              className="group flex w-full items-center gap-4 py-4 text-left"
                            >
                              <span className="flex-1 text-[1.08rem] font-medium">{t.name}</span>
                              {(t.procedure || t.availability === "confirmed") && (
                                <span className="hidden sm:inline">
                                  <AvailabilityTag availability={t.availability} tone={dark ? "light" : "dark"} />
                                </span>
                              )}
                              <span
                                aria-hidden
                                className={`grid size-8 shrink-0 place-items-center rounded-full border border-current/30 transition-transform duration-500 ease-out-expo ${
                                  open ? "rotate-45" : "group-hover:rotate-90"
                                }`}
                              >
                                <Plus className="size-4" strokeWidth={1.5} />
                              </span>
                            </button>
                          </h3>
                          <AnimatePresence initial={false}>
                            {open && (
                              <m.div
                                id={pid}
                                initial={reduce ? false : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-4 pb-6 pr-12">
                                  <p className="opacity-85">{t.blurb}</p>
                                  {(t.procedure || t.availability === "confirmed") && (
                                    <span className="sm:hidden">
                                      <AvailabilityTag availability={t.availability} tone={dark ? "light" : "dark"} />
                                    </span>
                                  )}
                                  <a
                                    href={waTreatment(t.name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link inline-flex w-fit items-center gap-2 font-semibold underline decoration-current/30 underline-offset-4 hover:decoration-current"
                                  >
                                    Ask on WhatsApp
                                    <ArrowUpRight
                                      className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                      strokeWidth={1.5}
                                    />
                                    <span className="sr-only"> (opens in a new tab)</span>
                                  </a>
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </m.li>
                      );
                    })}
                  </ul>
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sticky visual (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden">
                <AnimatePresence initial={false}>
                  <m.div
                    key={cat.id}
                    className="absolute inset-0"
                    initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 1.1, ease }}
                  >
                    <CategoryArt cat={cat} />
                  </m.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.p
                      key={cat.id}
                      className={`font-serif text-[clamp(3rem,6vw,6rem)] italic leading-[1.02] ${dark ? "text-ivory" : "text-espresso"}`}
                      initial={reduce ? false : { y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: -20, opacity: 0 }}
                      transition={{ duration: 0.8, ease, delay: 0.2 }}
                      aria-hidden
                    >
                      {cat.shortName}
                    </m.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
}
