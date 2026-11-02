"use client";

import { m } from "framer-motion";

import type { ElementType } from "react";

export type Line = { text: string; italic?: boolean; className?: string };

type Props = {
  lines: (Line | string)[];
  as?: ElementType;
  className?: string;
  /** "chars" = character-by-character, "words" = word-by-word */
  by?: "chars" | "words";
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero) or when scrolled into view */
  trigger?: "mount" | "inView";
  id?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Masked split-text reveal. The full sentence is exposed to assistive tech via
 * aria-label; the animated fragments are aria-hidden. Text stays opaque (only
 * translated inside its mask) so it counts for LCP immediately. Reduced motion is
 * handled by MotionConfig (reducedMotion="user"), which jumps straight to the
 * final position, so the text can never be left hidden.
 */
export function SplitText({ lines, as: Tag = "h2", className = "", by = "words", delay = 0, stagger, trigger = "inView", id }: Props) {
  const norm = lines.map((l) => (typeof l === "string" ? { text: l } : l));
  const label = norm.map((l) => l.text).join(" ");
  const step = stagger ?? (by === "chars" ? 0.022 : 0.06);
  let i = 0;

  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className} aria-label={label} id={id}>
      <m.span className="block" {...animateProps}>
        {norm.map((line, li) => (
          <span key={li}>
            <span aria-hidden className={`block ${line.italic ? "italic" : ""} ${line.className ?? ""}`}>
              {line.text.split(" ").map((word, wi, arr) => (
                <span key={wi}>
                  <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    {by === "words" ? (
                      <m.span
                        className="inline-block will-change-transform"
                        variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
                        transition={{ duration: 1.1, ease, delay: delay + i++ * step }}
                      >
                        {word}
                      </m.span>
                    ) : (
                      word.split("").map((ch, ci) => (
                        <m.span
                          key={ci}
                          className="inline-block will-change-transform"
                          variants={{ hidden: { y: "108%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
                          transition={{ duration: 1.05, ease, delay: delay + i++ * step }}
                        >
                          {ch}
                        </m.span>
                      ))
                    )}
                  </span>
                  {/* Real (breakable) space outside the masked word, so text extraction reads correctly. */}
                  {wi < arr.length - 1 ? " " : null}
                </span>
              ))}
            </span>
            {/* Space between lines: invisible (lines are blocks) but keeps "skin. Understood." apart in extracted text. */}
            {li < norm.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
