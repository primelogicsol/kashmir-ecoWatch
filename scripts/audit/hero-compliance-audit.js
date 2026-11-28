/**
 * KASHMIR ECOWATCH (KEW) — GLOBAL HERO CONTENT VISIBILITY, RESPONSIVENESS
 * & OVERFLOW GOVERNANCE AUTOMATED REGRESSION SUITE
 *
 * Usage:
 *   node scripts/audit/hero-compliance-audit.js [--base=http://localhost:3002] [--static-only] [--full]
 *
 * Enforces universal KEW hero compliance (Himalayan Dispatch strictly excluded):
 *   1. Static Source Governance Audit across all KEW routes & shared hero components:
 *      - Zero `whitespace-nowrap` on multi-word hero headline spans inside `<Heading>`
 *      - Zero narrow `max-w-(xs..6xl)` constraints on hero `<h1>` elements
 *      - Zero `line-clamp-*` or `truncate` on hero headlines/subtitles
 *   2. Rendered Multi-Device, Multi-Orientation, Multi-Zoom & Carousel Slide Audit:
 *      - Complete headline visibility (zero scrollWidth clipping, zero Range-vs-Box gradient clipping)
 *      - Zero horizontal document or hero overflow
 *      - Zero vertical content clipping against hero bounds or fixed header overlap
 *      - Natural metadata & badge containment
 *      - Complete CTA button visibility & containment
 *      - Zero carousel controller (`[data-kew-carousel-controller="true"]`) overlap across ALL slides
 *      - Identical `KEW | WESTERN HIMALAYAN` institutional typography & horizontal alignment
 *      - Approved hero dimensional ratios (Homepage = 100% svh, Module/Submodule min-height = 80% svh;
 *        records natural content expansion exceptions transparently for administrator review)
 */

const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('C:\\Users\\Fayaz\\node_modules\\playwright'));
}

const BASE_URL = (
  process.argv.find((a) => a.startsWith('--base=')) || '--base=http://localhost:3002'
).split('=')[1];
const STATIC_ONLY = process.argv.includes('--static-only');
const FULL_SWEEP = process.argv.includes('--full');

