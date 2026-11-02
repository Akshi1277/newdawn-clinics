/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NEW DAWN CLINICS — CENTRAL CONTENT CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every fact on the website comes from this file.
 *
 *  HOW TO PUBLISH A PENDING DETAIL
 *  Fields typed `Pending<…>` look like:  { value: null, verified: false }
 *  1. Put the real value in `value`.
 *  2. Set `verified: true` ONLY once the clinic / Dr. Aditya has confirmed it.
 *  Unverified values are never shown on the site or in search-engine data.
 *
 *  HOW TO MARK A TREATMENT AS OFFERED
 *  Change `availability: "unconfirmed"` → `"confirmed"` for that treatment.
 *
 *  Do NOT add invented qualifications, reviews, prices, results or guarantees.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { DoctorCredentials, Faq, FeaturedTreatment, GalleryPair, Hours, Pending, Testimonial, TreatmentCategory } from "./types";

/* ───────────────────────────── Business ───────────────────────────── */

export const business = {
  name: "New Dawn Clinics",
  descriptor: "Dermatology",
  speciality: "Dermatology",
  phone: "+919920159278",
  phoneDisplay: "+91 99201 59278",
  whatsapp: "919920159278",
  email: "adityatolat@gmail.com",
  locality: "Bandra",
  city: "Mumbai",
  region: "Maharashtra",
  country: "India",
  countryCode: "IN",
  localityLine: "Bandra, Mumbai, Maharashtra, India",

  /** Full street address, e.g. "Shop 4, XYZ Building, Hill Road, Bandra (W), Mumbai 400050" */
  address: { value: null, verified: false } as Pending<string>,
  /** Postal code for structured data, e.g. "400050" */
  postalCode: { value: null, verified: false } as Pending<string>,
  /** Exact Google Maps share link for the clinic, once the address is confirmed */
  mapsUrl: { value: null, verified: false } as Pending<string>,
  /** Consultation days and timings */
  hours: { value: null, verified: false } as Pending<Hours>,
  /** Full Instagram URL, e.g. "https://www.instagram.com/…" */
  instagram: { value: null, verified: false } as Pending<string>,
  /** Production domain with protocol, e.g. "https://www.newdawnclinics.in" (enables canonical URLs + sitemap) */
  website: { value: null, verified: false } as Pending<string>,
  /** Optional external booking link (Practo, Calendly …). Leave null to use WhatsApp. */
  bookingUrl: { value: null, verified: false } as Pending<string>,
  /** Consultation fee text, e.g. "₹1,000" */
  consultationFee: { value: null, verified: false } as Pending<string>,
} as const;

/* ───────────────────────────── Doctor ───────────────────────────── */

export const doctor = {
  name: "Dr. Aditya Tolat",
  firstName: "Aditya",
  lastName: "Tolat",
  initials: "AT",
  title: "Dermatologist",
  /** Facts already confirmed by the brief. Safe to display. */
  intro: "Dr. Aditya Tolat sees patients at New Dawn Clinics for skin, hair and scalp conditions, and for aesthetic dermatology.",
  /** Longer biography, written or approved by Dr. Aditya */
  bio: { value: null, verified: false } as Pending<string>,
  /** Path to a real professional portrait in /public, e.g. "/photos/dr-aditya.jpg" */
  portrait: null as string | null,
  portraitAlt: "Portrait of Dr. Aditya Tolat, dermatologist at New Dawn Clinics",
  credentials: {
    /** e.g. { value: { degree: "MBBS", institution: "…", year: "…" }, verified: true } */
    education: [
      { value: null, verified: false }, // Medical degree (MBBS)
      { value: null, verified: false }, // Dermatology qualification (MD / DNB / Diploma)
    ],
    /** e.g. { value: { council: "Maharashtra Medical Council", number: "…" }, verified: true } */
    registration: { value: null, verified: false },
    /** e.g. { value: "10+ years in clinical dermatology", verified: true } (use the exact wording Dr. Aditya approves) */
    experience: { value: null, verified: false },
    /** Fellowships and additional clinical training, one entry each */
    training: [],
    /** Professional memberships, e.g. { value: "IADVL", verified: true } */
    memberships: [],
  } as DoctorCredentials,
  /** e.g. ["Acne & acne scars", "Pigmentation", "Hair loss"] — set verified: true once confirmed */
  clinicalInterests: { value: null, verified: false } as Pending<string[]>,
};

/* ───────────────────────────── Messages ───────────────────────────── */

