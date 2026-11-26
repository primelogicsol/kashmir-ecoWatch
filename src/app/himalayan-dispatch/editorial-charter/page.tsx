import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EDITORIAL_CHARTER_COMMITMENTS } from '@/data/himalayan-dispatch';
import { HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY } from '@/data/himalayan-dispatch-founding-story';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Charter — Independence, Accuracy & Public Witness | Himalayan Dispatch',
  description:
    'The foundational 15-principle Editorial Charter governing editorial independence, scientific accuracy, right of reply, and transboundary mountain journalism at Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/editorial-charter',
});

export default function EditorialCharterPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1340px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Editorial Charter' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">FOUNDATIONAL CONSTITUTION OF THE PERIODICAL</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            The Himalayan Dispatch Editorial Charter
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Adopted at founding in 2026, this Charter binds every masthead editor, regional
            correspondent, photographer, scientific reviewer, and contributor whose work appears in
            Himalayan Dispatch.
          </p>
        </header>

        {/* Founding Philosophy & Institutional Origin */}
        <section
          className="p-8 sm:p-10 lg:p-12 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="lg:col-span-6 space-y-3">
            <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.kicker}</p>
            <blockquote className="space-y-1.5">
              <p
                className="hd-font-display text-2xl sm:text-4xl italic font-semibold leading-tight"
                style={{ color: 'var(--hd-fg)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}
              </p>
              <p
                className="hd-font-display text-2xl sm:text-4xl italic font-semibold leading-tight"
                style={{ color: 'var(--hd-copper)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
              </p>
            </blockquote>
          </div>

          <div
            className="lg:col-span-6 lg:border-l lg:pl-10 space-y-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Himalayan Dispatch was born out of necessity after nearly two years of unanswered
              efforts to find a consistent platform for transboundary Western Himalayan
              environmental evidence. This Charter codifies our commitment to independence without
              hostility: evaluating every contribution on scientific integrity and public importance
              rather than institutional prominence, and remaining accountable to evidence above all
              else.
            </p>
            <div>
              <Link
                href={HD_ROUTES.ourStory}
                className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-copper)' }}
              >
                <span>Read Our Founding Story: When Silence Became the Reason to Speak</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-5 hd-prose">
            <p className="hd-dropcap">
              Mountain watersheds cross administrative lines, electoral cycles, and disciplinary
              silos. Journalism worthy of the Western Himalayas must therefore remain fiercely
              independent of state patronage, corporate underwriting, and partisan advocacy—guided
              instead by verifiable physical evidence, primary documentary records, and respect for
              human dignity.
            </p>
            <p>
              While Himalayan Dispatch draws empirical context from the Kashmir EcoWatch scientific
              platform, editorial commissioning, narrative judgment, and investigative conclusions
              rest exclusively with our Editorial Directorate. Philanthropic supporters of KEW hold
              zero pre-publication review rights over any story.
            </p>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:pl-12 space-y-4" style={{ borderColor: 'var(--hd-rule)' }}>
            <h2 className="hd-font-display text-3xl font-semibold pb-2 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              Fifteen Binding Commitments
            </h2>
            <ol className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {EDITORIAL_CHARTER_COMMITMENTS.map((item, idx) => (
                <li key={item.principle} className="py-3.5 grid grid-cols-12 gap-3 items-baseline" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="col-span-2 sm:col-span-1 hd-font-display text-xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-10 sm:col-span-11">
                    <span className="hd-font-display text-xl font-semibold mr-2">{item.principle}:</span>
                    <span className="hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {item.standard}.
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="pt-6 border-t flex flex-wrap gap-6" style={{ borderColor: 'var(--hd-rule)' }}>
          <Link href={HD_ROUTES.ourStory} className="hd-kicker hover:underline">
            Our Founding Story →
          </Link>
          <Link href={HD_ROUTES.sourceProtection} className="hd-kicker hover:underline">
            Source Protection &amp; Verification →
          </Link>
          <Link href={HD_ROUTES.scientificReview} className="hd-kicker hover:underline">
            Scientific Review Protocol →
          </Link>
          <Link href={HD_ROUTES.publicEditor} className="hd-kicker hover:underline">
            Office of the Public Editor →
          </Link>
        </div>
      </div>
    </div>
  );
}
