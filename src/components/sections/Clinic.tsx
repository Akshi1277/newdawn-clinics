import { Heading } from "@/components/ui/Heading";
import { clinicPhotos } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";

/** Shown only once real clinic photographs are added to `clinicPhotos` in site.ts. */
export function Clinic() {
  if (clinicPhotos.length === 0) return null;
  return (
    <section aria-labelledby="clinic-title" className="relative overflow-hidden bg-[#E9D3CA] py-24 md:py-40">
      <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-5 md:pt-10">
          <Heading id="clinic-title" text="A considered space for your skin health." className="text-espresso" />
          <Reveal className="mt-10 space-y-5">
            <p className="text-lead text-espresso/90">New Dawn Clinics is Dr. Aditya Tolat’s dermatology practice in Bandra, Mumbai.</p>
            <p className="measure text-espresso/80">
              Come with your questions. You’ll leave knowing what Dr. Aditya saw, what your options are, and what happens next.
            </p>
          </Reveal>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          {clinicPhotos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {clinicPhotos.slice(0, 3).map((p, i) => (
                <Reveal key={p.src} variant="mask" delay={i * 0.12} className={i === 0 ? "col-span-2" : ""}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Architectural composition: arches + light */}
              <div
                aria-hidden
                className="absolute -left-6 top-10 hidden h-[78%] w-[30%] rounded-t-full border border-espresso/20 md:block"
              />
              <div aria-hidden className="absolute -right-4 -top-6 h-[40%] w-[22%] rounded-t-full bg-terracotta/25" />
              <Reveal variant="mask">
                <figure className="relative ml-auto w-[88%]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[999px]">
                    <Picture
                      name="arch"
                      sizes="(min-width: 768px) 46vw, 88vw"
                      alt="Abstract artwork: warm light falling across a plaster arch"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
