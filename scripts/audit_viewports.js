const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { width: 320, height: 568, name: 'iPhone-SE-320px' },
  { width: 375, height: 667, name: 'iPhone-8-375px' },
  { width: 430, height: 932, name: 'iPhone-14-Pro-Max-430px' },
  { width: 768, height: 1024, name: 'iPad-Tablet-768px' },
  { width: 1024, height: 768, name: 'Small-Desktop-1024px' },
  { width: 1440, height: 900, name: 'Standard-Desktop-1440px' }
];

const targetRoutes = [
  '/',
  '/hazard-intelligence',
  '/hazard-intelligence/landslides',
  '/hazard-intelligence/algal-bloom-intelligence',
  '/hazard-intelligence/flash-floods',
  '/hazard-intelligence/avalanches',
  '/hazard-intelligence/floods',
  '/hazard-intelligence/earthquakes',
  '/environmental-monitoring/air-pollution',
  '/protected-areas',
  '/risk-monitoring'
];

async function runAudit() {
  const screenshotDir = path.resolve('public/audit-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const results = [];

  console.log('Starting Master Viewport & Layout Audit across ' + targetRoutes.length + ' key routes and ' + viewports.length + ' viewports...');

  for (const route of targetRoutes) {
    const pageUrl = `http://localhost:3004${route}`;
    console.log(`\nAuditing route: ${route}`);

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (Mobile; AuditBot) AppleWebKit/537.36'
      });
      const page = await context.newPage();

      const pageErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      try {
        await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(600); // Allow hydrate & animations

        // Check 1: Document-level horizontal overflow
        const overflowCheck = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const bodyWidth = document.body.scrollWidth;
          const hasDocOverflow = docWidth > winWidth + 1; // 1px tolerance for subpixel rounding

          // Find overflowing elements
          const overflowingElements = [];
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 2 && !el.closest('.responsive-table-container, .table-responsive-wrapper, [class*="overflow-x-auto"]')) {
              overflowingElements.push({
                tag: el.tagName,
                className: (el.className && typeof el.className === 'string') ? el.className.substring(0, 80) : '',
                right: Math.round(rect.right),
                excess: Math.round(rect.right - winWidth)
              });
              if (overflowingElements.length >= 3) break;
            }
          }

          return {
            docWidth,
            winWidth,
            hasDocOverflow,
            overflowingElements
          };
        });

        // Screenshot for verification
        const filename = `${route.replace(/[\/]/g, '_') || 'home'}-${vp.name}.png`;
        const screenshotPath = path.join(screenshotDir, filename);
        if (vp.width === 375 || vp.width === 1440) {
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }

        results.push({
          route,
          viewport: vp.name,
          width: vp.width,
          hasDocOverflow: overflowCheck.hasDocOverflow,
          overflowExcess: overflowCheck.hasDocOverflow ? (overflowCheck.docWidth - overflowCheck.winWidth) : 0,
          overflowingElementsCount: overflowCheck.overflowingElements.length,
          errors: pageErrors.length,
          status: overflowCheck.hasDocOverflow ? 'FAIL_OVERFLOW' : 'PASS'
        });

        const statusIcon = overflowCheck.hasDocOverflow ? '❌ OVERFLOW' : '✅ PASS';
        process.stdout.write(`  [${vp.width}px] ${statusIcon} `);

      } catch (err) {
        console.log(`  [${vp.width}px] ❌ ERROR: ${err.message}`);
        results.push({
          route,
          viewport: vp.name,
          width: vp.width,
          status: 'ERROR',
          message: err.message
        });
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();

  const totalTests = results.length;
  const passTests = results.filter(r => r.status === 'PASS').length;
  const failTests = results.filter(r => r.status !== 'PASS').length;

  console.log('\n\n============================================================');
  console.log('AUDIT SUMMARY REPORT');
  console.log('============================================================');
  console.log(`Total Route/Viewport combinations tested: ${totalTests}`);
  console.log(`PASSED (0 horizontal overflow, fully responsive): ${passTests}`);
  console.log(`FAILED / ISSUES: ${failTests}`);
  console.log('============================================================\n');

  fs.writeFileSync('artifacts/audit_results.json', JSON.stringify(results, null, 2), 'utf8');
}

runAudit();
