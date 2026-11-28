# Kashmir EcoWatch — Comprehensive Security & Data Protection Audit (`Phase 10`)

**Audit Date:** November 27, 2026  
**Scope:** All 72 API Route Handlers, Session/RBAC Modules, WebRTC Conference Rooms, HD-ANIE Fetchers, Geolocation Privacy, Headers & Dependencies  
**Overall Security Status:** **REMEDIATED FOR LOCALHOST PRE-LAUNCH (`0` P0, `0` Unmitigated P1)**

---

## 1. Security Architecture & Audit Coverage

1. **Authentication & Session Cryptography:** Audited NextAuth (`src/auth.ts`), Admin HMAC Sessions (`src/lib/seo/admin-session.ts`), Himalayan Dispatch Newsroom RBAC (`src/lib/hdn/rbac.ts`, `src/lib/hdn/store.ts`), Journalist Sessions (`src/lib/himalayan-dispatch-store.ts`), Virtual Hall Room Tokens (`src/lib/virtual-hall-store.ts`), and client `AuthContext` (`src/context/AuthContext.tsx`).
2. **API Authorization Matrix:** Audited all **72** `route.ts` handlers across `src/app/api/**` for authentication, RBAC, PII exposure, input bounds, and upstream cache-busting (`?refresh=1`).
3. **WebRTC & Conference Hall Isolation:** Audited `/api/webinars/admin`, `/api/webinars/room/[id]`, and `/api/webinars/recordings`.
4. **SSRF, XSS & HTTP Headers:** Audited `src/lib/hd-anie/security.ts`, `src/components/seo/JsonLd.tsx`, and `next.config.js`.
5. **Endangered Wildlife Geolocation Safety:** Audited `src/data/trails-observations.ts`, `src/app/protected-network/trails-and-sightings/page.tsx`, and `src/data/geojson/sightings.json`.

---

## 2. Complete Security Issue Register (`P0` – `P3`)

*(Note: `SEC-P0-001` through `SEC-P0-005` are documented in full in `P0_SECURITY_CONTAINMENT_REPORT.md` and summarized below alongside all `P1`–`P3` findings using the mandatory 12-field schema.)*

