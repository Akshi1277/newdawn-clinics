import type { MetadataRoute } from "next";
import { featured } from "@/config/site";
import { siteUrl } from "@/lib/links";

export const dynamic = "force-static";

/** Absolute URLs require the verified production domain (business.website in src/config/site.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  if (!url) return [];
  return [
    { url: `${url}/`, changeFrequency: "monthly", priority: 1 },
    ...featured.map((f) => ({ url: `${url}/treatments/${f.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
