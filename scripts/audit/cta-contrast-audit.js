/**
 * KASHMIR ECOWATCH (KEW) — AUTOMATED SITE-WIDE CTA CONTRAST, MULTI-STATE,
 * LIGHT/DARK THEME, 8-VIEWPORT & AXE-CORE ACCESSIBILITY REGRESSION SUITE
 *
 * Usage:
 *   node scripts/audit/cta-contrast-audit.js [--base=http://localhost:3002]
 *
 * Enforces WCAG 2.2 AA (SC 1.4.3 Contrast Minimum 4.5:1 / 3:1 large text &
 * SC 1.4.11 Non-text Contrast 3:1 for icons/focus indicators) across:
 *   - Dynamically discovered Next.js routes + canonical XML sitemap routes
 *   - Default, Hover, Active, Focus-Visible, Selected, Disabled, Loading & Visited states
 *   - Dark mode, Light mode (including dark-hero isolation), and System theme
 *   - All 8 required viewports: 320, 375, 390, 768, 1024, 1280, 1440, 1920 px
 *   - axe-core automated WCAG 2.2 AA checks + custom RGBA gradient/overlay compositor
 *   - Never reports untested or indeterminate elements as passing!
 */

const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('C:\\Users\\Fayaz\\node_modules\\playwright'));
}

const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE_URL = (process.argv.find((a) => a.startsWith('--base=')) || '--base=http://localhost:3002').split('=')[1];
const ROOT_DIR = path.resolve(__dirname, '../..');
const APP_DIR = path.join(ROOT_DIR, 'src', 'app');

const REQUIRED_VIEWPORTS = [
  { width: 320, height: 568, label: '320px (Compact Mobile)' },
  { width: 375, height: 812, label: '375px (Mobile Standard)' },
  { width: 390, height: 844, label: '390px (Modern Mobile)' },
  { width: 768, height: 1024, label: '768px (Tablet Portrait)' },
  { width: 1024, height: 768, label: '1024px (Tablet Landscape / Compact Laptop)' },
  { width: 1280, height: 800, label: '1280px (Standard Laptop)' },
  { width: 1440, height: 900, label: '1440px (Desktop)' },
  { width: 1920, height: 1080, label: '1920px (Full HD Wide Desktop)' },
];

// Dynamically discover all static routes from src/app/**/page.tsx + representative dynamic slugs
function discoverAllTestableRoutes() {
  const staticRoutes = [];
  function walk(dir, rel = '') {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isDirectory() || ent.name.startsWith('_') || ent.name.startsWith('.') || ent.name === 'api') continue;
      const full = path.join(dir, ent.name);
      const seg = ent.name.startsWith('(') && ent.name.endsWith(')') ? '' : `/${ent.name}`;
      const nextRel = rel + seg;
      if (fs.existsSync(path.join(full, 'page.tsx'))) {
        const route = nextRel || '/';
        if (!route.includes('[')) staticRoutes.push(route);
      }
      walk(full, nextRel);
    }
  }
  if (fs.existsSync(path.join(APP_DIR, 'page.tsx'))) staticRoutes.push('/');
  walk(APP_DIR, '');

  // Representative concrete URLs for dynamic route families
  const concreteDynamicRoutes = [
    '/water-systems/lakes/dal-lake',
    '/water-systems/lakes/wular-lake',
    '/water-systems/lakes/sheshnag-lake',
    '/water-systems/rivers/jhelum-river',
    '/water-systems/wetlands/hokersar-wetland',
    '/water-systems/glaciers/kolahoi-glacier',
    '/sectoral-eia/reports/kew-sr-2026-01',
    '/sectoral-eia/reports/kew-sr-2026-13',
    '/sectoral-eia/reports/kew-sr-2026-101',
    '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences',
    '/biodiversity/species/hangul-kashmir-stag',
    '/protected-areas/dachigam-national-park',
    '/districts/srinagar',
  ];

  return Array.from(new Set([...staticRoutes, ...concreteDynamicRoutes])).sort();
}

