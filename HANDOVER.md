# Handover: New Dawn Clinics website

Read this first. Also read `PRODUCT.md` (facts and rules), `DESIGN.md` (design system and anti-slop rules) and `AGENTS.md` (Next 16 notes).

## Current state (2026-11-02)
- **Stack:** Next.js 16 static export, built with `npm run build` into `out/`. Live at https://newdawn-clinics.vercel.app, repo https://github.com/Akshi1277/newdawn-clinics (branch `master`).
- **Unpushed work:** all recent work is uncommitted and not yet pushed. It is lint, type and build clean.
- **Already done and verified:** content and duplicate-text fixes, the doctor credentials system, the treatment availability system, WhatsApp directions, the collision-free desktop floating CTA, the hydration fix for reduced motion, the Gemini images, and the line-height fix (no letter collisions anywhere).

## Hard rules (do not break)
- Never invent qualifications, reviews, ratings, prices, results, the address or hours. Every unverified fact lives in `src/config/site.ts` as `{ value: null, verified: false }` and must stay hidden until a human sets `verified: true`.
- Do not redesign. Keep the palette, fonts (Instrument Serif and Manrope), arch frames and motion.
- Keep the "Find us in Bandra" section design as is.
- Display line-heights must stay at or above their current values. Letters must never touch between lines.

## Remaining tasks, in order

### 1. Verify the hero fits the first viewport
The code change is done but has not been checked visually.

In `src/components/sections/Hero.tsx`:
- The H1 uses `text-[clamp(3.4rem,min(9.5vw,14svh),10rem)] leading-[0.98]`.
- The grid has `lg:grid-rows-[auto_1fr]`.
- The portrait wrapper uses `lg:w-[min(100%,calc((100svh-10rem)*0.75))]`.

Goal: at 1840×1010, 1440×900, 1366×768 and 1280×720, the label, the headline, the supporting paragraph and **both buttons ("Book a Consultation" and "Explore Treatments") are fully visible without scrolling**. The "What Dr. Aditya looks at" card may sit below the fold.

If the buttons are cut off, in this order:
1. Reduce `14svh` to `12svh`.
2. Reduce the section's `pt-28` to `pt-24`.
3. Reduce the paragraph's `lg:mt-8` to `lg:mt-6`.

Do not shrink the line-height below 0.98.

### 2. Re-run the checks
```bash
npm run build
node scripts/qa/serve.mjs "<absolute path to out>" 4175      # leave running in a second terminal
npm i -D playwright-core                                      # one-time; uses installed Google Chrome
node scripts/qa/collide.mjs                                   # must print "No collisions found."
node scripts/qa/qa.mjs .impeccable/review                     # screenshots + report.json; console must be []
npx eslint src && npx tsc --noEmit
```
`qa.mjs` checks:
- overflow and floating-CTA collisions at 1440, 1024, 768, 390 and 360
- nav anchors, tabs, FAQ and form validation
- the WhatsApp message, the mobile menu and reduced motion

Expect `overflowX: false`, `pillCollisions: []` and `console: []` at every width.

### 3. Commit and push
```bash
git add -A
git commit -m "Refinement + QA pass: content cleanup, credentials, availability, directions, a11y, line-heights, Gemini images"
git push
```
Vercel redeploys from `master` automatically.

## Updating facts later (only `src/config/site.ts`)
| Fact | Where |
|---|---|
| Degrees | `doctor.credentials.education[n] = { value: { degree, institution, year }, verified: true }` |
| Medical registration | `doctor.credentials.registration = { value: { council: "Maharashtra Medical Council", number: "…" }, verified: true }` |
| Experience, training, memberships | `doctor.credentials.experience`, `.training[]`, `.memberships[]` |
| Address, map, hours, Instagram, domain | `business.address`, `business.mapsUrl`, `business.hours`, `business.instagram`, `business.website` |

Setting the address or map link switches the "Ask for directions on WhatsApp" button back to "Get Directions" automatically. Setting `business.website` enables the canonical URL, the sitemap and the social preview image.

Set `availability: "confirmed"` on a treatment the clinic actually offers. Its tag changes from "Ask about availability" to "Offered at the clinic".

Set `verified: true` on a pending FAQ (and add its answer) to show it.

## Images
- Featured images are `assets/source/{acne,pigmentation,rejuvenation,laser}.png`. Replace a file with the same name to update it.
- `npm run build` regenerates `public/art/*` and `src/config/images.json`.
- A real doctor photo goes in `public/photos/`. Set `doctor.portrait: "/photos/<file>.jpg"`.
