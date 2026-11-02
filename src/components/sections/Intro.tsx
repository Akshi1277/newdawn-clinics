import { Heading } from "@/components/ui/Heading";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { ArrowRight } from "lucide-react";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line bg-ivory py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Heading id="about-title" text="Your skin is unique. Your care should be too." className="max-w-[16ch] text-espresso" />
          <ScrollWords
            className="mt-12 max-w-[30ch] font-serif text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.18] text-espresso"
            text="From everyday skin concerns to more specialised dermatological and aesthetic treatments, every treatment journey begins with understanding your individual needs."
          />
          <Reveal delay={0.1} className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-10">
            <p className="text-espresso/85">
              New Dawn Clinics is the Bandra practice of Dr. Aditya Tolat, a dermatologist seeing patients for skin, hair and aesthetic
              concerns.
            </p>
            <div>
              <p className="text-espresso/85">
                Whether you are dealing with a persistent condition or considering an aesthetic procedure, the first step is the same: a
                careful consultation.
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
            <Reveal variant="mask" className="relative">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_0_0]">
                  <Picture
                    name="texture"
                    sizes="(min-width: 768px) 30vw, 90vw"
                    alt="Abstract artwork: macro study of fine, peach-toned surface relief"
                    className="h-full w-full scale-125 object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
