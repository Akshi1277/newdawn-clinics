import manifest from "@/config/images.json";

export type ArtName = keyof typeof manifest;

/** Honest alt text for every artwork (current and planned). */
export const ART_ALT: Record<string, string> = {
  cream: "Abstract artwork: a soft swirl of ivory cream",
  glass: "Abstract artwork: a translucent amber glass ribbon",
  texture: "Abstract artwork: macro study of fine surface relief",
  botanical: "Abstract artwork: sage leaves in soft shadow",
  strands: "Abstract artwork: fine golden strands flowing across deep green",
  arch: "Abstract artwork: warm light falling across a plaster arch",
  acne: "Editorial image: close-up of healthy skin along the cheek and jaw",
  pigmentation: "Editorial image: a single serum droplet resting on skin",
  rejuvenation: "Editorial image: soft morning light across a shoulder",
  laser: "Editorial image: a beam of warm light glowing on skin",
};

/**
 * Use a planned image (e.g. "acne") once its file exists in assets/source and the
 * build has generated it; until then fall back to an existing artwork.
 */
export function resolveArt(preferred: string, fallback: ArtName): ArtName {
  return preferred in manifest ? (preferred as ArtName) : fallback;
}

type Props = {
  name: ArtName;
  /** Describe artwork honestly, e.g. "Abstract artwork: …" */
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Static-export friendly responsive image: AVIF + WebP srcsets generated at build
 * by scripts/optimize-images.mjs, explicit dimensions to avoid layout shift.
 */
export function Picture({ name, alt, sizes = "100vw", priority, className, style }: Props) {
  const m = manifest[name];
  const set = (ext: string) => m.widths.map((w) => `/art/${name}-${w}.${ext} ${w}w`).join(", ");
  const largest = m.widths[m.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/art/${name}-${largest}.webp`}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={{ backgroundImage: `url(${m.blur})`, backgroundSize: "cover", ...style }}
      />
    </picture>
  );
}
