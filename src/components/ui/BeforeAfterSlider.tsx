"use client";

import { useId, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { GalleryPair } from "@/config/types";

/**
 * Keyboard-operable before/after comparison for AUTHORISED patient photographs.
 * Only rendered when gallery entries with consent exist in src/config/site.ts.
 */
export function BeforeAfterSlider({ pair }: { pair: GalleryPair }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className="w-full">
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden bg-espresso/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pair.after} alt={`After: ${pair.alt}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.before} alt={`Before: ${pair.alt}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div aria-hidden className="absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-espresso shadow-lg"><MoveHorizontal className="size-5" strokeWidth={1.5} /></span>
        </div>
        <span className="label absolute left-3 top-3 rounded-full bg-espresso/70 px-3 py-1 text-ivory">Before</span>
        <span className="label absolute right-3 top-3 rounded-full bg-espresso/70 px-3 py-1 text-ivory">After</span>
        <label htmlFor={id} className="sr-only">
          Compare before and after: {pair.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm opacity-80">
        <span className="font-semibold">{pair.label}.</span> {pair.disclaimer}
      </figcaption>
    </figure>
  );
}
