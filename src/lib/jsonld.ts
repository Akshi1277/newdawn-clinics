import { business, doctor, confirmedTreatments, seo } from "@/config/site";
import { isVerified } from "@/config/types";
import { siteUrl } from "./links";

/**
 * Structured data for search engines. Only verified facts are emitted:
 * street address, hours, credentials, Instagram and services appear
 * automatically once marked verified/confirmed in src/config/site.ts.
 */
export function clinicJsonLd() {
  const url = siteUrl();
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: `${business.locality}, ${business.city}`,
    addressRegion: business.region,
    addressCountry: business.countryCode,
  };
  if (isVerified(business.address)) address.streetAddress = business.address.value;
  if (isVerified(business.postalCode)) address.postalCode = business.postalCode.value;

  const clinicId = url ? `${url}/#clinic` : "#clinic";
  const physicianId = url ? `${url}/#physician` : "#physician";

  const clinic: Record<string, unknown> = {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": clinicId,
    name: business.name,
    description: seo.description,
    medicalSpecialty: "Dermatology",
    telephone: business.phone,
    email: business.email,
    address,
    areaServed: { "@type": "City", name: business.city },
    employee: { "@id": physicianId },
  };
  if (url) {
    clinic.url = url;
    clinic.image = `${url}${seo.ogImage}`;
  }
  if (isVerified(business.instagram)) clinic.sameAs = [business.instagram.value];
  if (isVerified(business.hours)) {
    clinic.openingHours = business.hours.value.map((h) => `${h.days} ${h.time}`);
  }
  if (confirmedTreatments.length) {
    clinic.availableService = confirmedTreatments.map((t) => ({ "@type": "MedicalProcedure", name: t.name }));
  }

  const physician: Record<string, unknown> = {
    "@type": "Physician",
    "@id": physicianId,
    name: doctor.name,
    medicalSpecialty: "Dermatology",
    telephone: business.phone,
    address,
    worksFor: { "@id": clinicId },
  };
  // Credentials: only verified entries are emitted.
  const c = doctor.credentials;
  const hasCredential: Record<string, unknown>[] = [];
  for (const d of c.education) {
    if (!isVerified(d)) continue;
    hasCredential.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: d.value.degree,
      ...(d.value.institution ? { recognizedBy: { "@type": "CollegeOrUniversity", name: d.value.institution } } : {}),
    });
  }
  if (isVerified(c.registration)) {
    hasCredential.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "medical registration",
      name: `${c.registration.value.council} registration ${c.registration.value.number}`,
      recognizedBy: { "@type": "Organization", name: c.registration.value.council },
    });
  }
  if (hasCredential.length) physician.hasCredential = hasCredential;
  const memberships = c.memberships.filter(isVerified).map((m) => ({ "@type": "Organization", name: m.value }));
  if (memberships.length) physician.memberOf = memberships;
  if (url) physician.url = `${url}/#doctor`;

  return { "@context": "https://schema.org", "@graph": [clinic, physician] };
}

export const jsonLdString = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