const ROOT_DIR = path.resolve(__dirname, '../..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const REPORT_PATH = path.join(__dirname, 'hero-compliance-report.json');

const DEVICE_MATRIX = [
  { id: 'desktop-5k', label: 'Horizontal 5K Desktop (5120x2880)', width: 5120, height: 2880 },
  { id: 'desktop-4k', label: 'Horizontal 4K Desktop (3840x2160)', width: 3840, height: 2160 },
  { id: 'ultrawide', label: 'Ultrawide Monitor (3440x1440)', width: 3440, height: 1440 },
  { id: 'desktop-fhd', label: 'Standard Horizontal Desktop (1920x1080)', width: 1920, height: 1080 },
  { id: 'vertical-qhd', label: 'Vertical QHD Desktop (1440x2560)', width: 1440, height: 2560 },
  { id: 'vertical-fhd', label: 'Vertical FHD Desktop (1080x1920)', width: 1080, height: 1920 },
  { id: 'laptop-1440', label: 'Standard Laptop (1440x900)', width: 1440, height: 900 },
  { id: 'laptop-1366', label: 'Compact Laptop (1366x768)', width: 1366, height: 768 },
  { id: 'tablet-landscape', label: 'Landscape Tablet (1024x768)', width: 1024, height: 768 },
  { id: 'tablet-portrait', label: 'Portrait Tablet (768x1024)', width: 768, height: 1024 },
  { id: 'mobile-landscape', label: 'Landscape Smartphone (844x390)', width: 844, height: 390 },
  { id: 'mobile-portrait', label: 'Portrait Smartphone (390x844)', width: 390, height: 844 },
];

// Browser zoom levels tested against standard 4K CSS desktop reference (2560x1440 @ 100% zoom)
const ZOOM_LEVELS = [80, 100, 110, 125, 150, 175, 200, 250];
const ZOOM_BASE_WIDTH = 2560;
const ZOOM_BASE_HEIGHT = 1440;

// Representative routes covering all 18 KEW hero archetypes & shared templates (Himalayan Dispatch excluded)
const ARCHETYPE_ROUTES = [
  { route: '/', archetype: 'CinematicIntroduction (Homepage 100% Reference · 7 Slides)', checkAllSlides: true },
  { route: '/water-systems/lakes', archetype: 'WaterEntityListingPage -> Heading (Lakes & Trophic Atlas · 9 Slides)', checkAllSlides: true },
  { route: '/webinars', archetype: 'Heading Synced 9-Scene Carousel (Webinars Hub)', checkAllSlides: true },
  { route: '/earth-human-impact', archetype: 'Heading + DismissibleHeroOverlay + EhiiHeroShowcaseCard', checkAllSlides: true },
  { route: '/hazard-intelligence/algal-bloom-intelligence', archetype: 'Heading Long Scientific Title (50-char Headline)' },
  { route: '/risk-monitoring/red-data-species-vulnerability', archetype: 'Heading Risk Monitoring Long Title' },
  { route: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard', archetype: 'Heading Atmospheric Dashboard' },
  { route: '/biodiversity/mammals', archetype: 'BiodiversityCategoryPage -> Heading' },
  { route: '/protected-network/national-parks', archetype: 'ProtectedCategoryPage -> Heading + Showcase' },
  { route: '/seasonal-ecology/bloom-mapping', archetype: 'SeasonalListingPage -> Heading + Showcase' },
  { route: '/protected-network/national-parks/dachigam-national-park', archetype: 'ProtectedAreaDetailPage (Split Title + Right Intel Card)', checkAllSlides: true },
  { route: '/protected-network/national-parks/dachigam-national-park/management-plan', archetype: 'ProtectedAreaManagementPlanPage' },
  { route: '/water-systems/lakes/sheshnag-lake', archetype: 'WaterEntityDetailPageComponent' },
  { route: '/protected-network/species-intelligence/hangul', archetype: 'SpeciesDetailPage' },
  { route: '/protected-network/corridors-and-connectivity/jhelum-valley-conservation-corridor', archetype: 'CorridorDetailPage' },
  { route: '/about/partners', archetype: 'Inline .kew-module-hero-surface (Atmospheric Navy)' },
  { route: '/about/governance', archetype: 'Inline .kew-module-hero-surface (Photographic)' },
  { route: '/ecovoices', archetype: 'Centered Monumental .kew-module-hero-surface (4 Slides)', checkAllSlides: true },
];

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, out);
    else out.push(p);
  }
  return out;
}

function isExcludedDispatch(filePath) {
  return /[\\/]himalayan-dispatch([\\/]|$)|[\\/]newsroom([\\/]|$)/i.test(filePath);
}

/**
 * Stage 1: Static Source Governance Audit across all KEW files
 */
