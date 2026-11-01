import { Heading } from "@/components/ui/Heading";
import { business, doctor, treatmentCategories } from "@/config/site";
import { isVerified } from "@/config/types";
import { waLink } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

function Monogram() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[999px_999px_0_0] bg-olive text-ivory">
      <div className="absolute inset-0 grid place-items-center">
        <p aria-hidden className="font-serif text-[clamp(7rem,17vw,15rem)] leading-none tracking-[-0.04em]">
          A<span className="-ml-[0.12em] italic text-peach">T</span>
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between p-5">
        <span className="label text-ivory/80">Dermatology</span>
        <span className="label text-ivory/80">{business.locality}</span>
      </div>
    </div>
  );
}

export function Doctor() {
  const bio = isVerified(doctor.bio) ? doctor.bio.value : null;
  const interests = isVerified(doctor.clinicalInterests) ? doctor.clinicalInterests.value : null;
  const anyVerified = doctor.credentials.some((c) => isVerified(c.value));

  return (
    <section id="doctor" aria-labelledby="doctor-title" className="relative overflow-hidden bg-porcelain py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Heading id="doctor-title" text="The expertise behind your skin journey." className="max-w-[18ch] text-espresso" />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal variant="mask">
              <figure>
                {doctor.portrait ? (
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[999px_999px_0_0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doctor.portrait} alt={doctor.portraitAlt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <Monogram />
                )}
              </figure>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="font-serif text-[clamp(3.4rem,8vw,8rem)] leading-[0.86] tracking-[-0.035em] text-espresso">
              <span className="block">Aditya</span>
              <span className="block pl-[0.8em] italic text-olive">Tolat</span>
            </h3>
            <p className="label mt-6 text-espresso/70">
              {doctor.title} · {business.name}, {business.locality}
            </p>
            <Reveal className="mt-10 space-y-5">
              <p className="text-lead text-espresso/90">{doctor.intro}</p>
              {bio && <p className="measure text-espresso/80">{bio}</p>}
            </Reveal>

            <div className="mt-12">
              <p className="label text-espresso/75">Consults on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(interests ?? treatmentCategories.map((c) => c.name)).map((x) => (
                  <li key={x} className="rounded-full border border-espresso/25 px-4 py-1.5 text-[0.92rem]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            {/* Credentials: shown only once verified */}
            {anyVerified ? (
              <div className="mt-14">
                <h4 className="font-serif text-title text-espresso">Qualifications &amp; registration</h4>
                <dl className="mt-5 border-t border-espresso/20">
                  {doctor.credentials
                    .filter((c) => isVerified(c.value))
                    .map((c) => (
                      <div key={c.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 border-b border-espresso/20 py-4">
                        <dt className="text-[0.95rem] text-espresso/75">{c.label}</dt>
                        <dd className="font-medium text-espresso">{c.value.value}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            ) : (
              <p className="mt-12 max-w-[46ch] border-l border-espresso/25 pl-5 text-espresso/85">
                Dr. Aditya’s qualifications and Maharashtra Medical Council registration are available on request. Ask the clinic on
                WhatsApp or by phone.
              </p>
            )}

            <div className="mt-12 flex flex-wrap gap-3">
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
