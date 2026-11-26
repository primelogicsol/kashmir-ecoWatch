'use client';

import React from 'react';
import type { ResearchDivisionId } from '@/types/sectoral-eia';
import { getCoverGeometryForDivision } from '@/lib/design/craftlore-publication-tokens';
import { KewOfficialPublicationLogo } from '@/components/common/Logo';

interface MinimalistScientificCoverProps {
  code: string;
  sequenceNumber: number;
  divisionId: ResearchDivisionId;
  sectorLabel: string;
  title: string;
  subtitle: string;
  status: string;
  version: string;
  publicationYear?: string;
  workingGroup: string;
  pagesLabel: string;
  compact?: boolean;
}

/**
 * Universal Minimalist International Scientific Cover (Craftlore Design Language)
 * Strictly abstract geometric/contour composition — ZERO landscape photography,
 * ZERO mountains, ZERO houseboats, ZERO tourist imagery on the formal cover.
 */
export function MinimalistScientificCover({
  code,
  sequenceNumber,
  divisionId,
  sectorLabel,
  title,
  subtitle,
  status,
  version,
  publicationYear = '2026',
  workingGroup,
  pagesLabel,
  compact = false,
}: MinimalistScientificCoverProps) {
  const geom = getCoverGeometryForDivision(divisionId);
  const seqThreeDigit = String(sequenceNumber).padStart(3, '0');

  return (
    <div
      className={`relative overflow-hidden rounded-lg border select-none ${
        compact ? 'p-5 sm:p-6 min-h-[340px]' : 'p-7 sm:p-10 lg:p-12 min-h-[520px]'
      } flex flex-col justify-between shadow-2xl`}
      style={{
        backgroundColor: '#080a12',
        borderColor: '#40382e',
        color: '#f4f0e8',
      }}
      aria-label={`Official Minimalist Publication Cover for ${code}`}
    >
      {/* Restrained Discipline-Specific Abstract Scientific Vector Geometry (No Photography) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11]"
        viewBox="0 0 800 1000"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Subtle Architectural Margin Frame */}
        <rect x="28" y="28" width="744" height="944" stroke="#c6a87c" strokeWidth="0.75" />
        <line x1="28" y1="148" x2="772" y2="148" stroke="#c6a87c" strokeWidth="0.5" />
        <line x1="28" y1="840" x2="772" y2="840" stroke="#c6a87c" strokeWidth="0.5" />

        {geom.pattern === 'hydrological_isolines' && (
          <g stroke={geom.accentHex} strokeWidth="0.9">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={i}
                cx={580}
                cy={470}
                rx={70 + i * 38}
                ry={46 + i * 27}
                transform={`rotate(-18 580 470)`}
              />
            ))}
          </g>
        )}

        {geom.pattern === 'fibre_lattice' && (
          <g stroke="#c6a87c" strokeWidth="0.8">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <path
                key={i}
                d={`M ${430 + i * 32} 160 C ${390 + i * 32} 380, ${490 + i * 32} 620, ${430 + i * 32} 830`}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((j) => (
              <line
                key={`h-${j}`}
                x1="410"
                y1={230 + j * 90}
                x2="755"
                y2={230 + j * 90}
                strokeDasharray="3 5"
              />
            ))}
          </g>
        )}

        {geom.pattern === 'seismic_wavefronts' && (
          <g stroke={geom.accentHex} strokeWidth="0.9">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
              <circle key={r} cx="620" cy="480" r={r * 44} strokeDasharray={r % 2 === 0 ? '4 4' : undefined} />
            ))}
            <line x1="400" y1="480" x2="760" y2="480" stroke="#c6a87c" strokeWidth="0.6" />
            <line x1="620" y1="220" x2="620" y2="740" stroke="#c6a87c" strokeWidth="0.6" />
          </g>
        )}

        {(geom.pattern === 'topographic_contours' ||
          geom.pattern === 'atmospheric_isobars' ||
          geom.pattern === 'stratigraphic_horizons' ||
          geom.pattern === 'botanical_phyllotaxis' ||
          geom.pattern === 'geodesic_grid') && (
          <g stroke="#c6a87c" strokeWidth="0.85">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
              <path
                key={k}
                d={`M 360 ${250 + k * 58} Q 540 ${200 + k * 52}, 765 ${275 + k * 56}`}
              />
            ))}
            <circle cx="615" cy="455" r="145" stroke={geom.accentHex} strokeWidth="0.7" />
            <circle cx="615" cy="455" r="92" stroke="#c6a87c" strokeWidth="0.6" strokeDasharray="3 4" />
          </g>
        )}
      </svg>

      {/* Top Institutional Bar */}
      <div
        className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b pb-5"
        style={{ borderColor: '#40382e' }}
      >
        <div className="flex items-center gap-3.5">
          <KewOfficialPublicationLogo size={compact ? 'md' : 'lg'} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-[0.14em]" style={{ color: '#f4f0e8' }}>
                KASHMIR ECOWATCH
              </span>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-sm border"
                style={{ color: '#c6a87c', borderColor: '#40382e', backgroundColor: '#11131c' }}
              >
                {publicationYear}
              </span>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.24em] mt-0.5" style={{ color: '#b4b8c2' }}>
              KEW WESTERN HIMALAYAN
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: '#c6a87c' }}>
            {geom.disciplineSuperLabel}
          </div>
          <div className="text-[11px] font-mono mt-1" style={{ color: '#b4b8c2' }}>
            {sectorLabel}
          </div>
        </div>
      </div>

      {/* Central Monograph Title Composition */}
      <div className="relative z-10 my-auto py-8 max-w-2xl space-y-4">
        <div className="h-[2px] w-14" style={{ backgroundColor: '#c6a87c' }} />
        <div className="text-[11px] font-mono uppercase tracking-[0.24em]" style={{ color: '#c6a87c' }}>
          SCIENTIFIC RESEARCH SERIES · {publicationYear} / {seqThreeDigit}
        </div>
        <h2
          className={`${
            compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-[34px]'
          } font-bold leading-[1.2] tracking-tight`}
          style={{
            color: '#f4f0e8',
            fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
          }}
        >
          {title}
        </h2>
        <p
          className="text-sm sm:text-base leading-relaxed max-w-xl"
          style={{ color: '#d0d2da' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bottom Institutional Colophon — Natural Wrapping, Zero Truncation */}
      <div
        className={`relative z-10 grid grid-cols-1 ${
          compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-12'
        } gap-x-5 gap-y-3.5 border-t pt-5 text-xs`}
        style={{ borderColor: '#40382e' }}
      >
        <div className={compact ? '' : 'lg:col-span-3'}>
          <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#8a8682' }}>
            IDENTIFICATION
          </div>
          <div className="font-mono font-bold mt-0.5" style={{ color: '#c6a87c' }}>
            {code}
          </div>
        </div>
        <div className={compact ? '' : 'lg:col-span-3'}>
          <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#8a8682' }}>
            CLASSIFICATION
          </div>
          <div className="font-semibold mt-0.5 leading-snug" style={{ color: '#f4f0e8' }}>
            {status} ({version})
          </div>
        </div>
        <div className={compact ? 'sm:col-span-2' : 'lg:col-span-4'}>
          <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#8a8682' }}>
            WORKING GROUP
          </div>
          <div
            className="font-medium mt-0.5 leading-snug break-words"
            style={{ color: '#d0d2da' }}
          >
            {workingGroup}
          </div>
        </div>
        <div className={compact ? 'sm:col-span-2 pt-1 border-t border-[#202535]' : 'lg:col-span-2 lg:text-right'}>
          <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#8a8682' }}>
            DOCUMENT LENGTH
          </div>
          <div className="font-mono mt-0.5 leading-snug" style={{ color: '#c6a87c' }}>
            {pagesLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
