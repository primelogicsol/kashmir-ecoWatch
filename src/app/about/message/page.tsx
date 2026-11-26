'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Sparkles, Scale, ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './MessageManuscript.module.css';

/**
 * Local KEW asset imported directly from the original Dr. Kumar Foundation USA portrait (`/dr_kumar_image.png`)
 * on https://dkf.sufisciencecenter.info/life-and-work ("The Life & Formation of Dr. G. M. Kumar" — "Dr kumar image").
 * Preserved at native 1920x1080 resolution without AI regeneration, facial modification, or stylistic alteration.
 */
const DR_KUMAR_HERO_IMAGE_PATH = '/images/about/dr-ghulam-mohammad-kumar-life-and-work.png';
const DKF_LIFE_AND_WORK_URL = 'https://dkf.sufisciencecenter.info/life-and-work';

interface PhilosophicalChapter {
  roman: string;
  title: string;
  subtitle: string;
  reflection: string;
  ecologicalExpression: string;
}

/**
 * Centralized content registry for `/about/message`.
 * Clearly distinguishes the administrator-supplied spiritual honorific (Laqab) and documented
 * institutional heritage from editorial philosophical reflections, guaranteeing zero fabricated
 * direct quotations or undocumented biographical claims.
 */
const DR_KUMAR_MESSAGE_CONTENT = {
  pageTitle: 'Message from Dr. Ghulam Mohammad Kumar',
  laqabEnglish: 'Qalandar of the Forest',
  laqabUrdu: 'قلندرِ جنگل',
  pageSubtitle: 'Nature, Humanity, Knowledge & Our Shared Responsibility',
  callingLine: 'Physician by Education. Qalandar by Calling. Service as a Way of Life.',
  heroLabel: 'Philosophical Reflections & Ethical Stewardship',
  authenticatedDirectMessage: null as string[] | null,
  qalandarChapter: {
    title: 'The Qalandar of the Forest',
    epigraph:
      'Where the wilderness becomes a sanctuary, silence becomes a teacher, and knowledge becomes a responsibility.',
    paragraphs: [
      'The honorific Qalandar of the Forest, associated with Dr. Ghulam Mohammad Kumar, offers a profound point of reflection on the relationship between spiritual consciousness and the natural world.',
      'A forest is more than a collection of trees. It is a living expression of interdependence, patience, regeneration and balance. Its silence invites contemplation. Its diversity teaches coexistence. Its vulnerability reminds humanity of the consequences of living without restraint.',
      'Within the contemplative tradition of the Qalandar, the natural world can become a place of inward discovery, where material ambition recedes and the deeper responsibilities of human existence become visible.',
      'Modern environmental science examines these living systems through observation, measurement and empirical evidence. Spiritual contemplation approaches them through humility, reverence and conscience. Their methods are distinct, yet both can contribute to a more responsible relationship between humanity and the Earth.',
      'For Kashmir EcoWatch, the spiritual inspiration associated with the Qalandar of the Forest finds practical institutional expression through environmental research, open scientific knowledge, ecological stewardship, education and selfless service.',
      'The institute seeks to honor this inspiration not merely through remembrance, but through the enduring return of knowledge to Kashmir and the wider Western Himalayas.',
    ],
  },
  editorialGovernanceNote:
    'This publication communicates the philosophical principles and ethical orientation inspired by the teachings of Dr. Ghulam Mohammad Kumar — honored by the administrator-supplied spiritual Laqab Qalandar of the Forest (قلندرِ جنگل) — as reflected in the humanitarian and environmental stewardship of Dr. Kumar Foundation USA and Kashmir EcoWatch. Opening and chapter essays represent editorial philosophical interpretations rather than verbatim personal statements; in accordance with institutional authenticity standards, no direct quotations or undocumented historical experiences are attributed without formal ratification.',
  synthesisLead:
    'Before rivers are measured, before forests are mapped, and before satellite instruments trace the retreat of mountain snows, an older question confronts human conscience: how ought human beings inhabit a living Earth that sustains every breath they take? Across the spiritual and ethical teachings of Dr. Ghulam Mohammad Kumar, care for creation, truthfulness in knowledge, humility in conduct, and quiet service to humanity belong to a single moral horizon.',
  synthesisBody: [
    'In this perspective, environmental degradation is never merely a technical malfunction of watersheds or airsheds; it is equally a crisis of attentiveness, restraint, and ethical responsibility. When human beings forget their interdependence with mountains, springs, wetlands, forests, and fellow creatures, knowledge risks becoming detached from wisdom and progress becomes separated from stewardship.',
    'Conversely, when rigorous scientific inquiry is joined with inner humility and selfless service, knowledge becomes a lamp of awakening rather than an instrument of exploitation. Observation turns into care, education awakens conscience, and the return of knowledge to one’s homeland becomes an enduring trust owed both to living communities and to generations yet unborn.',
  ],
};

