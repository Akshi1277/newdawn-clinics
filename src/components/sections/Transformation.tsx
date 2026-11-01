import { Heading } from "@/components/ui/Heading";
import { gallery } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SkinLayers } from "@/components/art/SkinLayers";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

/** Shown only once authorised, consented before/after photographs are added to `gallery` in site.ts. */
export function Transformation() {
  const authorised = gallery.filter((g) => g.consent);
  if (authorised.length === 0) return null;
  return (
    <section aria-labelledby="journeys-title" className="on-dark relative overflow-hidden bg-espresso py-24 text-ivory md:py-40">
      <div className="relative z-[2] mx-auto max-w-[1600px] px-5 md:px-10">
        <Heading id="journeys-title" text="Real skin. Individual journeys. Expert care." className="max-w-[16ch]" />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="text-peach/90 md:col-span-7">
            <SkinLayers className="w-full" />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <p className="text-lead text-ivory/90">
                No two people’s skin behaves the same way, so no two treatment plans look the same either.
              </p>
              <p className="mt-5 text-ivory/75">
                Results depend on the condition, the skin and the plan, so Dr. Aditya talks through what is realistic for you at the
                consultation. Before-and-after photographs will only ever appear here with a patient’s written consent.
              </p>
            </Reveal>
          </div>
        </div>

        {authorised.length > 0 && (
          <div className="mt-24">
            <h3 className="font-serif text-display-m">Patient journeys, shared with consent</h3>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {authorised.map((g) => (
                <BeforeAfterSlider key={g.label} pair={g} />
              ))}
            </div>
            <p className="mt-6 max-w-[70ch] text-sm text-ivory/65">
              Images are shared with the patient’s written consent. Individual results vary, and these images do not guarantee a similar
              outcome for anyone else.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
