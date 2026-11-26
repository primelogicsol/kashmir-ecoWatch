---
id: 11
title: Custom Partner Institution Entry & Verification Workflow for Free Scientific Event Hosting
stage: general
date_iso: 2026-11-26
surface: agent
model: antigravity
feature: webinars-custom-institution-hosting
branch: main
user: fayaz
command: add-custom-institution-hosting
labels: ["webinars", "host-a-conference", "institutional-verification", "admin-governance", "duplicate-prevention"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/types/virtual-hall.ts
  - src/lib/virtual-hall-store.ts
  - src/app/api/webinars/admin/route.ts
  - src/app/webinars/host-a-conference/page.tsx
  - src/app/webinars/institution/verification/page.tsx
  - src/app/webinars/institution/register/page.tsx
  - src/app/webinars/admin/page.tsx
  - src/app/webinars/admin/institution-approvals/page.tsx
  - src/app/webinars/admin/conference-approvals/page.tsx
tests_yaml: |
  - TypeScript type check on modified virtual-hall and webinar modules (0 errors)
  - Live localhost:3002 end-to-end verification (25/25 assertions passed)
prompt_text: |
  Add a fourth option "Other Institution (Custom Entry)" at the bottom of the Applying Partner Institution dropdown on http://localhost:3002/webinars/host-a-conference. Dynamically display Full Institution Name, Institution Type (plus Custom Institution Type when Other is selected), Country, City / Region, Official Website (if available), Authorized Representative, and Institutional Contact Email. Integrate with /webinars/institution/verification with Pending Verification status, prevent duplicate institutional records, enforce verification before approval, and support admin review/verify/approve/reject/request-documentation workflows while preserving Phase I limits and $0 policy.
response_text: |
  - Added "Other Institution (Custom Entry)" at the bottom of the Applying Partner Institution dropdown on `/webinars/host-a-conference`, dynamically rendering all required New Institution Details fields (including conditional Custom Institution Type when "Other" is selected and optional Official Website).
  - Integrated combined single-step submission into `/api/webinars/admin` and `virtual-hall-store.json` with `Pending Verification` status (`verificationStatus: 'pending'`), deduplication across partner and pending institutions (`409` duplicate block + placeholder dossier linking), and server-enforced verification prior to event approval.
  - Connected `/webinars/institution/verification`, `/webinars/admin`, `/webinars/admin/institution-approvals`, and `/webinars/admin/conference-approvals` to live store persistence with Review, Verify, Approve, Request Documentation, and Reject controls.
outcome: |
  25/25 automated end-to-end checks passed on live http://localhost:3002 with zero TypeScript errors and clean store state.
---
