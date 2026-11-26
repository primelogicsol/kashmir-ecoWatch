#!/usr/bin/env node
/**
 * Local End-to-End Validation Suite for Himalayan Dispatch Subdomain Activation
 * Tests:
 *   0. Mandatory Localhost Preservation (`localhost:<port>/himalayan-dispatch/**`) —
 *      all routes, 6 regional bureaus, internal `/himalayan-dispatch` links, RSS,
 *      APIs, CMS, and ZERO redirects to production even when legacy redirects are enabled!
 *   1. Production Subdomain (`dispatch.kashmir-ecowatch.com`) homepage, identity,
 *      KEW chrome isolation, clean `/...` internal links, and canonical metadata.
 *   2. All 6 regional bureaus, departments, issues, cover story, Daily Dispatch,
 *      journalists, newsroom, editorial CMS, sign-in, images, and zero public AI disclosures.
 *   3. Dedicated sitemap.xml, robots.txt, manifest.webmanifest, and RSS 2.0 feed.xml.
 *   4. Authenticated CMS, Journalist Workspace, HDN multi-role session, and HD-ANIE APIs.
 *   5. Strict Isolation — unrelated KEW routes & APIs blocked (`404` + `noindex`) on subdomain.
 *   6. Permanent Legacy URL Redirects (`308`) on subdomain & gated on `kashmir-ecowatch.com`.
 *   7. Preservation of Existing KEW Production Modules on `kashmir-ecowatch.com`.
 *
 * Usage:
 *   node scripts/verify-dispatch-subdomain.mjs http://127.0.0.1:3099
 */

import http from 'node:http';

const BASE = process.argv[2] || 'http://127.0.0.1:3099';
const parsedBase = new URL(BASE);
const LOCAL_HOST = `localhost:${parsedBase.port}`;

let passed = 0;
let failed = 0;
const results = [];

