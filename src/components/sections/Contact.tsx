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
      {/* Organic animated forms */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] -top-[18%] size-[62vmax] animate-drift rounded-[58%_42%_46%_54%/52%_44%_56%_48%] bg-[#7d3a3f]" />
        <div className="absolute -bottom-[30%] right-[-14%] size-[58vmax] animate-drift-slow rounded-[40%_60%_62%_38%/46%_58%_42%_54%] bg-[#5a252b]" />
      </div>

      <div className="relative z-[2] mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SplitText
            id="contact-title"
            className="font-serif text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.9] tracking-[-0.03em]"
            lines={[
              { text: "Your skin journey" },
              { text: "starts with" },
              { text: "a conversation.", italic: true, className: "text-peach" },
            ]}
          />
          <Reveal className="mt-10">
            <p className="max-w-[36ch] text-lead text-ivory/90">Book a consultation with Dr. Aditya Tolat at New Dawn Clinics, Bandra.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#enquiry" variant="light" size="lg">
                Book a Consultation
              </Button>
              <Button href={waLink()} variant="outline-light" size="lg" icon="whatsapp">
                WhatsApp Us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 border-t border-ivory/20 pt-8">
            <p className="label text-ivory/65">Call the clinic</p>
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
