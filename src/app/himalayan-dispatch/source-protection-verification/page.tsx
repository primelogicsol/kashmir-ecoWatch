import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Source Protection & Documentary Verification — Himalayan Dispatch',
  description:
    'Confidential source handling, three-tier protection classification, primary-source fact-checking methodology, and ecological location redaction rules.',
  canonicalPath: '/himalayan-dispatch/source-protection-verification',
});

export default function SourceProtectionVerificationPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1340px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Source Protection & Verification' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">CONFIDENTIALITY &amp; CORROBORATION PROTOCOL</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            Source Protection &amp; Verification
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Environmental accountability in fragile mountain jurisdictions requires twin disciplines:
            uncompromising factual corroboration before publication and ironclad protection for
            sources who risk reprisal.
          </p>
        </header>

        {/* Three-Tier Classification */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              tier: 'TIER I · STANDARD ON-RECORD',
              title: 'Named Testimony & Public Filings',
              body: 'Himalayan Dispatch defaults to named attribution wherever safe. Quotes, field observations, and public statutory filings are archived in the article’s Stage 04 verification dossier.',
            },
            {
              tier: 'TIER II · EMBARGOED PRE-PUBLICATION',
              title: 'Withheld Until Right-of-Reply',
              body: 'Active investigative commissions are withheld from public Coming Next slates while documentary audits and formal institutional right-of-reply letters are underway.',
            },
            {
              tier: 'TIER III · STRICT CONFIDENTIAL',
              title: 'Server-Quarantined & Offline Vault',
              body: 'Granted only with Managing Editor & Source Protection Officer approval when a source faces credible physical, legal, or livelihood harm. Identities are known to senior editors for verification yet never stored in public databases or exposed via APIs.',
            },
          ].map((t) => (
            <div
              key={t.tier}
              className="p-7 border space-y-3"
              style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-kicker">{t.tier}</span>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">{t.title}</h2>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {t.body}
              </p>
            </div>
          ))}
        </section>

        {/* Verification & Sensitive Habitat Rules */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">PRIMARY-SOURCE CORROBORATION</span>
            </div>
            <h2 className="hd-font-display text-3xl font-semibold">
              Anonymous Assertions Never Stand Alone
            </h2>
            <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Information provided by a confidential source must be independently corroborated
              through physical field measurement, multi-temporal satellite imagery, court or
              environmental clearance records, or multiple independent witnesses before publication.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4 lg:border-l lg:pl-10" style={{ borderColor: 'var(--hd-rule)' }}>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">ECOLOGICAL COORDINATE PROTECTION</span>
            </div>
            <h2 className="hd-font-display text-3xl font-semibold">
              Endangered Wildlife &amp; Sacred Site Safeguards
            </h2>
            <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Precise GPS coordinates and camera-trap EXIF metadata are stripped or coarsened whenever
              exact disclosure could expose Hangul fawning grounds, markhor cliffs, rare alpine
              medicinal plants, or unguarded heritage shrines to poaching or vandalism.
            </p>
          </div>
        </section>

        <div className="p-6 border flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--hd-rule)' }}>
          <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
            To request an encrypted Signal or PGP key handoff—without transmitting sensitive documents over standard HTTP forms—use the Commissioning Desk flag.
          </p>
          <Link href={HD_ROUTES.pitch} className="hd-kicker hover:underline">
            Request Secure Handoff →
          </Link>
        </div>
      </div>
    </div>
  );
}
