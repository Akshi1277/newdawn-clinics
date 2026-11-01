/**
 * Contour-field variants. Each one is rendered ONCE at build time to
 * /art/topo/<name>.svg (see src/app/art/topo/[variant]/route.ts) and drawn on
 * the page through a CSS mask, so no path data ships inside the HTML.
 */
export type TopoSpec = { rings: number; seed: number; cx: number; cy: number; spread: number };

const base = { cx: 50, cy: 50, spread: 3.4 };

export const TOPO_VARIANTS = {
  hero: { rings: 26, seed: 1.9, cx: 56, cy: 46, spread: 3.2 },
  approach: { rings: 24, seed: 2.7, cx: 50, cy: 50, spread: 3 },
  footer: { ...base, rings: 30, seed: 4.1 },
  notfound: { ...base, rings: 30, seed: 9.1 },
} satisfies Record<string, TopoSpec>;

export type TopoVariant = keyof typeof TOPO_VARIANTS;

function ringPath(r: number, i: number, seed: number, cx: number, cy: number) {
  const steps = 96;
  let d = "";
  for (let s = 0; s < steps; s++) {
    const t = (s / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.085 * Math.sin(3 * t + seed + i * 0.22) +
      0.05 * Math.sin(5 * t - seed * 1.7 + i * 0.13) +
      0.035 * Math.cos(2 * t + seed * 0.6 + i * 0.31) +
      0.018 * Math.sin(9 * t + i * 0.5);
    const x = cx + Math.cos(t) * r * wobble * 1.08;
    const y = cy + Math.sin(t) * r * wobble * 0.92;
    d += `${s === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + "Z";
}

/** Standalone SVG document for one variant (white strokes; colour comes from the mask fill). */
export function topoSvg({ rings, seed, cx, cy, spread }: TopoSpec) {
  const paths = Array.from({ length: rings }, (_, i) => {
    const o = (1 - i / (rings * 1.35)).toFixed(3);
    return `<path d="${ringPath(2.5 + i * spread, i, seed, cx, cy)}" opacity="${o}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-width="0.9" vector-effect="non-scaling-stroke">${paths.replace(/<path /g, '<path vector-effect="non-scaling-stroke" ')}</g></svg>`;
}