function runStaticSourceAudit() {
  const allTsx = walkFiles(SRC_DIR).filter(
    (f) => /\.(tsx|ts)$/.test(f) && !isExcludedDispatch(f)
  );
  const appPages = walkFiles(path.join(SRC_DIR, 'app')).filter((f) => /[\\/]page\.tsx$/.test(f));
  const excludedPages = appPages.filter(isExcludedDispatch);
  const kewPages = appPages.filter((f) => !isExcludedDispatch(f));

  const violations = [];
  let headingBlocksScanned = 0;

  for (const f of allTsx) {
    // Skip non-hero live virtual conference room chrome
    if (f.endsWith('LiveConferenceRoom.tsx')) continue;
    const rel = path.relative(ROOT_DIR, f).replace(/\\/g, '/');
    const s = fs.readFileSync(f, 'utf8');

    // Scan balanced <Heading ...> blocks
    let idx = 0;
    while ((idx = s.indexOf('<Heading', idx)) !== -1) {
      const nextChar = s[idx + 8];
      if (nextChar && !/[\s\r\n/>]/.test(nextChar)) {
        idx += 8;
        continue;
      }
      headingBlocksScanned++;
      let depth = 0;
      let inStr = null;
      let i = idx + 8;
      for (; i < s.length; i++) {
        const c = s[i];
        const p = s[i - 1];
        if (inStr) {
          if (c === inStr && p !== '\\') inStr = null;
          continue;
        }
        if (c === '"' || c === "'" || c === '`') {
          inStr = c;
          continue;
        }
        if (c === '{') depth++;
        else if (c === '}') depth--;
        else if (depth === 0 && c === '>' && s[i - 1] === '/') {
          i++;
          break;
        } else if (depth === 0 && s.slice(i, i + 10) === '</Heading>') {
          i += 10;
          break;
        }
      }
      const blk = s.slice(idx, i);
      const line = s.slice(0, idx).split(/\r?\n/).length;

      // Check for forbidden whitespace-nowrap on span tags inside <Heading> (excluding .word-keep)
      const spanTags = [...blk.matchAll(/<span\b([^>]*)>/g)];
      for (const st of spanTags) {
        if (/\bwhitespace-nowrap\b/.test(st[1]) && !st[1].includes('word-keep')) {
          violations.push({
            type: 'STATIC_HEADING_NOWRAP',
            file: rel,
            line,
            detail: 'Forbidden `whitespace-nowrap` on hero span inside <Heading>',
          });
        }
      }
      if (/\bline-clamp-\d+\b/.test(blk)) {
        violations.push({
          type: 'STATIC_HEADING_LINE_CLAMP',
          file: rel,
          line,
          detail: 'Forbidden `line-clamp-*` inside <Heading>',
        });
      }
      idx = i;
    }

    // Check <h1 ...> elements for narrow max-w constraints (unless centered with mx-auto)
    const h1Tags = [...s.matchAll(/<h1\b([^>]*)>/g)];
    for (const m of h1Tags) {
      const attrs = m[1];
      const line = s.slice(0, m.index).split(/\r?\n/).length;
      if (/\bmax-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/.test(attrs) && !attrs.includes('mx-auto')) {
        violations.push({
          type: 'STATIC_H1_NARROW_MAX_W',
          file: rel,
          line,
          detail: `Forbidden narrow max-w constraint on <h1>: ${attrs.trim().slice(0, 120)}`,
        });
      }
      if (/\b(?:truncate|line-clamp-\d+)\b/.test(attrs)) {
        violations.push({
          type: 'STATIC_H1_TRUNCATE',
          file: rel,
          line,
          detail: 'Forbidden `truncate` or `line-clamp` on <h1>',
        });
      }
    }
  }

  return {
    totalAppRoutes: appPages.length,
    excludedHimalayanDispatchRoutes: excludedPages.length,
    totalKewRoutes: kewPages.length,
    headingBlocksScanned,
    violationsCount: violations.length,
    violations,
  };
}

/**
 * In-page rendered DOM hero compliance evaluator
 */
