import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { ArrowRight } from "lucide-react";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line bg-ivory py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Heading id="about-title" text="Assessment first. Treatment second." className="max-w-[15ch] text-espresso" />
          <Reveal className="mt-10">
            <p className="max-w-[32ch] font-serif text-[clamp(1.6rem,2.5vw,2.45rem)] leading-[1.22] text-espresso">
              Before recommending any prescription, peel or laser, a dermatologist looks closely at what is happening in your skin—and why.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-10">
            <p className="text-espresso/85">
              New Dawn Clinics is the Bandra practice of Dr. Aditya Tolat, a dermatologist seeing patients for medical skin conditions,
              hair and scalp concerns, and aesthetic dermatology.
            </p>
            <div>
              <p className="text-espresso/85">
                Whether you are dealing with persistent acne or pigmentation, or considering an aesthetic procedure, every plan starts
                with an unhurried clinical consultation.
              </p>
              <a
                href="#doctor"
                className="group mt-5 inline-flex items-center gap-2 font-semibold text-espresso underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso"
              >
                Meet Dr. Aditya
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9 lg:mx-0 lg:max-w-none">
          <div className="lg:sticky lg:top-28">
            <Reveal variant="soft" className="relative">
              <figure className="border border-line bg-porcelain p-3">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Picture
                    name="arch"
                    sizes="(min-width: 768px) 30vw, 90vw"
                    alt="Abstract artwork: warm light falling across a plaster arch"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-[0.75rem] text-espresso/70">
                  <span className="label !text-[0.65rem]">New Dawn Clinics</span>
                  <span>Bandra, Mumbai</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
