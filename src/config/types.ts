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
  art: "cream" | "glass" | "texture" | "botanical" | "strands" | "arch";
  theme: { bg: string; fg: string };
  /** Treatment slugs (in the catalogue) this feature relates to — drives availability wording */
  related: string[];
};

export type Credential = {
  label: string;
  value: Pending<string>;
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
