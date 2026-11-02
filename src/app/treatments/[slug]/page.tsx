import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allTreatments, featured, business } from "@/config/site";
import { siteUrl, waTreatment, telLink } from "@/lib/links";
import { jsonLdString } from "@/lib/jsonld";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ART_ALT, Picture, resolveArt } from "@/components/ui/Picture";
import { AvailabilityTag } from "@/components/ui/AvailabilityTag";

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = featured.find((x) => x.slug === slug);
  if (!f) return {};
  return {
    title: { absolute: f.seoTitle },
    description: f.seoDescription,
    ...(siteUrl() ? { alternates: { canonical: `/treatments/${f.slug}/` } } : {}),
    openGraph: { title: f.seoTitle, description: f.seoDescription, type: "article" },
  };
}

export default async function TreatmentPage({ params }: PageProps<"/treatments/[slug]">) {
  const { slug } = await params;
  const f = featured.find((x) => x.slug === slug);
  if (!f) notFound();

  const related = f.related.map((s) => allTreatments.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => !!t);
  const others = featured.filter((x) => x.slug !== f.slug);
  const dark = f.theme.fg.toLowerCase() === "#f3ece2";
  const url = siteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: f.seoTitle,
    description: f.seoDescription,
    ...(url ? { url: `${url}/treatments/${f.slug}/` } : {}),
    about: { "@type": "MedicalEntity", name: f.title },
    audience: { "@type": "Patient" },
    publisher: { "@type": "MedicalClinic", name: business.name },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />

      {/* Header */}
      <header
        className={`relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 ${dark ? "on-dark" : ""}`}
        style={{ backgroundColor: f.theme.bg, color: f.theme.fg }}
      >
        <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <Link href="/#treatments" className="label inline-flex items-center gap-2 opacity-75 hover:opacity-100">
              <ArrowLeft className="size-3.5" strokeWidth={1.75} /> All treatments
            </Link>
            <SplitText
              as="h1"
              trigger="mount"
              by="chars"
              delay={0.1}
              className="mt-8 font-serif text-[clamp(3.2rem,9vw,9rem)] leading-[1] tracking-[-0.03em]"
              lines={[{ text: f.titleLines[0] }, { text: f.titleLines[1], italic: true, className: "pl-[0.15em]" }]}
            />
            <p className="mt-8 max-w-[44ch] text-lead opacity-90">{f.summary}</p>
            <p className="label mt-6 opacity-70">
              Dermatology at New Dawn Clinics · {business.locality}, {business.city}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waTreatment(f.title.toLowerCase())} variant={dark ? "light" : "solid"} icon="whatsapp" size="lg">
                Ask on WhatsApp
              </Button>
              <Button href={telLink} variant={dark ? "outline-light" : "outline"} icon="phone" size="lg">
                Call {business.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal variant="mask">
              <figure>
                <div className="aspect-[4/5] overflow-hidden border border-current/15">
                  <Picture
                    name={resolveArt(f.art, f.fallbackArt)}
                    priority
                    sizes="(min-width: 768px) 30vw, 90vw"
                    alt={ART_ALT[resolveArt(f.art, f.fallbackArt)]}
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ivory py-20 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:grid-cols-12 md:gap-8 md:px-10">
          <div className="md:col-span-7">
            <section aria-labelledby="overview">
              <h2 id="overview" className="font-serif text-display-m">
                Understanding <span className="italic">{f.title.toLowerCase()}</span>
              </h2>
              <div className="mt-8 space-y-5 text-lead text-espresso/85">
                {f.overview.map((p) => (
                  <p key={p} className="max-w-[60ch]">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section aria-labelledby="factors" className="mt-20">
              <h2 id="factors" className="font-serif text-display-m">
                {f.factors.heading}
              </h2>
              <ul className="mt-8 border-t border-line sm:columns-2 sm:gap-10">
                {f.factors.items.map((x) => (
                  <li key={x} className="break-inside-avoid border-b border-line py-4">
                    {x}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="approaches" className="mt-20">
              <h2 id="approaches" className="font-serif text-display-m">
                Approaches Dr. Aditya may discuss
              </h2>
              <ol className="mt-8 border-t border-line">
                {f.approaches.map((a, i) => (
                  <li key={a} className="flex gap-6 border-b border-line py-5">
                    <span className="font-serif text-2xl italic text-terracotta">{i + 1}</span>
                    <span className="text-lead">{a}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-[60ch] text-sm text-espresso/70">
                Not every approach is suitable for everyone. Suitability is assessed individually, and the availability of specific
                procedures is confirmed by the clinic. No treatment can guarantee a particular result.
              </p>
            </section>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28">
              <div className="on-dark bg-espresso p-8 text-ivory">
                <h2 className="font-serif text-title">Before you book</h2>
                <p className="mt-4 text-ivory/85">{f.consultation}</p>
                <div className="mt-8 flex flex-col items-start gap-3">
                  <Button href="/#contact" variant="light">
                    Book a Consultation
                  </Button>
                  <Button href={waTreatment(f.title.toLowerCase())} variant="outline-light" icon="whatsapp">
                    WhatsApp Us
                  </Button>
                </div>
              </div>
              {related.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-espresso/75">Related areas of care</h2>
                  <ul className="mt-4 border-t border-line">
                    {related.map((t) => (
                      <li key={t.slug} className="flex items-center justify-between gap-4 border-b border-line py-3.5">
                        <span>{t.name}</span>
                        {(t.procedure || t.availability === "confirmed") && <AvailabilityTag availability={t.availability} />}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other guides */}
      <nav aria-labelledby="more" className="bg-porcelain py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 id="more" className="font-serif text-display-m">
            More <span className="italic">guides</span>
          </h2>
          <ul className="mt-10 border-t border-line">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line">
                <a href={`/treatments/${o.slug}/`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="font-serif text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.08] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:italic">
                    {o.title}
                  </span>
                  <ArrowUpRight className="size-6 shrink-0 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </article>
  );
}
