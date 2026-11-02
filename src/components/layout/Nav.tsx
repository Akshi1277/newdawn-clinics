"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, business } from "@/config/site";
import { telLink, waLink } from "@/lib/links";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolledPast, setScrolled] = useState(false);
  // Inner pages open on full-bleed coloured headers, so the capsule is always solid there.
  const isHome = usePathname() === "/";
  const scrolled = scrolledPast || !isHome;
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotionSafe();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  // Highlight the section currently in view (homepage only).
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (!isHome) return;
    const ids = nav.map((n) => n.href.split("#")[1]).filter((id) => id && id !== "top");
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setCurrent(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  // Lock scroll, trap focus and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <m.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-5 md:pt-4"
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: isHome ? 1.25 : 0.2 }}
      >
        <div
          className={`pointer-events-auto flex w-full items-center justify-between gap-6 rounded-full transition-[max-width,background-color,box-shadow,padding,backdrop-filter] duration-700 ease-out-expo ${
            scrolled
              ? "max-w-[1180px] bg-ivory/80 py-2 pl-5 pr-2 shadow-[0_18px_50px_-24px_rgba(42,31,26,0.45)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-espresso/10"
              : "max-w-[1600px] bg-transparent py-3 pl-2 pr-1 md:pl-4"
          }`}
        >
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current && item.href.endsWith(`#${current}`) ? "location" : undefined}
                    className="relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-espresso/80 transition-colors hover:text-espresso aria-[current=location]:text-espresso after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden rounded-full bg-espresso px-5 py-2.5 text-[0.9rem] font-semibold text-ivory transition-colors duration-500 hover:bg-burgundy sm:inline-flex"
            >
              Book Consultation
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="group flex h-11 items-center gap-2 rounded-full px-3 text-espresso lg:hidden"
            >
              <span className="label !text-[0.68rem]">Menu</span>
              <span aria-hidden className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current transition-transform group-hover:translate-x-0.5" />
                <span className="h-px w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-espresso text-ivory"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: reduce ? 0 : 0.85, ease }}
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-12 place-items-center rounded-full border border-ivory/25"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 px-5 pt-10">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-ivory/12">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: reduce ? 0 : 0.18 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-3.5 font-serif text-[2.6rem] leading-none tracking-tight"
                      >
                        <span className={i % 2 ? "italic" : ""}>{item.label}</span>
                        <span aria-hidden className="font-sans text-xs text-ivory/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <m.div
              className="grid grid-cols-2 gap-2 p-5 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.55 }}
            >
              <a href={telLink} className="flex items-center justify-center gap-2 rounded-full border border-ivory/30 py-4 font-semibold">
                <Phone className="size-4" strokeWidth={1.75} /> Call
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-ivory py-4 font-semibold text-espresso"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
              <p className="label col-span-2 mt-3 text-center text-ivory/60">{business.phoneDisplay} · Bandra, Mumbai</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
