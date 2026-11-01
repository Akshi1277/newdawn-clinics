import manifest from "@/config/images.json";

export type ArtName = keyof typeof manifest;

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
