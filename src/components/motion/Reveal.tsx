"use client";

import { m } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** fade = rise + fade, mask = subtle clip-path + fade, blur = soft focus-in */
  variant?: "fade" | "mask" | "blur" | "soft";
  as?: "div" | "li" | "p" | "figure";
};

const variants = {
  fade: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  mask: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } },
  soft: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(10px)", scale: 1.02 }, show: { opacity: 1, filter: "blur(0px)", scale: 1 } },
};

export function Reveal({ children, className, delay = 0, variant = "fade", as = "div" }: Props) {
  const reduce = useReducedMotionSafe();
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
      viewport={{ once: true, margin: "0px 0px -4% 0px" }}
      variants={variants[variant]}
      transition={{ duration: variant === "mask" ? 1.1 : variant === "soft" ? 0.8 : 1.0, ease, delay }}
    >
      {children}
    </M>
  );
}
