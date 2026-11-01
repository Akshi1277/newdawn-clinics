/**
 * Flowing strand lines (hair & scalp motif). Each strand draws itself in and
 * then sways gently. Pure SVG + CSS keyframes; respects reduced motion via the
 * global stylesheet.
 */
type Props = { className?: string; count?: number; stroke?: string; animate?: boolean };

export function Strands({ className = "", count = 26, stroke = "currentColor", animate = true }: Props) {
  const lines = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y0 = 10 + t * 30;
    const amp = 18 + Math.sin(i * 0.7) * 6;
    const d = `M-5 ${y0.toFixed(2)} C 25 ${(y0 - amp).toFixed(2)}, 45 ${(y0 + amp * 1.6).toFixed(2)}, 70 ${(y0 + 28).toFixed(2)} S 100 ${(y0 + 40 + t * 12).toFixed(2)}, 108 ${(y0 + 52).toFixed(2)}`;
    return { d, w: 0.7 + (i % 5 === 0 ? 0.7 : 0), o: 0.35 + (i % 3) * 0.2, delay: (i * 0.06).toFixed(2) };
  });
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none">
      <style>{`
        .nd-strand { stroke-dasharray: 1; stroke-dashoffset: 1; animation: nd-draw 3.2s cubic-bezier(.16,1,.3,1) forwards, nd-sway 9s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: left center; }
        .nd-static .nd-strand { animation: none; stroke-dashoffset: 0; }
        @keyframes nd-draw { to { stroke-dashoffset: 0; } }
        @keyframes nd-sway { from { transform: skewY(0deg); } to { transform: skewY(2.5deg); } }
        @media (prefers-reduced-motion: reduce) { .nd-strand { animation: none; stroke-dashoffset: 0; } }
      `}</style>
      <g stroke={stroke} strokeLinecap="round" className={animate ? "" : "nd-static"}>
        {lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            pathLength={1}
            strokeWidth={l.w}
            opacity={l.o}
            className="nd-strand"
            style={{ animationDelay: `${l.delay}s, ${l.delay}s` }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
