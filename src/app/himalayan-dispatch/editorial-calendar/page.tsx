import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Calendar & Commissioning Windows — Himalayan Dispatch',
  description:
    'Edition production schedule, commissioning deadlines, seasonal Himalayan field-reporting windows, and 10-stage editorial workflow gates.',
  canonicalPath: '/himalayan-dispatch/editorial-calendar',
});

export default function EditorialCalendarPage() {
  const { publicationCalendar, workflowStages } = getPublicDispatchBundle();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Editorial Affairs', href: HD_ROUTES.editorialDirectorate },
            { label: 'Editorial Calendar' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">PUBLICATION CADENCE &amp; COMMISSIONING SCHEDULE</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Editorial Calendar
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Himalayan Dispatch pairs collectible numbered editions—planned months ahead around
            Western Himalayan seasonal transitions—with continuous{' '}
            <Link href={HD_ROUTES.dailyDispatch} className="underline">
              Daily Dispatch
            </Link>{' '}
            field reporting.
          </p>
        </header>

        {/* Active Commissioning & Production Windows */}
        <section className="space-y-6">
          <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <h2 className="hd-font-display text-3xl font-semibold">
              Forthcoming Edition Milestones
            </h2>
            <Link href={HD_ROUTES.forthcoming} className="hd-kicker hover:underline">
              Preview Issue 02 Slate →
            </Link>
          </div>

          <div className="divide-y border-b" style={{ borderColor: 'var(--hd-rule)' }}>
            {publicationCalendar.map((item) => (
              <div
                key={item.id}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="md:col-span-3">
                  <span className="hd-kicker block">{item.editionLabel}</span>
                  <span className="hd-font-display text-2xl font-semibold">{item.editionTitle}</span>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <p className="hd-font-body text-base font-medium" style={{ color: 'var(--hd-fg)' }}>
                    {item.milestone}
                  </p>
                  <p className="hd-folio-meta">{item.gatekeeper}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="hd-folio-meta">{item.windowLabel}</span>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span
                    className="hd-font-sans inline-block px-2.5 py-1 border text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Himalayan Field Windows */}
        <section className="space-y-6">
          <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            Seasonal Western Himalayan Reporting Windows
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l" style={{ borderColor: 'var(--hd-rule)' }}>
            {[
              {
                season: 'WINTER · DEC – FEB',
                title: 'Chillai Kalan, Air Inversions & Winter Wetlands',
                note: 'Valley particulate trapping, Ramsar waterfowl census, Western Disturbance snowpack, and Changthang winter grazing.',
              },
              {
                season: 'SPRING · MAR – MAY',
                title: 'Snowmelt Surge, Karst Springs & Orchard Bloom',
                note: 'Tributary flood preparedness, Ramban–Chenab freeze-thaw slope stability, and Ladakh ice-reservoir irrigation.',
              },
              {
                season: 'SUMMER · JUN – AUG',
                title: 'High Passes, Pastoral Ascent & Monsoon Edge',
                note: 'Subalpine meadow carrying capacity, pilgrimage waste audits, GLOF watch across Karakoram & Zanskar.',
              },
              {
                season: 'AUTUMN · SEP – NOV',
                title: 'End-of-Summer Snowline & Harvest Accounting',
                note: 'Equilibrium-line glacier surveys (late September), autumn forest fire vigils, and riverbed replenishment audits.',
              },
            ].map((w) => (
              <div key={w.season} className="p-6 border-r border-b space-y-2.5" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                <span className="hd-kicker">{w.season}</span>
                <h3 className="hd-font-display text-2xl font-semibold">{w.title}</h3>
                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {w.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 10-Stage Production Gate */}
        <section className="space-y-6">
          <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            Ten-Stage Editorial &amp; Scientific Gate
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l" style={{ borderColor: 'var(--hd-rule)' }}>
            {workflowStages.map((s) => (
              <li key={s.id} className="p-5 border-r border-b space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                  {s.stepNumber}
                </span>
                <h3 className="hd-font-display text-xl font-semibold">{s.label}</h3>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                  {s.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="pt-2">
            <Link
              href={HD_ROUTES.pitch}
              className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
              style={{ backgroundColor: 'var(--hd-copper-solid)' }}
            >
              <span>Pitch for an Open Commissioning Window</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
