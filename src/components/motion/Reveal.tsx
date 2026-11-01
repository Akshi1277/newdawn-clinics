"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** fade = rise + fade, mask = clip-path wipe upward, blur = soft focus-in */
  variant?: "fade" | "mask" | "blur" | "soft";
  as?: "div" | "li" | "p" | "figure";
};

const variants = {
  fade: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  mask: { hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)" } },
  soft: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(14px)", scale: 1.03 }, show: { opacity: 1, filter: "blur(0px)", scale: 1 } },
};

export function Reveal({ children, className, delay = 0, variant = "fade", as = "div" }: Props) {
  const reduce = useReducedMotion();
  const M = m[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={variants[variant]}
      transition={{ duration: variant === "mask" ? 1.4 : variant === "soft" ? 0.8 : 1.1, ease, delay }}
    >
      {children}
    </M>
  );
}
