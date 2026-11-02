import { Heading } from "@/components/ui/Heading";
import { business, doctor } from "@/config/site";
import { isVerified } from "@/config/types";
import { directionsLabel, directionsLink, hasVerifiedLocation, telLink } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/** Stylised, not-to-scale map composition. No coordinates are implied. */
function MapArt() {
  const streets = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 520" className="h-full w-full" role="img" aria-labelledby="map-art-title">
      <title id="map-art-title">Stylised illustration of Bandra on Mumbai’s western coast</title>
      <defs>
        <clipPath id="land">
          <path d="M210 0 C 190 70, 240 120, 215 190 S 170 290, 230 350 S 260 450, 225 520 H600 V0Z" />
        </clipPath>
      </defs>
      {/* Sea: horizontal swell lines */}
      <g stroke="#2A1F1A" strokeWidth="1" opacity="0.25" fill="none">
        {Array.from({ length: 22 }, (_, i) => (
          <path key={i} d={`M0 ${14 + i * 24} q 30 -6 60 0 t 60 0 t 60 0 t 60 0`} />
        ))}
      </g>
      {/* Land */}
      <path d="M210 0 C 190 70, 240 120, 215 190 S 170 290, 230 350 S 260 450, 225 520 H600 V0Z" fill="#F3ECE2" />
      <g clipPath="url(#land)" stroke="#2A1F1A" fill="none">
        {streets.map((i) => (
          <path
            key={`a${i}`}
            d={`M${150 + i * 34} -20 L${110 + i * 34} 540`}
            strokeWidth={i % 4 === 0 ? 1.6 : 0.6}
            opacity={i % 4 === 0 ? 0.45 : 0.22}
          />
        ))}
        {streets.map((i) => (
          <path
            key={`b${i}`}
            d={`M150 ${i * 40 - 10} L620 ${i * 40 + 30}`}
            strokeWidth={i % 5 === 0 ? 1.6 : 0.6}
            opacity={i % 5 === 0 ? 0.45 : 0.22}
          />
        ))}
      </g>
      <path d="M210 0 C 190 70, 240 120, 215 190 S 170 290, 230 350 S 260 450, 225 520" fill="none" stroke="#2A1F1A" strokeWidth="1.6" />
      <g fill="#2A1F1A">
        <text x="400" y="268" textAnchor="middle" fontFamily="var(--font-instrument), serif" fontStyle="italic" fontSize="64">
          Bandra
        </text>
        <text x="40" y="470" className="font-sans" fontSize="13" letterSpacing="3" opacity="0.65">
          ARABIAN SEA
        </text>
      </g>
    </svg>
  );
}

export function Location() {
  const address = isVerified(business.address) ? business.address.value : null;
  const hours = isVerified(business.hours) ? business.hours.value : null;
  return (
    <section aria-labelledby="location-title" className="relative overflow-hidden bg-sage py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-5">
          <Heading id="location-title" text="Find us in Bandra." className="text-espresso" />
          <p className="mt-8 max-w-[40ch] text-lead text-espresso/90">
            Consultations are by appointment. Message the clinic on WhatsApp for the exact address, directions and a time that suits you.
          </p>
          <Reveal className="mt-12">
            <dl className="border-t border-espresso/25">
              <div className="border-b border-espresso/25 py-5">
                <dt className="label text-espresso/90">Clinic</dt>
                <dd className="mt-1.5 font-serif text-2xl tracking-[0.06em]">NEW DAWN CLINICS</dd>
                <dd className="mt-1 text-espresso/85">{address ?? business.localityLine}</dd>
                {address && <dd className="text-espresso/85">{business.localityLine}</dd>}
              </div>
              <div className="border-b border-espresso/25 py-5">
                <dt className="label text-espresso/90">Dermatologist</dt>
                <dd className="mt-1.5 text-lead">{doctor.name}</dd>
              </div>
              <div className="border-b border-espresso/25 py-5">
                <dt className="label text-espresso/90">Phone &amp; WhatsApp</dt>
                <dd className="mt-1.5 text-lead">
                  <a href={telLink} className="hover:underline">
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
              {hours && (
                <div className="border-b border-espresso/25 py-5">
                  <dt className="label text-espresso/90">Consultation hours</dt>
                  {hours.map((h) => (
                    <dd key={h.days} className="mt-1.5 flex justify-between gap-6">
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </dd>
                  ))}
                </div>
              )}
            </dl>
            {!address && <p className="mt-4 text-sm text-espresso/90">The full address is shared when you message or call the clinic.</p>}
            <div className="mt-8">
              <Button href={directionsLink()} icon={hasVerifiedLocation() ? "external" : "whatsapp"} size="lg">
                {directionsLabel()}
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal variant="mask">
            <figure>
              <div className="aspect-[600/520] w-full overflow-hidden bg-[#c9cfbb]">
                <MapArt />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