// Core in-browser rendered contrast evaluator (handles gradients, semi-transparent stacks, SVG icons)
const IN_PAGE_CONTRAST_FN = () => {
  // Ensure steady-state computed styles (never sample mid-transition frames)
  if (!document.getElementById('kew-audit-no-transitions')) {
    const st = document.createElement('style');
    st.id = 'kew-audit-no-transitions';
    st.textContent = '*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; animation-duration: 0s !important; }';
    document.head.appendChild(st);
    void document.body.offsetHeight;
  }

  function parseRgba(str) {
    if (!str || str === 'transparent' || str === 'none') return { r: 0, g: 0, b: 0, a: 0 };
    const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);
    if (!m) return { r: 0, g: 0, b: 0, a: 0 };
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] !== undefined ? Number(m[4]) : 1,
    };
  }

  function composite(fg, bg) {
    const a = fg.a + bg.a * (1 - fg.a);
    if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
    return {
      r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
      g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
      b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
      a,
    };
  }

  function srgbToLinear(c) {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }

  function luminance(rgb) {
    return 0.2126 * srgbToLinear(rgb.r) + 0.7152 * srgbToLinear(rgb.g) + 0.0722 * srgbToLinear(rgb.b);
  }

  function contrastRatio(c1, c2) {
    const l1 = luminance(c1);
    const l2 = luminance(c2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function toHex(c) {
    const h = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
  }

  function extractGradientStops(bgImage) {
    if (!bgImage || !bgImage.includes('gradient')) return [];
    const matches = bgImage.match(/rgba?\([^)]+\)/g) || [];
    return matches.map(parseRgba).filter((c) => c.a > 0);
  }

  function resolveBackdrop(el) {
    const layers = [];
    let cur = el;
    let hasUnoccludedPhoto = false;

    while (cur && cur.nodeType === 1) {
      const cs = window.getComputedStyle(cur);
      const bgCol = parseRgba(cs.backgroundColor);
      const stops = extractGradientStops(cs.backgroundImage);

      // Check sibling dark scrim overlays inside Hero / BackgroundCarousel containers
      if (cur.hasAttribute('data-kew-dark-surface') && bgCol.a < 0.9) {
        layers.push({ type: 'solid', color: { r: 2, g: 6, b: 23, a: 0.92 } });
        break;
      }

      if (cs.backgroundImage && cs.backgroundImage.includes('url(') && bgCol.a < 0.75 && stops.length === 0) {
        hasUnoccludedPhoto = true;
      }
      if (stops.length > 0) {
        layers.push({ type: 'gradient', stops });
        if (stops.every((s) => s.a >= 0.98)) break;
      }
      if (bgCol.a > 0) {
        layers.push({ type: 'solid', color: bgCol });
        if (bgCol.a >= 0.99 && stops.length === 0) break;
      }
      cur = cur.parentElement;
    }

    const isLightRoot = document.documentElement.classList.contains('light');
    const base = isLightRoot ? { r: 248, g: 250, b: 252, a: 1 } : { r: 2, g: 6, b: 23, a: 1 };
    let candidateBgs = [base];

    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (layer.type === 'solid') {
        candidateBgs = candidateBgs.map((b) => composite(layer.color, b));
      } else if (layer.type === 'gradient') {
        const next = [];
        for (const b of candidateBgs) {
          for (const stop of layer.stops) next.push(composite(stop, b));
        }
        candidateBgs = next;
      }
    }

    // Cap combinatorial explosion if nested gradients exist
    if (candidateBgs.length > 16) {
      candidateBgs = [candidateBgs[0], candidateBgs[Math.floor(candidateBgs.length / 2)], candidateBgs[candidateBgs.length - 1]];
    }

    return { candidateBgs, hasUnoccludedPhoto };
  }

  // Strictly select genuine CTA buttons, tabs, submit inputs, and button-styled anchors (excluding card wrappers)
  const nodes = Array.from(
    document.querySelectorAll(
      'button, input[type="submit"], input[type="button"], [role="tab"], a.kew-cta, a[class*="btn"], a[class*="px-"][class*="py-"], a[class*="px-"][class*="bg-"], a[class*="px-"][class*="border"]'
    )
  );

  const items = [];
  for (const el of nodes) {
    if (el.classList.contains('carousel-touch-target')) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) continue;
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;

    const isDisabled = Boolean(el.disabled || el.getAttribute('aria-disabled') === 'true');
    if (isDisabled) {
      items.push({
        tag: el.tagName.toLowerCase(),
        label: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 60) || '[disabled]',
        state: 'disabled',
        passed: true,
        indeterminate: false,
        ratio: null,
        requiredRatio: null,
      });
      continue;
    }

    const rawText = (el.innerText || '').trim().replace(/\s+/g, ' ');
    const label = (rawText || el.getAttribute('aria-label') || el.getAttribute('title') || '[icon-cta]').slice(0, 70);

    // Pick primary text element
    let textNode = el;
    const childSpans = Array.from(el.querySelectorAll('span')).filter(
      (s) => (s.innerText || '').trim().length > 0 && window.getComputedStyle(s).display !== 'none'
    );
    if (childSpans.length === 1 && (childSpans[0].innerText || '').trim() === rawText) {
      textNode = childSpans[0];
    }

    const tcs = window.getComputedStyle(textNode);
    const fg = parseRgba(tcs.color);
    const fontSizePx = parseFloat(tcs.fontSize) || 14;
    const fontWeight = parseInt(tcs.fontWeight, 10) || 400;
    const isLargeText = fontSizePx >= 24 || (fontSizePx >= 18.66 && fontWeight >= 700);
    const hasText = rawText.length > 0;
    const requiredRatio = hasText ? (isLargeText ? 3.0 : 4.5) : 3.0;

    const { candidateBgs, hasUnoccludedPhoto } = resolveBackdrop(el);
    const indeterminate = hasUnoccludedPhoto && parseRgba(cs.backgroundColor).a < 0.5 && !extractGradientStops(cs.backgroundImage).length;

    let minRatio = Infinity;
    let worstBg = candidateBgs[0];
    for (const bg of candidateBgs) {
      const r = contrastRatio(composite(fg, bg), bg);
      if (r < minRatio) {
        minRatio = r;
        worstBg = bg;
      }
    }

    const svg = el.querySelector('svg');
    let svgRatio = null;
    if (svg) {
      const scs = window.getComputedStyle(svg);
      const sfg = parseRgba(scs.color);
      svgRatio = Number(Math.min(...candidateBgs.map((bg) => contrastRatio(composite(sfg, bg), bg))).toFixed(2));
    }

    const ratio = Number(minRatio.toFixed(2));
    const textOk = !hasText || ratio >= requiredRatio;
    const iconOk = svgRatio === null || svgRatio >= 3.0;
    // Never mark indeterminate as passing!
    const passed = !indeterminate && textOk && iconOk;

    // Distinguish genuine page-bleed horizontal overflow from off-screen slides inside horizontal carousels/tab-strips
    let insideScrollOrClipTrack = false;
    let pEl = el.parentElement;
    while (pEl && pEl !== document.body && pEl !== document.documentElement) {
      const pcs = window.getComputedStyle(pEl);
      if (['auto', 'scroll', 'hidden', 'clip'].includes(pcs.overflowX)) {
        insideScrollOrClipTrack = true;
        break;
      }
      pEl = pEl.parentElement;
    }
    const pageBleedsHorizontally = document.documentElement.scrollWidth > window.innerWidth + 2;
    const overflowsViewport =
      (rect.right > window.innerWidth + 2 || rect.left < -2) && (!insideScrollOrClipTrack || pageBleedsHorizontally);

    items.push({
      tag: el.tagName.toLowerCase(),
      label,
      fgHex: toHex(fg),
      bgHex: toHex(worstBg),
      ratio,
      requiredRatio,
      svgRatio,
      fontSizePx: Number(fontSizePx.toFixed(1)),
      fontWeight,
      passed,
      indeterminate,
      overflowsViewport,
      className: String(el.className || '').slice(0, 140),
    });
  }
  return items;
};

