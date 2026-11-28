import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Newspaper,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { SouthAsianVanguardWorkbench } from '@/components/himalayan-dispatch/SouthAsianVanguardWorkbench';
import {
  FOUR_PROFESSIONAL_MIRRORS,
  SOUTH_ASIAN_VANGUARD_32_PERSONALITIES,
  SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-south-asian-vanguard-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'South Asia’s Environmental Vanguard — KEW Green Heroes & Student Action Collection | Kashmir EcoWatch',
  description:
    'Special International Educational Collection within KEW Green Heroes and the Student Action Hub examining 32 Indian and Pakistani environmental advocates, NGO leaders, journalists, and scientists across four professional mirrors.',
  canonicalPath: '/resources/kew-green-heroes/south-asian-vanguard',
  imagePath: '/images/publications/kolahoi-glacier-cryosphere.jpg',
});

export default function KewGreenHeroesSouthAsianVanguardPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'KEW Green Heroes', href: '/resources/kew-green-heroes' },
      {
        label: 'South Asia’s Environmental Vanguard (Special International Collection)',
        href: '/resources/kew-green-heroes/south-asian-vanguard',
      },
    ],
    '/resources/kew-green-heroes/south-asian-vanguard'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="kew-vanguard-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>KEW GREEN HEROES · SPECIAL INTERNATIONAL COLLECTION</span>
            <span className="text-slate-600">·</span>
            <span>CONNECTED WITH STUDENT ACTION HUB &amp; DISPATCH 14</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            South Asia’s Environmental Vanguard
          </h1>

          <p className="text-lg sm:text-2xl text-emerald-300 font-medium max-w-4xl">
            Extraordinary Minds and the Lessons They Hold for Kashmir
          </p>

          <p className="text-sm sm:text-base text-slate-300 italic max-w-4xl leading-relaxed">
            {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck}
          </p>

          {/* 32 · 4 · 2 Monumental Collection Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl pt-2">
            {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.greenHeroesCollectionStats.map((st) => (
              <div
                key={st.label}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-1"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tabular-nums">
                  {st.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Non-Ranking Educational Charter */}
          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/35 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Non-Ranking Educational &amp; Professional-Introspection Charter:
              </strong>{' '}
              This collection is not a personality ranking system. It is an open educational archive
              encouraging professional specialization, cross-disciplinary collaboration, and
              evidence-based environmental leadership across Kashmir, Jammu, Ladakh, Azad Jammu
              &amp; Kashmir, and Gilgit-Baltistan—strictly separating verified primary milestones
              from ongoing 20-section biographical research.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/south-asias-environmental-vanguard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch 14 Flagship Feature</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 08 (7 Volumes · 60 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/environmental-calendar/outdoor-classroom"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/50 text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Open Student Action Hub &amp; Outdoor Classroom</span>
            </Link>
            <Link
              href="/resources/kew-green-heroes"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-800 hover:border-slate-600 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              <span>← Back to KEW Green Heroes Directory</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16">
        {/* Four Balanced Cohorts (4 India + 4 Pakistan Each) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              FOUR PROFESSIONAL COHORTS · EIGHT BIOGRAPHIES EACH (FOUR INDIA · FOUR PAKISTAN)
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              The 32 Personalities Across Four Mirrors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOUR_PROFESSIONAL_MIRRORS.map((mirror) => {
              const indiaList = SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.filter(
                (p) => p.mirrorId === mirror.id && p.country === 'India'
              );
              const pakList = SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.filter(
                (p) => p.mirrorId === mirror.id && p.country === 'Pakistan'
              );
              return (
                <div
                  key={mirror.id}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                      MIRROR {mirror.mirrorNumberRoman} · EIGHT BIOGRAPHIES · FOUR FROM EACH COUNTRY
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {mirror.mirrorTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{mirror.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                    <div className="space-y-1.5">
                      <div className="font-mono uppercase text-[10px] text-amber-300 font-bold">
                        India (4)
                      </div>
                      {indiaList.map((p) => (
                        <Link
                          key={p.id}
                          href={`/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard/chapters/${p.chapterSlug}`}
                          className="block p-2 rounded bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40"
                        >
                          <div className="font-semibold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {p.proposedLearningPathwayForKashmir}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <div className="font-mono uppercase text-[10px] text-cyan-300 font-bold">
                        Pakistan (4)
                      </div>
                      {pakList.map((p) => (
                        <Link
                          key={p.id}
                          href={`/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard/chapters/${p.chapterSlug}`}
                          className="block p-2 rounded bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40"
                        >
                          <div className="font-semibold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {p.proposedLearningPathwayForKashmir}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Beyond Biography 8 Dimensions */}
        <section className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              BEYOND BIOGRAPHY · EIGHT EDUCATIONAL DIMENSIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Studying Methodologies, Obstacles &amp; Unfinished Work—Not Just Awards
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.beyondBiographyPillars.map((pillar, i) => (
              <div
                key={pillar}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1"
              >
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  0{i + 1}
                </span>
                <div className="text-sm font-bold text-white">{pillar}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Interactive Workbench (Observatory Dark Mode) */}
        <SouthAsianVanguardWorkbench variant="observatory" />
      </div>
    </main>
  );
}
