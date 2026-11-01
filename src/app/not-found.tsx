import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Topo } from "@/components/art/Topo";
import { waLink } from "@/lib/links";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90svh] items-center overflow-hidden bg-ivory pt-24">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-espresso" variant="notfound" opacity={0.16} />
      <div className="relative z-[2] mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p className="label text-espresso/75">Error 404</p>
        <h1 className="mt-6 font-serif text-display-xl">
          This page <span className="block italic text-burgundy">isn’t here.</span>
        </h1>
        <p className="mt-8 max-w-[40ch] text-lead text-espresso/80">
          The link may be out of date. Head back to the homepage, or message the clinic if you were looking for something
          specific.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href={waLink()} variant="outline" icon="whatsapp">
            WhatsApp the clinic
          </Button>
        </div>
      </div>
    </section>
  );
}
