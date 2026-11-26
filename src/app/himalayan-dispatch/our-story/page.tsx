import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  CANONICAL_DISPATCH_URL,
  DISPATCH_IDENTITY,
  HD_ROUTES,
  toDispatchCanonicalUrl,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY,
  HIMALAYAN_DISPATCH_FOUNDING_STORY,
} from '@/data/himalayan-dispatch-founding-story';

export const metadata: Metadata = buildPageMetadata({
  title: 'When Silence Became the Reason to Speak — Our Story | Himalayan Dispatch',
  description: HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst,
  canonicalPath: '/himalayan-dispatch/our-story',
  imagePath: '/images/himalayan-dispatch/cover-gangbal-inaugural.jpg',
});

export default function HimalayanDispatchOurStoryPage() {
  const canonicalUrl = toDispatchCanonicalUrl(HD_ROUTES.ourStory);

  const foundingPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${HIMALAYAN_DISPATCH_FOUNDING_STORY.title} — ${HIMALAYAN_DISPATCH_FOUNDING_STORY.subtitle}`,
    description: HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'Periodical',
      '@id': `${CANONICAL_DISPATCH_URL}/#periodical`,
      name: DISPATCH_IDENTITY.officialName,
      alternateName: DISPATCH_IDENTITY.extendedName,
      foundingDate: DISPATCH_IDENTITY.foundingYear,
      url: DISPATCH_IDENTITY.canonicalHomepageUrl,
      publisher: {
        '@type': 'Organization',
        name: DISPATCH_IDENTITY.parentInstitutionName,
        url: DISPATCH_IDENTITY.parentInstitutionUrl,
      },
      founder: {
        '@type': 'Person',
        name: HIMALAYAN_DISPATCH_FOUNDING_STORY.founderName,
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-founding-story-schema" data={foundingPageJsonLd} />

      <div className="max-w-[1380px] mx-auto space-y-14 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Our Story' },
          ]}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            OPENING LITERARY FOLIO — WHEN SILENCE BECAME THE REASON TO SPEAK
            ═══════════════════════════════════════════════════════════════════ */}
        <header
          className="pb-12 sm:pb-16 border-b space-y-6 sm:space-y-8"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_STORY.rubric}</p>
            <p className="hd-folio-meta">
              ESTABLISHED {HIMALAYAN_DISPATCH_FOUNDING_STORY.establishedYear} &nbsp;·&nbsp;{' '}
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.readingTimeMinutes} MIN INSTITUTIONAL RECORD
            </p>
          </div>

          <div className="max-w-4xl space-y-4 sm:space-y-5">
            <h1
              className="hd-font-display text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.01] tracking-[-0.01em]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.title}
            </h1>

            <p
              className="hd-font-display text-xl sm:text-3xl italic font-normal leading-snug"
              style={{ color: 'var(--hd-copper)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.subtitle}
            </p>
          </div>

          <div
            className="max-w-4xl pl-5 sm:pl-7 border-l-2 py-1"
            style={{ borderColor: 'var(--hd-copper)' }}
          >
            <p
              className="hd-font-body text-lg sm:text-xl md:text-2xl font-medium leading-relaxed"
              style={{ color: 'var(--hd-fg)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst}
            </p>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            FOUNDING PHILOSOPHY MONUMENT CALLOUT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="The Founding Philosophy"
          className="p-8 sm:p-12 lg:p-16 border text-center space-y-5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.kicker}</p>
          <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
            <p
              className="hd-font-display text-3xl sm:text-5xl lg:text-[3.4rem] italic font-semibold leading-[1.1]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}
            </p>
            <p
              className="hd-font-display text-3xl sm:text-5xl lg:text-[3.4rem] italic font-semibold leading-[1.1]"
              style={{ color: 'var(--hd-copper)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
            </p>
          </div>
          <div className="pt-3 space-y-1">
            <p
              className="hd-font-display text-lg sm:text-xl font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'var(--hd-fg)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.publicationName}
            </p>
            <p className="hd-folio-meta tracking-[0.28em]">
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.motto}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            LONGFORM FOUNDING RECORD — NINE CHAPTERS + STICKY CHAPTER INDEX
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Chapter Index & Regional Scope */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-8">
            <div
              className="p-6 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">CHAPTERS IN THIS RECORD</p>
              <ol className="space-y-2.5 pt-1">
                {HIMALAYAN_DISPATCH_FOUNDING_STORY.chapters.map((ch) => (
                  <li key={ch.id} className="flex items-baseline gap-3">
                    <span
                      className="hd-font-display text-sm font-semibold w-6 shrink-0"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {ch.roman}.
                    </span>
                    <a
                      href={`#${ch.id}`}
                      className="hd-font-sans text-[11px] font-medium tracking-[0.12em] uppercase hover:underline leading-snug"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {ch.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className="p-6 border space-y-3"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <p className="hd-kicker">TRANSBOUNDARY ECOLOGICAL MANDATE</p>
              <p
                className="hd-font-body text-sm leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Reporting across interconnected mountain watersheds spanning Kashmir, Jammu, Ladakh,
                AJ&amp;K, Gilgit and Baltistan—grounded in scientific evidence, intellectual
                independence and public accountability.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link href={HD_ROUTES.bureausOverview} className="hd-kicker text-[10px] hover:underline">
                  Six Regional Reporting Bureaus →
                </Link>
                <Link href={HD_ROUTES.editorialCharter} className="hd-kicker text-[10px] hover:underline">
                  The Editorial Charter →
                </Link>
                <Link href={HD_ROUTES.imprint} className="hd-kicker text-[10px] hover:underline">
                  Publication Imprint →
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Primary Literary Narrative */}
          <article className="lg:col-span-8 lg:border-l lg:pl-14 space-y-14" style={{ borderColor: 'var(--hd-rule)' }}>
            {HIMALAYAN_DISPATCH_FOUNDING_STORY.chapters.map((chapter, chapterIdx) => {
              const cadenceSet = new Set(chapter.cadenceParagraphIndices || []);
              return (
                <section
                  key={chapter.id}
                  id={chapter.id}
                  className={`scroll-mt-24 space-y-5 ${
                    chapterIdx > 0 ? 'pt-12 border-t' : ''
                  }`}
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-1.5">
                    <span className="hd-kicker block">CHAPTER {chapter.roman}</span>
                    <h2
                      className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight tracking-[0.01em]"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {chapter.heading}
                    </h2>
                  </div>

                  <div className="hd-prose space-y-4">
                    {chapter.paragraphs.map((paragraph, pIdx) => {
                      const isFirstParagraphOfStory = chapterIdx === 0 && pIdx === 0;
                      const isCadenceLine = cadenceSet.has(pIdx);
                      return (
                        <p
                          key={pIdx}
                          className={
                            isFirstParagraphOfStory
                              ? 'hd-dropcap'
                              : isCadenceLine
                              ? 'pl-4 border-l italic font-medium'
                              : ''
                          }
                          style={
                            isCadenceLine
                              ? { borderColor: 'var(--hd-copper)', color: 'var(--hd-fg)' }
                              : undefined
                          }
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Official Institutional Sign-Off & Colophon */}
            <footer
              className="pt-12 mt-12 border-t space-y-6"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              <div
                className="p-8 sm:p-10 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-1">
                  <p
                    className="hd-font-display text-2xl sm:text-3xl font-semibold tracking-[0.16em] uppercase"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {HIMALAYAN_DISPATCH_FOUNDING_STORY.colophon.name}
                  </p>
                  <p
                    className="hd-font-sans text-xs font-semibold tracking-[0.28em] uppercase"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {HIMALAYAN_DISPATCH_FOUNDING_STORY.colophon.motto}
                  </p>
                </div>

                <div
                  className="pt-3 border-t hd-font-body text-base leading-relaxed space-y-1"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    color: 'var(--hd-fg-secondary)',
                  }}
                >
                  <p>{HIMALAYAN_DISPATCH_FOUNDING_STORY.colophon.established}</p>
                  <p>
                    An official publication of{' '}
                    <a href={toKewPlatformUrl('/')} className="underline">
                      Kashmir EcoWatch (KEW) Western Himalayan
                    </a>
                    .
                  </p>
                  {HIMALAYAN_DISPATCH_FOUNDING_STORY.colophon.originLines.map((line) => (
                    <p key={line} className="italic">
                      {line}
                    </p>
                  ))}
                  <p className="pt-2 font-mono text-xs" style={{ color: 'var(--hd-copper)' }}>
                    <Link href={HD_ROUTES.root} className="hover:underline">
                      {HIMALAYAN_DISPATCH_FOUNDING_STORY.colophon.canonicalDomainDisplay}
                    </Link>
                  </p>
                </div>
              </div>

              {/* Action Pathways for Readers, Scientists & Contributors */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={HD_ROUTES.joinNewsroom}
                  className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  <span>Join the Newsroom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={HD_ROUTES.pitch}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    color: 'var(--hd-fg)',
                  }}
                >
                  <span>Submit an Evidence-Based Pitch</span>
                </Link>

                <Link
                  href={HD_ROUTES.inauguralIssue}
                  className="hd-kicker hover:underline ml-auto"
                >
                  Explore the Inaugural Edition →
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
