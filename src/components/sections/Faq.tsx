"use client";

import { Heading } from "@/components/ui/Heading";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faqs, business } from "@/config/site";
import { telLink, waLink } from "@/lib/links";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const answeredFaqs = faqs.filter((f) => f.verified && f.a);
const pendingFaqs = faqs.filter((f) => !(f.verified && f.a));

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section id="faqs" aria-labelledby="faq-title" className="bg-ivory py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Heading id="faq-title" text="Questions, answered." className="text-espresso" />
            <p className="mt-8 max-w-[32ch] text-espresso/80">
              Can’t find what you’re looking for? Message the clinic on WhatsApp or call {business.phoneDisplay}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={waLink()} icon="whatsapp">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <ul className="border-t border-line">
            {answeredFaqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-6 py-6 text-left md:py-7"
                    >
                      <span
                        className={`flex-1 font-serif text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.15] text-espresso transition-transform duration-500 ease-out-expo ${
                          isOpen ? "italic" : "group-hover:translate-x-1.5"
                        }`}
                      >
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-out-expo ${
                          isOpen ? "rotate-45 bg-espresso text-ivory" : "border border-espresso/25 text-espresso group-hover:rotate-90"
                        }`}
                      >
                        <Plus className="size-4" strokeWidth={1.5} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`${uid}-a${i}`}
                        role="region"
                        aria-labelledby={`${uid}-q${i}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                        className="overflow-hidden"
                      >
                        <div className="max-w-[60ch] pb-8 pr-14 text-espresso/85">
                          <p>{f.a}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          {pendingFaqs.length > 0 && (
            <div className="mt-10 bg-porcelain p-6 md:p-8">
              <p className="font-serif text-title text-espresso">Fees, timings and which procedures are currently offered</p>
              <p className="mt-3 max-w-[52ch] text-espresso/80">
                Consultation fees, clinic timings, and whether peels, lasers, Botox or fillers are available right now are best answered by
                the clinic directly. The WhatsApp message below asks all of them for you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href={waLink(`Hello, I have a few questions before booking:\n${pendingFaqs.map((f) => `- ${f.q}`).join("\n")}`)}
                  icon="whatsapp"
                >
                  Ask on WhatsApp
                </Button>
                <Button href={telLink} variant="outline" icon="phone">
                  Call {business.phoneDisplay}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