const FOUNDATIONAL_STATEMENTS = [
  {
    rubric: 'SACRED TRUST',
    statement: 'Creation Entrusted to Human Conscience',
  },
  {
    rubric: 'AWAKENED KNOWLEDGE',
    statement: 'Empirical Truth Guided by Humility',
  },
  {
    rubric: 'QUIET SERVICE',
    statement: 'Serving Humanity Without Self-Interest',
  },
] as const;

const LEGACY_CONTINUUM = [
  {
    rubric: 'SPIRITUAL INSPIRATION',
    heading: 'Dr. Ghulam Mohammad Kumar',
    subline: 'Qalandar of the Forest',
  },
  {
    rubric: 'ETHICAL EXPRESSION',
    heading: 'Humility, Knowledge & Selfless Service',
    subline: 'Reverence for creation and responsibility toward humanity',
  },
  {
    rubric: 'INSTITUTIONAL STEWARDSHIP',
    heading: 'Dr. Kumar Foundation USA',
    subline: 'Philanthropic and humanitarian commitment',
  },
  {
    rubric: 'SCIENTIFIC EXPRESSION',
    heading: "Dr. Kumar's Kashmir EcoWatch",
    subline: 'Global Institute for Advanced Environmental Studies',
  },
  {
    rubric: 'ENDURING PURPOSE',
    heading: 'Knowledge Return System for Kashmir',
    subline: 'Open science, environmental education and ecological stewardship',
  },
] as const;