export const messages = {
  whatsappDefault: "Hello, I would like to enquire about booking a dermatology consultation with Dr. Aditya Tolat at New Dawn Clinics.",
  enquiryDisclaimer: "Sending an enquiry does not confirm an appointment. The clinic will contact you to confirm availability.",
  privacyNote:
    "Please don’t include detailed medical history or photos here. Dr. Aditya will discuss your concern with you during your consultation.",
  medicalDisclaimer:
    "The information on this website is for general education only. It is not medical advice and does not replace a consultation. Suitability for any treatment is decided individually after clinical assessment, and results vary from person to person.",
  availabilityNote:
    "Treatments listed are areas of care you can ask about. Availability of specific procedures is confirmed by the clinic.",
};

/* ───────────────────────────── Treatments ───────────────────────────── */

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: "medical",
    name: "Medical Dermatology",
    shortName: "Medical",
    intro:
      "Assessment and management of everyday and chronic skin conditions: understanding what is happening in the skin before choosing how to treat it.",
    theme: { bg: "#E4E3D6", fg: "#2A1F1A", accent: "#5C5F43", art: "cells" },
    treatments: [
      {
        slug: "acne",
        name: "Acne & acne management",
        blurb: "Understanding the type and triggers of your acne, then planning treatment for active breakouts.",
        availability: "unconfirmed",
      },
      {
        slug: "acne-scars",
        name: "Acne scars",
        blurb: "Scar type and depth decide which options make sense, so they are assessed first.",
        availability: "unconfirmed",
      },
      {
        slug: "pigmentation",
        name: "Pigmentation",
        blurb: "Evaluating dark patches and spots, and the factors that can contribute to them.",
        availability: "unconfirmed",
      },
      {
        slug: "melasma",
        name: "Melasma",
        blurb: "A long-term, carefully managed approach to a pigmentation condition that can recur.",
        availability: "unconfirmed",
      },
      {
        slug: "uneven-tone",
        name: "Uneven skin tone",
        blurb: "Looking at texture, tone and sun exposure together.",
        availability: "unconfirmed",
      },
      {
        slug: "eczema",
        name: "Eczema",
        blurb: "Calming flare-ups and supporting the skin barrier over time.",
        availability: "unconfirmed",
      },
      {
        slug: "psoriasis",
        name: "Psoriasis",
        blurb: "Ongoing management of a chronic inflammatory skin condition.",
        availability: "unconfirmed",
      },
      { slug: "rosacea", name: "Rosacea", blurb: "Identifying triggers for facial redness and sensitivity.", availability: "unconfirmed" },
      {
        slug: "allergies",
        name: "Skin allergies",
        blurb: "Understanding reactions, rashes and possible irritants.",
        availability: "unconfirmed",
      },
      {
        slug: "infections",
        name: "Skin infections",
        blurb: "Diagnosis of fungal, bacterial and viral skin infections.",
        availability: "unconfirmed",
      },
      {
        slug: "other-conditions",
        name: "Other skin conditions",
        blurb: "Any persistent change in your skin is worth a proper assessment.",
        availability: "unconfirmed",
      },
    ],
  },
  {
    id: "aesthetic",
    name: "Cosmetic & Aesthetic Dermatology",
    shortName: "Aesthetic",
    intro:
      "Procedures that may refine texture, tone and the visible signs of ageing, discussed honestly, with realistic expectations and medical judgement.",
    theme: { bg: "#E9D3CA", fg: "#2A1F1A", accent: "#6A2D33", art: "glass" },
    treatments: [
      {
        slug: "chemical-peels",
        name: "Chemical peels",
        blurb: "Controlled exfoliation used for uneven tone, dullness and texture.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "laser",
        name: "Laser treatments",
        blurb: "Laser-based procedures for pigmentation, scarring, texture and unwanted hair.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "rejuvenation",
        name: "Skin rejuvenation",
        blurb: "Approaches aimed at the overall quality and radiance of the skin.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "microneedling",
        name: "Microneedling",
        blurb: "A collagen-induction procedure sometimes used for texture and scarring.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "botox",
        name: "Botox",
        blurb: "Botulinum toxin injections that soften expression lines, planned after an assessment.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "fillers",
        name: "Dermal fillers",
        blurb: "Injectable fillers that restore volume and refine contour.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "texture",
        name: "Skin texture treatments",
        blurb: "Addressing roughness, enlarged pores and uneven surface.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "anti-ageing",
        name: "Anti-ageing procedures",
        blurb: "A considered conversation about how skin changes with time.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "other-aesthetic",
        name: "Other aesthetic procedures",
        blurb: "Ask about other aesthetic dermatology options.",
        availability: "unconfirmed",
      },
    ],
  },
  {
    id: "hair",
    name: "Hair & Scalp",
    shortName: "Hair & Scalp",
    intro: "Hair and scalp concerns often have more than one cause. Care begins with finding out why, before deciding what to do.",
    theme: { bg: "#2E3A2D", fg: "#F3ECE2", accent: "#E8BC9D", art: "strands" },
    treatments: [
      {
        slug: "hair-fall-assessment",
        name: "Hair fall assessment",
        blurb: "A structured look at pattern, history and possible contributing factors.",
        availability: "unconfirmed",
      },
      {
        slug: "hair-thinning",
        name: "Hair thinning",
        blurb: "Understanding gradual changes in hair density.",
        availability: "unconfirmed",
      },
      {
        slug: "hair-loss",
        name: "Hair loss",
        blurb: "Evaluating different types of hair loss and possible approaches.",
        availability: "unconfirmed",
      },
      { slug: "dandruff", name: "Dandruff", blurb: "Persistent flaking and itching of the scalp.", availability: "unconfirmed" },
      {
        slug: "scalp-conditions",
        name: "Scalp conditions",
        blurb: "Inflammation, irritation and other scalp concerns.",
        availability: "unconfirmed",
      },
      {
        slug: "prp",
        name: "PRP treatment",
        blurb: "Platelet-rich plasma injections into the scalp, used for some types of hair thinning.",
        availability: "unconfirmed",
        procedure: true,
      },
      {
        slug: "other-hair",
        name: "Other hair & scalp procedures",
        blurb: "Ask about other hair and scalp options.",
        availability: "unconfirmed",
      },
    ],
  },
];

