import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getMonographAdjacentAppendices,
  getMonographAppendixBySlugOrCode,
  MONOGRAPH_01_APPENDICES,
  MONOGRAPH_01_IDENTITY,
} from '@/data/himalayan-dispatch-monograph-01-atmosphere';

export function generateStaticParams() {
  return MONOGRAPH_01_APPENDICES.map((ap) => ({
    appendixCode: ap.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appendixCode: string }>;
}): Promise<Metadata> {
  const { appendixCode } = await params;
  const appendix = getMonographAppendixBySlugOrCode(appendixCode);
  if (!appendix) {
    return buildPageMetadata({
      title: 'Appendix Not Found — Monograph 01 | Himalayan Dispatch',
      description: 'Requested Monograph 01 technical appendix was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders/appendices/${appendixCode}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Appendix ${appendix.code}: ${appendix.title} — Monograph 01 | Himalayan Dispatch`,
    description: appendix.purpose[0] || appendix.qualityAndUncertaintyRule,
    canonicalPath: `/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders/appendices/${appendix.slug}`,
  });
}

export default async function Monograph01AppendixPage({
  params,
}: {
  params: Promise<{ appendixCode: string }>;
}) {
  const { appendixCode } = await params;
  const appendix = getMonographAppendixBySlugOrCode(appendixCode);
  if (!appendix) {
    notFound();
  }

  const { previous: prevAppendix, next: nextAppendix } = getMonographAdjacentAppendices(
    appendix.slug
  );
  const monographHref = HD_ROUTES.monograph01;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 01 · The Atmosphere Has No Borders', href: monographHref },
            { label: `Appendix ${appendix.code}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            MONOGRAPH 01 TECHNICAL APPENDIX {appendix.code} &nbsp;·&nbsp;{' '}
            {appendix.associatedVolumes.join(' · ')}
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Appendix {appendix.code} — {appendix.title}
          </h1>
          <div className="space-y-1 pt-1">
            <p className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--hd-fg)' }}>
              PROPOSED BY {MONOGRAPH_01_IDENTITY.proposedByline}
            </p>
            <p className="hd-folio-meta">
              EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 3 MIN READ &nbsp;·&nbsp;{' '}
              {appendix.status.toUpperCase()}
            </p>
          </div>
        </header>

        <section className="hd-prose">
          {appendix.purpose.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>

        <section
          className="p-6 sm:p-8 border space-y-5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">REQUIRED VARIABLES, METADATA &amp; OBSERVATIONAL RECORDS</p>
            <ul className="space-y-2">
              {appendix.requiredVariablesAndRecords.map((item, idx) => (
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
            <p className="hd-kicker">QUALITY-CONTROL, TRACEABILITY &amp; UNCERTAINTY STANDARD</p>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {appendix.qualityAndUncertaintyRule}
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-folio-meta">
              ASSOCIATED CHAPTERS: {appendix.associatedChapterCodes.join(', ')}
            </p>
          </div>
        </section>

        <nav
          className="pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevAppendix ? (
            <Link
              href={HD_ROUTES.monograph01Appendix(prevAppendix.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Appendix {prevAppendix.code}: {prevAppendix.title}
              </span>
            </Link>
          ) : (
            <Link href={monographHref} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 01 Overview</span>
            </Link>
          )}

          {nextAppendix ? (
            <Link
              href={HD_ROUTES.monograph01Appendix(nextAppendix.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Appendix {nextAppendix.code}: {nextAppendix.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link href={monographHref} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <span>Return to Monograph 01 Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
