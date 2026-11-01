import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/links";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const url = siteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(url ? { sitemap: `${url}/sitemap.xml`, host: url } : {}),
  };
}
