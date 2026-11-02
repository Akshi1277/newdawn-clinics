// Detects glyph-ink collisions between adjacent lines of large text (descender of one line
// touching ascender/cap of the next), at several widths, across all pages.
import { chromium } from "playwright-core";
const BASE = "http://127.0.0.1:4175";
const PAGES = ["/", "/treatments/acne-and-acne-scars/", "/treatments/pigmentation-and-melasma/", "/treatments/hair-fall-and-hair-loss/", "/treatments/skin-rejuvenation/", "/treatments/laser-treatments/", "/404.html"];
const WIDTHS = [[1440, 900], [1024, 768], [768, 1024], [390, 844], [360, 780]];
const TOL = 2; // px: flag anything closer than this

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
for (const [w, h] of WIDTHS) {
  // reduced motion => every split/reveal animation is at rest, so glyph positions are final
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const path of PAGES) {
    for (let k = 0; k < 20; k++) { try { await page.goto(BASE + path, { waitUntil: "networkidle" }); break; } catch { await new Promise((r) => setTimeout(r, 400)); } }
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    const found = await page.evaluate((TOL) => {
      const cv = document.createElement("canvas").getContext("2d");
      const out = [];
      const blocks = [...document.querySelectorAll("h1, h2, h3, p, a, span, dd, blockquote")].filter((el) => {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        return fs >= 26 && el.textContent.trim() && !el.closest("[aria-hidden=true]:not(h1 *, h2 *, h3 *, p *)");
      });
      // de-duplicate: keep outermost large-text containers
      const roots = blocks.filter((el) => !blocks.some((o) => o !== el && o.contains(el)));
      for (const root of roots) {
        const chars = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          const parent = n.parentElement;
          const cs = getComputedStyle(parent);
          if (cs.visibility === "hidden" || cs.display === "none" || parent.closest(".sr-only")) continue;
          const fs = parseFloat(cs.fontSize);
          if (fs < 26) continue;
          cv.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          for (let i = 0; i < n.data.length; i++) {
            const ch = n.data[i];
            if (!ch.trim()) continue;
            const r = document.createRange();
            r.setStart(n, i);
            r.setEnd(n, i + 1);
            const rect = r.getBoundingClientRect();
            if (!rect.width) continue;
            const m = cv.measureText(ch);
            const fm = cv.measureText("Hg");
            const baseline = rect.top + (rect.height - (fm.fontBoundingBoxAscent + fm.fontBoundingBoxDescent)) / 2 + fm.fontBoundingBoxAscent;
            chars.push({ ch, x0: rect.left + m.actualBoundingBoxLeft * -1, x1: rect.left + m.actualBoundingBoxRight, top: baseline - m.actualBoundingBoxAscent, bot: baseline + m.actualBoundingBoxDescent, line: Math.round(baseline) });
          }
        }
        // group into lines by baseline
        const lines = [];
        for (const c of chars.sort((a, b) => a.line - b.line)) {
          const L = lines.find((l) => Math.abs(l.base - c.line) < 6);
          if (L) L.c.push(c); else lines.push({ base: c.line, c: [c] });
        }
        lines.sort((a, b) => a.base - b.base);
        for (let i = 0; i + 1 < lines.length; i++) {
          let worst = null;
          for (const a of lines[i].c) for (const b of lines[i + 1].c) {
            if (a.x1 < b.x0 || b.x1 < a.x0) continue;
            const gap = b.top - a.bot;
            if (gap < TOL && (!worst || gap < worst.gap)) worst = { gap: Math.round(gap * 10) / 10, pair: a.ch + "/" + b.ch };
          }
          if (worst) out.push({ text: root.textContent.trim().replace(/\s+/g, " ").slice(0, 50), lines: [i, i + 1], ...worst });
        }
      }
      return out;
    }, TOL);
    for (const f of found) results.push({ w, path, ...f });
  }
  await ctx.close();
}
await browser.close();
const uniq = new Map();
for (const r of results) { const k = r.path + "|" + r.text + "|" + r.pair; if (!uniq.has(k) || uniq.get(k).gap > r.gap) uniq.set(k, r); }
console.log(results.length ? `COLLISIONS (${results.length} across widths):` : "No collisions found.");
for (const r of [...uniq.values()].sort((a, b) => a.gap - b.gap)) console.log(`${r.gap}px  w=${r.w}  ${r.path}  "${r.text}"  ${r.pair}`);