export const allTreatments = treatmentCategories.flatMap((c) => c.treatments);
export const confirmedTreatments = allTreatments.filter((t) => t.availability === "confirmed");

/* ───────────────────────────── Featured treatments ───────────────────────────── */

export const featured: FeaturedTreatment[] = [
  {
    slug: "acne-and-acne-scars",
    title: "Acne & Acne Scars",
    titleLines: ["Acne &", "acne scars"],
    summary: "Understand acne, its contributing factors, and possible approaches to treatment.",
    seoTitle: "Acne & Acne Scar Consultation in Bandra, Mumbai | Dr. Aditya Tolat",
    seoDescription:
      "Consult dermatologist Dr. Aditya Tolat at New Dawn Clinics, Bandra about acne and acne scars: assessment, contributing factors and possible treatment approaches.",
    overview: [
      "Acne is one of the most common reasons people see a dermatologist. It can range from occasional breakouts to persistent, painful lesions, and in some people it leaves marks or scars once it settles.",
      "Because acne has different types and causes, a plan that works well for one person may not suit another. A consultation focuses on understanding your skin first.",
    ],
    factors: {
      heading: "What can contribute",
      items: [
        "Excess oil production",
        "Blocked pores",
        "Bacteria and inflammation",
        "Hormonal changes",
        "Genetics and family history",
        "Some products, medicines or lifestyle factors",
      ],
    },
    approaches: [
      "Topical treatments applied to the skin",
      "Oral medicines for some types of acne",
      "Chemical peels",
      "Procedures for scars such as microneedling or laser, depending on scar type",
      "Skincare guidance to support treatment",
    ],
    consultation:
      "Dr. Aditya will discuss your history, examine your skin and talk you through options that may be suitable, along with realistic expectations and timelines.",
    art: "acne",
    fallbackArt: "texture",
    theme: { bg: "#F3ECE2", fg: "#2A1F1A" },
    related: ["acne", "acne-scars", "chemical-peels", "microneedling", "laser"],
  },
  {
    slug: "pigmentation-and-melasma",
    title: "Pigmentation & Melasma",
    titleLines: ["Pigmentation", "& melasma"],
    summary: "Explore treatment options for uneven skin tone and pigmentation concerns.",
    seoTitle: "Pigmentation & Melasma Treatment Consultation in Mumbai | New Dawn Clinics",
    seoDescription:
      "Pigmentation, melasma and uneven skin tone: consult Dr. Aditya Tolat at New Dawn Clinics, Bandra, Mumbai to understand causes and possible treatment approaches.",
    overview: [
      "Pigmentation describes areas of skin that look darker than the surrounding skin. Melasma is a specific, often recurring pattern of pigmentation that usually needs patient, long-term management.",
      "Different kinds of pigmentation respond differently, and some treatments can irritate the skin if they are not chosen carefully. Getting the diagnosis right comes first.",
    ],
    factors: {
      heading: "What can contribute",
      items: [
        "Sun exposure",
        "Hormonal influences",
        "Inflammation after acne or injury",
        "Genetic tendency",
        "Certain medicines or products",
      ],
    },
    approaches: [
      "Sun protection and daily skincare guidance",
      "Topical treatments",
      "Chemical peels",
      "Laser or light-based treatments",
      "Ongoing maintenance to help manage recurrence",
    ],
    consultation:
      "Your consultation looks at the type and pattern of pigmentation so that any treatment discussed is suited to your skin and your expectations.",
    art: "pigmentation",
    fallbackArt: "cream",
    theme: { bg: "#E9D3CA", fg: "#2A1F1A" },
    related: ["pigmentation", "melasma", "uneven-tone", "chemical-peels", "laser"],
  },
  {
    slug: "hair-fall-and-hair-loss",
    title: "Hair Fall & Hair Loss",
    titleLines: ["Hair fall &", "hair loss"],
    summary: "Understand what can cause hair loss, and how it is treated.",
    seoTitle: "Hair Loss Consultation in Bandra, Mumbai | Dr. Aditya Tolat, Dermatologist",
    seoDescription:
      "Hair fall, thinning or hair loss? Consult dermatologist Dr. Aditya Tolat at New Dawn Clinics, Bandra to understand possible causes and appropriate approaches.",
    overview: [
      "Some daily hair shedding is normal. Noticeable hair fall, thinning or patches of loss can have many causes, and they often overlap.",
      "Understanding the type of hair loss is the most important step, because the right approach depends on the cause.",
    ],
    factors: {
      heading: "What can contribute",
      items: [
        "Genetic pattern hair loss",
        "Stress, illness or recent surgery",
        "Nutritional factors",
        "Hormonal and thyroid changes",
        "Scalp conditions",
        "Hair styling and traction",
      ],
    },
    approaches: [
      "Clinical assessment of hair and scalp",
      "Blood tests or other investigations, if needed",
      "Topical or oral treatments",
      "Scalp procedures such as PRP",
      "Guidance on hair and scalp care",
    ],
    consultation:
      "Dr. Aditya will look at the pattern of hair loss, your history and your scalp, and explain which approaches may be appropriate for you.",
    art: "strands",
    fallbackArt: "strands",
    theme: { bg: "#2E3A2D", fg: "#F3ECE2" },
    related: ["hair-fall-assessment", "hair-thinning", "hair-loss", "prp"],
  },
  {
    slug: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    titleLines: ["Skin", "rejuvenation"],
    summary: "Explore aesthetic dermatology options that may improve aspects of skin texture and appearance.",
    seoTitle: "Skin Rejuvenation & Cosmetic Dermatology in Mumbai | New Dawn Clinics",
    seoDescription:
      "Cosmetic dermatology in Mumbai: discuss skin rejuvenation options for texture, tone and radiance with Dr. Aditya Tolat at New Dawn Clinics, Bandra.",
    overview: [
      "Skin rejuvenation is a broad term for aesthetic procedures that aim to improve aspects of how the skin looks and feels: texture, tone, fine lines or overall radiance.",
      "A dermatologist’s perspective means looking at skin health and suitability first, and setting realistic expectations about what any procedure can and cannot do.",
    ],
    factors: {
      heading: "Common concerns",
      items: ["Dullness and uneven texture", "Fine lines", "Enlarged pores", "Loss of firmness over time", "Sun-related changes"],
    },
    approaches: [
      "Chemical peels",
      "Microneedling",
      "Laser-based procedures",
      "Injectables such as Botox or fillers",
      "A supporting skincare routine",
    ],
    consultation:
      "Aesthetic procedures are discussed only after understanding your skin, your goals and whether a procedure is suitable for you.",
    art: "rejuvenation",
    fallbackArt: "glass",
    theme: { bg: "#E6D8C8", fg: "#2A1F1A" },
    related: ["rejuvenation", "chemical-peels", "microneedling", "botox", "fillers", "anti-ageing", "texture"],
  },
  {
    slug: "laser-treatments",
    title: "Laser Treatments",
    titleLines: ["Laser", "treatments"],
    summary: "An introduction to laser-based dermatology and what it can be used for.",
    seoTitle: "Laser Treatments | Dermatology at New Dawn Clinics, Bandra",
    seoDescription:
      "An introduction to laser-based dermatology procedures. Ask Dr. Aditya Tolat at New Dawn Clinics, Bandra which laser options may suit your concern.",
    overview: [
      "Dermatological lasers use focused light energy. Different lasers are designed for different purposes, from pigmentation and scarring to hair reduction and skin resurfacing.",
      "Whether a laser suits you depends on your concern, your skin type and your medical history.",
    ],
    factors: {
      heading: "Concerns lasers may be used for",
      items: ["Pigmentation", "Acne scars", "Unwanted hair", "Texture and resurfacing", "Some vascular concerns"],
    },
    approaches: [
      "Assessment of skin type and suitability",
      "Choice of laser matched to the concern",
      "A course of sessions, if needed",
      "Pre- and post-procedure skincare and sun protection",
    ],
    consultation:
      "Your consultation will cover whether a laser procedure is suitable, what it involves, possible side effects and what to realistically expect.",
    art: "laser",
    fallbackArt: "arch",
    theme: { bg: "#E4E3D6", fg: "#2A1F1A" },
    related: ["laser"],
  },
];

