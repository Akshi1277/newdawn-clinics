/**
 * Cellular field: a jittered hexagonal lattice of cells with nuclei, a quiet
 * nod to histology plates. Deterministic, static SVG.
 */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Props = { className?: string; cols?: number; rows?: number; seed?: number; stroke?: string; fill?: string };

export function CellField({ className = "", cols = 11, rows = 9, seed = 7, stroke = "currentColor", fill = "currentColor" }: Props) {
  const r = rand(seed);
  const cells: { x: number; y: number; rx: number; ry: number; rot: number; n: number }[] = [];
  const w = 100 / cols;
  const h = 100 / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ox = (y % 2) * (w / 2);
      cells.push({
        x: x * w + ox + (r() - 0.5) * w * 0.35,
        y: y * h + h / 2 + (r() - 0.5) * h * 0.35,
        rx: w * (0.36 + r() * 0.12),
        ry: h * (0.34 + r() * 0.12),
        rot: r() * 180,
        n: 0.9 + r() * 1.1,
      });
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none">
      {cells.map((c, i) => (
        <g key={i} transform={`rotate(${c.rot.toFixed(1)} ${c.x.toFixed(2)} ${c.y.toFixed(2)})`}>
          <ellipse cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} stroke={stroke} strokeWidth={0.18} opacity={0.55} />
          <circle cx={c.x + c.rx * 0.18} cy={c.y - c.ry * 0.1} r={c.n} fill={fill} opacity={0.5} />
        </g>
      ))}
    </svg>
  );
}
