import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { seo, business } from "@/config/site";
import { siteUrl } from "@/lib/links";
import { clinicJsonLd, jsonLdString } from "@/lib/jsonld";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MotionProvider } from "@/components/motion/MotionProvider";

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const url = siteUrl();
if (!url && process.env.NODE_ENV === "production" && !process.env.__ND_WARNED) {
  process.env.__ND_WARNED = "1";
  console.warn(
    "\n[new-dawn] business.website is not verified in src/config/site.ts. Canonical URLs and sitemap entries are omitted until the domain is set.\n",
  );
}

export const metadata: Metadata = {
  ...(url ? { metadataBase: new URL(url), alternates: { canonical: "/" } } : {}),
  title: { default: seo.title, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: business.name,
  authors: [{ name: business.name }],
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: business.name,
    title: seo.title,
    description: seo.description,
    // Social images need an absolute URL, so they switch on once business.website is set.
    ...(url ? { images: [{ url: seo.ogImage, width: 1200, height: 630, alt: "New Dawn Clinics: dermatology by Dr. Aditya Tolat, Bandra, Mumbai" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, ...(url ? { images: [seo.ogImage] } : {}) },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F3ECE2",
  width: "device-width",
  initialScale: 1,
};

const CONTRACT = `<!--
THESIS: Dermatology as an editorial skin study: understanding before treatment. Refuses the hospital template (blue gradients, doctor stock photo, icon-card grids).
OWN-WORLD: Colour-blocked fields of ivory, olive, rose, forest, burgundy and espresso; Instrument Serif at monumental scale with italic turns; hairline ledgers; contour-line, cell and strand drawings; arch-framed abstract studies labelled as artwork.
STORY: Visitor learns this is Dr. Aditya Tolat's dermatology practice in Bandra, believes the care starts with understanding and makes no false promises, and starts a WhatsApp or phone conversation.
FIRST VIEWPORT: Left 7 cols: monumental three-line serif headline, italic "Understood." crossing into the art; copy; Book a Consultation + Explore Treatments. Right: tall arch-framed glass study over contour lines, pointer parallax. Bandra · Mumbai metadata rail.
FORM: brief-pinned direction (client moodboard), seed: pinned-by-brief.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} antialiased`}>
      <body className="min-h-dvh">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a href="#main" className="sr-only-focusable">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(clinicJsonLd()) }}
        />
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </MotionProvider>
      </body>
    </html>
  );
}
