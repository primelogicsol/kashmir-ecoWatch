'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  buildKewGatewayDestinationUrl,
  KEW_EDITORIAL_CONSIDERATION_CONSENT_TEXT,
  KEW_ENVIRONMENTAL_GATEWAY_FACILITIES,
} from '@/lib/himalayan-dispatch-correspondence-types';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export function EnvironmentalInformationGatewayClient() {
  return (
    <div className="space-y-14">
      {/* 10 Existing KEW Submission Facilities Grid */}
      <section
        aria-label="Kashmir EcoWatch Submission Facilities"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7"
      >
        {KEW_ENVIRONMENTAL_GATEWAY_FACILITIES.map((facility, idx) => {
          const destinationUrl = buildKewGatewayDestinationUrl(
            facility.kewPath,
            toKewPlatformUrl
          );
          return (
            <article
              key={facility.id}
              className="p-6 sm:p-8 border flex flex-col justify-between gap-6"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="hd-kicker">
                    KEW FACILITY {String(idx + 1).padStart(2, '0')} · {facility.trackingPrefix}
                  </span>
                  {facility.supportsEditorialConsent && (
                    <span
                      className="hd-font-sans text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 border"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        color: 'var(--hd-copper)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      Optional Dispatch Consent Enabled
                    </span>
                  )}
                </div>

                <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
                  {facility.title}
                </h2>

                <p
                  className="hd-font-body text-base leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {facility.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                <span
                  className="hd-font-sans text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: 'var(--hd-fg-muted)' }}
                >
                  Kashmir EcoWatch Infrastructure
                </span>

                <a
                  href={destinationUrl}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 border text-xs font-semibold tracking-[0.16em] uppercase transition-opacity hover:opacity-90"
                  style={{
                    borderColor: 'var(--hd-copper)',
                    backgroundColor: 'var(--hd-copper-solid)',
                    color: '#F2EFE7',
                  }}
                >
                  <span>CONTINUE TO KEW</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      {/* Consent & Non-Duplication Governance Charter */}
      <section
        className="p-7 sm:p-10 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-recessed)',
        }}
      >
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <h2 className="hd-font-sans text-xs font-semibold tracking-[0.18em] uppercase">
              Unified KEW Infrastructure &amp; Optional Editorial Consideration Consent
            </h2>
          </div>
          <p
            className="hd-font-body text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Himalayan Dispatch does not duplicate Kashmir EcoWatch environmental intake forms,
            verification workflows, or ecological databases. When submitting field evidence,
            environmental issues, observations, datasets, or sectoral assessments on KEW,
            contributors may optionally select an unchecked authorization box:
          </p>
          <blockquote
            className="p-4 sm:p-5 border-l-2 hd-font-body italic text-sm sm:text-base leading-relaxed"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg)',
              color: 'var(--hd-fg)',
            }}
          >
            &ldquo;{KEW_EDITORIAL_CONSIDERATION_CONSENT_TEXT}&rdquo;
          </blockquote>
        </div>

        <div
          className="lg:col-span-5 p-6 border space-y-3"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <p className="hd-kicker">CONTRIBUTOR SAFEGUARDS</p>
          <ul className="space-y-2.5 hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
              <span>
                Authorization is strictly optional and unchecked by default on all KEW forms.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
              <span>
                Consent to editorial consideration does <strong>not</strong> constitute consent to
                publication, public identification, or disclosure of confidential information.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
              <span>
                Existing KEW tracking codes (<code>KEW-*</code>, <code>SEIAE-*</code>) remain
                governed by Kashmir EcoWatch operations.
              </span>
            </li>
          </ul>
          <div className="pt-3 border-t flex flex-wrap gap-4" style={{ borderColor: 'var(--hd-rule)' }}>
            <Link
              href={HD_ROUTES.contact}
              className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Contact the Editorial Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
