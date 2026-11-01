// Builds responsive AVIF + WebP variants of the abstract artwork in assets/source
// and writes a manifest consumed by <Picture>. Also composes the Open Graph image.
// Runs automatically before `npm run build` (see package.json "prebuild").
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets", "source");
const outDir = path.join(root, "public", "art");
const manifestPath = path.join(root, "src", "config", "images.json");
const WIDTHS = [480, 828, 1200, 1800];

await mkdir(outDir, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });
const files = (await readdir(srcDir)).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name;
  const input = path.join(srcDir, file);
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  // Always keep a full-resolution variant (used e.g. by the hero loupe zoom).
  if (!widths.includes(meta.width)) widths.push(meta.width);

  for (const w of widths) {
    const base = path.join(outDir, `${name}-${w}`);
    const pipeline = sharp(input).resize({ width: w });
    await pipeline.clone().avif({ quality: 52, effort: 4 }).toFile(`${base}.avif`);
    await pipeline.clone().webp({ quality: 74 }).toFile(`${base}.webp`);
  }

  // Tiny blurred placeholder, inlined as a data URI.
  const blur = await sharp(input).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  manifest[name] = {
    width: meta.width,
    height: meta.height,
    widths,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

// Open Graph image (1200×630): cream artwork + wordmark + headline.
const ogPath = path.join(root, "public", "og.jpg");
const cream = path.join(srcDir, "cream.webp");
try {
  await stat(cream);
  const bg = await sharp(cream).resize(1200, 630, { fit: "cover", position: "centre" }).toBuffer();
  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#2A1F1A" opacity="0.18"/>
      <rect x="0" y="0" width="560" height="630" fill="#F3ECE2" opacity="0.94"/>
      <text x="64" y="96" font-family="Georgia, serif" font-size="30" letter-spacing="6" fill="#2A1F1A">NEW DAWN</text>
      <text x="64" y="126" font-family="Arial, sans-serif" font-size="14" letter-spacing="5" fill="#5C5F43">CLINICS · DERMATOLOGY</text>
      <text x="64" y="330" font-family="Georgia, serif" font-size="68" fill="#2A1F1A">Your skin.</text>
      <text x="64" y="405" font-family="Georgia, serif" font-style="italic" font-size="68" fill="#6A2D33">Understood.</text>
      <text x="64" y="540" font-family="Arial, sans-serif" font-size="20" fill="#2A1F1A">Dr. Aditya Tolat</text>
      <text x="64" y="570" font-family="Arial, sans-serif" font-size="15" letter-spacing="4" fill="#5C5F43">BANDRA · MUMBAI</text>
    </svg>`);
  await sharp(bg).composite([{ input: overlay }]).jpeg({ quality: 82 }).toFile(ogPath);
} catch (e) {
  console.warn("[optimize-images] OG image skipped:", e.message);
}

console.log(`[optimize-images] ${files.length} artworks → public/art, manifest → src/config/images.json`);
