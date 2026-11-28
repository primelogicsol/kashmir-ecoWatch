import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY,
  HIMALAYAN_DISPATCH_FOUNDING_STORY,
} from '@/data/himalayan-dispatch-founding-story';

export const metadata: Metadata = buildPageMetadata({
  title: 'Publication Imprint & Legal Colophon — Himalayan Dispatch',
  description:
    'Official publication imprint, Fairfax, Virginia publishing headquarters, institutional stewardship disclosures, and citation colophon of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/imprint',
});

export default function PublicationImprintPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.editorialCharter },
            { label: 'Publication Imprint' },
          ]}
        />

        <header className="max-w-3xl space-y-4 pb-10 border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <p className="hd-kicker">OFFICIAL PERIODICAL COLOPHON</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            Publication Imprint
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Published in the United States. Reporting from the Western Himalayas. Written for the world.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">I · EDITORIAL &amp; PUBLISHING HEADQUARTERS</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Fairfax, Virginia 22031 · United States of America
            </h2>
            <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <strong>Himalayan Dispatch</strong>
              <br />
              Published by Kashmir EcoWatch Western Himalayas
              <br />
              Supported by Dr. Kumar Foundation USA · Kumar Trust USA
              <br />
              Editorial &amp; Publishing Headquarters · Fairfax, Virginia 22031 · United States of America
              <br />
              Six Regional Reporting Bureaus · Western Himalayas
            </p>
            <p className="hd-folio-meta pt-2">
              CORRESPONDENCE: <Link href={HD_ROUTES.contact} className="underline">CONTACT THE EDITORIAL DESK</Link>
            </p>
          </section>

          <section className="p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">II · PUBLISHER &amp; INSTITUTIONAL LINEAGE</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Kashmir EcoWatch Western Himalayas
            </h2>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Himalayan Dispatch is published as the flagship environmental journalism periodical of{' '}
              <a href={toKewPlatformUrl('/')} className="underline">
                Kashmir EcoWatch (KEW) Western Himalayas
              </a>
              , supported non-commercially by Dr. Kumar Foundation USA · Kumar Trust USA under a
              strict firewall protecting editorial independence from philanthropic or administrative
              interference.
            </p>
          </section>

          <section className="p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">III · DISTRIBUTED REGIONAL BUREAUS DISCLOSURE</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
              Field Reporting Desks vs. Physical Offices
            </h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Regional bureaus in Kashmir, Jammu, and Ladakh (established reporting desks) and in
              AJ&amp;K, Gilgit, and Baltistan (desks in establishment) denote distributed editorial
              correspondent networks—not commercial storefronts or walk-in regional offices.
            </p>
          </section>

          <section className="p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">IV · EDITORIAL RESPONSIBILITY &amp; ARCHIVAL CITATION</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
              Founding Editor-in-Chief: Dr. Fayaz Ahmad Khan
            </h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Established 2026 · English-language digital environmental periodical with permanent
              issue URLs (<code className="text-xs">dispatch.kashmir-ecowatch.com/issues/[issue-slug]</code>)
              and continuous Daily Dispatch archival records.
            </p>
          </section>

          <section
            className="md:col-span-2 p-8 sm:p-10 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="lg:col-span-7 space-y-3">
              <p className="hd-kicker">V · OUR STORY &amp; FOUNDING MANDATE</p>
              <h2 className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight">
                {HIMALAYAN_DISPATCH_FOUNDING_STORY.title}
              </h2>
              <p
                className="hd-font-body text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst}
              </p>
              <div className="pt-1">
                <Link
                  href={HD_ROUTES.ourStory}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  <span>Read Our Founding Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div
              className="lg:col-span-5 lg:border-l lg:pl-8 space-y-2"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.kicker}</p>
              <p
                className="hd-font-display text-2xl sm:text-3xl italic font-semibold leading-snug"
                style={{ color: 'var(--hd-fg)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}
              </p>
              <p
                className="hd-font-display text-2xl sm:text-3xl italic font-semibold leading-snug"
                style={{ color: 'var(--hd-copper)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