const PHILOSOPHICAL_CHAPTERS: readonly PhilosophicalChapter[] = [
  {
    roman: 'I',
    title: 'Nature as a Sacred Responsibility',
    subtitle: 'Reverence, Restraint & Custodianship of the Living Earth',
    reflection:
      'The natural world is not an inert storehouse awaiting human extraction, nor an endlessly forgiving backdrop to human ambition. Mountains, glacial streams, forests, wetlands, soils, and wildlife form an intricate, living trust in which humanity participates as custodian rather than absolute proprietor.',
    ecologicalExpression:
      'Recognizing nature as a sacred trust transforms human posture from domination to reverence — calling for restraint where ecosystems are fragile, gratitude where waters and harvests sustain life, and vigilance wherever carelessness threatens the balance of creation.',
  },
  {
    roman: 'II',
    title: 'Environmental Stewardship',
    subtitle: 'Active Care for Watersheds, Forests & Mountain Habitats',
    reflection:
      'Ethical awareness remains incomplete until it is lived through practical guardianship. Stewardship means standing attentively beside vulnerable lakes, springs, forests, and wildlife corridors — preventing harm before degradation becomes irreversible rather than lamenting loss after the fact.',
    ecologicalExpression:
      'Across the Western Himalaya, true stewardship unites everyday civic care with systematic ecological protection: safeguarding drinking-water catchments, rehabilitating degraded wetlands, respecting forest thresholds, and protecting threatened species that share the mountain home.',
  },
  {
    roman: 'III',
    title: 'Scientific Inquiry and Spiritual Wisdom',
    subtitle: 'Empirical Truth & Moral Humility as Complementary Paths',
    reflection:
      'Rigorous scientific observation and genuine spiritual wisdom do not stand in opposition; both demand honesty before reality, patience in observation, and humility before truths larger than personal opinion. Where science reveals how natural systems function and falter, ethical wisdom illuminates why their protection matters.',
    ecologicalExpression:
      'Measurement without conscience can drift into indifference, while goodwill without empirical clarity can miss the root causes of ecological stress. Bringing satellite telemetry, hydrology, and field ecology together with moral purpose grounds environmental action in both truth and compassion.',
  },
  {
    roman: 'IV',
    title: 'Education as Awakening',
    subtitle: 'Cultivating Discernment, Conscience & Ecological Awareness',
    reflection:
      'Education fulfills its highest purpose not merely by transmitting information or credentials, but by awakening inner discernment, curiosity, empathy, and ethical character. An awakened learner sees connections — between an alpine glacier and a valley harvest, between personal habit and collective consequence.',
    ecologicalExpression:
      'When young scholars, school students, and citizens learn directly from living watersheds, forests, and open scientific records, environmental literacy matures from abstract textbook memorization into lifelong ecological conscience.',
  },
  {
    roman: 'V',
    title: 'Knowledge as a Responsibility',
    subtitle: 'The Moral Obligation to Share Truth in the Public Interest',
    reflection:
      'To possess knowledge is to bear responsibility. Insight, training, and research capacity are not private ornaments to be hoarded behind barriers or used solely for personal advancement; they carry an ethical duty to clarify truth, reduce harm, and strengthen society’s capacity for wise judgment.',
    ecologicalExpression:
      'Open environmental data, transparent methodologies, and freely accessible ecological assessments honor this ethic by ensuring that vital knowledge about water, air, biodiversity, and natural hazards reaches the communities and researchers who need it most.',
  },
  {
    roman: 'VI',
    title: 'Selfless Service to Humanity',
    subtitle: 'Humility, Sincerity & Action Without Expectation of Recognition',
    reflection:
      'At the heart of Dr. Ghulam Mohammad Kumar’s spiritual counsel lies quiet, sincere service to humanity — performed with humility, inner discipline, and compassion, free from vanity, commercial motive, or desire for acclaim.',
    ecologicalExpression:
      'Protecting clean water, mitigating flood and landslide risk, preserving food-producing soils, and defending breathable air are profound acts of humanitarian service, safeguarding the health, dignity, and livelihoods of vulnerable families across mountain and valley communities alike.',
  },
  {
    roman: 'VII',
    title: 'Ecological and Intergenerational Responsibility',
    subtitle: 'Honoring the Trust Owed to Generations Yet Unborn',
    reflection:
      'No single generation holds license to exhaust what centuries of natural patience have formed. Springs, ancient Chinar groves, fertile karewas, alpine meadows, and glacial reservoirs are an intergenerational inheritance held in trust for children and descendants who have no voice in present-day decisions.',
    ecologicalExpression:
      'Measuring long-term ecological change and defending environmental thresholds ask every institution and citizen to weigh immediate convenience against enduring habitability — leaving behind healthier waters, steadier slopes, and richer biodiversity than we inherited.',
  },
  {
    roman: 'VIII',
    title: 'Returning Knowledge to Kashmir',
    subtitle: 'A Non-Commercial Covenant of Gratitude & Intellectual Return',
    reflection:
      'Knowledge acquired across global institutions achieves its noblest meaning when returned in gratitude to the land and people that first nurtured one’s sense of wonder. Distance need not sever responsibility; rather, it can deepen the resolve to give back without commercial condition.',
    ecologicalExpression:
      'Inspired by Dr. Kumar’s teachings and realized institutionally through Dr. Kumar Foundation USA, Kashmir EcoWatch stands as a permanent, non-commercial Knowledge Return System — gathering, validating, and returning scientific intelligence freely to the scholars, youth, and communities of Kashmir and the wider Western Himalaya.',
  },
];