async function evaluateRenderedHero(page) {
  return page.evaluate(() => {
    // Freeze entrance/transition animations in their completed steady state for deterministic measurement
    if (!document.getElementById('kew-hero-audit-freeze')) {
      const st = document.createElement('style');
      st.id = 'kew-hero-audit-freeze';
      st.textContent =
        '*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; animation-duration: 0.001s !important; animation-delay: 0s !important; }';
      document.head.appendChild(st);
      void document.body.offsetHeight;
    }

    const isHomepage = Boolean(document.querySelector('#kew-cinematic-introduction'));
    const hero =
      document.querySelector('#kew-cinematic-introduction') ||
      document.querySelector('.kew-heading-surface') ||
      document.querySelector('.kew-module-hero-surface');

    if (!hero) {
      return { hasStandardHero: false, issues: [], exceptions: [] };
    }

    const issues = [];
    const exceptions = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const heroRect = hero.getBoundingClientRect();
    const header = document.querySelector('header.kew-header');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;

    // 1. Document horizontal overflow check
    if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) {
      issues.push(
        `DOC_HORIZONTAL_OVERFLOW: scrollWidth(${document.documentElement.scrollWidth}) > clientWidth(${document.documentElement.clientWidth})`
      );
    }

    // 2. Hero headline complete visibility & non-clipping check
    const activeHeadlines = Array.from(hero.querySelectorAll('h1')).filter((el) => {
      if (el.closest('[aria-hidden="true"]')) return false;
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0;
    });

    for (const h1 of activeHeadlines) {
      const r = h1.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) {
        issues.push('HEADLINE_ZERO_BOX: Active <h1> has zero width or height');
        continue;
      }
      if (h1.scrollWidth > h1.clientWidth + 3) {
        issues.push(
          `HEADLINE_SCROLL_CLIP: h1.scrollWidth(${h1.scrollWidth}) > h1.clientWidth(${h1.clientWidth})`
        );
      }
      if (r.right > heroRect.right + 2 || r.left < heroRect.left - 2) {
        issues.push(`HEADLINE_OUT_OF_BOUNDS: h1 rect [${Math.round(r.left)}..${Math.round(r.right)}] exceeds hero [${Math.round(heroRect.left)}..${Math.round(heroRect.right)}]`);
      }

      // Inspect every visible text span inside h1 for Range-vs-Box gradient clipping
      for (const sp of h1.querySelectorAll('span')) {
        if (sp.classList.contains('sr-only') || sp.closest('[data-kew-brand-identity]')) continue;
        const cs = getComputedStyle(sp);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const range = document.createRange();
        range.selectNodeContents(sp);
        const tr = range.getBoundingClientRect();
        const sr = sp.getBoundingClientRect();
        if (tr.width > sr.width + 4) {
          issues.push(
            `HEADLINE_SPAN_TEXT_CLIPPED: textWidth(${Math.round(tr.width)}) > spanWidth(${Math.round(sr.width)}) on "${sp.innerText.slice(0, 45)}"`
          );
        }
      }
    }

    // 3. Vertical content containment & header non-overlap (when scrolled to top)
    if (window.scrollY === 0) {
      const foregroundNodes = hero.querySelectorAll(
        'h1, p, [data-kew-brand-identity], nav[aria-label="Breadcrumb"], .kew-heading-scope a, .kew-heading-scope button'
      );
      for (const node of foregroundNodes) {
        if (node.closest('[aria-hidden="true"]') || node.closest('[data-overlay-dismissed="true"]')) continue;
        const cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
        const r = node.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.bottom > heroRect.bottom + 4) {
          issues.push(
            `VERTICAL_BOTTOM_CLIP: <${node.tagName.toLowerCase()}> bottom(${Math.round(r.bottom)}) > heroBottom(${Math.round(heroRect.bottom)})`
          );
        }
        if (r.right > vw + 2 || r.left < -2) {
          issues.push(
            `HORIZONTAL_CHILD_OVERFLOW: <${node.tagName.toLowerCase()}> [${Math.round(r.left)}..${Math.round(r.right)}] outside viewport [0..${vw}]`
          );
        }
        if (headerBottom > 0 && r.top < headerBottom - 6 && vh >= 500) {
          issues.push(
            `HEADER_OVERLAP: <${node.tagName.toLowerCase()}> top(${Math.round(r.top)}) obscured behind sticky header bottom(${Math.round(headerBottom)})`
          );
        }
      }
    }

    // 4. Carousel controller non-interference check
    const ctrl = hero.querySelector('[data-kew-carousel-controller="true"]');
    const slideCount = ctrl ? Number(ctrl.getAttribute('data-slide-count') || 0) : 0;
    if (ctrl && getComputedStyle(ctrl).display !== 'none') {
      const cr = ctrl.getBoundingClientRect();
      if (cr.width > 0 && cr.height > 0) {
        const contentEls = hero.querySelectorAll(
          'h1, p, [data-kew-brand-identity], [data-kew-hero-overlay="true"], .kew-heading-scope a, .kew-heading-scope button'
        );
        for (const el of contentEls) {
          if (
            el.closest('[data-kew-carousel-controller="true"]') ||
            el.closest('[aria-hidden="true"]') ||
            el.closest('[data-overlay-dismissed="true"]')
          ) {
            continue;
          }
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const ix = Math.max(0, Math.min(cr.right, r.right) - Math.max(cr.left, r.left));
          const iy = Math.max(0, Math.min(cr.bottom, r.bottom) - Math.max(cr.top, r.top));
          if (ix > 3 && iy > 3) {
            issues.push(
              `CAROUSEL_CONTROLLER_OVERLAP: Controller overlaps <${el.tagName.toLowerCase()}> by ${Math.round(ix)}x${Math.round(iy)}px`
            );
            break;
          }
        }
      }
    }

    // 5. Institutional Brand Identity (`KEW | WESTERN HIMALAYAN`) typography & single-row lockup
    const brandLockups = Array.from(hero.querySelectorAll('[data-kew-brand-identity]')).filter((el) => {
      if (el.closest('[aria-hidden="true"]')) return false;
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden';
    });
    for (const lockup of brandLockups) {
      const badge = lockup.querySelector('.kew-brand-badge');
      const region = lockup.querySelector('.kew-brand-region');
      if (badge && region) {
        const bs = getComputedStyle(badge);
        const rs = getComputedStyle(region);
        if (
          bs.fontFamily !== rs.fontFamily ||
          bs.fontSize !== rs.fontSize ||
          bs.fontWeight !== rs.fontWeight ||
          bs.letterSpacing !== rs.letterSpacing
        ) {
          issues.push(
            `BRAND_TYPOGRAPHY_MISMATCH: badge(${bs.fontSize}/${bs.fontWeight}) != region(${rs.fontSize}/${rs.fontWeight})`
          );
        }
        const br = badge.getBoundingClientRect();
        const rr = region.getBoundingClientRect();
        if (br.height > 0 && rr.height > 0 && Math.abs((br.top + br.height / 2) - (rr.top + rr.height / 2)) > 6) {
          issues.push('BRAND_ALIGNMENT_WRAP: KEW badge and WESTERN HIMALAYAN are not aligned on the same horizontal row');
        }
      }
    }

    // 6. Approved Hero Height Standards (Homepage = 100%, Module/Submodule min-height = 80%)
    const computedMinH = parseFloat(getComputedStyle(hero).minHeight || '0');
    const expectedRatio = isHomepage ? 1.0 : 0.8;
    const expectedMinPx = vh * expectedRatio;
    // Allow landscape floor rule (`max(100svh, 31rem)`) on <500px height viewports
    if (vh >= 500 && Math.abs(computedMinH - expectedMinPx) > 4) {
      issues.push(
        `HERO_MIN_HEIGHT_STANDARD_DRIFT: computedMinHeight(${Math.round(computedMinH)}px) != expected(${Math.round(expectedMinPx)}px)`
      );
    }

    // Log natural content expansion above 80% target on standard desktop (>=1440x900) as an informational exception
    if (!isHomepage && vw >= 1440 && vh >= 900 && heroRect.height > expectedMinPx + 24) {
      exceptions.push({
        viewport: `${vw}x${vh}`,
        targetHeightPx: Math.round(expectedMinPx),
        actualHeightPx: Math.round(heroRect.height),
        reason: 'Rich multi-block foreground content naturally expanded auto-height beyond 80% min-height floor to prevent content clipping.',
      });
    }

    return {
      hasStandardHero: true,
      isHomepage,
      heroHeightPx: Math.round(heroRect.height),
      heroHeightRatioVh: Number((heroRect.height / vh).toFixed(3)),
      slideCount,
      issues,
      exceptions,
    };
  });
}

