import type { CSSProperties } from "react";
import type { TopoVariant } from "./topoVariants";

/**
 * Topographic contour field: concentric, organically distorted rings, the way
 * fine skin relief looks under raking light. The geometry is a static SVG
 * generated at build time; it is painted with `currentColor` through a CSS
 * mask, so colour follows the surrounding text colour and no path data ships
 * in the HTML.
 */
type Props = { variant: TopoVariant; className?: string; opacity?: number };

export function Topo({ variant, className = "", opacity = 1 }: Props) {
  const url = `url(/art/topo/${variant}.svg)`;
  const style: CSSProperties = {
    opacity,
    backgroundColor: "currentColor",
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: "cover",
    WebkitMaskSize: "cover",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  };
  return <div aria-hidden className={className} style={style} />;
}
