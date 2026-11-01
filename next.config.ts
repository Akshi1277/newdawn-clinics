import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes the deployable site to /out.
  output: "export",
  trailingSlash: true,
  // Static export cannot use the default image optimiser. Responsive AVIF/WebP
  // variants are generated ahead of time by scripts/optimize-images.mjs.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