async function main() {
  console.log('=== KEW GLOBAL HERO COMPLIANCE & OVERFLOW GOVERNANCE AUDIT ===');
  const staticReport = runStaticSourceAudit();
  console.log(
    `[Static Audit] KEW Routes: ${staticReport.totalKewRoutes} (Excluded Dispatch: ${staticReport.excludedHimalayanDispatchRoutes}) | <Heading> Blocks: ${staticReport.headingBlocksScanned} | Violations: ${staticReport.violationsCount}`
  );

  if (STATIC_ONLY) {
    fs.writeFileSync(REPORT_PATH, JSON.stringify({ staticReport }, null, 2));
    process.exit(staticReport.violationsCount > 0 ? 1 : 0);
  }

  const browser = await chromium.launch({ headless: true });
  const renderedResults = [];
  const zoomResults = [];
  const carouselSlideChecks = [];
  const allExceptions = [];
  let renderedFailures = 0;

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const zoomTestSet = new Set([
      '/',
      '/water-systems/lakes',
      '/webinars',
      '/earth-human-impact',
      '/hazard-intelligence/algal-bloom-intelligence',
      '/about/partners',
      '/protected-network/national-parks/dachigam-national-park',
    ]);

    // A) Multi-Device, Multi-Orientation, Multi-Zoom & Carousel Slide Verification across all 18 Hero Archetypes
    for (const item of ARCHETYPE_ROUTES) {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const res = await page.goto(`${BASE_URL}${item.route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      await page.waitForTimeout(450);

      // Verify all carousel slides on multi-slide archetypes at desktop
      if (item.checkAllSlides) {
        const tabsCount = await page
          .locator('[data-kew-carousel-controller="true"] [role="tab"]')
          .count();
        for (let sIdx = 0; sIdx < tabsCount; sIdx++) {
          await page
            .locator('[data-kew-carousel-controller="true"] [role="tab"]')
            .nth(sIdx)
            .click({ force: true });
          await page.waitForTimeout(80);
          const slideEval = await evaluateRenderedHero(page);
          if (slideEval.issues.length > 0) renderedFailures += slideEval.issues.length;
          carouselSlideChecks.push({
            route: item.route,
            slideIndex: sIdx + 1,
            totalSlides: tabsCount,
            passed: slideEval.issues.length === 0,
            issues: slideEval.issues,
          });
        }
      }

      const viewportsToRun = FULL_SWEEP
        ? DEVICE_MATRIX
        : item.route === '/' || item.route === '/water-systems/lakes' || item.route === '/webinars' || item.route === '/earth-human-impact'
          ? DEVICE_MATRIX
          : [
              DEVICE_MATRIX[1], // 4K 3840x2160
              DEVICE_MATRIX[3], // FHD 1920x1080
              DEVICE_MATRIX[5], // Vertical Desktop 1080x1920
              DEVICE_MATRIX[7], // Laptop 1366x768
              DEVICE_MATRIX[9], // Portrait Tablet 768x1024
              DEVICE_MATRIX[10], // Landscape Mobile 844x390
              DEVICE_MATRIX[11], // Portrait Mobile 390x844
            ];

      for (const vp of viewportsToRun) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(100);
        const ev = await evaluateRenderedHero(page);
        if (ev.issues.length > 0) renderedFailures += ev.issues.length;
        if (ev.exceptions?.length) {
          ev.exceptions.forEach((ex) =>
            allExceptions.push({ route: item.route, archetype: item.archetype, ...ex })
          );
        }
        renderedResults.push({
          route: item.route,
          archetype: item.archetype,
          viewportId: vp.id,
          viewport: `${vp.width}x${vp.height}`,
          status: res?.status() || 0,
          passed: ev.issues.length === 0,
          heroHeightPx: ev.heroHeightPx,
          heroHeightRatioVh: ev.heroHeightRatioVh,
          issues: ev.issues,
        });
      }

      // B) All 8 Browser Zoom Levels (80%, 100%, 110%, 125%, 150%, 175%, 200%, 250%) in same page session
      if (zoomTestSet.has(item.route)) {
        for (const zoom of ZOOM_LEVELS) {
          const cssW = Math.round(ZOOM_BASE_WIDTH / (zoom / 100));
          const cssH = Math.round(ZOOM_BASE_HEIGHT / (zoom / 100));
          await page.setViewportSize({ width: cssW, height: cssH });
          await page.waitForTimeout(100);
          const ev = await evaluateRenderedHero(page);
          if (ev.issues.length > 0) renderedFailures += ev.issues.length;
          zoomResults.push({
            route: item.route,
            zoom: `${zoom}%`,
            cssViewport: `${cssW}x${cssH}`,
            passed: ev.issues.length === 0,
            heroHeightPx: ev.heroHeightPx,
            heroHeightRatioVh: ev.heroHeightRatioVh,
            issues: ev.issues,
          });
        }
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }

  const finalSummary = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    staticAudit: {
      totalKewRoutes: staticReport.totalKewRoutes,
      excludedHimalayanDispatchRoutes: staticReport.excludedHimalayanDispatchRoutes,
      headingBlocksScanned: staticReport.headingBlocksScanned,
      violationsCount: staticReport.violationsCount,
    },
    renderedAudit: {
      archetypesTested: ARCHETYPE_ROUTES.length,
      deviceChecksRun: renderedResults.length,
      zoomChecksRun: zoomResults.length,
      carouselSlideChecksRun: carouselSlideChecks.length,
      totalRenderedFailures: renderedFailures,
      exceptionsCount: allExceptions.length,
    },
    exceptions: allExceptions,
    failures: [
      ...staticReport.violations,
      ...renderedResults.filter((x) => !x.passed),
      ...zoomResults.filter((x) => !x.passed),
      ...carouselSlideChecks.filter((x) => !x.passed),
    ],
    deviceMatrixResults: renderedResults,
    zoomMatrixResults: zoomResults,
    carouselSlideResults: carouselSlideChecks,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(finalSummary, null, 2));
  console.log(
    JSON.stringify(
      {
        staticAudit: finalSummary.staticAudit,
        renderedAudit: finalSummary.renderedAudit,
        exceptions: finalSummary.exceptions,
        sampleFailures: finalSummary.failures.slice(0, 10),
      },
      null,
      2
    )
  );

  if (staticReport.violationsCount > 0 || renderedFailures > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