### `SEC-P1-006` — Client-Side `localStorage` Role Spoofing Unlocking Admin Dashboards
- **Issue ID:** `SEC-P1-006`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/admin/dashboard`, `/admin/system/errors`, `/preview-error`
- **Affected file:** `src/context/AuthContext.tsx`, `src/app/admin/dashboard/page.tsx`, `src/app/admin/system/errors/page.tsx`, `src/app/preview-error/page.tsx`
- **Original condition:** `AuthContext.tsx` loaded `kew_auth_session` directly from `localStorage`, and admin pages evaluated `const isAuthorized = (isLoggedIn && user?.role === 'administrator') || isMasterUnlocked`, allowing any browser user editing `localStorage` to bypass UI gates.
- **Root cause:** Client contributor preference state was trusted for administrative UI rendering.
- **Supporting evidence:** `AuthContext.tsx:70-84,205` and `admin/dashboard/page.tsx:99`.
- **Corrective action:** Stripped `'administrator'` role assignment from `AuthContext.tsx` `localStorage` hydration and sign-up, and changed all admin pages to require server-verified `/api/admin/session` (`isAuthorized = isMasterUnlocked`).
- **Verification method:** Code inspection + unauthenticated `/api/admin/session` check (`authenticated: false`).
- **Current status:** `Resolved`
- **Remaining limitations:** Contributor sign-in in `AuthContext` remains a local preference profile until Google OAuth (`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`) is configured in production.

---

### `SEC-P1-007` — WebRTC Virtual Hall `peerId` Collision & Cross-Room Recording Tampering
- **Issue ID:** `SEC-P1-007`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `POST /api/webinars/room/[id]`, `POST /api/webinars/recordings`, `POST /api/webinars/admin`
- **Affected file:** `src/app/api/webinars/room/[id]/route.ts`, `src/app/api/webinars/recordings/route.ts`, `src/app/api/webinars/admin/route.ts`
- **Original condition:** (1) An unauthenticated delegate supplying an existing Host's `peerId` in `body.peerId` overwrote the Host's `runtime.participants` entry; (2) a valid recorder token for Room A could upload/stop/delete recordings belonging to Room B because `claims.roomId === rec.roomId` was not checked; (3) `webinars/admin` omitted `secure: process.env.NODE_ENV === 'production'` when setting `ADMIN_SESSION_COOKIE`.
- **Root cause:** Missing participant identity ownership check on rejoin and missing room-scope check on recording IDs.
- **Supporting evidence:** `webinars/room/[id]/route.ts:276-283,401`, `webinars/recordings/route.ts:91-95,272-325`, `webinars/admin/route.ts:430-435`.
- **Corrective action:** Generated a fresh random `peerId` whenever an unauthenticated client collides with a `isVerifiedIdentity` participant; enforced `!adminCheck.authorized && claims?.roomId !== rec.roomId` -> `403` across upload, `stop_recording`, and `delete_recording`; added `secure: process.env.NODE_ENV === 'production'` and brute-force rate limiting.
- **Verification method:** Static & TypeScript verification of all 3 webinar route handlers.
- **Current status:** `Resolved`
- **Remaining limitations:** Virtual Hall participant signaling state is stored in Node process memory (`globalThis`), suitable for single-instance deployment; multi-node horizontal scaling would require Redis pub/sub.

---

### `SEC-P1-008` — SSRF DNS-Rebinding, Redirect-Hop & IPv4-Mapped IPv6 Gaps in HD-ANIE Fetcher
- **Issue ID:** `SEC-P1-008`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/api/himalayan-dispatch/anie`
- **Affected file:** `src/lib/hd-anie/security.ts`
- **Original condition:** `validateExternalFetchUrl()` checked regexes on the initial URL hostname string only; `fetch()` followed 30x HTTP redirects automatically (allowing redirect to `http://169.254.169.254` or `http://127.0.0.1`), did not resolve DNS A/AAAA records prior to connecting, and missed `::ffff:127.0.0.1` / decimal IP encodings.
- **Root cause:** String-only URL validation without DNS lookup or `redirect: 'manual'` inspection.
- **Supporting evidence:** `src/lib/hd-anie/security.ts:9-22,44-65,220-229`.
- **Corrective action:** Added `isPrivateOrReservedIp()` covering RFC1918, loopback, link-local/cloud metadata (`169.254.0.0/16`, `metadata.google.internal`), CGNAT (`100.64.0.0/10`), multicast, and IPv4-mapped IPv6 (`::ffff:`), blocked numeric/hex IP host encodings, added pre-fetch `dns.promises.lookup(host, { all: true })` validation, and switched `fetch` to `redirect: 'manual'` with per-hop URL + DNS validation (max 3 hops).
- **Verification method:** Code review & TypeScript compilation of `src/lib/hd-anie/security.ts`.
- **Current status:** `Resolved`
- **Remaining limitations:** Only authenticated newsroom admins can register custom feed URLs; seed feeds are static reputable publishers.

---

