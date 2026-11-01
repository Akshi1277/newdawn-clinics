# Design system: New Dawn Clinics

Direction (client-pinned): premium clinical dermatology × luxury skincare editorial. Dermatology presented as an editorial skin study, *understanding before treatment*. It deliberately refuses the hospital template: no blue gradients, no doctor stock photos, no icon-card grids.

## Colour: colour-blocked full palette
Tokens live in `src/app/globals.css` (`@theme`). Sections own whole fields of colour. There are no decorative gradients.

| Token | Hex | Role |
|---|---|---|
| ivory | #F3ECE2 | default ground |
| porcelain | #FAF7F2 | doctor section, form panel |
| espresso | #2A1F1A | text; Transformation section |
| olive | #5C5F43 | marquee, Approach "Care", monogram |
| sage | #A9B19B | Approach "Personalise", Location |
| rose | #CDA79C / #E9D3CA | aesthetic category, Clinic section |
| terracotta | #B4694A | large numerals only (≥24px) |
| burgundy | #6A2D33 | italic accents, Contact section, floating CTA |
| forest | #2E3A2D | hair & scalp, footer |
| peach | #E8BC9D | accents on dark; Commitment section |

Rules: body text is espresso on light or ivory on dark. Secondary text on light grounds is never below `espresso/75` (WCAG AA verified with axe).

## Type
- **Instrument Serif** 400, roman + italic: all display. Italic marks the turn of a phrase ("*Understood.*", "*a conversation.*").
- **Manrope**: body and UI.
- Scale: `text-display-xl` clamp(3.4rem, 10.5vw, 11rem) / lh .86 · `display-l` clamp(2.6–6.5rem) / .92 · `display-m` clamp(2–3.75rem) · `title` · `lead` · `body` 17px / 1.65 · `label` 0.72rem uppercase, 0.18em tracking. Labels are used for metadata, never as an eyebrow above a heading.

## Shape & material
- Arch (`rounded-[999px_999px_0_0]`) is the one frame shape, used consistently (hero, intro, featured panels, doctor).
- Hairline ledgers (`border-line`) replace cards.
- Art: topographic contour fields (build-time SVG drawn through a CSS mask in `currentColor`) only in the hero, Approach and footer; cell lattice and strands in the treatment explorer.
- Grain overlay (`grain` utility) only on the hero and footer.

## Controls
One button: a capsule with an icon disc (`components/ui/Button.tsx`). Arrows rotate on hover. Variants: solid, outline, light, outline-light, burgundy. Form fields have floating labels, a bottom rule and a focus underline that draws in from the left. Focus ring: 2px terracotta (peach on dark).

## Motion grammar
Exponential ease-out `cubic-bezier(.16,1,.3,1)`. The signature moments:
- hero headline character reveal plus the dermatologist's loupe (follows the pointer; tours the face on its own on touch)
- stacked featured panels
- Approach sticky word sequence with colour/blob morph
- horizontal journey

Section headings use a plain quiet fade (`ui/Heading.tsx`). The italic split headline is reserved for the hero and the Contact sign-off.

## Anti-slop rules (from the impeccable critique)
- No "Study Nº" captions and no per-image disclaimers. One illustrative-imagery line in the footer, plus "Model image, not a patient." under the hero.
- No sparkle glyphs, no pulsing "live" dots, no fake-precision badges.
- Availability tags only on procedures (`procedure: true`), never on conditions.
- Unverified facts collapse into one honest line or card. Never render rows of "Being updated".
- Sections that need real assets (Transformation gallery, Clinic photos, testimonials) render nothing until those assets exist. `prefers-reduced-motion` collapses sticky and horizontal sequences to static layouts (verified).
