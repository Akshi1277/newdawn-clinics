import Link from "next/link";

/** "New Dawn" mark: a sun rising over a horizon, drawn as contour lines. */
export function DawnMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M6 26a14 14 0 0 1 28 0" />
      <path d="M11.5 26a8.5 8.5 0 0 1 17 0" opacity={0.75} />
      <path d="M16.5 26a3.5 3.5 0 0 1 7 0" opacity={0.55} />
      <path d="M3 26h34" />
      <path d="M8 30.5h24" opacity={0.6} />
      <path d="M13 35h14" opacity={0.35} />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/#top"
      className={`group inline-flex items-center gap-2.5 ${tone === "light" ? "text-ivory" : "text-espresso"} ${className}`}
      aria-label="New Dawn Clinics, dermatology by Dr. Aditya Tolat. Go to home"
    >
      <DawnMark className="size-8 shrink-0 transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.32rem] tracking-[0.08em]">NEW DAWN</span>
        <span className="mt-1 whitespace-nowrap text-[0.54rem] font-semibold tracking-[0.22em] opacity-80 sm:text-[0.58rem] sm:tracking-[0.32em]">
          CLINICS · DERMATOLOGY
        </span>
      </span>
    </Link>
  );
}