function rawRequest({ method = 'GET', path = '/', host, headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const payload = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const isLocal =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.includes('.localhost');
    const reqHeaders = {
      Host: host,
      'X-Forwarded-Host': host,
      'X-Forwarded-Proto': isLocal ? 'http' : 'https',
      ...headers,
    };
    if (payload) {
      reqHeaders['Content-Type'] = reqHeaders['Content-Type'] || 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request(
      {
        hostname: parsedBase.hostname,
        port: parsedBase.port,
        path,
        method,
        headers: reqHeaders,
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            text: buf.toString('utf8'),
            byteLength: buf.byteLength,
          });
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function assert(name, condition, detail = '') {
  if (condition) {
    passed++;
    results.push({ status: 'PASS', name, detail });
    console.log(`  [PASS] ${name}${detail ? ` — ${detail}` : ''}`);
  } else {
    failed++;
    results.push({ status: 'FAIL', name, detail });
    console.error(`  [FAIL] ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

const FORBIDDEN_PUBLIC_AI_RE =
  /(AI\s*&\s*Editorial\s*Transparency|AI\s*&amp;\s*Editorial\s*Transparency|AI-assisted|AI-Assisted|generative AI|Autonomous Newsroom|Autonomous AI|HD-ANIE)/i;

async function main() {
  console.log(`\n=== HIMALAYAN DISPATCH DUAL-MODE VALIDATION SUITE (${BASE}) ===\n`);

  // 0. MANDATORY LOCALHOST PRESERVATION (`localhost:<port>/himalayan-dispatch/**`)
  console.log(`0. Mandatory Localhost Preservation (${LOCAL_HOST}/himalayan-dispatch/**)`);
  const localHome = await rawRequest({ host: LOCAL_HOST, path: '/himalayan-dispatch' });
  assert(
    `GET http://${LOCAL_HOST}/himalayan-dispatch -> 200 (never redirected to subdomain)`,
    localHome.status === 200,
    `HTTP ${localHome.status}`
  );
  assert(
    'Localhost homepage preserves /himalayan-dispatch/... internal navigation hrefs',
    localHome.text.includes('href="/himalayan-dispatch/bureaus/kashmir"') &&
      localHome.text.includes('href="/himalayan-dispatch/departments/cover-stories"') &&
      localHome.text.includes('href="/himalayan-dispatch/newsroom"')
  );
  assert(
    'Localhost Return to KEW link stays relative ("/") and does not jump to production',
    localHome.text.includes('href="/"')
  );
  assert(
    'Localhost homepage contains zero public AI disclosures',
    !FORBIDDEN_PUBLIC_AI_RE.test(localHome.text)
  );

  const localPreservedRoutes = [
    '/himalayan-dispatch/bureaus',
    '/himalayan-dispatch/bureaus/kashmir',
    '/himalayan-dispatch/bureaus/jammu',
    '/himalayan-dispatch/bureaus/ladakh',
    '/himalayan-dispatch/bureaus/ajk',
    '/himalayan-dispatch/bureaus/gilgit',
    '/himalayan-dispatch/bureaus/baltistan',
    '/himalayan-dispatch/departments',
    '/himalayan-dispatch/departments/cover-stories',
    '/himalayan-dispatch/current-issue',
    '/himalayan-dispatch/issues/volume-01-issue-01',
    '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise',
    '/himalayan-dispatch/daily-dispatch',
    '/himalayan-dispatch/journalists',
    '/himalayan-dispatch/editorial-board',
    '/himalayan-dispatch/archive',
    '/himalayan-dispatch/forthcoming',
    '/himalayan-dispatch/join-newsroom',
    '/himalayan-dispatch/editorial-charter',
    '/himalayan-dispatch/contributor-guidelines',
    '/himalayan-dispatch/rights-permissions',
    '/himalayan-dispatch/pitch',
    '/himalayan-dispatch/journalist-sign-in',
    '/himalayan-dispatch/newsroom',
    '/himalayan-dispatch/editorial-cms',
  ];

  for (const lr of localPreservedRoutes) {
    const r = await rawRequest({ host: LOCAL_HOST, path: lr });
    const noAiLeak = !FORBIDDEN_PUBLIC_AI_RE.test(r.text);
    assert(
      `Localhost route ${lr} -> 200 & zero public AI disclosure`,
      r.status === 200 && noAiLeak,
      `HTTP ${r.status}, cleanCopy=${noAiLeak}`
    );
  }

  const localRss = await rawRequest({ host: LOCAL_HOST, path: '/himalayan-dispatch/feed.xml' });
  assert(
    `Localhost RSS (/himalayan-dispatch/feed.xml) -> 200 with ${LOCAL_HOST}/himalayan-dispatch URLs`,
    localRss.status === 200 &&
      localRss.text.includes(`http://${LOCAL_HOST}/himalayan-dispatch`) &&
      !FORBIDDEN_PUBLIC_AI_RE.test(localRss.text),
    `HTTP ${localRss.status}`
  );

  const localDeletedAiPage = await rawRequest({
    host: LOCAL_HOST,
    path: '/himalayan-dispatch/ai-editorial-transparency',
  });
  assert(
    'Deleted AI & Editorial Transparency route returns 404 on localhost',
    localDeletedAiPage.status === 404,
    `HTTP ${localDeletedAiPage.status}`
  );

  // 1. Dispatch Homepage on dispatch.kashmir-ecowatch.com
  console.log('\n1. Dispatch Subdomain Homepage, Identity, Chrome Isolation & Canonicals');
  const home = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: '/' });
  assert('GET https://dispatch.kashmir-ecowatch.com/ -> 200', home.status === 200, `HTTP ${home.status}`);
  assert(
    'Homepage renders Himalayan Dispatch masthead & lead content',
    home.text.includes('HIMALAYAN') && home.text.includes('DISPATCH')
  );
  assert(
    'Subdomain homepage uses clean root-relative hrefs (/bureaus/kashmir, /newsroom) without /himalayan-dispatch prefix',
    home.text.includes('href="/bureaus/kashmir"') &&
      home.text.includes('href="/departments/cover-stories"') &&
      home.text.includes('href="/newsroom"') &&
      !home.text.includes('href="/himalayan-dispatch')
  );
  assert(
    'Homepage canonical tag is https://dispatch.kashmir-ecowatch.com',
    /rel="canonical"\s+href="https:\/\/dispatch\.kashmir-ecowatch\.com\/?"/.test(home.text)
  );
  assert(
    'Homepage includes RSS auto-discovery link on dispatch subdomain',
    home.text.includes('href="https://dispatch.kashmir-ecowatch.com/feed.xml"')
  );
  assert(
    'Homepage includes independent NewsMediaOrganization + Periodical JSON-LD',
    home.text.includes('https://dispatch.kashmir-ecowatch.com/#periodical') &&
      home.text.includes('NewsMediaOrganization')
  );
  assert(
    'KEW SafeHeader & SafeFooter are completely omitted from Dispatch SSR HTML',
    !home.text.includes('Open mobile navigation menu') &&
      !home.text.includes('Kashmir EcoWatch — Environmental Intelligence Platform')
  );
  assert(
    'Return to KEW link points to https://kashmir-ecowatch.com/',
    home.text.includes('href="https://kashmir-ecowatch.com/"')
  );
  assert(
    'Subdomain homepage & footer contain zero public AI disclosures',
    !FORBIDDEN_PUBLIC_AI_RE.test(home.text) && !home.text.includes('ai-editorial-transparency')
  );

  // Verify local browser alias `dispatch.localhost:<port>`
  const localAlias = await rawRequest({ host: `dispatch.localhost:${parsedBase.port}`, path: '/' });
  assert(
    `GET http://dispatch.localhost:${parsedBase.port}/ -> 200`,
    localAlias.status === 200 &&
      localAlias.text.includes('href="/bureaus/kashmir"') &&
      !localAlias.text.includes('href="/himalayan-dispatch'),
    `HTTP ${localAlias.status}`
  );

  // 2. Dispatch Subpages, All 6 Regional Bureaus, Articles, Assets, Workspaces & CMS
  console.log('\n2. Dispatch Subpages, All 6 Bureaus, Articles, Images, CMS & Workspaces');
  const dispatchRoutes = [
    ['/daily-dispatch', 'https://dispatch.kashmir-ecowatch.com/daily-dispatch', false],
    ['/current-issue', 'https://dispatch.kashmir-ecowatch.com/current-issue', false],
    ['/issues/volume-01-issue-01', 'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01', false],
    [
      '/issues/volume-01-issue-01/the-price-of-protecting-paradise',
      'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01/the-price-of-protecting-paradise',
      false,
    ],
    ['/departments', 'https://dispatch.kashmir-ecowatch.com/departments', false],
    ['/departments/cover-stories', 'https://dispatch.kashmir-ecowatch.com/departments/cover-stories', false],
    ['/bureaus', 'https://dispatch.kashmir-ecowatch.com/bureaus', false],
    ['/bureaus/kashmir', 'https://dispatch.kashmir-ecowatch.com/bureaus/kashmir', false],
    ['/bureaus/jammu', 'https://dispatch.kashmir-ecowatch.com/bureaus/jammu', false],
    ['/bureaus/ladakh', 'https://dispatch.kashmir-ecowatch.com/bureaus/ladakh', false],
    ['/bureaus/ajk', 'https://dispatch.kashmir-ecowatch.com/bureaus/ajk', false],
    ['/bureaus/gilgit', 'https://dispatch.kashmir-ecowatch.com/bureaus/gilgit', false],
    ['/bureaus/baltistan', 'https://dispatch.kashmir-ecowatch.com/bureaus/baltistan', false],
    ['/reporting-beats', 'https://dispatch.kashmir-ecowatch.com/reporting-beats', false],
    ['/journalists', 'https://dispatch.kashmir-ecowatch.com/journalists', false],
    ['/editorial-board', 'https://dispatch.kashmir-ecowatch.com/editorial-board', false],
    ['/archive', 'https://dispatch.kashmir-ecowatch.com/archive', false],
    ['/forthcoming', 'https://dispatch.kashmir-ecowatch.com/forthcoming', false],
    ['/join-newsroom', 'https://dispatch.kashmir-ecowatch.com/join-newsroom', false],
    ['/contributor-guidelines', 'https://dispatch.kashmir-ecowatch.com/contributor-guidelines', false],
    ['/rights-permissions', 'https://dispatch.kashmir-ecowatch.com/rights-permissions', false],
    ['/imprint', 'https://dispatch.kashmir-ecowatch.com/imprint', false],
    ['/editorial-charter', 'https://dispatch.kashmir-ecowatch.com/editorial-charter', false],
    ['/source-protection-verification', 'https://dispatch.kashmir-ecowatch.com/source-protection-verification', false],
    ['/corrections', 'https://dispatch.kashmir-ecowatch.com/corrections', false],
    ['/contact', 'https://dispatch.kashmir-ecowatch.com/contact', false],
    ['/pitch', 'https://dispatch.kashmir-ecowatch.com/pitch', true],
    ['/journalist-sign-in', 'https://dispatch.kashmir-ecowatch.com/journalist-sign-in', true],
    ['/newsroom', 'https://dispatch.kashmir-ecowatch.com/newsroom', true],
    ['/editorial-cms', 'https://dispatch.kashmir-ecowatch.com/editorial-cms', true],
  ];

  for (const [route, expectedCanon, expectNoIndex] of dispatchRoutes) {
    const r = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: route });
    const canonOk = r.text.includes(`rel="canonical" href="${expectedCanon}"`);
    const robotsHdr = String(r.headers['x-robots-tag'] || '');
    const noIndexOk = !expectNoIndex || robotsHdr.includes('noindex');
    const noAiLeak = !FORBIDDEN_PUBLIC_AI_RE.test(r.text);
    const noPrefixLeak = !r.text.includes('href="/himalayan-dispatch');
    assert(
      `Dispatch route ${route}`,
      r.status === 200 && canonOk && noIndexOk && noAiLeak && noPrefixLeak,
      `HTTP ${r.status}, canon=${canonOk}, x-robots=${robotsHdr || 'indexable'}, clean=${noAiLeak && noPrefixLeak}`
    );
  }

  const subDeletedAiPage = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/ai-editorial-transparency',
  });
  assert(
    'Deleted AI & Editorial Transparency route returns 404 on subdomain',
    subDeletedAiPage.status === 404,
    `HTTP ${subDeletedAiPage.status}`
  );

  const imgRes = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/images/himalayan-dispatch/cover-gangbal-inaugural.jpg',
  });
  assert(
    'Dispatch editorial plate image loads via subdomain',
    imgRes.status === 200 && imgRes.byteLength > 1000,
    `HTTP ${imgRes.status}, ${imgRes.byteLength} bytes`
  );

  // 3. Dedicated Sitemap, Robots.txt & RSS Feed on Dispatch Subdomain
  console.log('\n3. Dedicated Sitemap, Robots.txt & RSS Syndication');
  const rss = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: '/feed.xml' });
  assert(
    'GET /feed.xml -> 200 RSS 2.0 with dispatch.kashmir-ecowatch.com permalinks',
    rss.status === 200 &&
      String(rss.headers['content-type'] || '').includes('rss+xml') &&
      rss.text.includes('<link>https://dispatch.kashmir-ecowatch.com/</link>') &&
      rss.text.includes('href="https://dispatch.kashmir-ecowatch.com/feed.xml"') &&
      !rss.text.includes('kashmir-ecowatch.com/himalayan-dispatch') &&
      !FORBIDDEN_PUBLIC_AI_RE.test(rss.text),
    `HTTP ${rss.status}`
  );

  const sm = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: '/sitemap.xml' });
  const smLocs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert(
    'GET /sitemap.xml -> 200 dedicated Himalayan Dispatch XML sitemap',
    sm.status === 200 &&
      smLocs.length >= 40 &&
      smLocs.every((u) => u.startsWith('https://dispatch.kashmir-ecowatch.com')) &&
      !smLocs.some((u) =>
        /^https:\/\/dispatch\.kashmir-ecowatch\.com\/(ai-editorial-transparency|newsroom|editorial-cms|journalist-sign-in|pitch|water-systems|biodiversity)(\/|$)/.test(
          u
        )
      ),
    `${smLocs.length} validated Dispatch URLs`
  );

  const rob = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: '/robots.txt' });
  assert(
    'GET /robots.txt -> 200 dedicated Himalayan Dispatch robots policy',
    rob.status === 200 &&
      rob.text.includes('Host: https://dispatch.kashmir-ecowatch.com') &&
      rob.text.includes('Sitemap: https://dispatch.kashmir-ecowatch.com/sitemap.xml') &&
      rob.text.includes('Disallow: /newsroom') &&
      rob.text.includes('Disallow: /editorial-cms'),
    `HTTP ${rob.status}`
  );

  // 4. Dispatch APIs, Authentication, CMS, HDN & Autonomous Newsroom Engine (HD-ANIE)
  console.log('\n4. Dispatch APIs, Authentication, CMS & Autonomous Newsroom Engine');
  const pubApi = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch',
  });
  assert(
    'GET /api/himalayan-dispatch -> 200 public bundle',
    pubApi.status === 200 && pubApi.text.includes('"publication":"Himalayan Dispatch"')
  );

  const hdnSessionProbe = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/hdn/session',
  });
  assert(
    'GET /api/himalayan-dispatch/hdn/session -> 200 HDN session probe on Dispatch host',
    hdnSessionProbe.status === 200 && hdnSessionProbe.text.includes('"authenticated"')
  );

  const unauthAdmin = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/admin',
  });
  const unauthAnie = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/anie',
  });
  assert(
    'Admin & HD-ANIE APIs enforce 401 when unauthenticated',
    unauthAdmin.status === 401 && unauthAnie.status === 401,
    `admin=${unauthAdmin.status}, anie=${unauthAnie.status}`
  );

  const expectedPasscode = process.env.ADMIN_PASSCODE || 'KEW-Admin-2026!';
  const loginRes = await rawRequest({
    method: 'POST',
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/admin/session',
    body: { passcode: expectedPasscode, actor: 'Subdomain Verification Runner' },
  });
  const setCookieRaw = loginRes.headers['set-cookie'] || [];
  const adminCookie = (Array.isArray(setCookieRaw) ? setCookieRaw : [setCookieRaw])
    .map((c) => c.split(';')[0])
    .join('; ');
  assert(
    'POST /api/admin/session issues signed HttpOnly kew_admin_session cookie on Dispatch host',
    loginRes.status === 200 && adminCookie.includes('kew_admin_session='),
    `HTTP ${loginRes.status}`
  );

  const authAdmin = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/admin',
    headers: { Cookie: adminCookie },
  });
  const authAnie = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/anie',
    headers: { Cookie: adminCookie },
  });
  const authWs = await rawRequest({
    host: 'dispatch.kashmir-ecowatch.com',
    path: '/api/himalayan-dispatch/workspace',
    headers: { Cookie: adminCookie },
  });
  assert(
    'Authenticated Editorial CMS (/api/himalayan-dispatch/admin) works on Dispatch host',
    authAdmin.status === 200 && authAdmin.text.includes('"autonomousEngine"')
  );
  assert(
    'Authenticated HD-ANIE Autonomous Engine (/api/himalayan-dispatch/anie) works on Dispatch host',
    authAnie.status === 200 && authAnie.text.includes('"engineMode"')
  );
  assert(
    'Authenticated Journalist Workspace (/api/himalayan-dispatch/workspace) works on Dispatch host',
    authWs.status === 200 && authWs.text.includes('"authenticated":true')
  );

  // 5. Strict Isolation: Unrelated KEW Routes & APIs Blocked on Dispatch Hostname
  console.log('\n5. Strict Isolation — Unrelated KEW Routes Blocked on Dispatch Hostname');
  const blockedKewPaths = [
    '/water-systems',
    '/water-systems/lakes/dal-lake',
    '/biodiversity',
    '/atlas',
    '/sectoral-eia',
    '/hazard-intelligence',
    '/environmental-monitoring',
    '/webinars',
    '/ecovoices',
    '/about',
    '/admin/dashboard',
    '/search',
    '/api/sectoral-eia/reports',
  ];
  for (const bp of blockedKewPaths) {
    const br = await rawRequest({ host: 'dispatch.kashmir-ecowatch.com', path: bp });
    assert(
      `Blocked unrelated KEW path on Dispatch host: ${bp} -> 404`,
      br.status === 404 && String(br.headers['x-robots-tag'] || '').includes('noindex'),
      `HTTP ${br.status}`
    );
  }

  // 6. Permanent Legacy URL Redirects (Single-Hop HTTP 308)
  console.log('\n6. Permanent Legacy URL Redirects (Single-Hop HTTP 308)');
  const subdomainRedirects = [
    [
      'dispatch.kashmir-ecowatch.com',
      '/himalayan-dispatch',
      'https://dispatch.kashmir-ecowatch.com/',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/himalayan-dispatch/bureaus/kashmir',
      'https://dispatch.kashmir-ecowatch.com/bureaus/kashmir',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/himalayan-dispatch/daily-dispatch',
      'https://dispatch.kashmir-ecowatch.com/daily-dispatch',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/stories/the-price-of-protecting-paradise',
      'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01/the-price-of-protecting-paradise',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/editions/vol-01-no-01',
      'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/bureaus?bureau=ladakh',
      'https://dispatch.kashmir-ecowatch.com/bureaus/ladakh',
    ],
    [
      'dispatch.kashmir-ecowatch.com',
      '/rss.xml',
      'https://dispatch.kashmir-ecowatch.com/feed.xml',
    ],
    [
      'www.dispatch.kashmir-ecowatch.com',
      '/daily-dispatch',
      'https://dispatch.kashmir-ecowatch.com/daily-dispatch',
    ],
  ];

  const kewDomainLegacyRedirects = [
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch',
      'https://dispatch.kashmir-ecowatch.com/',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/bureaus/kashmir',
      'https://dispatch.kashmir-ecowatch.com/bureaus/kashmir',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/daily-dispatch',
      'https://dispatch.kashmir-ecowatch.com/daily-dispatch',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/stories/the-price-of-protecting-paradise',
      'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01/the-price-of-protecting-paradise',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/editions/vol-01-no-01',
      'https://dispatch.kashmir-ecowatch.com/issues/volume-01-issue-01',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/bureaus?bureau=kashmir',
      'https://dispatch.kashmir-ecowatch.com/bureaus/kashmir',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/departments?dept=investigative-journalism',
      'https://dispatch.kashmir-ecowatch.com/departments/investigative-desk',
    ],
    [
      'kashmir-ecowatch.com',
      '/himalayan-dispatch/feed.xml',
      'https://dispatch.kashmir-ecowatch.com/feed.xml',
    ],
  ];

  const legacyGateEnabled = process.env.DISPATCH_LEGACY_REDIRECTS_ENABLED === 'true';

  for (const [host, srcPath, expectedLoc] of subdomainRedirects) {
    const rr = await rawRequest({ host, path: srcPath });
    const loc = String(rr.headers.location || '');
    assert(
      `308 ${host}${srcPath} -> ${expectedLoc}`,
      rr.status === 308 && loc === expectedLoc,
      `HTTP ${rr.status} Location: ${loc}`
    );
  }

  if (legacyGateEnabled) {
    for (const [host, srcPath, expectedLoc] of kewDomainLegacyRedirects) {
      const rr = await rawRequest({ host, path: srcPath });
      const loc = String(rr.headers.location || '');
      assert(
        `Gated 308 ${host}${srcPath} -> ${expectedLoc}`,
        rr.status === 308 && loc === expectedLoc,
        `HTTP ${rr.status} Location: ${loc}`
      );
    }
    // Re-confirm localhost STILL returns 200 even with DISPATCH_LEGACY_REDIRECTS_ENABLED=true!
    const localStill200 = await rawRequest({
      host: LOCAL_HOST,
      path: '/himalayan-dispatch/bureaus/kashmir',
    });
    assert(
      `Localhost NEVER redirects even when DISPATCH_LEGACY_REDIRECTS_ENABLED=true (${LOCAL_HOST}/himalayan-dispatch/bureaus/kashmir -> 200)`,
      localStill200.status === 200,
      `HTTP ${localStill200.status}`
    );
  } else {
    const preCutover = await rawRequest({
      host: 'kashmir-ecowatch.com',
      path: '/himalayan-dispatch',
    });
    assert(
      'Pre-cutover safety gate: kashmir-ecowatch.com/himalayan-dispatch stays 200 when DISPATCH_LEGACY_REDIRECTS_ENABLED=false',
      preCutover.status === 200,
      `HTTP ${preCutover.status}`
    );
  }

  // 7. Preservation of Existing KEW Modules & Sitemap on kashmir-ecowatch.com
  console.log('\n7. Preservation of Existing KEW Production Modules on kashmir-ecowatch.com');
  const kewRoutes = [
    '/',
    '/water-systems',
    '/biodiversity',
    '/sectoral-eia',
    '/environmental-investigations',
    '/ecovoices',
    '/webinars',
    '/admin/dashboard',
    '/robots.txt',
  ];
  for (const kr of kewRoutes) {
    const res = await rawRequest({ host: 'kashmir-ecowatch.com', path: kr });
    assert(`KEW route kashmir-ecowatch.com${kr} -> 200`, res.status === 200, `HTTP ${res.status}`);
  }

  const kewSm = await rawRequest({ host: 'kashmir-ecowatch.com', path: '/sitemap.xml' });
  assert(
    'KEW sitemap.xml -> 200 and excludes redirected /himalayan-dispatch URLs',
    kewSm.status === 200 &&
      kewSm.text.includes('https://kashmir-ecowatch.com/water-systems') &&
      !kewSm.text.includes('/himalayan-dispatch'),
    `HTTP ${kewSm.status}`
  );

  console.log(`\n=== SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Validation runner crashed:', err);
  process.exit(1);
});