/* ───────────────────────────── FAQs ───────────────────────────── */

export const faqs: Faq[] = [
  {
    q: "What conditions does a dermatologist treat?",
    a: "Dermatologists diagnose and treat conditions of the skin, hair, scalp and nails, from acne, pigmentation, eczema, psoriasis and infections to hair loss. Many dermatologists also offer cosmetic and aesthetic procedures.",
    verified: true,
  },
  {
    q: "How can I book a consultation with Dr. Aditya Tolat?",
    a: "Send a WhatsApp message or call +91 99201 59278. You can also use the enquiry form on this page, which prepares a WhatsApp message for you. The clinic will reply to confirm a time.",
    verified: true,
  },
  {
    q: "What should I expect during my first dermatology consultation?",
    a: "A first consultation usually involves talking through your concern and medical history, an examination of your skin, hair or scalp, and a discussion of possible next steps. Bring a list of any medicines or skincare products you currently use.",
    verified: true,
  },
  {
    q: "Do you treat acne and acne scars?",
    a: "Yes, you can consult Dr. Aditya about acne and acne scars. The approaches that may be suitable depend on your skin and are discussed during the consultation.",
    verified: true,
  },
  {
    q: "Do you provide treatment for pigmentation and melasma?",
    a: "Yes, you can consult Dr. Aditya about pigmentation, melasma and uneven skin tone. The type of pigmentation is assessed first, as this guides which approaches may be appropriate.",
    verified: true,
  },
  {
    q: "Can I consult for hair loss and scalp issues?",
    a: "Yes. Hair fall, thinning, dandruff and other scalp concerns can all be discussed during a dermatology consultation.",
    verified: true,
  },
  { q: "Do you offer chemical peels?", a: null, verified: false },
  { q: "Are laser treatments available?", a: null, verified: false },
  { q: "Do you offer Botox and dermal fillers?", a: null, verified: false },
  {
    q: "Where is New Dawn Clinics located?",
    a: "New Dawn Clinics is in Bandra, Mumbai. Send a WhatsApp message or call the clinic for the exact address and directions.",
    verified: true,
  },
  { q: "What are the consultation fees?", a: null, verified: false },
  { q: "What are the clinic timings?", a: null, verified: false },
];

