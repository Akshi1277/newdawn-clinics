"use client";

import { CalendarDays, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { bookHref, telLink, waLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Anything the pill must never cover. */
const BLOCKING = "a, button, input, select, textarea, label, p, li, dt, dd, h1, h2, h3, h4, blockquote, figcaption";

/**
 * Desktop: a compact "Book Consultation" pill, bottom-right. It appears after the
 * hero, hides over the contact form and footer, and fades out whenever the
 * content underneath it is text or a control (checked every scroll frame), so it
 * never sits on top of something the visitor needs.
 * Mobile: a fixed Call / WhatsApp bar.
 */
export function FloatingActions() {
  const pill = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    const zones = ["contact", "site-footer"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const check = () => {
      frame = 0;
      const el = pill.current;
      if (!el || !mq.matches) return setVisible(false);
      if (window.scrollY < window.innerHeight * 0.9) return setVisible(false);
      const vh = window.innerHeight;
      if (
        zones.some((z) => {
          const r = z.getBoundingClientRect();
          return r.top < vh && r.bottom > 0;
        })
      )
        return setVisible(false);
      if (document.getElementById("mobile-menu")) return setVisible(false);
      // Probe the pill's footprint (plus a small margin) for text or controls underneath.
      const r = el.getBoundingClientRect();
      const pts: [number, number][] = [];
      for (const x of [r.left - 8, r.left + r.width / 2, r.right + 4])
        for (const y of [r.top - 8, r.top + r.height / 2, r.bottom + 4]) pts.push([x, y]);
      const blocked = pts.some(([x, y]) =>
        document
          .elementsFromPoint(x, y)
          .some((n) => !el.contains(n) && n !== el && (n as Element).closest(BLOCKING) && !(n as Element).closest("[data-floating-ok]")),
      );
      setVisible(!blocked);
    };
    // Re-check once scrolling settles too: scroll-linked sections (e.g. the horizontal
    // journey) keep moving for a few frames after the last scroll event.
    let settle = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => requestAnimationFrame(check), 220);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, []);

  return (
    <>
      <Link
        ref={pill}
        href={bookHref()}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-burgundy py-2 pl-2 pr-5 text-[0.92rem] font-semibold text-ivory shadow-[0_18px_40px_-18px_rgba(106,45,51,0.8)] transition-[opacity,transform,background-color] duration-500 ease-out-expo hover:bg-espresso active:scale-[0.98] md:flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="grid size-9 place-items-center rounded-full bg-ivory/15">
          <CalendarDays className="size-4" strokeWidth={1.6} />
        </span>
        Book Consultation
      </Link>

      {/* Mobile action bar */}
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="grid grid-cols-2 gap-1.5 rounded-full bg-espresso p-1.5 shadow-[0_-8px_40px_-12px_rgba(42,31,26,0.5)] ring-1 ring-ivory/15">
          <a
            href={telLink}
            className="flex h-12 items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold text-ivory active:scale-[0.98]"
          >
            <Phone className="size-4" strokeWidth={1.75} />
            Call Now
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-ivory text-[0.95rem] font-semibold text-espresso active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-[1.1rem]" />
            WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </nav>
    </>
  );
}
