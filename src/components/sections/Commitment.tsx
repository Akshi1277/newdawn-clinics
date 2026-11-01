import { testimonials } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Shows genuine, consented testimonials when they exist. Until then, this
 * section renders nothing; reviews are never invented.
 */
export function Commitment() {
  const real = testimonials.filter((t) => t.consent);

  if (real.length > 0) {
    return (
      <section aria-labelledby="voices-title" className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 id="voices-title" className="font-serif text-display-l">
            In their <span className="italic">words.</span>
          </h2>
          <ul className="mt-14 grid gap-12 md:grid-cols-2">
            {real.map((t) => (
              <Reveal as="li" key={t.quote} className="border-t border-line pt-8">
                <blockquote className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2]">“{t.quote}”</blockquote>
                <p className="label mt-6 text-espresso/75">
                  {t.attribution} · {t.source}
                </p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-espresso/75">Shared with permission. Individual experiences and results vary.</p>
        </div>
      </section>
    );
  }

  // Nothing is shown until genuine, consented testimonials exist.
  return null;
}
