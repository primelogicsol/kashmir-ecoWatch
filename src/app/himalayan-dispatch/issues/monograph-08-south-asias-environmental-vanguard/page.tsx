import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { SouthAsianVanguardWorkbench } from '@/components/himalayan-dispatch/SouthAsianVanguardWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  FOUR_PROFESSIONAL_MIRRORS,
  SOUTH_ASIAN_VANGUARD_32_PERSONALITIES,
  SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC,
  VANGUARD_MONOGRAPH_CHAPTERS_60,
  VANGUARD_MONOGRAPH_VOLUMES_7,
} from '@/data/himalayan-dispatch-south-asian-vanguard-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 08 — South Asia’s Environmental Vanguard (7 Volumes · 60 Chapters · 32 Biographies) | Himalayan Dispatch',
  description: SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck,
  canonicalPath:
    '/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard',
  imagePath: '/images/publications/kolahoi-glacier-cryosphere.jpg',
});

export default function Monograph08SouthAsianVanguardPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.monographCode,
    name: `${SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.title}: ${SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.subtitle}`,
    description: SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-08-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 08 · South Asia’s Environmental Vanguard' },
          ]}
        />

        {/* Monumental Monograph 08 Cover Header */}
        <header
          className="p-8 sm:p-12 lg:p-16 border space-y-8"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
            <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 14 OF 27
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 italic leading-relaxed max-w-4xl">
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {st.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BYLINE: {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                GEOGRAPHICAL FOCUS: {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 14 Feature</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={toKewPlatformUrl('/resources/kew-green-heroes/south-asian-vanguard')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Green Heroes Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.title} | Himalayan Dispatch Monograph 08`}
                description={SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Central Thesis & Biographical Provenance Note */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-7 p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">CENTRAL PROFESSIONAL QUESTION</p>
            <h2
              className="hd-font-display text-2xl sm:text-4xl font-semibold leading-snug"
              style={{ color: 'var(--hd-fg)' }}
            >
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.centralThesis}
            </h2>
          </div>

          <aside
            className="lg:col-span-5 p-6 sm:p-8 border space-y-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">BIOGRAPHICAL RESEARCH &amp; NON-RANKING CHARTER</span>
            </div>
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.researchVerificationNote}
            </p>
          </aside>
        </section>

        {/* Interactive Four-Mirror & Leadership Workbench */}
        <SouthAsianVanguardWorkbench variant="editorial" />

        {/* Complete 7-Volume, 60-Chapter Monograph Architecture */}
        <section className="space-y-8">
          <div
            className="border-b pb-4 flex flex-wrap items-baseline justify-between gap-4"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div>
              <p className="hd-kicker">SECTION XI · FULL MONOGRAPH ARCHITECTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                7 Thematic Volumes &amp; 60 Proposed Chapters
              </h2>
            </div>
            <span className="hd-folio-meta">VOLUMES I–VII · CHAPTERS 01–60</span>
          </div>

          <div className="space-y-8">
            {VANGUARD_MONOGRAPH_VOLUMES_7.map((vol) => {
              const volChapters = VANGUARD_MONOGRAPH_CHAPTERS_60.filter(
                (c) => c.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} · CHAPTERS {vol.chapterRange}
                      </span>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold mt-0.5"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {vol.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.thematicFocus}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {volChapters.map((ch) => {
                      const person = ch.linkedPersonalityId
                        ? SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.find(
                            (p) => p.id === ch.linkedPersonalityId
                          )
                        : null;
                      return (
                        <Link
                          key={ch.slug}
                          href={HD_ROUTES.monographSouthAsianVanguardChapter(ch.slug)}
                          className="p-4 border flex flex-col justify-between gap-2 group hover:opacity-90"
                          style={{
                            borderColor: 'var(--hd-rule)',
                            backgroundColor: 'var(--hd-bg)',
                          }}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="hd-folio-meta"
                                style={{ color: 'var(--hd-copper)' }}
                              >
                                CHAPTER {ch.number}
                              </span>
                              {person && (
                                <span className="hd-folio-meta text-[10px]">
                                  {person.country}
                                </span>
                              )}
                            </div>
                            <h4
                              className="hd-font-display text-lg font-semibold leading-snug group-hover:underline"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {ch.title}
                            </h4>
                            {person && (
                              <p
                                className="hd-font-body text-xs"
                                style={{ color: 'var(--hd-fg-muted)' }}
                              >
                                {person.proposedLearningPathwayForKashmir}
                              </p>
                            )}
                          </div>
                          <span className="hd-folio-meta text-[10px]">
                            Open Chapter Protocol →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Epilogue Monument */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 space-y-4"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">EPILOGUE · IT WAS NOT EASY FOR THEM. IT IS NOT EASY FOR US.</p>
          <p
            className="hd-font-display text-2xl sm:text-4xl italic font-semibold leading-snug"
            style={{ color: 'var(--hd-fg)' }}
          >
            “{SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.closingPhilosophicalQuestion}”
          </p>
        </section>
      </div>
    </div>
  );
}
