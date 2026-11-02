import type { ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";
import { business, doctor, treatmentCategories } from "@/config/site";
import { isVerified } from "@/config/types";
import { telLink, waLink } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DawnMark } from "@/components/ui/Logo";

/** Architectural practice plate shown until a real doctor photograph is added to site.ts. */
function PracticePlate() {
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between border border-espresso/15 bg-olive p-8 text-ivory md:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-ivory/15 md:inset-4" />
      <div className="relative z-10 flex items-center justify-between border-b border-ivory/15 pb-5">
        <span className="label text-ivory/80">{business.name}</span>
        <DawnMark className="size-7 text-peach" />
      </div>

      <div className="relative z-10 my-auto py-8">
        <p className="label text-peach">Consulting Dermatologist</p>
        <p className="mt-4 font-serif text-[clamp(2.8rem,4.8vw,4.5rem)] leading-[0.96] tracking-[-0.02em] text-ivory">
          Dr. Aditya
          <span className="block italic text-peach">Tolat</span>
        </p>
        <p className="mt-6 max-w-[30ch] text-[0.95rem] leading-relaxed text-ivory/80">
          Clinical dermatology, hair &amp; scalp disorders, and considered aesthetic procedures in {business.locality}, {business.city}.
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-ivory/15 pt-5">
        <span className="label text-ivory/80">{doctor.title}</span>
        <span className="label text-ivory/80">
          {business.locality} · {business.city}
        </span>
      </div>
    </div>
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-espresso/15 py-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-6">
      <dt className="label pt-1 text-espresso/75">{term}</dt>
      <dd className="text-espresso">{children}</dd>
    </div>
  );
}

export function Doctor() {
  const c = doctor.credentials;
  const bio = isVerified(doctor.bio) ? doctor.bio.value : null;
  const interests = isVerified(doctor.clinicalInterests) ? doctor.clinicalInterests.value : null;
  const degrees = c.education.filter(isVerified).map((d) => d.value);
  const registration = isVerified(c.registration) ? c.registration.value : null;
  const experience = isVerified(c.experience) ? c.experience.value : null;
  const training = c.training.filter(isVerified).map((t) => t.value);
  const memberships = c.memberships.filter(isVerified).map((t) => t.value);
  const credentialsPending = degrees.length === 0 || !registration;

  return (
    <section id="doctor" aria-labelledby="doctor-title" className="relative overflow-hidden bg-porcelain py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Heading id="doctor-title" text="The expertise behind your care." className="max-w-[18ch] text-espresso" />

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal variant="soft">
              <figure>
                {doctor.portrait ? (
                  <div className="relative aspect-[4/5] overflow-hidden border border-espresso/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doctor.portrait} alt={doctor.portraitAlt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <PracticePlate />
                )}
              </figure>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="text-espresso">
              <span className="label block text-espresso/75">Dr.</span>
              <span className="mt-3 block font-serif text-[clamp(3.2rem,7vw,6.8rem)] leading-[1.02] tracking-[-0.03em]">
                <span className="block">Aditya</span> <span className="block pl-[0.6em] italic text-olive">Tolat</span>
              </span>
            </h3>

            <Reveal className="mt-10 space-y-5">
              <p className="max-w-[40ch] text-lead text-espresso/90">{doctor.intro}</p>
              {bio && <p className="measure text-espresso/80">{bio}</p>}
            </Reveal>

            {/* Practitioner ledger: only facts that are already confirmed, plus verified credentials */}
            <dl className="mt-12 border-t border-espresso/15">
              <Row term="Practice">
                {business.name}, {business.locality}, {business.city}
              </Row>
              <Row term="Speciality">{business.speciality}</Row>
              <Row term="Consults on">{(interests ?? treatmentCategories.map((t) => t.name)).join(" · ")}</Row>
              {degrees.length > 0 && (
                <Row term="Qualifications">
                  <ul className="space-y-1">
                    {degrees.map((d) => (
                      <li key={d.degree}>
                        <span className="font-medium">{d.degree}</span>
                        {d.institution && <span className="text-espresso/75">, {d.institution}</span>}
                        {d.year && <span className="text-espresso/75"> ({d.year})</span>}
                      </li>
                    ))}
                  </ul>
                </Row>
              )}
              {registration && (
                <Row term="Registration">
                  {registration.council}, Reg. No. {registration.number}
                </Row>
              )}
              {experience && <Row term="Experience">{experience}</Row>}
              {training.length > 0 && <Row term="Training">{training.join(" · ")}</Row>}
              {memberships.length > 0 && <Row term="Memberships">{memberships.join(" · ")}</Row>}
              <Row term="Appointments">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso"
                >
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                or{" "}
                <a href={telLink} className="underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso">
                  {business.phoneDisplay}
                </a>
              </Row>
            </dl>

            {credentialsPending && (
              <p className="mt-6 max-w-[48ch] text-[0.95rem] text-espresso/80">
                Details of Dr. Aditya’s qualifications and Maharashtra Medical Council registration are available on request from the
                clinic.
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/#contact">Book a Consultation</Button>
              <Button href={waLink()} variant="outline" icon="whatsapp">
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
