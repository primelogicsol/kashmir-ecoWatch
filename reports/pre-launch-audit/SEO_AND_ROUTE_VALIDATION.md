# Kashmir EcoWatch — SEO, SSR Pre-Rendering, Sitemap & Route Validation Report (`Phase 7`)

**Audit Date:** November 27, 2026  
**Total Pre-Rendered Static / SSG Paths Verified (`next build`):** **`712 / 712` (`100%` Build Success)**  
**Broken Canonical Public Routes:** **`0`**

---

## 1. SSR / SSG Pre-Rendering Remediations Verified

| Route | Pre-Remediation Defect | Remediation Executed | Post-Remediation SSR Verification |
| :--- | :--- | :--- | :--- |
| `/governance` | Missing standalone route (`404` / unindexed despite global footer link) | Created Server Component `src/app/governance/page.tsx` + `GovernancePortalView.tsx` with curated metadata & `BreadcrumbList` JSON-LD; added to `sitemap.ts` | **`HTTP 200` (`232,065` bytes SSR HTML)** |
| `/about/governance` | Client `'use client'` page | Synchronized as pure Server Component rendering `GovernancePortalView` | **`HTTP 200` (`233,180` bytes SSR HTML)** |
| `/resources/environmental-pil` | Client-only `<Suspense>` loading bailout (`"Loading Environmental PIL Portal & Judicial Inventory..."`) | Removed outer Suspense bailout; isolated `?tab=` URL sync into `<Suspense fallback={null}>`; pre-renders full legal docket inventory & summary server-side | **`HTTP 200` (`155,778` bytes SSR HTML, 0 loading shell)** |
| `/resources/kew-green-heroes` | Outer `<Suspense>` bailout + `GreenHeroesSubNav` `if (!mounted)` `"Loading KEW Green Heroes workbench..."` | Isolated URL sync and removed `if (!mounted)` gate in `GreenHeroesSubNav.tsx` | **`HTTP 200` (`127,859` bytes SSR HTML, 0 loading shell)** |
| `/hazard-intelligence/forest-fires` | `useSearchParams()` outer Suspense bailout | Isolated `ForestFiresUrlTabSync` under `<Suspense fallback={null}>` | **Static `○` Pre-Rendered in `next build`** |
| `/seasonal-ecology` | `useSearchParams()` outer Suspense bailout | Isolated `SeasonalHabitatUrlSync` under `<Suspense fallback={null}>` | **Static `○` Pre-Rendered in `next build`** |
| `/environmental-investigations/reports/[slug]` | Client-only dynamic shell without `generateStaticParams()` + hidden Section `08/11/13/18/21` arrays | Added `generateStaticParams()` for all 53 canonical slugs + server prop hydration + fallback section renderers | **`53/53` SSG `●` Pre-Rendered (`281,834` bytes on `KEW-INV-0001`)** |
| `/atlas` | Full-page `ssr: false` blank shell | Server Component rendering `Dataset` JSON-LD + 10-layer WGS84 provenance catalog; only `AtlasLeafletCanvas` is `ssr: false` | **`HTTP 200` (`144,337` bytes SSR HTML)** |

---

## 2. Sitemap, Robots, Structured Data & Redirect Validation

1. **Subdomain-Gated Sitemap & Canonicals (`src/app/sitemap.ts`, `src/lib/seo/route-metadata.ts`):** When `IS_DISPATCH_SUBDOMAIN_LIVE === false`, `/himalayan-dispatch` issues, stories, daily dispatches, bureaus, and governance pages remain indexed on the primary host rather than being excluded or pointing canonicals to an unprovisioned subdomain.
2. **Utility Route Exclusion (`src/app/sitemap.ts`, `src/app/robots.ts`):** Excluded `/request`, `/submit`, `/admin`, `/newsroom`, `/editorial-cms`, and `/preview-error` from `sitemap.xml` (`485,149` bytes verified) and added `Disallow` / `X-Robots-Tag: noindex`.
3. **Permanent `308` Alias & Broken-Link Resolution (`src/proxy.ts` + 21 module files):**
   - `/methodology` -> `308` `/environmental-investigations/methodology`
   - `/founder` -> `308` `/about/founder`
   - `/leadership` -> `308` `/governance`
   - `/gis-mapping` -> `308` `/atlas`
   - `/biodiversity/wetlands` -> `308` `/water-systems/wetlands`
   - `/risk-monitoring/{pollution-stress,live-alerts,early-warning,response-operations}` -> `308` canonical `/risk-monitoring/*` targets
   - Fixed 50+ internal links across `about/page.tsx`, `ScientificReportPublicationView.tsx`, `research-portfolio-100-expansion.ts`, `module-directory/page.tsx`, `risk-monitoring/**/page.tsx`, and Himalayan Dispatch `toKewPlatformUrl()` wrappers.
4. **Schema.org JSON-LD (`src/components/seo/JsonLd.tsx`, `src/lib/seo/structured-data.ts`):** Escaped `<`, `>`, `&`, `\u2028`, `\u2029`; aligned `Dataset` and `ScholarlyArticle` license URLs to `https://creativecommons.org/licenses/by-nc/4.0/` and `ethicsPolicy` to `/governance`.

---

## 3. SEO & Route Issue Register

### `SEO-P0-001` — Missing `/governance` Route, Client `<Suspense>` SSR Bailouts & Broken Internal Links
- **Issue ID:** `SEO-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/governance`, `/resources/environmental-pil`, `/resources/kew-green-heroes`, `/environmental-investigations/reports/[slug]`, `/atlas`, `/sitemap.xml`
- **Affected file:** `src/app/governance/page.tsx`, `src/app/resources/environmental-pil/page.tsx`, `src/app/resources/kew-green-heroes/page.tsx`, `src/components/green-heroes/GreenHeroesSubNav.tsx`, `src/app/environmental-investigations/reports/[slug]/page.tsx`, `src/app/atlas/page.tsx`, `src/app/sitemap.ts`, `src/proxy.ts`
- **Original condition:** `/governance` failed to resolve as a standalone route; `/resources/environmental-pil` and `/resources/kew-green-heroes` served loading placeholders to crawlers; 50+ internal links pointed to legacy/renamed routes; `/himalayan-dispatch` routes were dropped from `sitemap.xml` before subdomain launch.
- **Root cause:** Missing route file, top-level `useSearchParams()` / `mounted` gates causing full-page client bailouts, and unguarded subdomain exclusions.
- **Supporting evidence:** `qa_audit_report.md` & `phase7_8_9_12_report.md`.
- **Corrective action:** Implemented standalone SSR `/governance`, refactored SSR/SSG boundaries across all affected portals, added `generateStaticParams()`, gated Dispatch subdomain canonicals, and added 308 proxy redirects + direct link fixes.
- **Verification method:** `npx next build` (`712/712` static/SSG pages) + live HTTP/HTML verification (`34/34` checks).
- **Current status:** `Resolved`
- **Remaining limitations:** None.
