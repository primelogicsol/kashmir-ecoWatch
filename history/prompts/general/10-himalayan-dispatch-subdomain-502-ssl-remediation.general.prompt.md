---
id: 10
title: Himalayan Dispatch Subdomain 502 & SSL Forensic Diagnosis and Dual-Mode Routing Remediation
stage: general
date_iso: 2026-11-26
surface: agent
model: antigravity
feature: himalayan-dispatch-subdomain
branch: main
user: fayaz
command: subdomain-502-ssl-remediation
labels: ["himalayan-dispatch", "nginx", "ssl", "502-bad-gateway", "subdomain-routing", "localhost-preservation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/proxy.ts
  - src/lib/himalayan-dispatch-routes.ts
  - src/lib/himalayan-dispatch-server-context.ts
  - src/lib/hdn/routes.ts
  - src/lib/seo/route-metadata.ts
  - src/auth.ts
  - next.config.js
  - src/app/himalayan-dispatch/layout.tsx
  - src/app/himalayan-dispatch/robots.txt/route.ts
  - src/app/himalayan-dispatch/sitemap.xml/route.ts
  - src/app/himalayan-dispatch/feed.xml/route.ts
  - src/app/himalayan-dispatch/manifest.webmanifest/route.ts
  - src/app/himalayan-dispatch/editorial-cms/page.tsx
  - deploy/vps-himalayan-dispatch/01-audit-and-backup.sh
  - deploy/vps-himalayan-dispatch/02-activate-subdomain-ssl.sh
  - deploy/vps-himalayan-dispatch/03-rollback.sh
  - deploy/vps-himalayan-dispatch/nginx/dispatch.kashmir-ecowatch.com.http-bootstrap.conf
  - deploy/vps-himalayan-dispatch/nginx/dispatch.kashmir-ecowatch.com.ssl.conf
  - scripts/verify-dispatch-subdomain.mjs
tests_yaml: |
  - Live forensic TLS SNI & HTTP probe against 74.208.248.57 (dispatch.kashmir-ecowatch.com, api.primelogicsol.com, kashmir-ecowatch.com)
  - Isolated production Next.js 16.2.9 build (.next-dispatch-verify)
  - Dual-mode end-to-end validation suite (scripts/verify-dispatch-subdomain.mjs): 115/115 pre-cutover + 123/123 cutover assertions passed; live localhost:3002/himalayan-dispatch verified HTTP 200
prompt_text: |
  HIMALAYAN DISPATCH — CRITICAL SUBDOMAIN 502 BAD GATEWAY & SSL REMEDIATION
  Diagnose and repair the Dispatch subdomain configuration (502 Bad Gateway + HTTPS Not Secure on https://dispatch.kashmir-ecowatch.com/) on existing VPS 74.208.248.57 without disrupting https://kashmir-ecowatch.com or http://localhost:3002/himalayan-dispatch. Remove all public AI disclosures and gate legacy redirects until subdomain verification completes. Obtain administrator authorization before applying production changes or reloading services.
response_text: |
  - Identified exact root cause of both errors via live TLS SNI & HTTP forensic probing of 74.208.248.57: no Nginx server block for dispatch.kashmir-ecowatch.com exists yet on port 443, causing Nginx to fall back to the alphabetically first SSL vhost on the shared VPS (`api.primelogicsol.com`), presenting its certificate (`CN=api.primelogicsol.com` -> HTTPS Not Secure) and forwarding to its stopped backend (`502 Bad Gateway`), while `https://kashmir-ecowatch.com/` is `200 OK`.
  - Updated `deploy/vps-himalayan-dispatch/01-audit-and-backup.sh` and `02-activate-subdomain-ssl.sh` so they never assume port 3002, dynamically extracting and health-checking the actual live `proxy_pass` upstream from the `kashmir-ecowatch.com` Nginx block before issuing the Let's Encrypt cert and reloading Nginx gracefully.
  - Implemented concurrency-safe per-request hostname routing (`src/proxy.ts`, `src/lib/himalayan-dispatch-routes.ts`, `src/lib/himalayan-dispatch-server-context.ts`, `src/auth.ts`), removed all public AI disclosures and `/ai-editorial-transparency`, gated `kashmir-ecowatch.com/himalayan-dispatch/*` 308 redirects behind `DISPATCH_LEGACY_REDIRECTS_ENABLED=true`, and verified 238/238 assertions locally while keeping `localhost:3002/himalayan-dispatch` untouched.
outcome: |
  Exact 502 + SSL root cause proven, Nginx/Certbot auto-detecting remediation scripts and rollback prepared, and dual-mode Next.js routing verified 100% locally awaiting administrator execution approval on 74.208.248.57.
---
