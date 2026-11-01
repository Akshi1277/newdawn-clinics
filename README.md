# New Dawn Clinics: Dr. Aditya Tolat, Dermatology (Bandra, Mumbai)

Premium editorial dermatology website. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion, exported as a **fully static site**. No backend, database or CMS.

## Commands

```bash
npm install
npm run dev      # local development at http://localhost:3000
npm run build    # optimises artwork, then writes the deployable static site to /out
```

Deploy by uploading the `out/` folder to any static host (Netlify, Vercel, Cloudflare Pages, S3, cPanel…). Use a host that serves gzip/brotli.

## Editing content: `src/config/site.ts`

Every fact on the site lives in this one file.

| To publish… | Edit |
|---|---|
| Doctor's degrees, registration, experience | `doctor.credentials[n].value` → `{ value: "MBBS — …", verified: true }` |
| Doctor biography / clinical interests | `doctor.bio`, `doctor.clinicalInterests` |
| Doctor portrait | put the photo in `public/photos/` and set `doctor.portrait: "/photos/…jpg"` |
| Full clinic address, postcode, Google Maps link | `business.address`, `business.postalCode`, `business.mapsUrl` |
| Consultation hours | `business.hours` → `{ value: [{ days: "Mon–Sat", time: "11 am – 7 pm" }], verified: true }` |
| Instagram | `business.instagram` |
| Website domain (enables canonical URLs, sitemap, social preview image) | `business.website` → `{ value: "https://…", verified: true }` |
| External booking page (otherwise "Book" scrolls to the enquiry form) | `business.bookingUrl` |
| Mark a treatment as offered | change its `availability` to `"confirmed"` |
| Answer an FAQ | set `a: "…"` and `verified: true` |
| Genuine testimonials (section is hidden until added) | `testimonials` (requires `consent: true`) |
| Authorised before/after photos (enables comparison slider) | `gallery` (requires `consent: true`) |
| Real clinic photographs | `clinicPhotos` |

Anything left as `verified: false` is **never shown** on the page or in search-engine structured data.

## Artwork

`assets/source/` holds six AI-generated **abstract** textures (no people, clinics or equipment). They are labelled as abstract artwork on the site. `npm run build` converts them to responsive AVIF/WebP in `public/art/`. Contour-line art is generated at build time from `src/components/art/topoVariants.ts`.

## Structure

- `src/app/page.tsx`: homepage section order
- `src/app/treatments/[slug]/`: the five featured treatment guides
- `src/components/sections/`: one file per homepage section
- `src/components/layout/`: navigation, floating/mobile booking actions, footer
- `src/lib/links.ts`: WhatsApp / phone / email / maps link builders
- `src/lib/jsonld.ts`: MedicalClinic + Physician structured data (verified facts only)
- `PRODUCT.md` / `DESIGN.md`: product facts and design-system record