export default function DrKumarMessagePage() {
  return (
    <main
      className={`${styles.pageShell} text-slate-100 selection:bg-amber-200/20 selection:text-amber-100`}
    >
      {/* ─── 01. Cinematic Portrait Hero (Original Portrait Preserved + Laqab Identity) ─── */}
      <Heading
        className={`kew-kumar-message-hero ${styles.heroStage}`}
        icon={<Sparkles className="w-5 h-5 text-emerald-400" />}
        label={DR_KUMAR_MESSAGE_CONTENT.heroLabel}
        title={
          <span className={styles.heroHeadlineBlock}>
            <span className="kew-hero-headline-gradient block w-full leading-[1.14] pb-1 sm:pb-1.5 overflow-visible whitespace-normal break-words bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-200 bg-clip-text text-transparent">
              {DR_KUMAR_MESSAGE_CONTENT.pageTitle}
            </span>
            <span className={styles.heroLaqabRow}>
              <span className={styles.heroLaqabLatin}>{DR_KUMAR_MESSAGE_CONTENT.laqabEnglish}</span>
              <span className={styles.heroLaqabSeparator} aria-hidden="true">
                ·
              </span>
              <span lang="ur" dir="rtl" className={styles.heroLaqabUrdu}>
                {DR_KUMAR_MESSAGE_CONTENT.laqabUrdu}
              </span>
            </span>
          </span>
        }
        subtitle={DR_KUMAR_MESSAGE_CONTENT.pageSubtitle}
        images={[DR_KUMAR_HERO_IMAGE_PATH]}
        visualAttribution="Photograph Source: Dr. Kumar Foundation USA"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Message' },
        ]}
        actions={
          <>
            <div className={styles.heroCallingWrapper}>
              <span className={styles.heroCallingLine}>
                {DR_KUMAR_MESSAGE_CONTENT.callingLine}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#qalandar-of-the-forest"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all duration-200"
              >
                <span>Read Philosophical Manuscript</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/about/governance"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200/30 bg-[#080E1C]/80 hover:bg-slate-900/90 text-white font-semibold text-sm transition-all duration-200 backdrop-blur-sm"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Governance &amp; Ethical Charter</span>
              </Link>
            </div>
          </>
        }
      />

      {/* ─── Contemplative Literary & Institutional Manuscript Surface ──────────── */}
      <div data-kew-dark-surface="true" className={styles.manuscriptSurface}>
        <div className={styles.manuscriptContainer}>
          {/* ─── 02. Opening Chapter: The Qalandar of the Forest ────────────────── */}
          <section
            id="qalandar-of-the-forest"
            aria-labelledby="qalandar-chapter-heading"
            className="scroll-mt-24"
          >
            <div className={styles.readingColumn}>
              <div className={styles.qalandarHeaderMeta}>
                <span className={styles.rubric}>Dr. Ghulam Mohammad Kumar</span>
                <span className={styles.rubric} aria-hidden="true">
                  ·
                </span>
                <span lang="ur" dir="rtl" className={styles.qalandarUrduTag}>
                  {DR_KUMAR_MESSAGE_CONTENT.laqabUrdu}
                </span>
              </div>

              <h2 id="qalandar-chapter-heading" className={styles.manuscriptTitle}>
                {DR_KUMAR_MESSAGE_CONTENT.qalandarChapter.title}
              </h2>

              <p className={styles.qalandarEpigraph}>
                {DR_KUMAR_MESSAGE_CONTENT.qalandarChapter.epigraph}
              </p>

              <div className={styles.shortGoldRule} aria-hidden="true" />

              <p className={styles.leadProse}>
                {DR_KUMAR_MESSAGE_CONTENT.qalandarChapter.paragraphs[0]}
              </p>

              <div className={styles.bodyProseGroup}>
                {DR_KUMAR_MESSAGE_CONTENT.qalandarChapter.paragraphs.slice(1).map((para, idx) => (
                  <p key={idx} className={styles.bodyProse}>
                    {para}
                  </p>
                ))}
              </div>

              <p className={styles.editorialCoda}>
                Editorial philosophical interpretation inspired by the spiritual legacy of Dr.
                Ghulam Mohammad Kumar, not an authenticated personal statement.
              </p>
            </div>
          </section>

          <div className={styles.ornamentalRule} aria-hidden="true">
            <span className={styles.ornamentalRuleLine} />
            <span className={styles.ornamentalDiamond} />
            <span className={styles.ornamentalRuleLine} />
          </div>

          {/* ─── 03. Where Inner Conscience Meets Care for the Living Earth ─────── */}
          <section
            aria-labelledby="philosophical-orientation-heading"
            className={styles.openingSection}
          >
            <div className={styles.readingColumn}>
              <span className={styles.rubric}>
                Philosophical Reflections &amp; Ethical Stewardship
              </span>
              <h2 id="philosophical-orientation-heading" className={styles.manuscriptTitle}>
                Where Inner Conscience Meets Care for the Living Earth
              </h2>
              <div className={styles.shortGoldRule} aria-hidden="true" />

              {DR_KUMAR_MESSAGE_CONTENT.authenticatedDirectMessage ? (
                <div className={styles.bodyProseGroup}>
                  {DR_KUMAR_MESSAGE_CONTENT.authenticatedDirectMessage.map((paragraph, idx) => (
                    <p key={idx} className={styles.bodyProse}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <p className={styles.leadProse}>{DR_KUMAR_MESSAGE_CONTENT.synthesisLead}</p>
                  <div className={styles.bodyProseGroup}>
                    {DR_KUMAR_MESSAGE_CONTENT.synthesisBody.map((paragraph, idx) => (
                      <p key={idx} className={styles.bodyProse}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ─── 04. Sacred Trust · Awakened Knowledge · Quiet Service ──────── */}
            <div className={styles.triadSection} aria-label="Three foundational principles">
              <div className={styles.triadGrid}>
                {FOUNDATIONAL_STATEMENTS.map((item) => (
                  <div key={item.rubric} className={styles.triadItem}>
                    <span className={styles.triadHeading}>{item.rubric}</span>
                    <p className={styles.triadStatement}>{item.statement}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className={styles.ornamentalRule} aria-hidden="true">
            <span className={styles.ornamentalRuleLine} />
            <span className={styles.ornamentalDiamond} />
            <span className={styles.ornamentalRuleLine} />
          </div>

          {/* ─── 05. Eight Guiding Philosophical Principles (Chapters I–VIII) ──── */}
          <section
            id="philosophical-foundations"
            aria-labelledby="eight-domains-heading"
            className="scroll-mt-24"
          >
            <div className={`${styles.readingColumn} ${styles.chaptersIntro}`}>
              <span className={styles.rubric}>The Eight Guiding Principles</span>
              <h2 id="eight-domains-heading" className={styles.sectionTitle}>
                Nature, Knowledge, Service &amp; Shared Stewardship
              </h2>
              <p className={styles.sectionIntroProse}>
                Eight interconnected pillars expressing how inner ethical discipline, scientific
                truthfulness, educational awakening, and intergenerational care converge in service
                to Kashmir and the wider living Earth.
              </p>
            </div>

            <div className={styles.chapterList}>
              {PHILOSOPHICAL_CHAPTERS.map((chapter) => (
                <article key={chapter.roman} className={styles.chapterArticle}>
                  <div className={styles.readingColumn}>
                    <div className={styles.chapterLayout}>
                      <div className={styles.chapterNumeral} aria-hidden="true">
                        {chapter.roman}
                      </div>
                      <div className={styles.chapterContent}>
                        <h3 className={styles.chapterTitle}>
                          <span className="sr-only">{chapter.roman}. </span>
                          {chapter.title}
                        </h3>
                        <p className={styles.chapterSubtitle}>{chapter.subtitle}</p>
                        <p className={styles.chapterReflection}>{chapter.reflection}</p>
                        <p className={styles.chapterStewardship}>{chapter.ecologicalExpression}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.ornamentalRule} aria-hidden="true">
            <span className={styles.ornamentalRuleLine} />
            <span className={styles.ornamentalDiamond} />
            <span className={styles.ornamentalRuleLine} />
          </div>

          {/* ─── 06. Spiritual Inspiration, Institutional Stewardship & Scientific Independence ─── */}
          <section
            aria-labelledby="institutional-expression-heading"
            className={styles.legacySection}
          >
            <div className={styles.readingColumn}>
              <span className={styles.rubric}>
                From Ethical Inspiration to Public-Interest Institution
              </span>
              <h2 id="institutional-expression-heading" className={styles.sectionTitle}>
                Spiritual Inspiration · Institutional Stewardship · Scientific Independence
              </h2>
              <div className={styles.shortGoldRule} aria-hidden="true" />

              <div className={styles.bodyProseGroup}>
                <p className={styles.bodyProse}>
                  Inspired by the ethical and spiritual guidance of{' '}
                  <strong className={styles.strongIvory}>Dr. Ghulam Mohammad Kumar</strong> (
                  <em>Qalandar of the Forest</em>) — emphasizing self-awareness, humility,
                  compassion, inner discipline, and service to humanity without expectation of
                  personal recognition —{' '}
                  <strong className={styles.strongIvory}>Mr. Fayaz Ahmad Khan</strong> established{' '}
                  <strong className={styles.strongIvory}>Dr. Kumar Foundation USA</strong> to anchor
                  philanthropic, humanitarian, and ecological initiatives in enduring institutional
                  form.
                </p>
                <p className={styles.bodyProse}>
                  Through Dr. Kumar Foundation USA, this ethic of responsibility supports{' '}
                  <strong className={styles.strongIvory}>Kashmir EcoWatch</strong> as an
                  independent, non-commercial environmental research and public-knowledge institute.
                  While Dr. Kumar’s role remains one of spiritual guidance and moral inspiration
                  rather than operational or technical direction, the values of truthfulness,
                  reverence for creation, and selfless public service animate the platform’s
                  commitment to open science across the Western Himalaya.
                </p>
              </div>

              {/* Five-Stage Spiritual-to-Scientific Continuum */}
              <div
                className={styles.continuumWrapper}
                aria-label="Continuity from spiritual inspiration to scientific expression"
              >
                <span className={styles.rubric}>Lineage of Purpose &amp; Stewardship</span>
                <div className={styles.continuumList}>
                  {LEGACY_CONTINUUM.map((step) => (
                    <div key={step.rubric} className={styles.continuumStep}>
                      <span className={styles.continuumRubric}>{step.rubric}</span>
                      <h3 className={styles.continuumHeading}>{step.heading}</h3>
                      <p className={styles.continuumSubline}>{step.subline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.legacyPillars}>
              <div className={styles.legacyPillarItem}>
                <h3 className={styles.legacyPillarTitle}>Ethical Inspiration</h3>
                <p className={styles.legacyPillarBody}>
                  Moral conscience, humility, compassion, and selfless service to humanity inspired
                  by Dr. Ghulam Mohammad Kumar.
                </p>
              </div>
              <div className={styles.legacyPillarItem}>
                <h3 className={styles.legacyPillarTitle}>Institutional Trust</h3>
                <p className={styles.legacyPillarBody}>
                  Non-commercial philanthropic stewardship administered through Dr. Kumar Foundation
                  USA and Kumar Trust USA.
                </p>
              </div>
              <div className={styles.legacyPillarItem}>
                <h3 className={styles.legacyPillarTitle}>Empirical Independence</h3>
                <p className={styles.legacyPillarBody}>
                  Evidence-based environmental monitoring, transparent methodologies, and open
                  scientific data serving the public good.
                </p>
              </div>
            </div>
          </section>

          {/* ─── 07. Life, Work & Spiritual Legacy (Dr. Kumar Foundation USA) ─── */}
          <section aria-labelledby="life-work-heading" className={styles.lifeWorkSection}>
            <div className={styles.readingColumn}>
              <span className={styles.rubric}>Biographical &amp; Spiritual Archive</span>
              <h2 id="life-work-heading" className={styles.lifeWorkTitle}>
                Life, Work &amp; Spiritual Legacy
              </h2>
              <p className={styles.lifeWorkProse}>
                For documented biographical context, humanitarian service, and spiritual reflections
                maintained by{' '}
                <strong className={styles.strongIvory}>Dr. Kumar Foundation USA</strong>, consult
                the official institutional archive.
              </p>
              <a
                href={DKF_LIFE_AND_WORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.lifeWorkLink}
              >
                <span>Explore His Life, Work &amp; Spiritual Legacy</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </section>

          {/* ─── 08. Editorial Authenticity & Photographic Sources ──────────────── */}
          <section
            aria-labelledby="provenance-attribution-heading"
            className={styles.colophonSection}
          >
            <div className={`${styles.readingColumn} ${styles.colophonStack}`}>
              <div className={styles.colophonNote}>
                <span id="provenance-attribution-heading" className={styles.colophonLabel}>
                  Editorial Authenticity Standard
                </span>
                <p className={styles.colophonText}>
                  {DR_KUMAR_MESSAGE_CONTENT.editorialGovernanceNote}
                </p>
              </div>

              <div className={styles.colophonNote}>
                <span className={styles.colophonLabel}>Photographic Source Attribution</span>
                <p className={styles.colophonText}>
                  Hero portrait of{' '}
                  <strong className={styles.strongIvory}>Dr. Ghulam Mohammad Kumar</strong> is
                  sourced from the{' '}
                  <em>Life &amp; Work of Dr. Ghulam Mohammad Kumar</em> archive of{' '}
                  <strong className={styles.strongIvory}>Dr. Kumar Foundation USA</strong> and
                  preserved in its original photographic form without alteration.
                </p>
                <a
                  href={DKF_LIFE_AND_WORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  <span>Dr. Kumar Foundation USA — Life &amp; Work Archive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* ─── 09. Institutional Charter & Continuity ─────────────────────────── */}
          <nav aria-label="Related institutional pages" className={styles.closingNavSection}>
            <div className={styles.readingColumn}>
              <span className={styles.rubric}>Institutional Charter &amp; Continuity</span>
              <h2 className={styles.closingHeading}>
                Mission, Ecological Governance &amp; Knowledge Return
              </h2>
              <p className={styles.closingSummary}>
                Examine how ethical stewardship translates into Kashmir EcoWatch’s 2026–2030
                scientific roadmap, governance charter, and open-data architecture.
              </p>

              <div className={styles.closingLinksRow}>
                <Link href="/about" className={styles.closingLink}>
                  <span>About KEW</span>
                  <ArrowRight className={styles.closingLinkArrow} />
                </Link>
                <Link href="/about/mission" className={styles.closingLink}>
                  <span>Our Mission</span>
                  <ArrowRight className={styles.closingLinkArrow} />
                </Link>
                <Link href="/about/founder" className={styles.closingLink}>
                  <span>Institutional Leadership</span>
                  <ArrowRight className={styles.closingLinkArrow} />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