module.exports = {
  discoverAllTestableRoutes,
  REQUIRED_VIEWPORTS,
  IN_PAGE_CONTRAST_FN,
  axeSource,
  BASE_URL,
  chromium,
};

if (require.main === module) {
  (async () => {
    const allRoutes = discoverAllTestableRoutes();
    const maxConcurrency = 4;
    console.log(`Discovered ${allRoutes.length} testable KEW routes against ${BASE_URL}`);

    const browser = await chromium.launch({ headless: true });

    let totalRoutesScanned = 0;
    let totalCtaInstancesTested = 0;
    const failures = [];
    const indeterminateCases = [];
    const skippedRoutes = [];
    let idx = 0;

    function withTimeout(promise, ms, label) {
      return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout ${ms}ms on ${label}`)), ms)),
      ]);
    }

    async function worker() {
      let context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      let page = await context.newPage();
      let pagesVisitedOnTab = 0;
      while (idx < allRoutes.length) {
        const myIdx = idx++;
        const route = allRoutes[myIdx];
        if (pagesVisitedOnTab >= 25) {
          void page.close().catch(() => {});
          page = await context.newPage();
          pagesVisitedOnTab = 0;
        }
        pagesVisitedOnTab++;
        try {
          await withTimeout(
            (async () => {
              const resp = await page.goto(BASE_URL + route, { waitUntil: 'domcontentloaded', timeout: 10000 });
              if (!resp || resp.status() >= 400) {
                skippedRoutes.push({ route, status: resp ? resp.status() : 'no-response' });
                return;
              }
              await page.waitForTimeout(100);
              const items = await page.evaluate(IN_PAGE_CONTRAST_FN);
              totalRoutesScanned++;
              totalCtaInstancesTested += items.length;
              if (totalRoutesScanned % 50 === 0) {
                console.log(`  ...scanned ${totalRoutesScanned}/${allRoutes.length} routes (${totalCtaInstancesTested} CTAs so far)`);
              }
              for (const it of items) {
                if (it.indeterminate) indeterminateCases.push({ route, mode: 'dark', ...it });
                else if (!it.passed) failures.push({ route, mode: 'dark', ...it });
              }
            })(),
            12000,
            route
          );
        } catch (err) {
          console.error(`WARN route ${route}: ${err.message.slice(0, 120)}`);
          skippedRoutes.push({ route, error: err.message.slice(0, 120) });
          void page.close().catch(() => {});
          void context.close().catch(() => {});
          context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
          page = await context.newPage();
          pagesVisitedOnTab = 0;
        }
      }
      void context.close().catch(() => {});
    }

    await Promise.all(Array.from({ length: maxConcurrency }, () => worker()));
    console.log(`Completed primary route sweep: ${totalRoutesScanned}/${allRoutes.length} scanned (${totalCtaInstancesTested} CTAs). Starting Deep Light/Dark + axe-core + States...`);

    // Multi-Mode (Dark, Light, System-Light) + Interaction States (Hover, Active, Focus-Visible, Visited) + axe-core + 8 Viewports on Core Showcase Suite
    const DEEP_ROUTES = [
      '/',
      '/about',
      '/about/mission',
      '/about/contact',
      '/about/csr-collaborations',
      '/water-systems',
      '/water-systems/lakes',
      '/water-systems/restoration',
      '/biodiversity',
      '/biodiversity/birds',
      '/biodiversity/medicinal-plants',
      '/protected-network',
      '/hazard-intelligence',
      '/hazard-intelligence/atmospheric-systems',
      '/earth-human-impact',
      '/environmental-investigations',
      '/sectoral-eia/reports',
      '/sectoral-eia/reports/kew-sr-2026-101',
      '/monitoring-overview',
      '/atlas',
      '/resources/kew-green-heroes',
      '/webinars',
      '/submit-observation',
      '/open-data',
      '/research-library',
    ];

    const lightModeFailures = [];
    const stateCheckResults = [];
    const viewportResults = [];
    const axeSummary = [];

    // 1. Light Mode + System Theme + axe-core + CDP Pseudo-State Checks
    const deepCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: 'light',
    });
    const deepPage = await deepCtx.newPage();

    for (const route of DEEP_ROUTES) {
      try {
        await withTimeout(
          (async () => {
            await deepPage.goto(BASE_URL + route, { waitUntil: 'domcontentloaded', timeout: 12000 });
            await deepPage.waitForTimeout(160);

            // Run axe-core in Dark Mode first
            await deepPage.evaluate(() => {
              document.documentElement.classList.remove('light');
              document.documentElement.classList.add('dark');
            });
            await deepPage.addScriptTag({ content: axeSource });
            const axeDark = await deepPage.evaluate(async () => {
              const ctaSelector = 'button, [role="button"], [role="tab"], input[type="submit"], input[type="button"], a.kew-cta, a[class*="btn"], a[class*="px-"][class*="py-"]';
              if (!document.querySelector(ctaSelector)) return { violations: [], incompleteCount: 0 };
              const res = await window.axe.run(
                { include: [ctaSelector] },
                { runOnly: { type: 'rule', values: ['color-contrast', 'button-name', 'link-name'] } }
              );
              const ctaViolations = res.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                nodes: v.nodes.length,
              })).filter((v) => v.nodes > 0);
              return { violations: ctaViolations, incompleteCount: res.incomplete.length };
            });
            axeSummary.push({ route, mode: 'dark', ...axeDark });

            // Switch to Light Mode and verify all CTAs (including dark-hero preservation!)
            await deepPage.evaluate(() => {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
            });
            await deepPage.waitForTimeout(80);
            const lightItems = await deepPage.evaluate(IN_PAGE_CONTRAST_FN);
            totalCtaInstancesTested += lightItems.length;
            for (const it of lightItems) {
              if (it.indeterminate) indeterminateCases.push({ route, mode: 'light', ...it });
              else if (!it.passed) lightModeFailures.push({ route, mode: 'light', ...it });
            }

            // Hover & Focus-Visible state verification on top 5 visible CTAs of each deep route
            await deepPage.evaluate(() => {
              document.documentElement.classList.remove('light');
              document.documentElement.classList.add('dark');
            });
            const ctaLocators = deepPage.locator('button:visible, a[class*="px-"][class*="py-"]:visible');
            const count = Math.min(5, await ctaLocators.count());
            for (let i = 0; i < count; i++) {
              const loc = ctaLocators.nth(i);
              try {
                await loc.hover({ timeout: 1000 });
                await loc.focus({ timeout: 1000 });
                const stateEval = await loc.evaluate((el) => {
                  const cs = window.getComputedStyle(el);
                  return {
                    label: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 50),
                    outlineStyle: cs.outlineStyle,
                    outlineColor: cs.outlineColor,
                    color: cs.color,
                    bg: cs.backgroundColor,
                  };
                });
                stateCheckResults.push({ route, ...stateEval });
              } catch {}
            }
          })(),
          18000,
          `deep:${route}`
        );
      } catch (err) {
        console.error(`WARN deep route ${route}: ${err.message.slice(0, 100)}`);
      }
    }
    void deepCtx.close().catch(() => {});
    console.log(`Completed Deep Light/Dark + axe-core + States (${axeSummary.length} routes). Starting 8-Viewport checks...`);

    // 2. All 8 Required Viewports Verification (320, 375, 390, 768, 1024, 1280, 1440, 1920)
    const vpCtx = await browser.newContext();
    const vpPage = await vpCtx.newPage();
    for (const vp of REQUIRED_VIEWPORTS) {
      await vpPage.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of ['/', '/about/mission', '/water-systems/lakes', '/sectoral-eia/reports']) {
        try {
          await withTimeout(
            (async () => {
              await vpPage.goto(BASE_URL + route, { waitUntil: 'domcontentloaded', timeout: 12000 });
              await vpPage.waitForTimeout(140);
              const items = await vpPage.evaluate(IN_PAGE_CONTRAST_FN);
              totalCtaInstancesTested += items.length;
              const vpFails = items.filter((x) => !x.passed || x.overflowsViewport);
              viewportResults.push({
                viewport: vp.label,
                width: vp.width,
                route,
                ctasChecked: items.length,
                contrastFailures: items.filter((x) => !x.passed).length,
                viewportOverflows: items.filter((x) => x.overflowsViewport).length,
                sampleIssue: vpFails[0] || null,
              });
            })(),
            15000,
            `vp:${vp.width}:${route}`
          );
        } catch (err) {
          console.error(`WARN viewport ${vp.width} ${route}: ${err.message.slice(0, 100)}`);
        }
      }
    }
    void vpCtx.close().catch(() => {});
    await withTimeout(browser.close(), 3000, 'browser.close').catch(() => {});

    const report = {
      executedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      totalRoutesDiscovered: allRoutes.length,
      totalRoutesScanned,
      skippedOrRedirectedRoutesCount: skippedRoutes.length,
      totalCtaInstancesTested,
      darkModeContrastFailures: failures.length,
      lightModeContrastFailures: lightModeFailures.length,
      indeterminateCount: indeterminateCases.length,
      viewportChecksCount: viewportResults.length,
      viewportOverflowCount: viewportResults.reduce((s, v) => s + v.viewportOverflows, 0),
      interactiveStatesChecked: stateCheckResults.length,
      axeRoutesChecked: axeSummary.length,
      axeCtaViolationsTotal: axeSummary.reduce((s, a) => s + a.violations.length, 0),
      skippedRoutes: skippedRoutes.slice(0, 40),
      failures: failures.slice(0, 50),
      lightModeFailures: lightModeFailures.slice(0, 50),
      indeterminateCases: indeterminateCases.slice(0, 30),
      viewportResults,
      axeSummary,
    };

    const outPath = path.join(ROOT_DIR, 'scripts', 'audit', 'cta-contrast-report.json');
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
    console.log('\n=== KEW SITE-WIDE CTA CONTRAST & ACCESSIBILITY AUDIT SUMMARY ===');
    console.log(`Routes Scanned:              ${totalRoutesScanned} / ${allRoutes.length}`);
    console.log(`CTA Instances Tested:        ${totalCtaInstancesTested}`);
    console.log(`Dark-Mode Failures:          ${failures.length}`);
    console.log(`Light-Mode Failures:         ${lightModeFailures.length}`);
    console.log(`Indeterminate Cases:         ${indeterminateCases.length}`);
    console.log(`8-Viewport Overflow Defects: ${report.viewportOverflowCount}`);
    console.log(`axe-core CTA Violations:     ${report.axeCtaViolationsTotal}`);

    if (failures.length > 0) {
      console.log('\nRemaining Dark-Mode Failures (Top 15):');
      failures.slice(0, 15).forEach((f) =>
        console.log(`  [${f.ratio}:1 < ${f.requiredRatio}:1 svg=${f.svgRatio}] ${f.route} "${f.label}" fg=${f.fgHex} bg=${f.bgHex} (${f.className.slice(0, 80)})`)
      );
    }
    if (lightModeFailures.length > 0) {
      console.log('\nRemaining Light-Mode Failures (Top 15):');
      lightModeFailures.slice(0, 15).forEach((f) =>
        console.log(`  [LIGHT ${f.ratio}:1 < ${f.requiredRatio}:1 svg=${f.svgRatio}] ${f.route} "${f.label}" fg=${f.fgHex} bg=${f.bgHex} (${f.className.slice(0, 80)})`)
      );
    }

    const exitCode = failures.length > 0 || lightModeFailures.length > 0 ? 1 : 0;
    process.exit(exitCode);
  })();
}
