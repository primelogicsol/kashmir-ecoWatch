import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { AtmosphereVentilationCalculator } from '@/components/himalayan-dispatch/AtmosphereVentilationCalculator';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getMonographAdjacentChapters,
  getMonographChapterBySlug,
  MONOGRAPH_01_CHAPTERS,
  MONOGRAPH_01_IDENTITY,
} from '@/data/himalayan-dispatch-monograph-01-atmosphere';

export function generateStaticParams() {
  return MONOGRAPH_01_CHAPTERS.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getMonographChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 01 | Himalayan Dispatch',
      description: 'Requested Monograph 01 scientific chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.code}: ${chapter.title} — Monograph 01 | Himalayan Dispatch`,
    description: chapter.executiveSummary[0] || chapter.scientificDeliverable,
    canonicalPath: `/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders/chapters/${chapter.slug}`,
  });
}

export default async function Monograph01ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getMonographChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const { previous: prevChapter, next: nextChapter } = getMonographAdjacentChapters(chapter.slug);
  const monographHref = HD_ROUTES.monograph01;
  const estimatedReadMins = Math.max(
    4,
    Math.round(
      [
        ...chapter.executiveSummary,
        ...chapter.keyQuestionsAndScope,
        ...chapter.methodologyAndDatasets,
        chapter.scientificDeliverable,
        chapter.methodologicalCaveat,
      ]
        .join(' ')
        .split(/\s+/).length / 200
    )
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 01 · The Atmosphere Has No Borders', href: monographHref },
            { label: `Chapter ${chapter.code}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            MONOGRAPH 01 &nbsp;·&nbsp; VOLUME {chapter.volumeRoman}: {chapter.volumeTitle}
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Chapter {chapter.code} — {chapter.title}
          </h1>
          <div className="space-y-1 pt-1">
            <p className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--hd-fg)' }}>
              PROPOSED BY {MONOGRAPH_01_IDENTITY.proposedByline}
            </p>
            <p className="hd-folio-meta">
              EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; {estimatedReadMins} MIN READ &nbsp;·&nbsp;{' '}
              {chapter.researchStatus.toUpperCase()}
            </p>
          </div>
        </header>

        {/* Executive Scientific Protocol Narrative */}
        <section className="hd-prose">
          {chapter.executiveSummary.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
              {p}
            </p>
          ))}
        </section>

        {/* Interactive Diagnostic on Chapters 07, 10, 25 */}
        {(chapter.number === 7 || chapter.number === 10 || chapter.number === 25) && (
          <AtmosphereVentilationCalculator />
        )}

        {/* Structured Chapter Protocol Matrix */}
        <section
          className="p-6 sm:p-8 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2.5">
            <p className="hd-kicker">PRINCIPAL SCIENTIFIC QUESTIONS &amp; INVESTIGATIVE SCOPE</p>
            <ul className="space-y-2">
              {chapter.keyQuestionsAndScope.map((item, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-2.5 leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">OBSERVATIONAL DATASETS, INSTRUMENTS &amp; MODELLING METHODS</p>
            <ul className="space-y-2">
              {chapter.methodologyAndDatasets.map((item, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-2.5 leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">TARGET SCIENTIFIC DELIVERABLE</p>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--hd-fg)' }}>
              {chapter.scientificDeliverable}
            </p>
          </div>
        </section>

        {/* Chapter Structured Table (where applicable) */}
        {chapter.structuredTable && (
          <section
            className="border overflow-hidden"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-kicker">CHAPTER {chapter.code} REFERENCE SPECIFICATION</p>
              <p className="hd-font-display text-lg sm:text-xl italic mt-0.5" style={{ color: 'var(--hd-fg)' }}>
                {chapter.structuredTable.caption}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                    <th className="py-3 px-5 hd-folio-meta">{chapter.structuredTable.headers[0]}</th>
                    <th className="py-3 px-5 hd-folio-meta">{chapter.structuredTable.headers[1]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {chapter.structuredTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-5 hd-font-body text-sm font-semibold align-top" style={{ color: 'var(--hd-fg)' }}>
                        {row[0]}
                      </td>
                      <td className="py-3 px-5 hd-font-body text-sm align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Methodological & Evidentiary Guardrail */}
        <section
          className="p-5 sm:p-6 border-l-2 space-y-1.5"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">METHODOLOGICAL CAVEAT &amp; SCIENTIFIC BOUNDARY</p>
          <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            {chapter.methodologicalCaveat}
          </p>
        </section>

        {/* Sequential Navigation */}
        <nav
          className="pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monograph01Chapter(prevChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Chapter {prevChapter.code}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link href={monographHref} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 01 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monograph01Chapter(nextChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Chapter {nextChapter.code}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.monograph01Appendix('appendix-a')}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Proceed to Scientific Appendices (A–T)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
