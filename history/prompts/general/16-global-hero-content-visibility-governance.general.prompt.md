---
id: 16
title: Global Hero Content Visibility, Responsiveness & Overflow Governance
stage: general
date_iso: 2026-11-26
surface: agent
model: antigravity
feature: none
branch: main
user: fayaz
command: global-hero-content-visibility-governance
labels: ["hero", "responsive", "typography", "overflow", "css-governance", "playwright", "regression-testing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/app/globals.css
  - src/components/common/Heading.tsx
  - src/components/common/WaterEntityListingPage.tsx
  - src/components/common/BiodiversityCategoryPage.tsx
  - src/components/common/ProtectedCategoryPage.tsx
  - src/components/common/SeasonalListingPage.tsx
  - src/components/common/PageHeader.tsx
  - src/components/common/ProtectedAreaDetailPage.tsx
  - src/components/common/ProtectedAreaManagementPlanPage.tsx
  - src/components/common/WaterEntityDetailPageComponent.tsx
  - src/components/common/SpeciesDetailPage.tsx
  - src/components/common/CorridorDetailPage.tsx
  - src/components/common/ReportDetailPage.tsx
  - src/components/common/TrailDetailPage.tsx
  - src/components/common/ThreatDetailPage.tsx
  - src/components/common/SeasonalDetailPage.tsx
  - src/components/earth-human-impact/EhiiHeroShowcaseCard.tsx
  - scripts/audit/hero-compliance-audit.js
  - package.json
  - 193 KEW hero page.tsx files (0 Himalayan Dispatch files)
tests_yaml: |
  - Static source governance audit across all 525 KEW routes and 376 <Heading> blocks (0 violations)
  - Playwright 12-device/orientation rendered DOM audit across 18 hero archetypes (146/146 passed)
  - Playwright 8-zoom-level audit (80%, 100%, 110%, 125%, 150%, 175%, 200%, 250% — 56/56 passed)
  - Playwright completed carousel slide audit across 35 individual slides (35/35 passed)
prompt_text: |
  Establish a universal hero content visibility, responsiveness, and overflow governance standard across every existing Kashmir EcoWatch hero section (excluding Himalayan Dispatch). Discover and audit all shared and inline heroes, eliminate headline/subtitle/metadata/CTA clipping and narrow-column compression, allow headings to utilize available width independently of descriptions, preserve 100% homepage and 80% module hero height standards, verify across 4K/5K/ultrawide/desktop/vertical/laptop/tablet/mobile and 80%–250% zoom + all carousel slides, and integrate reusable automated regression testing.
response_text: |
  Discovered 470 active KEW hero sections across 525 KEW routes (94 Himalayan Dispatch/Newsroom routes strictly excluded) and remediated all 251 confirmed hero visibility, width, wrapping, and overflow defects:
  - Established centralized hero content governance tokens in `src/app/globals.css` (`max-width: 100%`, `white-space: normal`, `box-decoration-break: clone`, descender padding, badge/breadcrumb/CTA wrapping, `+2.75rem` desktop carousel rail clearance, `4.85rem` mobile rail clearance).
  - Upgraded `Heading.tsx` (`407` routes), `WaterEntityListingPage.tsx` (`13` routes including `/water-systems/lakes`), category/listing wrappers, `EhiiHeroShowcaseCard.tsx` (`30` routes), `PageHeader.tsx`, and all 9 shared entity detail hero templates (`ProtectedAreaDetailPage`, `WaterEntityDetailPageComponent`, `SpeciesDetailPage`, `CorridorDetailPage`, `ReportDetailPage`, `TrailDetailPage`, `ThreatDetailPage`, `SeasonalDetailPage`, `ProtectedAreaManagementPlanPage`).
  - Removed 162 hardcoded `whitespace-nowrap` headline constraints across 152 `<Heading>` pages and 67 narrow `max-w-*` (`max-w-xl..6xl`) heading constraints across 45 inline/custom hero pages.
  - Integrated `scripts/audit/hero-compliance-audit.js` (`npm run audit:hero-compliance`) and verified 0 failures across 525 static route checks and 237 rendered Playwright checks.
outcome: |
  Universal hero content visibility standard enforced across the entire Kashmir EcoWatch platform with zero clipping, full-width headline freedom, preserved 100%/80% height standards, and permanent automated regression protection.
---
