"use client";

import { m, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial cross-section of skin: epidermis, dermis and subcutaneous layer,
 * with follicles and cells. Lines draw in when the drawing enters the viewport.
 */
export function SkinLayers({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 2.2, ease, delay },
        };
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 1.2, delay },
        };

  const surface = "M0 92 C 60 78, 110 104, 170 90 S 280 74, 340 92 S 450 108, 520 88 S 610 80, 640 90";
  const basal = "M0 138 C 50 126, 100 150, 160 136 S 270 122, 330 140 S 440 152, 510 134 S 600 128, 640 138";
  const dermis = "M0 300 C 80 290, 160 312, 240 298 S 400 286, 470 302 S 590 310, 640 298";

  const cells = Array.from({ length: 34 }, (_, i) => ({
    x: 12 + i * 18.6,
    y: 108 + Math.sin(i * 1.3) * 8,
    r: 5 + (i % 3),
  }));
  const fibres = Array.from({ length: 9 }, (_, i) => {
    const y = 175 + i * 13;
    return `M0 ${y} C 120 ${y - 14}, 220 ${y + 16}, 330 ${y} S 520 ${y - 10}, 640 ${y + 6}`;
  });

  return (
    <svg viewBox="0 0 640 420" className={className} role="img" aria-labelledby="skin-layers-title">
      <title id="skin-layers-title">Illustration: cross-section of the skin showing the epidermis, dermis and subcutaneous layer</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <m.path d={surface} strokeWidth={1.6} {...draw(0)} />
        <m.path d={basal} strokeWidth={1} opacity={0.7} {...draw(0.2)} />
        {fibres.map((d, i) => (
          <m.path key={i} d={d} strokeWidth={0.6} opacity={0.35} {...draw(0.4 + i * 0.06)} />
        ))}
        <m.path d={dermis} strokeWidth={1} opacity={0.7} {...draw(0.6)} />
        {/* Hair follicles */}
        {[120, 300, 470].map((x, i) => (
          <m.g key={x} {...fade(1 + i * 0.15)}>
            <path d={`M${x} 30 C ${x + 6} 70, ${x - 4} 110, ${x + 4} 160 S ${x + 10} 240, ${x + 2} 270`} strokeWidth={1.2} />
            <ellipse cx={x + 2} cy={276} rx={13} ry={17} strokeWidth={1} />
            <path d={`M${x + 10} 200 c 14 -4, 22 4, 30 0`} strokeWidth={0.8} opacity={0.6} />
          </m.g>
        ))}
        {/* Subcutaneous lobules */}
        {Array.from({ length: 11 }, (_, i) => (
          <m.ellipse
            key={i}
            cx={30 + i * 58}
            cy={354 + (i % 2) * 14}
            rx={30}
            ry={22}
            strokeWidth={0.8}
            opacity={0.45}
            {...fade(1.2 + i * 0.05)}
          />
        ))}
      </g>
      <g fill="currentColor">
        {cells.map((c, i) => (
          <m.circle key={i} cx={c.x} cy={c.y} r={c.r * 0.32} opacity={0.55} {...fade(0.8 + i * 0.02)} />
        ))}
      </g>
      <g className="font-sans" fontSize="11" letterSpacing="2.2" fill="currentColor" opacity={0.75}>
        <text x="640" y="70" textAnchor="end">EPIDERMIS</text>
        <text x="640" y="248" textAnchor="end">DERMIS</text>
        <text x="640" y="408" textAnchor="end">SUBCUTANEOUS LAYER</text>
      </g>
    </svg>
  );
}