### `SEC-P1-009` — Fine-Scale GPS Coordinates Exposed for Poaching-Sensitive Critically Endangered Wildlife
- **Issue ID:** `SEC-P1-009`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/protected-network/trails-and-sightings`
- **Affected file:** `src/data/trails-observations.ts`, `src/app/protected-network/trails-and-sightings/page.tsx`
- **Original condition:** `trails-and-sightings/page.tsx:1062` rendered `{obs.latitude.toFixed(3)}°N, {obs.longitude.toFixed(3)}°E` (~110 m precision) even for records marked `sensitivity_level: 'Critical'` and `public_visibility: 'Hidden'` or `'Generalized'` (including Hangul, Snow Leopard camera traps, Kashmir Musk Deer, Western Tragopan, and Black-necked Crane active nests).
- **Root cause:** UI template formatted raw `latitude`/`longitude` without branching on `public_visibility` or `sensitivity_level`.
- **Supporting evidence:** `trails-observations.ts:1371-1738` and `trails-and-sightings/page.tsx:1062`.
- **Corrective action:** Coarse-rounded underlying coordinates to `0.1°` (~11 km grid) in `trails-observations.ts`, changed Snow Leopard `OBS-JK-109` from `'Public'` to `'Generalized'`, and updated `trails-and-sightings/page.tsx` to mask coordinates completely (`Coords: Masked for Species Protection`) when `public_visibility === 'Hidden'` or `sensitivity_level === 'Critical'`, and show `~0.1°` (`10 km Generalized Grid`) when `'Generalized'`.
- **Verification method:** Source & rendered output verification on `/protected-network/trails-and-sightings`.
- **Current status:** `Resolved`
- **Remaining limitations:** Future citizen-science observation intake must apply server-side coordinate fuzzing prior to database persistence.

---

### `SEC-P2-010` — Unthrottled `?refresh=1` Upstream Cache-Busting Across 6 Live APIs
- **Issue ID:** `SEC-P2-010`
- **Severity:** `P2 Moderate`
- **Verification Class:** `Verified`
- **Affected route:** `/api/environmental-monitoring/air-pollution`, `/api/hazard-intelligence/earthquakes`, `/api/hazard-intelligence/western-disturbances`, `/api/hazard-intelligence/jet-stream-circulation`, `/api/hazard-intelligence/monsoon-dynamics`, `/api/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts`
- **Affected file:** `src/lib/seo/admin-session.ts` (`allowForcedUpstreamRefresh`) and the 6 route handlers above
- **Original condition:** Any anonymous client passing `?refresh=1` bypassed server memory caches on every request, enabling upstream rate-limit exhaustion against Open-Meteo, USGS, EMSC, and AirGradient.
- **Root cause:** Client "Refresh" button query flag lacked a server-side cooldown guard.
- **Supporting evidence:** `air-pollution/route.ts:210`, `earthquakes/route.ts:288`, and 4 synoptic routes (`line 8`).
- **Corrective action:** Implemented `allowForcedUpstreamRefresh(request, endpointKey, 60_000)` enforcing a 60-second global and per-IP cooldown on forced upstream refreshes while still serving cached responses with `HTTP 200`.
- **Verification method:** Route inspection across all 6 endpoints.
- **Current status:** `Resolved`
- **Remaining limitations:** Cooldown map is per Node worker instance.

---

### `SEC-P2-011` — Missing Baseline Browser Security Headers & JSON-LD Separator Escaping
- **Issue ID:** `SEC-P2-011`
- **Severity:** `P2 Moderate`
- **Verification Class:** `Verified`
- **Affected route:** `/:path*` (all routes)
- **Affected file:** `next.config.js`, `src/components/seo/JsonLd.tsx`
- **Original condition:** `next.config.js` `headers()` set `X-Robots-Tag` on admin routes but omitted `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and production `Strict-Transport-Security`; `JsonLd.tsx` escaped `<` but not `>`, `&`, `U+2028`, or `U+2029`.
- **Root cause:** Incomplete baseline HTTP hardening configuration.
- **Supporting evidence:** `next.config.js:34-73`, `JsonLd.tsx:12`.
- **Corrective action:** Added global `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and production `Strict-Transport-Security` in `next.config.js` (plus `images.qualities: [75, 85]`), and escaped `<`, `>`, `&`, `\u2028`, `\u2029` in `JsonLd.tsx`.
- **Verification method:** Response header check on `http://localhost:3000`.
- **Current status:** `Resolved`
- **Remaining limitations:** A strict nonce-based `Content-Security-Policy` can be layered in Phase II once Leaflet/inline style hashes are cataloged.
