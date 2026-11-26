import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Directorate — Executive Leadership & Newsroom Structure | Himalayan Dispatch',
  description:
    'Executive leadership, Central Newsroom commissioning structure, Visual Editions Directorate, and Fairfax, Virginia publishing governance of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/editorial-directorate',
});

export default function EditorialDirectoratePage() {
  const { mastheadPositions } = getPublicDispatchBundle();
  const executive = mastheadPositions.filter((p) => p.sectionId === 'I_leadership');
  const centralDesk = mastheadPositions.filter((p) => p.sectionId === 'II_commissioning');
  const visualDesk = mastheadPositions.filter((p) => p.sectionId === 'III_visual');

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Editorial Affairs', href: HD_ROUTES.editorialBoard },
            { label: 'Editorial Directorate' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">EXECUTIVE EDITORIAL GOVERNANCE</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Editorial Directorate
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Headquartered in Fairfax, Virginia, the Editorial Directorate stewards the
              publication’s strategic direction, commissioning standards, inter-bureau coordination,
              and institutional independence from external commercial or political pressure.
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-3"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">PUBLISHING SEAT</span>
            </div>
            <p className="hd-font-display text-2xl font-semibold">Fairfax, Virginia · USA</p>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Editorial decisions rest exclusively with the Founding Editor-in-Chief and senior
              commissioning editors under the{' '}
              <Link href={HD_ROUTES.editorialCharter} className="underline">
                Editorial Charter
              </Link>
              .
            </p>
          </aside>
        </header>

        {[
          {
            kicker: 'DIRECTORATE I · EXECUTIVE LEADERSHIP',
            title: 'Office of the Editor-in-Chief',
            items: executive,
          },
          {
            kicker: 'DIRECTORATE II · COMMISSIONING & COPY',
            title: 'Central Newsroom Desk',
            items: centralDesk,
          },
          {
            kicker: 'DIRECTORATE III · PHOTOGRAPHY, DATA & DESIGN',
            title: 'Visual Editions Directorate',
            items: visualDesk,
          },
        ].map((sec) => (
          <section
            key={sec.kicker}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t first:border-t-0 first:pt-0"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div className="lg:col-span-4 space-y-2">
              <p className="hd-kicker">{sec.kicker}</p>
              <h2 className="hd-font-display text-3xl font-semibold">{sec.title}</h2>
            </div>
            <div className="lg:col-span-8 divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {sec.items.map((p) => (
                <div key={p.id} className="py-5 first:pt-0 space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-kicker">{p.roleTitle}</span>
                  {p.journalistSlug ? (
                    <Link href={HD_ROUTES.journalistPortfolio(p.journalistSlug)} className="block group">
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold italic group-hover:underline">
                        {p.displayHolderName}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold italic">
                      {p.displayHolderName}
                    </h3>
                  )}
                  <p className="hd-folio-meta">{p.domainsRubric}</p>
                  <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {p.mandateDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
