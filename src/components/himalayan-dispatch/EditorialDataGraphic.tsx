'use client';

import React from 'react';
import { EditorialDataVisualizationSpec } from '@/types/himalayan-dispatch';

export function EditorialDataGraphic({
  spec,
  compact = false,
}: {
  spec: EditorialDataVisualizationSpec;
  compact?: boolean;
}) {
  const pts = spec.points;
  const minVal = Math.min(...pts.map((p) => p.primaryValue)) - 35;
  const maxVal = Math.max(...pts.map((p) => p.primaryValue)) + 35;
  const width = 680;
  const height = compact ? 230 : 290;
  const padLeft = 56;
  const padRight = 28;
  const padTop = 28;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (idx: number) =>
    padLeft + (pts.length > 1 ? (idx / (pts.length - 1)) * plotW : plotW / 2);
  const getY = (val: number) =>
    padTop + plotH - ((val - minVal) / (maxVal - minVal || 1)) * plotH;

  const linePath = pts
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.primaryValue).toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${getX(pts.length - 1).toFixed(1)} ${(padTop + plotH).toFixed(
    1
  )} L ${getX(0).toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

  const baselineY = getY(pts[0].primaryValue);

  return (
    <figure
      className="border-t border-b py-6 sm:py-8"
      style={{ borderColor: 'var(--hd-rule-strong)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
        <div className="space-y-1.5">
          <p className="hd-kicker">{spec.kicker}</p>
          <h4
            className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {spec.title}
          </h4>
          {!compact && (
            <p
              className="hd-font-body text-sm sm:text-[15px] max-w-2xl leading-relaxed"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              {spec.subtitle}
            </p>
          )}
        </div>

        <div
          className="shrink-0 border-l-2 pl-4"
          style={{ borderColor: 'var(--hd-copper)' }}
        >
          <div
            className="hd-font-display text-3xl sm:text-4xl font-semibold leading-none"
            style={{ color: 'var(--hd-copper)' }}
          >
            {spec.keyFindingStat}
          </div>
          <div className="hd-folio-meta mt-1">1988–2026 SHIFT</div>
        </div>
      </div>

      {/* Print-Style Editorial SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block"
          role="img"
          aria-label={`${spec.title}: ${spec.keyFindingNarrative}`}
        >
          <defs>
            <linearGradient id={`hdCopperWash-${spec.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C3125" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#8C3125" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal reference gridlines in Muted Stone */}
          {[4200, 4300, 4400].map((elev) => {
            const y = getY(elev);
            return (
              <g key={elev}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#A39B8B"
                  strokeOpacity="0.35"
                  strokeDasharray="2 4"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#A39B8B"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >
                  {elev}m
                </text>
              </g>
            );
          })}

          {/* 1988 Historical Baseline Reference Line */}
          <line
            x1={padLeft}
            y1={baselineY}
            x2={width - padRight}
            y2={baselineY}
            stroke="#A39B8B"
            strokeWidth="1"
            strokeOpacity="0.65"
          />

          {/* Shaded Horizon Wash */}
          <path d={areaPath} fill={`url(#hdCopperWash-${spec.id})`} />

          {/* Burnt Copper Primary Trajectory */}
          <path
            d={linePath}
            fill="none"
            stroke="#8C3125"
            strokeWidth="2.4"
            strokeLinecap="square"
          />

          {/* Data Nodes & Year Ticks */}
          {pts.map((pt, idx) => {
            const cx = getX(idx);
            const cy = getY(pt.primaryValue);
            const isEndpoint = idx === 0 || idx === pts.length - 1;
            return (
              <g key={pt.yearOrLabel}>
                <line
                  x1={cx}
                  y1={padTop + plotH}
                  x2={cx}
                  y2={padTop + plotH + 5}
                  stroke="#A39B8B"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#A39B8B"
                  fontSize="10.5"
                  letterSpacing="0.08em"
                  fontFamily="Inter, sans-serif"
                >
                  {pt.yearOrLabel}
                </text>

                <circle
                  cx={cx}
                  cy={cy}
                  r={isEndpoint ? 4.5 : 3}
                  fill={isEndpoint ? '#8C3125' : '#F2EFE7'}
                  stroke="#8C3125"
                  strokeWidth="2"
                />

                {isEndpoint && (
                  <text
                    x={idx === 0 ? cx + 6 : cx - 6}
                    y={cy - 10}
                    textAnchor={idx === 0 ? 'start' : 'end'}
                    fill="#8C3125"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Georgia, serif"
                  >
                    {pt.primaryValue} m
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-4 pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ borderColor: 'var(--hd-rule)' }}>
        <p className="hd-font-body text-xs sm:text-sm italic" style={{ color: 'var(--hd-fg-secondary)' }}>
          {spec.keyFindingNarrative}
        </p>
        <span className="hd-folio-meta shrink-0">SOURCE: KEW CRYOSPHERE ARCHIVE</span>
      </figcaption>
    </figure>
  );
}
