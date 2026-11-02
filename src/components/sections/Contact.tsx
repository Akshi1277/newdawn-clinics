import { business } from "@/config/site";
import { mailLink, telLink, waLink } from "@/lib/links";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EnquiryForm } from "./EnquiryForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-dark relative overflow-hidden bg-burgundy py-24 text-ivory md:py-36"
    >
      <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SplitText
            id="contact-title"
            className="font-serif text-[clamp(3rem,7.4vw,7.6rem)] leading-[1.08] tracking-[-0.03em]"
            lines={[
              { text: "Good skin care" },
              { text: "starts with" },
              { text: "a conversation.", italic: true, className: "text-peach" },
            ]}
          />
          <Reveal className="mt-10">
            <p className="max-w-[36ch] text-lead text-ivory/90">Book a consultation with Dr. Aditya Tolat at New Dawn Clinics, Bandra.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink()} variant="light" size="lg" icon="whatsapp">
                Message on WhatsApp
              </Button>
              <Button href={telLink} variant="outline-light" size="lg" icon="phone">
                Call the Clinic
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 border-t border-ivory/20 pt-8">
            <p className="label text-ivory/65">Direct contact</p>
            <a
              href={telLink}
              className="mt-2 block w-fit font-serif text-[clamp(2.2rem,4.4vw,4rem)] leading-none tracking-[-0.01em] transition-colors hover:text-peach"
            >
              {business.phoneDisplay}
            </a>
            <a
              href={mailLink()}
              className="mt-4 inline-block text-ivory/85 underline decoration-ivory/30 underline-offset-4 hover:decoration-ivory"
            >
              {business.email}
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal variant="fade" delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
