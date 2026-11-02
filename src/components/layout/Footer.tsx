import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { business, doctor, messages, nav } from "@/config/site";
import { isVerified } from "@/config/types";
import { mailLink, directionsLink, hasVerifiedLocation, telLink, waLink } from "@/lib/links";
import { DawnMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Topo } from "@/components/art/Topo";

export function Footer() {
  const actions = [
    { label: "Call", href: telLink, icon: Phone },
    { label: "WhatsApp", href: waLink(), icon: WhatsAppIcon, external: true },
    { label: "Email", href: mailLink(), icon: Mail },
    { label: hasVerifiedLocation() ? "Google Maps" : "Ask for directions", href: directionsLink(), icon: MapPin, external: true },
  ];
  return (
    <footer id="site-footer" className="on-dark grain relative overflow-hidden bg-forest pb-28 text-ivory md:pb-10">
      <Topo className="pointer-events-none absolute -right-[20%] top-[-30%] h-[140%] w-[90%] text-peach" variant="footer" opacity={0.16} />
      <div className="relative z-[2] mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-32">
        <p className="font-serif text-display-xl uppercase">
          <span className="block">Skin health.</span> <span className="block italic text-peach normal-case">A new perspective.</span>
        </p>

        <div className="mt-20 grid gap-12 border-t border-ivory/15 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <DawnMark className="size-10" />
              <div>
                <p className="font-serif text-2xl tracking-[0.08em]">NEW DAWN CLINICS</p>
                <p className="text-sm text-ivory/70">Dermatology by {doctor.name}</p>
              </div>
            </div>
            <address className="mt-8 space-y-1.5 not-italic text-ivory/80">
              {isVerified(business.address) && <p>{business.address.value}</p>}
              <p>{business.localityLine}</p>
              <p>
                <a className="hover:underline" href={telLink}>
                  {business.phoneDisplay}
                </a>
              </p>
              <p>
                <a className="hover:underline" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6">
            <h2 className="label text-ivory/55">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="font-serif text-2xl transition-colors hover:text-peach">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="label text-ivory/55">Get in touch</h2>
            <ul className="mt-5 space-y-1">
              {actions.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between border-b border-ivory/12 py-3 transition-colors hover:text-peach"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" strokeWidth={1.6} />
                      {label}
                    </span>
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
              {isVerified(business.instagram) && (
                <li>
                  <a
                    href={business.instagram.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-b border-ivory/12 py-3 hover:text-peach"
                  >
                    Instagram <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-ivory/15 pt-8 text-[0.82rem] leading-relaxed text-ivory/65 md:grid-cols-12">
          <div className="space-y-2 md:col-span-7">
            <p>{messages.medicalDisclaimer}</p>
            <p>Imagery on this site is illustrative. Patient photographs are only ever shown with written consent.</p>
          </div>
          <p className="md:col-span-4 md:col-start-9 md:text-right">© {new Date().getFullYear()} New Dawn Clinics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
