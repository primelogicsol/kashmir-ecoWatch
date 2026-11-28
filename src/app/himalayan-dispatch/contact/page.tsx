import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileCheck2, Lock, Mail, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact the Editorial Desk — Himalayan Dispatch',
  description:
    'A direct channel of communication between readers, the scientific community, regional correspondents, and editorial institutions of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/contact',
});

export default function HimalayanDispatchContactPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-14 sm:space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Contact the Editorial Desk' }]} />

        {/* Masthead Header */}
        <header
          className="pb-10 sm:pb-12 border-b space-y-5 max-w-4xl"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">HIMALAYAN DISPATCH · EDITORIAL AFFAIRS</p>
          <h1 className="hd-font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]">
            Contact the Editorial Desk
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            A direct channel of communication between our readers, scientific community, regional
            correspondents and editorial institutions.
          </p>
        </header>

        {/* Three Primary Correspondence & Participation Services */}
        <section
          aria-label="Editorial Desk Communication Channels"
          className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8"
        >
          {/* 1. Editorial Correspondence */}
          <article
            className="p-7 sm:p-9 border flex flex-col justify-between gap-8"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="hd-kicker">CHANNEL 01 · NEWSROOM DESKS</span>
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              </div>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
                1. Editorial Correspondence
              </h2>
              <p
                className="hd-font-body text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                General inquiries, institutional correspondence, editorial proposals, media
                inquiries, correction requests, reader complaints and communication with our
                newsroom.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={HD_ROUTES.contactMessage}
                className="hd-font-sans w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase transition-opacity hover:opacity-90"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-copper-solid)',
                  color: '#F2EFE7',
                }}
              >
                <span>SEND A MESSAGE</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </article>

          {/* 2. Submit Environmental Information */}
          <article
            className="p-7 sm:p-9 border flex flex-col justify-between gap-8"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="hd-kicker">CHANNEL 02 · SCIENTIFIC &amp; FIELD INTAKE</span>
                <FileCheck2 className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              </div>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
                2. Submit Environmental Information
              </h2>
              <p
                className="hd-font-body text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Report environmental degradation, ecological threats, submit field observations,
                scientific evidence and environmental investigations through the established Kashmir
                EcoWatch participation infrastructure.
              </p>
              <p
                className="hd-font-sans text-[11px] font-semibold tracking-[0.15em] uppercase pt-1"
                style={{ color: 'var(--hd-copper)' }}
              >
                Powered by Kashmir EcoWatch – Western Himalayan
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={HD_ROUTES.contactEnvironmentalInfo}
                className="hd-font-sans w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                <span>EXPLORE SUBMISSION OPTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              </Link>
            </div>
          </article>

          {/* 3. Track Your Correspondence */}
          <article
            className="p-7 sm:p-9 border flex flex-col justify-between gap-8"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="hd-kicker">CHANNEL 03 · PRIVATE TWO-WAY THREAD</span>
                <Lock className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              </div>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
                3. Track Your Correspondence
              </h2>
              <p
                className="hd-font-body text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Securely access your previous editorial submissions, review their status, receive
                responses and continue your correspondence with the newsroom.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={HD_ROUTES.contactTrack}
                className="hd-font-sans w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                <span>ACCESS CORRESPONDENCE</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              </Link>
            </div>
          </article>
        </section>

        {/* Source Protection & Editorial Confidentiality */}
        <section
          className="p-7 sm:p-10 border grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-recessed)',
          }}
        >
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <h2 className="hd-font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                Source Protection &amp; Editorial Confidentiality
              </h2>
            </div>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Responsible evidence handling, editorial confidentiality, scientific verification and
              controlled access to correspondence.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href={HD_ROUTES.sourceProtection}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline underline-offset-4"
              style={{ color: 'var(--hd-copper)' }}
            >
              <span>READ SOURCE PROTECTION &amp; VERIFICATION STANDARDS</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </section>

        {/* Institutional Imprint Positioning Triad */}
        <footer
          className="pt-8 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          style={{ borderColor: 'var(--hd-rule)' }}
        >
          <div
            className="hd-font-body text-base sm:text-lg italic leading-relaxed space-y-1"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            <p>Published in the United States.</p>
            <p>Reporting from the Western Himalayas.</p>
            <p>Written for the world.</p>
          </div>

          <div
            className="hd-font-sans text-[11px] tracking-[0.16em] uppercase"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            Editorial Headquarters &amp; Publishing Office · Fairfax, Virginia · USA
          </div>
        </footer>
      </div>
    </div>
  );
}
