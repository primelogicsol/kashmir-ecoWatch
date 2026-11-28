# Kashmir EcoWatch — Himalayan Dispatch & HD-ANIE Editorial Integrity Audit (`Phase 11`)

**Audit Date:** November 27, 2026  
**Scope:** Static Magazine & Daily Dispatch Corpus, Legacy Autonomous Queue, and HD-ANIE (`src/lib/hd-anie/**`, `src/app/himalayan-dispatch/**`, `src/components/himalayan-dispatch/**`)  
**Editorial Integrity Status:** **REMEDIATED (`100%` AI/Automation Disclosures Rendered, `CC BY-ND` Protected, Original Author Bylines Preserved)**

---

## 1. Audit of Content Generation Pipelines

Himalayan Dispatch operates three distinct editorial pipelines:
1. **Inaugural & Static Curated Editions (`src/data/himalayan-dispatch.ts`, `himalayan-dispatch-price-of-paradise.ts`, `himalayan-dispatch-founding-story.ts`):** Pre-authored monograph/magazine features and daily dispatches seeded into `data/himalayan-dispatch-editorial-store.json`.
2. **Autonomous Queue Seeds (`src/data/himalayan-dispatch-autonomous.ts`):** Pre-staged research dispatches requiring administrator approval before publication.
3. **HD-ANIE — Autonomous Newsroom Intelligence Engine (`src/lib/hd-anie/**`):** Polls 16 external feeds (13 RSS feeds + GDELT 2.0 + OpenAlex + Crossref), clusters Western Himalayan ecological signals, correlates internal KEW baselines, composes structured multi-chapter research drafts (`editorialStatus: 'awaiting_review'`), optionally refines standfirsts via local Ollama, and **never auto-publishes without human administrator scheduling/approval**.

---

## 2. Editorial Integrity Issue Register (`P0` – `P3`)

### `EDI-P0-001` — Omission of AI/Automation Disclosures on Published ANIE Stories & Unrendered `aiAssistanceDisclosure` / `corrections` on Daily Dispatches
- **Issue ID:** `EDI-P0-001`
- **Severity:** `P0 Critical`
- **Verification Class:** `Verified`
- **Affected route:** `/himalayan-dispatch/story/[slug]`, `/himalayan-dispatch/daily-dispatch/[slug]`, `/himalayan-dispatch/feed.xml`
- **Affected file:** `src/types/himalayan-dispatch.ts`, `src/lib/hd-anie/writer-verifier.ts`, `src/components/himalayan-dispatch/StoryReaderClient.tsx`, `src/app/himalayan-dispatch/daily-dispatch/[slug]/page.tsx`, `src/components/himalayan-dispatch/DailyDispatchClient.tsx`, `src/app/himalayan-dispatch/feed.xml/route.ts`
- **Original condition:** `projectAnieDraftToMagazineStory()` discarded `draft.isAiAssisted: true`, stamped `scientificReviewer` even when `draft.scientificReviewApproved === false`, and `StoryReaderClient.tsx` displayed `"Fact-Checked & Scientifically Reviewed"` on every story. Meanwhile, `DailyDispatchArticle.aiAssistanceDisclosure` and `article.corrections` were defined in TypeScript and populated by the store, but **never rendered** on Daily Dispatch pages or RSS feeds.
- **Root cause:** Incomplete projection mapping between `AnieEditorialDraft` and public `MagazineStory` / `DailyDispatchArticle` templates.
- **Supporting evidence:** `writer-verifier.ts:729-755,828-873`, `StoryReaderClient.tsx:201-204`, `daily-dispatch/[slug]/page.tsx:1-271` (`[P11-P0-01]`).
- **Corrective action:** Added `isAiAssisted` and `aiAssistanceDisclosure` to `MagazineStory`, preserved them in `projectAnieDraftToMagazineStory()`, gated `"Fact-Checked & Scientifically Reviewed"` strictly on `scientificReviewApproved === true` (rendering an explicit Automated Multi-Source Synthesis disclosure banner otherwise), and rendered both `aiAssistanceDisclosure` and `corrections` across `daily-dispatch/[slug]/page.tsx`, `DailyDispatchClient.tsx`, and `feed.xml/route.ts`.
- **Verification method:** Code & SSR render verification of `/himalayan-dispatch` story and daily-dispatch routes.
- **Current status:** `Resolved`
- **Remaining limitations:** Human editorial sign-off remains mandatory before moving any `awaiting_review` ANIE draft to `published`.