/* ───────────────────────────── Proof (empty until real) ───────────────────────────── */

/** Genuine, authorised testimonials only. The section stays hidden while this is empty. */
export const testimonials: Testimonial[] = [];

/** Authorised before/after pairs only (with written consent). Enables the comparison slider. */
export const gallery: GalleryPair[] = [];

/** Real clinic photographs, e.g. { src: "/photos/reception.jpg", alt: "Reception at New Dawn Clinics" } */
export const clinicPhotos: { src: string; alt: string }[] = [];

/* ───────────────────────────── SEO ───────────────────────────── */

export const seo = {
  title: "Dr. Aditya Tolat | Dermatologist in Bandra, Mumbai | New Dawn Clinics",
  titleTemplate: "%s | New Dawn Clinics",
  description:
    "Consult Dr. Aditya Tolat at New Dawn Clinics, Bandra, Mumbai, for dermatological care and skin, hair and aesthetic treatment enquiries.",
  keywords: [
    "dermatologist in Bandra",
    "skin doctor in Bandra",
    "dermatology clinic in Bandra",
    "acne treatment in Bandra",
    "pigmentation treatment in Mumbai",
    "hair loss consultation in Bandra",
    "cosmetic dermatology in Mumbai",
  ],
  ogImage: "/og.jpg",
  locale: "en_IN",
};

export const nav = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Treatments", href: "/#treatments" },
  { label: "Dr. Aditya", href: "/#doctor" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/#contact" },
];
