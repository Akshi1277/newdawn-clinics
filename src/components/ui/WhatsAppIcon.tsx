/** Simplified WhatsApp glyph drawn to match Lucide's 24px / 1.75 stroke grammar. */
export function WhatsAppIcon({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.6.6-.8 1-.8h.5l1 2.2-.7 1c.6 1.2 1.5 2.1 2.7 2.7l1-.7 2.2 1v.5c0 .4-.3.9-.8 1-1.8.6-4.2-.6-5.6-2-1.4-1.4-2.5-3.7-1.9-5.4z" />
    </svg>
  );
}
