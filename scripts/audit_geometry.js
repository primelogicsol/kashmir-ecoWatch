const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { width: 320, height: 568, name: 'Mobile-320px' },
  { width: 375, height: 667, name: 'Mobile-375px' },
  { width: 768, height: 1024, name: 'Tablet-768px' },
  { width: 1440, height: 900, name: 'Desktop-1440px' }
];

const routes = [
  '/',
  '/hazard-intelligence',
  '/hazard-intelligence/landslides',
  '/hazard-intelligence/algal-bloom-intelligence',
  '/hazard-intelligence/flash-floods',
  '/hazard-intelligence/avalanches',
  '/hazard-intelligence/floods',
  '/hazard-intelligence/earthquakes',
  '/hazard-intelligence/glofs',
  '/hazard-intelligence/forest-fires',
  '/environmental-monitoring/air-pollution',
  '/protected-areas',
  '/water-systems'
];

async function runGeometryAudit() {
  console.log('Starting automated browser geometry and corner-radius audit...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  let totalAuditedElements = 0;
  let totalViolations = 0;
  const violationLog = [];

  for (const vp of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of routes) {
      const url = 'http://localhost:3004' + route;
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(1000); // Allow styles and hydration to settle

        const pageResults = await page.evaluate(() => {
          const results = [];
          const elements = document.querySelectorAll('span, button, a, div, input, select');

          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const rTopLeft = parseFloat(style.borderTopLeftRadius) || 0;
            const rTopRight = parseFloat(style.borderTopRightRadius) || 0;
            const rBottomRight = parseFloat(style.borderBottomRightRadius) || 0;
            const rBottomLeft = parseFloat(style.borderBottomLeftRadius) || 0;
            const maxRadius = Math.max(rTopLeft, rTopRight, rBottomRight, rBottomLeft);

            if (maxRadius === 0) return;

            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // Ignore hidden or microscopic elements
            if (width < 2 || height < 2) return;

            const tag = el.tagName.toLowerCase();
            const classes = el.className || '';

            // Allowlist: Intentional circular geometry
            // 1. Equal / near-equal aspect ratio circular shapes (avatars, spinners, status indicator dots)
            const isSquareOrNear = Math.abs(width - height) <= 4;
            const isCircular = maxRadius >= (Math.min(width, height) / 2 - 2);
            if (isSquareOrNear && isCircular) return;

            // 2. Carousel indicator dot buttons (e.g. w-2.5 h-2.5 or h-2 rounded-full)
            if (classes.includes('carousel-dot') || (classes.includes('rounded-full') && (classes.includes('w-2') || classes.includes('w-1') || classes.includes('w-3') || classes.includes('h-2')))) {
              return;
            }

            // 3. Status indicator dots & pulse rings
            if (classes.includes('status-dot') || classes.includes('pulse-ring') || classes.includes('animate-spin') || classes.includes('avatar-circle')) {
              return;
            }

            // 4. Progress bar tracks and fill meters (scientific 4px corner radius)
            if (el.getAttribute('role') === 'progressbar' || classes.includes('overflow-hidden') && (classes.includes('h-1') || classes.includes('h-1.5') || classes.includes('h-2'))) {
              if (maxRadius <= 4.5) return;
            }

            const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);

            // Classify element type according to KEW Design Tokens:
            const isBadge = classes.includes('badge') || (tag === 'span' && (classes.includes('px-') || classes.includes('text-xs') || classes.includes('font-mono')));
            const isFilterOrTab = classes.includes('tab') || classes.includes('filter') || el.getAttribute('role') === 'tab';
            const isButton = tag === 'button' || classes.includes('btn');
            const isInput = tag === 'input' || tag === 'select' || tag === 'textarea';
            const isModal = el.getAttribute('role') === 'dialog' || classes.includes('modal');

            let allowedMax = 8; // Default max for general cards/panels
            let category = 'card/panel';

            if (isBadge || isFilterOrTab) {
              allowedMax = 4;
              category = 'badge/tab/filter';
            } else if (isButton || isInput) {
              allowedMax = 6;
              category = 'button/input';
            } else if (isModal) {
              allowedMax = 10;
              category = 'modal';
            }

            // Flag if rectangular element exceeds maximum allowed radius
            if (maxRadius > allowedMax + 0.5) {
              results.push({
                tag,
                category,
                classes: String(classes).slice(0, 80),
                text,
                width: Math.round(width),
                height: Math.round(height),
                computedRadius: maxRadius,
                allowedMax
              });
            }
          });

          return { count: elements.length, violations: results };
        });

        totalAuditedElements += pageResults.count;
        if (pageResults.violations.length > 0) {
          totalViolations += pageResults.violations.length;
          violationLog.push({
            viewport: vp.name,
            route,
            violations: pageResults.violations
          });
        }
      } catch (err) {
        console.error(`Error auditing ${route} at ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`AUDIT SUMMARY`);
  console.log(`Total DOM Elements Evaluated: ${totalAuditedElements}`);
  console.log(`Total Geometry Violations: ${totalViolations}`);
  console.log(`========================================\n`);

  if (violationLog.length > 0) {
    console.log('Sample Violations:');
    violationLog.slice(0, 8).forEach(v => {
      console.log(`[${v.viewport}] ${v.route}: ${v.violations.length} violations`);
      v.violations.slice(0, 3).forEach(item => {
        console.log(`  - <${item.tag}> "${item.text}" (${item.category}) w:${item.width} h:${item.height} => computed: ${item.computedRadius}px (allowed: ${item.allowedMax}px) [${item.classes}]`);
      });
    });
  } else {
    console.log('✅ ZERO VIOLATIONS! All inspected rectangular UI elements strictly respect global corner-radius tokens across all viewports!');
  }

  fs.writeFileSync('scripts/geometry_audit_report.json', JSON.stringify({ totalAuditedElements, totalViolations, violationLog }, null, 2));
}

runGeometryAudit();
