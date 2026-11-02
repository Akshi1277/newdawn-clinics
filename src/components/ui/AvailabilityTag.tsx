import type { Availability } from "@/config/types";

export function AvailabilityTag({ availability, tone = "dark" }: { availability: Availability; tone?: "dark" | "light" }) {
  const confirmed = availability === "confirmed";
  return (
    <span
      className={`label inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap !text-[0.7rem] !tracking-[0.14em] ${
        tone === "light" ? "text-ivory/75" : "text-espresso/70"
      }`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${confirmed ? "bg-current" : "border border-current"}`} />
      {confirmed ? "Offered at the clinic" : "Ask about availability"}
    </span>
  );
}
