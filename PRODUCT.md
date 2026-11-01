# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) + Tailwind CSS v4 + Framer Motion, exported as a fully static site (`output: "export"` → `/out`). No backend, database, CMS, auth, API routes or server actions. Pinned by the client brief.

## Users

People in Mumbai, often arriving on mobile from WhatsApp, Instagram or Google search, who have a skin, hair or scalp concern (acne, scars, pigmentation, melasma, hair fall, eczema, psoriasis…) or an interest in aesthetic dermatology (peels, lasers, rejuvenation, injectables). Their job: decide whether Dr. Aditya Tolat at New Dawn Clinics, Bandra is credible and right for them, then start a conversation (WhatsApp or phone).

## Product Purpose

The website for Dr. Aditya Tolat's dermatology practice at New Dawn Clinics, Bandra, Mumbai. It must make the practice feel medically credible and approachable, communicate the breadth of skin, hair and aesthetic care, and convert visits into WhatsApp/phone enquiries. Success = consultation enquiries started.

## Positioning

Dermatology that begins with understanding the individual's skin: assessment first, appropriate treatment second, long-term skin health throughout. Presented with the sophistication of a premium skincare editorial rather than a hospital or beauty salon.

## Capabilities and Constraints

- Booking is WhatsApp (wa.me/919920159278, prefilled), telephone (+91 99201 59278) and email (adityatolat@gmail.com) only. An enquiry does not confirm an appointment.
- The treatment catalogue is a *proposed* list. Each treatment carries an availability flag; none are confirmed yet. Treatments show as "ask about availability" until confirmed.
- All business facts live in `src/config/site.ts`.
- Undecided / unverified: doctor's qualifications, registration and experience; full clinic address; working hours; Instagram; website domain; consultation fees; clinic-verified FAQ answers.

## Brand Commitments

- Clinic name stays **New Dawn Clinics**. Presented as "Dr. Aditya Tolat — Dermatology at New Dawn Clinics". Logo lockup: NEW DAWN / CLINICS with a dermatology descriptor.
- Client-pinned direction: premium clinical dermatology × luxury skincare editorial. Palette family: warm ivory, porcelain, espresso, muted olive, sage, taupe, dusty rose, terracotta; accents burgundy, forest green, peach. Editorial serif display, clean sans body, italic serif accents.
- Must not look like a generic hospital/dermatologist site, an Instagram aesthetic clinic or a pink beauty salon.

## Evidence on Hand

- No photographs of the doctor, clinic, equipment or patients exist. None may be fabricated or AI-generated as if real.
- Six AI-generated **abstract** textures (cream, glass ribbon, macro texture, botanical, strands, plaster arch) in `assets/source/`. Decorative art only.
- No testimonials, reviews, ratings, before/after images, success rates, prices or credentials. None may be invented.

## Product Principles

1. Never claim what isn't verified: qualifications, outcomes, availability, prices, reviews.
2. Every path leads to a conversation: WhatsApp and call are always one tap away on mobile.
3. Education over promises: explain conditions and possible approaches, never guarantee results.
4. Missing assets should read as intentional design, and real photos must slot in later without a redesign.

## Accessibility & Inclusion

WCAG 2.1 AA: semantic HTML, keyboard navigation, visible focus, labelled forms, contrast, alt text, `prefers-reduced-motion` honoured (major scroll sequences simplify).
