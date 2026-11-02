// Responsive + interaction QA for the New Dawn static export (drives the installed Chrome headlessly).
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = "http://127.0.0.1:4175";
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const WIDTHS = [
  [1440, 900],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [360, 780],
];
const report = { widths: {}, interactions: {}, reduced: {}, console: [] };

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function newPage(w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...opts });
  await ctx.route("https://wa.me/**", (r) => r.fulfill({ status: 200, contentType: "text/plain", body: "ok" }));
  const page = await ctx.newPage();
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && report.console.push(`[${w}] ${m.type()}: ${m.text().slice(0, 160)}`));
  page.on("pageerror", (e) => report.console.push(`[${w}] pageerror: ${e.message}`));
  return { ctx, page };
}

// 1) Responsive sweep: overflow, text overlaps, screenshots per viewport step
for (const [w, h] of WIDTHS) {
  const { ctx, page } = await newPage(w, h);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const res = { height: H, overflowX: false, overflowEls: [], pillCollisions: [], shots: 0 };
  let i = 0;
  for (let y = 0; y < H; y += h) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/w${w}-${String(i).padStart(2, "0")}.png` });
    // floating pill must never sit on text/controls when visible
    const hit = await page.evaluate(() => {
      const pill = [...document.querySelectorAll("a")].find((a) => a.textContent.trim() === "Book Consultation" && getComputedStyle(a).position === "fixed");
      if (!pill || getComputedStyle(pill).opacity === "0" || getComputedStyle(pill).display === "none") return null;
      const r = pill.getBoundingClientRect();
      const BLOCK = "a, button, input, select, textarea, label, p, li, dt, dd, h1, h2, h3, h4, blockquote";
      for (const x of [r.left + 2, r.left + r.width / 2, r.right - 2]) for (const yy of [r.top + 2, r.top + r.height / 2, r.bottom - 2]) {
        const under = document.elementsFromPoint(x, yy).find((n) => !pill.contains(n) && n !== pill && n.closest(BLOCK));
        if (under) return under.closest(BLOCK).outerHTML.slice(0, 90);
      }
      return null;
    });
    if (hit) res.pillCollisions.push(`y=${y}: ${hit}`);
    i++;
  }
  res.shots = i;
  const ov = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > vw + 1 && !el.closest("[aria-hidden=true], svg, .no-scrollbar, [data-allow-overflow]")) {
        const s = getComputedStyle(el);
        if (s.position !== "fixed" && !el.closest("ol")) bad.push(`${el.tagName}.${String(el.className).slice(0, 50)} right=${Math.round(r.right)}`);
      }
    });
    return { scrollW: document.documentElement.scrollWidth, vw, bad: bad.slice(0, 8) };
  });
  res.overflowX = ov.scrollW > ov.vw;
  res.overflowEls = ov.bad;
  // headline overflow: any display heading wider than its container
  res.headingOverflow = await page.evaluate(() =>
    [...document.querySelectorAll("h1, h2, h3")]
      .filter((h) => h.scrollWidth > h.clientWidth + 2)
      .map((h) => (h.id || h.textContent.trim().slice(0, 30)) + ` ${h.scrollWidth}>${h.clientWidth}`),
  );
  report.widths[w] = res;
  await ctx.close();
}

// 2) Interactions (desktop + mobile)
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const I = report.interactions;
  // nav anchors land with heading visible below the floating nav
  I.anchors = {};
  for (const id of ["about", "treatments", "doctor", "faqs", "contact"]) {
    await page.click(`header nav a[href="/#${id}"]`);
    await page.waitForTimeout(1400);
    I.anchors[id] = await page.evaluate((i) => {
      const t = document.getElementById(i).getBoundingClientRect().top;
      const cur = document.querySelector('header nav a[aria-current="location"]');
      return { top: Math.round(t), current: cur ? cur.getAttribute("href") : null };
    }, id);
  }
  // treatment tabs keyboard
  await page.evaluate(() => document.getElementById("treatments").scrollIntoView());
  await page.waitForTimeout(800);
  await page.getByRole("tab").first().focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(700);
  I.tabAfterArrow = await page.evaluate(() => document.activeElement?.textContent?.trim());
  await page.keyboard.press("End");
  await page.waitForTimeout(700);
  I.tabAfterEnd = await page.evaluate(() => document.querySelector('[role=tab][aria-selected=true]')?.textContent?.trim());
  I.procedureTags = await page.evaluate(() => [...document.querySelectorAll("#treatments [role=tabpanel] li")].map((li) => [li.querySelector("button span")?.textContent, /Ask about availability|Offered/.test(li.textContent)]));
  // FAQ
  const faqBtn = page.getByRole("button", { name: /How can I book/ });
  await faqBtn.click();
  I.faqExpanded = await faqBtn.getAttribute("aria-expanded");
  // Form validation + message
  await page.evaluate(() => document.getElementById("enquiry").scrollIntoView());
  await page.getByRole("button", { name: /Send via WhatsApp/ }).click();
  I.formErrors = await page.locator("#enquiry [id$=-err]").allTextContents();
  I.formFocus = await page.evaluate(() => document.activeElement?.getAttribute("name"));
  I.labels = await page.evaluate(() => [...document.querySelectorAll("#enquiry input, #enquiry select, #enquiry textarea")].map((f) => [f.name, !!document.querySelector(`label[for="${f.id}"]`)]));
  await page.getByLabel("First name").fill("Asha");
  await page.getByLabel("Phone number").fill("98765 43210");
  await page.getByLabel("Area of concern").selectOption({ index: 1 });
  const [pop] = await Promise.all([page.waitForEvent("popup", { timeout: 5000 }).catch(() => null), page.getByRole("button", { name: /Send via WhatsApp/ }).click()]);
  I.waMessage = pop ? decodeURIComponent(pop.url()) : "no popup";
  if (pop) await pop.close();
  I.successText = await page.locator("#enquiry [role=status]").innerText().catch(() => "none");
  // hero loupe keyboard
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.locator('[aria-roledescription="interactive portrait"]').focus();
  const before = await page.locator('[aria-live] p.font-serif').first().textContent();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1300);
  I.loupeKeyboard = [before, await page.locator('[aria-live] p.font-serif').first().textContent()];
  I.h1 = await page.evaluate(() => [...document.querySelectorAll("h1")].map((h) => h.getAttribute("aria-label") || h.textContent));
  await ctx.close();

  // Mobile menu
  const m = await newPage(390, 844);
  await m.page.goto(BASE + "/", { waitUntil: "networkidle" });
  await m.page.waitForTimeout(1500);
  await m.page.getByRole("button", { name: /menu/i }).click();
  await m.page.waitForTimeout(900);
  I.menuOpen = await m.page.evaluate(() => !!document.getElementById("mobile-menu"));
  I.menuFocusInside = await m.page.evaluate(() => !!document.activeElement?.closest("#mobile-menu"));
  await m.page.keyboard.press("Escape");
  await m.page.waitForTimeout(900);
  I.menuClosedByEsc = await m.page.evaluate(() => !document.getElementById("mobile-menu"));
  I.mobileBarLinks = await m.page.evaluate(() => [...document.querySelectorAll('nav[aria-label="Quick contact"] a')].map((a) => a.getAttribute("href").slice(0, 40)));
  await m.ctx.close();

  // Guide page
  const g = await newPage(1440, 900);
  await g.page.goto(BASE + "/treatments/laser-treatments/", { waitUntil: "networkidle" });
  await g.page.waitForTimeout(1500);
  await g.page.screenshot({ path: `${OUT}/guide-top.png` });
  I.guide = await g.page.evaluate(() => ({ h1: document.querySelectorAll("h1").length, title: document.title }));
  await g.ctx.close();
}

// 3) Reduced motion
{
  const { ctx, page } = await newPage(1440, 900, { reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  report.reduced = await page.evaluate(() => ({
    approachPinned: !!document.querySelector("section.h-\\[320vh\\]"),
    journeyRail: !!document.querySelector('ol[aria-label="Five stages of your journey"].snap-x'),
    heroCharsTransformed: [...document.querySelectorAll("#hero-title .will-change-transform")].slice(0, 3).map((s) => getComputedStyle(s).transform),
  }));
  await page.screenshot({ path: `${OUT}/reduced-hero.png` });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