---

### `EDI-P1-002` — Unquoted 500-Char RSS Excerpt Splicing, `CC BY-ND` (`Mongabay-India`) Derivative Risk & Dropped Author Bylines
- **Issue ID:** `EDI-P1-002`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/himalayan-dispatch/newsroom`, `/himalayan-dispatch/story/[slug]`
- **Affected file:** `src/lib/hd-anie/writer-verifier.ts`, `src/lib/hd-anie/sources-seed.ts`, `src/lib/hd-anie/intelligence.ts`
- **Original condition:** `composeEvidenceBoundChapters()` spliced up to 500 characters of external RSS `<description>` text into generated paragraphs without quotation marks (including `Mongabay-India`, which carries `CC BY-ND 4.0` NoDerivatives terms), and `AnieSourceReferenceCitation` dropped `authors: string[]` extracted by `discovery.ts`.
- **Root cause:** Template synthesizer treated raw RSS excerpts as paraphrase-free notes and omitted the `authors` field during citation serialization.
- **Supporting evidence:** `writer-verifier.ts:285-355,628-649,804-809`, `sources-seed.ts:158` (`[P11-P1-01]`, `[P11-P1-02]`).
- **Corrective action:** Excluded `CC BY-ND` feeds (`Mongabay-India`) from derivative excerpt synthesis (retaining headline/link bibliographic citation only), bounded any fair-dealing factual excerpt to short explicitly quoted phrases (`"..."`), and preserved original human reporter/academic `authors` through `AnieSourceReferenceCitation` into `documentarySources`.
- **Verification method:** Inspection of `writer-verifier.ts` and `sources-seed.ts`.
- **Current status:** `Resolved`
- **Remaining limitations:** Human editors must verify fair-dealing bounds prior to publishing any external quotation.

---

### `EDI-P1-003` — Naive Event-Date Stamping, Missing 14-Day Cluster Window, Cover Story Status Note & Vault Disclosures
- **Issue ID:** `EDI-P1-003`
- **Severity:** `P1 High`
- **Verification Class:** `Verified`
- **Affected route:** `/himalayan-dispatch`, `/himalayan-dispatch/source-protection-verification`, `/himalayan-dispatch/public-editor`
- **Affected file:** `src/lib/hd-anie/intelligence.ts`, `src/data/himalayan-dispatch-price-of-paradise.ts`, `src/data/himalayan-dispatch-autonomous.ts`, `src/data/himalayan-dispatch.ts`, `src/app/himalayan-dispatch/source-protection-verification/page.tsx`, `src/app/himalayan-dispatch/public-editor/page.tsx`
- **Original condition:** `estimateEventDate()` defaulted physical event dates to paper publication dates; `intelligence.ts:361-376` omitted the commented 14-day cluster window; `THE_PRICE_OF_PROTECTING_PARADISE_STORY` rendered `'Final editorial manuscript awaiting administrator approval'` while `isPublished: true`; reused stock banners lacked `'Illustrative archival plate'` captions; and `source-protection-verification` promised an offline air-gapped vault while notes were plaintext JSON.
- **Root cause:** Incomplete temporal/clustering heuristics and aspirational governance copy.
- **Supporting evidence:** `phase10_11_report.md` (`[P11-P1-03]`, `[P11-P1-04]`, `[P11-P2-01..03]`, `[P11-P3-01..02]`).
- **Corrective action:** Separated `Source Published Date` from explicit `Observed Event Window`, enforced `14 * 86400_000` ms cluster matching, removed unimplemented `OPENAI_API_KEY` label branch, reconciled cover story publication status note, switched institutional desk JSON-LD `author` to `@type: 'Organization'`, added `'Illustrative archival plate'` credits and inaugural seed disclosures, encrypted confidential source notes with `AES-256-GCM`, and aligned source-protection/public-editor governance copy with actual architecture.
- **Verification method:** Code review + SSR page check.
- **Current status:** `Resolved`
- **Remaining limitations:** Tier III whistleblowers are explicitly advised on `/himalayan-dispatch/source-protection-verification` to use out-of-band encrypted channels rather than web forms.
