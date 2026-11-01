import { Phone } from "lucide-react";
import { telLink, waLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingActions() {
  // Desktop already has a persistent "Book Consultation" in the floating nav, so only mobile gets a bar.
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="grid grid-cols-2 gap-1.5 rounded-full bg-espresso p-1.5 shadow-[0_-8px_40px_-12px_rgba(42,31,26,0.5)] ring-1 ring-ivory/15">
        <a href={telLink} className="flex h-12 items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold text-ivory">
          <Phone className="size-4" strokeWidth={1.75} />
          Call Now
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-ivory text-[0.95rem] font-semibold text-espresso"
        >
          <WhatsAppIcon className="size-[1.1rem]" />
          WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </nav>
  );
}
