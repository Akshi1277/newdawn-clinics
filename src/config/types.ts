/**
 * A fact that must be verified by the clinic before it is published.
 * Rendered only when `verified` is true AND `value` is present.
 */
export type Pending<T> = { value: T | null; verified: boolean };

export const isVerified = <T>(p: Pending<T> | undefined | null): p is { value: T; verified: true } =>
  !!p && p.verified && p.value !== null && p.value !== undefined && p.value !== "";

export type Availability = "unconfirmed" | "confirmed";

export type Treatment = {
  slug: string;
  name: string;
  blurb: string;
  /** Only "confirmed" treatments are described as offered at the clinic. */
  availability: Availability;
  /** Procedures (peels, lasers, injectables…) carry an availability note; conditions do not. */
  procedure?: boolean;
};

export type TreatmentCategory = {
  id: "medical" | "aesthetic" | "hair";
  name: string;
  shortName: string;
  intro: string;
  /** Visual theme used by the treatment explorer */
  theme: { bg: string; fg: string; accent: string; art: "cells" | "glass" | "strands" };
  treatments: Treatment[];
};

export type FeaturedTreatment = {
  slug: string;
  title: string;
  /** Split title rendered across two lines, the second in italic */
  titleLines: [string, string];
  summary: string;
  seoTitle: string;
  seoDescription: string;
  overview: string[];
  factors: { heading: string; items: string[] };
  approaches: string[];
  consultation: string;
  /** Preferred image name in assets/source (e.g. "acne"); used automatically once that file exists. */
  art: string;
  /** Existing artwork shown until the preferred image is added. */
  fallbackArt: "cream" | "glass" | "texture" | "botanical" | "strands" | "arch";
  theme: { bg: string; fg: string };
  /** Treatment slugs (in the catalogue) this feature relates to — drives availability wording */
  related: string[];
};

/** One degree, e.g. { degree: "MBBS", institution: "…", year: "2012" } */
export type Degree = { degree: string; institution?: string; year?: string };

/** Medical registration, e.g. { council: "Maharashtra Medical Council", number: "…" } */
export type Registration = { council: string; number: string };

/**
 * Dr. Aditya's credentials, grouped. Every entry is Pending: it renders on the
 * site and in structured data ONLY once its `verified` flag is true.
 */
export type DoctorCredentials = {
  education: Pending<Degree>[];
  registration: Pending<Registration>;
  experience: Pending<string>;
  training: Pending<string>[];
  memberships: Pending<string>[];
};

export type Faq = {
  q: string;
  /** null = not yet answered by the clinic. A contact prompt is shown instead. */
  a: string | null;
  verified: boolean;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  source: string;
  /** Written patient consent on file */
  consent: boolean;
};

export type GalleryPair = {
  label: string;
  before: string;
  after: string;
  alt: string;
  disclaimer: string;
  consent: boolean;
};

export type Hours = { days: string; time: string }[];
