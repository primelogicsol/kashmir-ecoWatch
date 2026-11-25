// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — INSTITUTIONAL A4 SCIENTIFIC PDF GENERATION ENGINE
// Pure TypeScript / Node.js Standards-Compliant %PDF-1.4 Generator
//
// Features:
// • Print-optimized high-contrast A4 scientific layout (595.28 × 841.89 pt)
// • Official KEW Western Himalayan Cover Page with derived exact page count
// • Synchronized Table of Contents + PDF Outline Bookmarks (/Outlines)
// • Searchable & selectable WinAnsi text (Helvetica, Bold, Oblique, Courier)
// • Vector-drawn scientific tables (numbered, units, provenance, borders)
// • Vector-drawn scientific comparative bar chart (numbered figure, axes, source)
// • Running headers, running footers, page numbering (Page X of N), copyright,
//   version metadata, inline citations, bibliography & research limitations
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface ScientificPdfTable {
  tableNumber: string;
  title: string;
  headers: string[];
  rows: string[][];
  sourceNote: string;
}

export interface ScientificPdfChart {
  figureNumber: string;
  title: string;
  unit: string;
  observationPeriod: string;
  source: string;
  interpretation: string;
  bars: Array<{
    label: string;
    baseline: number;
    observed: number;
    threshold?: number;
  }>;
}

export interface ScientificPdfChapter {
  number: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  equation?: {
    expression: string;
    explanation: string;
  };
  table?: ScientificPdfTable;
  chart?: ScientificPdfChart;
  limitationsNote?: string;
}

export interface ScientificPdfDocumentInput {
  code: string;
  seriesTitle: string;
  sectorClassification: string;
  status: string;
  version: string;
  publicationDate: string;
  lastRevised: string;
  title: string;
  subtitle: string;
  workingGroup: string;
  isProposedWorkingGroup: boolean;
  studyAreaSummary: string;
  abstract: string;
  governanceNotice?: string;
  chapters: ScientificPdfChapter[];
  references: Array<{
    num: number;
    citation: string;
    urlOrDoi?: string;
  }>;
  limitations: string[];
  canonicalUrl: string;
  filenameSlug: string;
}

export interface GeneratedPdfArtifact {
  buffer: Buffer;
  filename: string;
  pageCount: number;
  byteLength: number;
  sha256: string;
  savedFilePath: string;
}

const PAGE_W = 595.28; // A4 width pt
const PAGE_H = 841.89; // A4 height pt
const MARGIN_L = 48;
const MARGIN_R = 48;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;
const TOP_Y = PAGE_H - 64;
const BOTTOM_Y = 56;

/**
 * Sanitizes Unicode characters to WinAnsi / PDF-safe ASCII equivalents
 * so mathematical symbols, units, and dashes never corrupt PDF text streams.
 */
function sanitizePdfText(input: string): string {
  return String(input ?? '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, ' -- ')
    .replace(/\u2022/g, '*')
    .replace(/\u00B7/g, ' | ')
    .replace(/\u2192/g, '->')
    .replace(/\u2264/g, '<=')
    .replace(/\u2265/g, '>=')
    .replace(/\u00B1/g, '+/-')
    .replace(/\u2248/g, '~')
    .replace(/\u00D7/g, 'x')
    .replace(/\u03BC|\u00B5/g, 'u')
    .replace(/\u03B7/g, 'eta')
    .replace(/\u03C4/g, 'tau')
    .replace(/\u03C1/g, 'rho')
    .replace(/\u0394/g, 'Delta ')
    .replace(/\u00B0/g, ' deg ')
    .replace(/\u00B2/g, '^2')
    .replace(/\u00B3/g, '^3')
    .replace(/₀/g, '0')
    .replace(/₁/g, '1')
    .replace(/₂/g, '2')
    .replace(/₃/g, '3')
    .replace(/₄/g, '4')
    .replace(/₅/g, '5')
    .replace(/⁺/g, '+')
    .replace(/⁻/g, '-')
    .replace(/₹/g, 'INR ')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '');
}

function escapePdfLiteral(str: string): string {
  return sanitizePdfText(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function approxCharWidthFactor(font: 'F1' | 'F2' | 'F3' | 'F4'): number {
  if (font === 'F4') return 0.6; // Courier fixed
  if (font === 'F2') return 0.55; // Helvetica-Bold
  return 0.51; // Helvetica / Oblique
}

function wrapText(
  text: string,
  fontSize: number,
  maxWidth: number,
  font: 'F1' | 'F2' | 'F3' | 'F4' = 'F1'
): string[] {
  const clean = sanitizePdfText(text).replace(/\s+/g, ' ').trim();
  if (!clean) return [''];
  const maxChars = Math.max(16, Math.floor(maxWidth / (fontSize * approxCharWidthFactor(font))));
  const words = clean.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const w of words) {
    if (!current) {
      current = w;
    } else if (current.length + 1 + w.length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface PageBuilder {
  ops: string[];
  titleForBookmark?: string;
}

export function generateInstitutionalScientificPdf(
  doc: ScientificPdfDocumentInput
): GeneratedPdfArtifact {
  // Build content pages first (Pages 3..N), then assemble Page 1 (Cover) + Page 2 (TOC)
  // so exact chapter start page numbers and total page count are 100% synchronized!
  const bodyPages: PageBuilder[] = [];
  const chapterTocEntries: Array<{
    number: string;
    title: string;
    bodyPageIndex: number; // 0-based into bodyPages
  }> = [];

  let curPage: PageBuilder = { ops: [] };
  let cursorY = TOP_Y;

  const startNewBodyPage = (bookmarkTitle?: string) => {
    if (curPage.ops.length > 0) {
      bodyPages.push(curPage);
    }
    curPage = { ops: [], titleForBookmark: bookmarkTitle };
    cursorY = TOP_Y;
  };

  const ensureSpace = (neededPt: number) => {
    if (cursorY - neededPt < BOTTOM_Y) {
      startNewBodyPage();
    }
  };

  const drawTextLine = (
    text: string,
    x: number,
    y: number,
    size: number,
    font: 'F1' | 'F2' | 'F3' | 'F4' = 'F1',
    rgb: [number, number, number] = [0.06, 0.09, 0.16]
  ) => {
    curPage.ops.push(
      `BT /${font} ${size.toFixed(2)} Tf ${rgb[0].toFixed(3)} ${rgb[1].toFixed(3)} ${rgb[2].toFixed(3)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfLiteral(text)}) Tj ET`
    );
  };

  const drawRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    fillRgb?: [number, number, number],
    strokeRgb?: [number, number, number],
    lineWidth = 0.6
  ) => {
    const cmds: string[] = ['q'];
    cmds.push(`${lineWidth.toFixed(2)} w`);
    if (fillRgb) {
      cmds.push(`${fillRgb[0].toFixed(3)} ${fillRgb[1].toFixed(3)} ${fillRgb[2].toFixed(3)} rg`);
    }
    if (strokeRgb) {
      cmds.push(`${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG`);
    }
    const paintOp = fillRgb && strokeRgb ? 'B' : fillRgb ? 'f' : 'S';
    cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${paintOp}`);
    cmds.push('Q');
    curPage.ops.push(cmds.join(' '));
  };

  const drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeRgb: [number, number, number] = [0.82, 0.86, 0.9],
    lineWidth = 0.6
  ) => {
    curPage.ops.push(
      `q ${lineWidth.toFixed(2)} w ${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`
    );
  };

  // Render each chapter into bodyPages
  for (const ch of doc.chapters) {
    if (cursorY < TOP_Y - 120 && curPage.ops.length > 0) {
      // If near bottom (<240pt left), start chapter cleanly at top of next page when < 180pt left
      if (cursorY - BOTTOM_Y < 170) {
        startNewBodyPage(`Chapter ${ch.number}: ${ch.title}`);
      }
    }
    if (curPage.ops.length === 0 && !curPage.titleForBookmark) {
      curPage.titleForBookmark = `Chapter ${ch.number}: ${ch.title}`;
    }

    const currentBodyIdx = bodyPages.length; // index this curPage will occupy
    chapterTocEntries.push({
      number: ch.number,
      title: ch.title,
      bodyPageIndex: currentBodyIdx,
    });

    // Chapter Heading Band
    ensureSpace(48);
    drawRect(MARGIN_L, cursorY - 22, 68, 16, [0.02, 0.47, 0.34]);
    drawTextLine(`CHAPTER ${ch.number}`, MARGIN_L + 6, cursorY - 17, 8, 'F2', [1, 1, 1]);
    cursorY -= 38;

    const chTitleLines = wrapText(ch.title, 14, CONTENT_W, 'F2');
    for (const tl of chTitleLines) {
      ensureSpace(20);
      drawTextLine(tl, MARGIN_L, cursorY, 14, 'F2', [0.04, 0.12, 0.2]);
      cursorY -= 18;
    }

    if (ch.subtitle) {
      const subLines = wrapText(ch.subtitle, 9.5, CONTENT_W, 'F3');
      for (const sl of subLines) {
        ensureSpace(14);
        drawTextLine(sl, MARGIN_L, cursorY, 9.5, 'F3', [0.25, 0.35, 0.45]);
        cursorY -= 13;
      }
    }
    drawLine(MARGIN_L, cursorY + 4, PAGE_W - MARGIN_R, cursorY + 4, [0.05, 0.58, 0.42], 0.9);
    cursorY -= 10;

    // Paragraphs
    for (const para of ch.paragraphs) {
      const lines = wrapText(para, 9.8, CONTENT_W, 'F1');
      ensureSpace(Math.min(lines.length * 13.5 + 8, 60));
      for (const ln of lines) {
        ensureSpace(14);
        drawTextLine(ln, MARGIN_L, cursorY, 9.8, 'F1', [0.12, 0.16, 0.23]);
        cursorY -= 13.5;
      }
      cursorY -= 6;
    }

    // Governing Equation Box
    if (ch.equation) {
      const expLines = wrapText(ch.equation.explanation, 8.5, CONTENT_W - 20, 'F1');
      const boxH = 34 + expLines.length * 11.5;
      ensureSpace(boxH + 12);
      drawRect(MARGIN_L, cursorY - boxH + 8, CONTENT_W, boxH, [0.95, 0.98, 0.97], [0.05, 0.58, 0.42], 0.7);
      drawTextLine('GOVERNING SCIENTIFIC EQUATION / ANALYTICAL MODEL', MARGIN_L + 10, cursorY - 4, 7.5, 'F2', [0.03, 0.42, 0.3]);
      drawTextLine(ch.equation.expression, MARGIN_L + 10, cursorY - 17, 9.5, 'F4', [0.05, 0.1, 0.18]);
      let eqY = cursorY - 30;
      for (const el of expLines) {
        drawTextLine(el, MARGIN_L + 10, eqY, 8.5, 'F1', [0.22, 0.28, 0.36]);
        eqY -= 11.5;
      }
      cursorY -= boxH + 10;
    }

    // Scientific Table
    if (ch.table && ch.table.rows.length > 0) {
      const colCount = ch.table.headers.length;
      const colW = CONTENT_W / colCount;
      ensureSpace(64);
      drawTextLine(
        `${ch.table.tableNumber}. ${ch.table.title}`,
        MARGIN_L,
        cursorY,
        9.2,
        'F2',
        [0.04, 0.2, 0.16]
      );
      cursorY -= 14;

      // Table Header Row
      drawRect(MARGIN_L, cursorY - 16, CONTENT_W, 18, [0.06, 0.24, 0.2], [0.75, 0.82, 0.86], 0.5);
      ch.table.headers.forEach((hdr, cIdx) => {
        const truncated = sanitizePdfText(hdr).slice(0, Math.max(10, Math.floor(colW / 4.8)));
        drawTextLine(truncated, MARGIN_L + cIdx * colW + 5, cursorY - 10, 8, 'F2', [1, 1, 1]);
      });
      cursorY -= 18;

      // Table Data Rows
      ch.table.rows.forEach((row, rIdx) => {
        // Compute max wrapped lines across cells in this row
        const wrappedCells = row.map((cell) =>
          wrapText(String(cell ?? ''), 8, colW - 10, 'F1').slice(0, 3)
        );
        const maxLines = Math.max(1, ...wrappedCells.map((c) => c.length));
        const rowH = maxLines * 10.5 + 6;
        ensureSpace(rowH + 16);
        const fill: [number, number, number] =
          rIdx % 2 === 0 ? [0.99, 0.995, 1] : [0.955, 0.97, 0.985];
        drawRect(MARGIN_L, cursorY - rowH + 2, CONTENT_W, rowH, fill, [0.82, 0.86, 0.9], 0.4);
        wrappedCells.forEach((cellLines, cIdx) => {
          cellLines.forEach((cl, lIdx) => {
            drawTextLine(
              cl,
              MARGIN_L + cIdx * colW + 5,
              cursorY - 8 - lIdx * 10.5,
              8,
              cIdx === 0 ? 'F2' : 'F1',
              [0.12, 0.16, 0.24]
            );
          });
        });
        cursorY -= rowH;
      });

      const srcLines = wrapText(`Source & Provenance: ${ch.table.sourceNote}`, 7.8, CONTENT_W, 'F3');
      for (const sl of srcLines) {
        ensureSpace(12);
        drawTextLine(sl, MARGIN_L, cursorY - 6, 7.8, 'F3', [0.35, 0.42, 0.5]);
        cursorY -= 10;
      }
      cursorY -= 10;
    }

    // Vector-Drawn Scientific Chart
    if (ch.chart && ch.chart.bars.length > 0) {
      const chartBoxH = 152;
      ensureSpace(chartBoxH + 38);
      drawTextLine(
        `${ch.chart.figureNumber}. ${ch.chart.title} (${ch.chart.unit})`,
        MARGIN_L,
        cursorY,
        9.2,
        'F2',
        [0.04, 0.2, 0.16]
      );
      cursorY -= 10;

      const boxTop = cursorY;
      const boxBottom = cursorY - chartBoxH;
      drawRect(MARGIN_L, boxBottom, CONTENT_W, chartBoxH, [0.98, 0.99, 1], [0.78, 0.84, 0.89], 0.6);

      const plotLeft = MARGIN_L + 42;
      const plotRight = PAGE_W - MARGIN_R - 16;
      const plotBottom = boxBottom + 28;
      const plotTop = boxTop - 22;
      const plotW = plotRight - plotLeft;
      const plotH = plotTop - plotBottom;

      const maxVal = Math.max(
        1,
        ...ch.chart.bars.flatMap((b) => [b.baseline, b.observed, b.threshold || 0])
      );

      // Horizontal grid lines
      for (let g = 0; g <= 4; g++) {
        const gy = plotBottom + (plotH * g) / 4;
        drawLine(plotLeft, gy, plotRight, gy, [0.88, 0.91, 0.94], 0.4);
        const tickVal = ((maxVal * g) / 4).toFixed(maxVal >= 20 ? 0 : 1);
        drawTextLine(tickVal, MARGIN_L + 8, gy - 3, 7, 'F4', [0.35, 0.42, 0.5]);
      }

      // Legend
      drawRect(plotRight - 165, boxTop - 14, 8, 8, [0.2, 0.58, 0.46]);
      drawTextLine('Baseline', plotRight - 153, boxTop - 13, 7.5, 'F1', [0.2, 0.26, 0.34]);
      drawRect(plotRight - 105, boxTop - 14, 8, 8, [0.85, 0.36, 0.15]);
      drawTextLine('Observed / Modelled', plotRight - 93, boxTop - 13, 7.5, 'F1', [0.2, 0.26, 0.34]);

      const groupW = plotW / ch.chart.bars.length;
      ch.chart.bars.forEach((b, idx) => {
        const gx = plotLeft + idx * groupW + groupW * 0.18;
        const barW = Math.min(22, groupW * 0.28);
        const hBase = Math.max(2, (b.baseline / maxVal) * plotH);
        const hObs = Math.max(2, (b.observed / maxVal) * plotH);

        drawRect(gx, plotBottom, barW, hBase, [0.2, 0.58, 0.46]);
        drawRect(gx + barW + 4, plotBottom, barW, hObs, [0.85, 0.36, 0.15]);

        const lbl = sanitizePdfText(b.label).slice(0, 16);
        drawTextLine(lbl, gx - 2, boxBottom + 10, 7, 'F1', [0.2, 0.26, 0.34]);
      });

      cursorY = boxBottom - 12;
      const capLines = wrapText(
        `Period: ${ch.chart.observationPeriod} | Source: ${ch.chart.source} | Interpretation: ${ch.chart.interpretation}`,
        7.8,
        CONTENT_W,
        'F3'
      );
      for (const cl of capLines) {
        ensureSpace(11);
        drawTextLine(cl, MARGIN_L, cursorY, 7.8, 'F3', [0.32, 0.38, 0.46]);
        cursorY -= 10.5;
      }
      cursorY -= 8;
    }

    if (ch.limitationsNote) {
      const limLines = wrapText(`Data Quality & Uncertainty Note: ${ch.limitationsNote}`, 8.2, CONTENT_W - 16, 'F3');
      const lBoxH = limLines.length * 11 + 10;
      ensureSpace(lBoxH + 8);
      drawRect(MARGIN_L, cursorY - lBoxH + 4, CONTENT_W, lBoxH, [1, 0.985, 0.94], [0.85, 0.62, 0.15], 0.5);
      limLines.forEach((ll, idx) => {
        drawTextLine(ll, MARGIN_L + 8, cursorY - 7 - idx * 11, 8.2, 'F3', [0.42, 0.28, 0.05]);
      });
      cursorY -= lBoxH + 8;
    }

    cursorY -= 10;
  }

  // Bibliography & Research Limitations Appendix
  ensureSpace(80);
  const bibPageIdx = bodyPages.length;
  chapterTocEntries.push({
    number: 'BIB',
    title: 'Verified Scientific References & Source URLs',
    bodyPageIndex: bibPageIdx,
  });
  drawRect(MARGIN_L, cursorY - 20, 140, 15, [0.06, 0.24, 0.2]);
  drawTextLine('VERIFIED BIBLIOGRAPHY', MARGIN_L + 6, cursorY - 15, 8, 'F2', [1, 1, 1]);
  cursorY -= 32;

  for (const ref of doc.references) {
    const refStr = `[${ref.num}] ${ref.citation}${ref.urlOrDoi ? ` -- ${ref.urlOrDoi}` : ''}`;
    const rLines = wrapText(refStr, 8.6, CONTENT_W, 'F1');
    ensureSpace(rLines.length * 11.5 + 6);
    for (const rl of rLines) {
      drawTextLine(rl, MARGIN_L, cursorY, 8.6, 'F1', [0.14, 0.18, 0.26]);
      cursorY -= 11.5;
    }
    cursorY -= 4;
  }

  // Limitations & Copyright Block
  ensureSpace(75);
  cursorY -= 8;
  drawTextLine('RESEARCH LIMITATIONS & SCIENTIFIC GOVERNANCE DISCLOSURE', MARGIN_L, cursorY, 9.5, 'F2', [0.04, 0.2, 0.16]);
  cursorY -= 14;
  for (const lim of doc.limitations) {
    const lLines = wrapText(`* ${lim}`, 8.6, CONTENT_W, 'F1');
    ensureSpace(lLines.length * 11.5 + 4);
    for (const ll of lLines) {
      drawTextLine(ll, MARGIN_L, cursorY, 8.6, 'F1', [0.22, 0.28, 0.36]);
      cursorY -= 11.5;
    }
  }

  if (curPage.ops.length > 0) {
    bodyPages.push(curPage);
  }

  // Calculate how many TOC pages we need (1 page holds up to 28 entries easily)
  const tocPageCount = Math.max(1, Math.ceil(chapterTocEntries.length / 28));
  const frontMatterPagesCount = 1 + tocPageCount; // Cover (1) + TOC (tocPageCount)
  const totalPages = frontMatterPagesCount + bodyPages.length;

  // ── BUILD PAGE 1: OFFICIAL KEW INSTITUTIONAL COVER PAGE ────────────────────
  const coverOps: string[] = [];
  const pushCoverText = (
    text: string,
    x: number,
    y: number,
    size: number,
    font: 'F1' | 'F2' | 'F3' | 'F4',
    rgb: [number, number, number]
  ) => {
    coverOps.push(
      `BT /${font} ${size.toFixed(2)} Tf ${rgb[0].toFixed(3)} ${rgb[1].toFixed(3)} ${rgb[2].toFixed(3)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfLiteral(text)}) Tj ET`
    );
  };
  const pushCoverRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    fillRgb?: [number, number, number],
    strokeRgb?: [number, number, number]
  ) => {
    const c = ['q 0.8 w'];
    if (fillRgb) c.push(`${fillRgb[0].toFixed(3)} ${fillRgb[1].toFixed(3)} ${fillRgb[2].toFixed(3)} rg`);
    if (strokeRgb) c.push(`${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG`);
    c.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fillRgb && strokeRgb ? 'B' : fillRgb ? 'f' : 'S'} Q`);
    coverOps.push(c.join(' '));
  };

  // Top Institutional Banner
  pushCoverRect(0, PAGE_H - 138, PAGE_W, 138, [0.024, 0.306, 0.231]); // #064e3b
  pushCoverRect(0, PAGE_H - 144, PAGE_W, 6, [0.063, 0.725, 0.506]);    // #10b981
  pushCoverRect(MARGIN_L, PAGE_H - 60, 44, 20, [0.063, 0.725, 0.506]);
  pushCoverText('KEW', MARGIN_L + 9, PAGE_H - 54, 11, 'F2', [1, 1, 1]);
  pushCoverText('KASHMIR ECOWATCH -- WESTERN HIMALAYAN', MARGIN_L + 54, PAGE_H - 53, 11, 'F2', [1, 1, 1]);
  pushCoverText(doc.seriesTitle.toUpperCase(), MARGIN_L, PAGE_H - 82, 9.5, 'F2', [0.65, 0.95, 0.82]);
  pushCoverText(
    `REPORT ID: ${doc.code}   |   SECTOR: ${doc.sectorClassification.toUpperCase()}   |   STATUS: ${doc.status.toUpperCase()}`,
    MARGIN_L,
    PAGE_H - 104,
    8.8,
    'F4',
    [0.92, 0.98, 0.96]
  );
  pushCoverText(
    `VERSION: ${doc.version}   |   DATE: ${doc.publicationDate}   |   DERIVED DOCUMENT LENGTH: ${totalPages} PAGES`,
    MARGIN_L,
    PAGE_H - 122,
    8.5,
    'F4',
    [0.8, 0.92, 0.88]
  );

  // Main Report Title & Subtitle
  let covY = PAGE_H - 195;
  const titleLines = wrapText(doc.title, 20, CONTENT_W, 'F2');
  for (const tl of titleLines) {
    pushCoverText(tl, MARGIN_L, covY, 20, 'F2', [0.04, 0.1, 0.18]);
    covY -= 26;
  }
  covY -= 4;
  const subLines = wrapText(doc.subtitle, 11, CONTENT_W, 'F3');
  for (const sl of subLines) {
    pushCoverText(sl, MARGIN_L, covY, 11, 'F3', [0.24, 0.32, 0.42]);
    covY -= 15;
  }

  // Attribution Metadata Box
  covY -= 14;
  pushCoverRect(MARGIN_L, covY - 68, CONTENT_W, 74, [0.96, 0.98, 0.99], [0.78, 0.84, 0.89]);
  pushCoverText(
    doc.isProposedWorkingGroup ? 'PROPOSED SCIENTIFIC WORKING GROUP:' : 'LEAD INVESTIGATOR / SCIENTIFIC WORKING GROUP:',
    MARGIN_L + 12,
    covY - 12,
    8,
    'F2',
    [0.03, 0.45, 0.32]
  );
  pushCoverText(doc.workingGroup, MARGIN_L + 12, covY - 26, 10.5, 'F2', [0.06, 0.1, 0.18]);
  pushCoverText(`Study Area & Scope: ${doc.studyAreaSummary}`, MARGIN_L + 12, covY - 43, 8.8, 'F1', [0.2, 0.26, 0.34]);
  pushCoverText(`Permanent Canonical URL: ${doc.canonicalUrl}`, MARGIN_L + 12, covY - 58, 8.2, 'F4', [0.1, 0.38, 0.3]);
  covY -= 92;

  // Governance Notice (if Proposed / Secondary-Data Assessment)
  if (doc.governanceNotice) {
    const gLines = wrapText(doc.governanceNotice, 8.8, CONTENT_W - 24, 'F1');
    const gH = gLines.length * 12 + 22;
    pushCoverRect(MARGIN_L, covY - gH + 8, CONTENT_W, gH, [1, 0.98, 0.93], [0.85, 0.58, 0.12]);
    pushCoverText('SCIENTIFIC GOVERNANCE & SECONDARY-DATA DISCLOSURE', MARGIN_L + 12, covY - 6, 8, 'F2', [0.55, 0.32, 0.04]);
    gLines.forEach((gl, idx) => {
      pushCoverText(gl, MARGIN_L + 12, covY - 20 - idx * 12, 8.8, 'F1', [0.3, 0.2, 0.05]);
    });
    covY -= gH + 14;
  }

  // Structured Scientific Abstract Box
  const absLines = wrapText(doc.abstract, 9.6, CONTENT_W - 24, 'F1');
  const absH = Math.min(covY - 110, absLines.length * 13.5 + 34);
  pushCoverRect(MARGIN_L, covY - absH + 8, CONTENT_W, absH, [0.98, 0.995, 0.99], [0.06, 0.52, 0.38]);
  pushCoverText('EXECUTIVE SCIENTIFIC ABSTRACT', MARGIN_L + 12, covY - 8, 9, 'F2', [0.03, 0.42, 0.3]);
  absLines.slice(0, Math.floor((absH - 30) / 13.5)).forEach((al, idx) => {
    pushCoverText(al, MARGIN_L + 12, covY - 24 - idx * 13.5, 9.6, 'F1', [0.12, 0.16, 0.24]);
  });

  // Cover Footer Copyright
  pushCoverRect(0, 0, PAGE_W, 54, [0.95, 0.97, 0.98]);
  pushCoverText(
    'OPEN ACCESS SCIENTIFIC COMMONS -- Operated & Supported by Dr. Kumar Foundation USA & Kumar Trust USA',
    MARGIN_L,
    30,
    8,
    'F2',
    [0.18, 0.24, 0.32]
  );
  pushCoverText(
    `(c) 2026 Kashmir EcoWatch Western Himalayan (kashmir-ecowatch.com) | Non-Commercial Scientific Attribution License | Page 1 of ${totalPages}`,
    MARGIN_L,
    16,
    7.6,
    'F1',
    [0.35, 0.42, 0.5]
  );

  // ── BUILD TOC PAGE(S) ──────────────────────────────────────────────────────
  const tocPages: PageBuilder[] = [];
  for (let tp = 0; tp < tocPageCount; tp++) {
    const tOps: string[] = [];
    tOps.push(`BT /F2 15.00 Tf 0.040 0.140 0.180 rg ${MARGIN_L} ${(TOP_Y - 6).toFixed(2)} Td (TABLE OF CONTENTS) Tj ET`);
    tOps.push(`q 1.0 w 0.050 0.580 0.420 RG ${MARGIN_L} ${(TOP_Y - 14).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(TOP_Y - 14).toFixed(2)} l S Q`);

    const slice = chapterTocEntries.slice(tp * 28, (tp + 1) * 28);
    let ty = TOP_Y - 38;
    for (const entry of slice) {
      const actualPageNum = frontMatterPagesCount + entry.bodyPageIndex + 1;
      const label = `${entry.number}.  ${sanitizePdfText(entry.title)}`;
      const rightStr = `Page ${actualPageNum}`;
      tOps.push(`BT /F2 9.50 Tf 0.100 0.150 0.220 rg ${MARGIN_L} ${ty.toFixed(2)} Td (${escapePdfLiteral(label.slice(0, 74))}) Tj ET`);
      tOps.push(`BT /F4 9.00 Tf 0.040 0.450 0.320 rg ${(PAGE_W - MARGIN_R - 48).toFixed(2)} ${ty.toFixed(2)} Td (${rightStr}) Tj ET`);
      tOps.push(`q 0.3 w 0.850 0.880 0.910 RG ${MARGIN_L} ${(ty - 5).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(ty - 5).toFixed(2)} l S Q`);
      ty -= 22;
    }

    tocPages.push({
      ops: tOps,
      titleForBookmark: tp === 0 ? 'Table of Contents' : undefined,
    });
  }

  // Combine all pages and inject Running Headers & Running Footers on Pages 2..N
  const allPages: PageBuilder[] = [
    { ops: coverOps, titleForBookmark: `${doc.code} Cover & Abstract` },
    ...tocPages,
    ...bodyPages,
  ];

  allPages.forEach((p, idx) => {
    if (idx === 0) return; // Cover already has custom header/footer
    const pageNum = idx + 1;
    const headerLeft = `${doc.code}  |  ${sanitizePdfText(doc.title).slice(0, 62)}`;
    const footerLeft = `Kashmir EcoWatch Sectoral Environmental Research Series (${doc.version}) -- ${doc.status}`;
    const footerRight = `Page ${pageNum} of ${totalPages}`;

    p.ops.unshift(
      `q 0.5 w 0.800 0.840 0.880 RG ${MARGIN_L} ${(PAGE_H - 42).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(PAGE_H - 42).toFixed(2)} l S Q`,
      `BT /F1 7.80 Tf 0.350 0.420 0.500 rg ${MARGIN_L} ${(PAGE_H - 34).toFixed(2)} Td (${escapePdfLiteral(headerLeft)}) Tj ET`,
      `q 0.5 w 0.800 0.840 0.880 RG ${MARGIN_L} 40.00 m ${PAGE_W - MARGIN_R} 40.00 l S Q`,
      `BT /F1 7.60 Tf 0.350 0.420 0.500 rg ${MARGIN_L} 26.00 Td (${escapePdfLiteral(footerLeft)}) Tj ET`,
      `BT /F2 8.00 Tf 0.040 0.380 0.280 rg ${(PAGE_W - MARGIN_R - 64).toFixed(2)} 26.00 Td (${escapePdfLiteral(footerRight)}) Tj ET`
    );
  });

  // ── ASSEMBLE STANDARDS-COMPLIANT %PDF-1.4 BINARY ───────────────────────────
  // Object ID allocation:
  // 1: Catalog
  // 2: Pages
  // 3: Font F1 (Helvetica)
  // 4: Font F2 (Helvetica-Bold)
  // 5: Font F3 (Helvetica-Oblique)
  // 6: Font F4 (Courier)
  // 7: Info Dictionary
  // 8: Outlines Root
  // For each page i (0..totalPages-1):
  //   pageObjId = 9 + i * 2
  //   contentObjId = 10 + i * 2
  // Followed by Outline Item objects!
  const objects = new Map<number, string>();
  const pageObjIds: number[] = [];

  objects.set(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  objects.set(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  objects.set(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
  objects.set(6, '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>');

  const nowPdfDate = `D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z`;
  objects.set(
    7,
    `<< /Title (${escapePdfLiteral(`${doc.code}: ${doc.title}`)}) /Author (${escapePdfLiteral(doc.workingGroup)}) /Subject (${escapePdfLiteral(doc.abstract.slice(0, 220))}) /Creator (Kashmir EcoWatch Scientific Publication Engine) /Producer (KEW-SEIAE Institutional PDF Engine v2.0) /CreationDate (${nowPdfDate}) >>`
  );

  allPages.forEach((p, idx) => {
    const pId = 9 + idx * 2;
    const cId = 10 + idx * 2;
    pageObjIds.push(pId);
    const streamData = p.ops.join('\n');
    const streamByteLen = Buffer.byteLength(streamData, 'latin1');
    objects.set(cId, `<< /Length ${streamByteLen} >>\nstream\n${streamData}\nendstream`);
    objects.set(
      pId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R >> >> /Contents ${cId} 0 R >>`
    );
  });

  // Build PDF Bookmarks (/Outlines) for Cover, TOC, and Chapters
  let nextObjId = 9 + allPages.length * 2;
  const bookmarkItems: Array<{ objId: number; title: string; pageObjId: number }> = [
    { objId: nextObjId++, title: `${doc.code} Cover & Abstract`, pageObjId: pageObjIds[0] },
    { objId: nextObjId++, title: 'Table of Contents', pageObjId: pageObjIds[1] },
    ...chapterTocEntries.map((ce) => ({
      objId: nextObjId++,
      title: `${ce.number}. ${ce.title}`,
      pageObjId: pageObjIds[frontMatterPagesCount + ce.bodyPageIndex],
    })),
  ];

  bookmarkItems.forEach((bm, idx) => {
    const prevPart = idx > 0 ? `/Prev ${bookmarkItems[idx - 1].objId} 0 R ` : '';
    const nextPart = idx < bookmarkItems.length - 1 ? `/Next ${bookmarkItems[idx + 1].objId} 0 R ` : '';
    objects.set(
      bm.objId,
      `<< /Title (${escapePdfLiteral(bm.title)}) /Parent 8 0 R ${prevPart}${nextPart}/Dest [${bm.pageObjId} 0 R /XYZ 0 ${PAGE_H.toFixed(2)} null] >>`
    );
  });

  objects.set(
    8,
    `<< /Type /Outlines /First ${bookmarkItems[0].objId} 0 R /Last ${bookmarkItems[bookmarkItems.length - 1].objId} 0 R /Count ${bookmarkItems.length} >>`
  );

  objects.set(
    2,
    `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>`
  );
  objects.set(1, '<< /Type /Catalog /Pages 2 0 R /Outlines 8 0 R /PageMode /UseOutlines >>');

  const maxObjId = nextObjId - 1;
  const chunks: Buffer[] = [];
  const offsets: number[] = new Array(maxObjId + 1).fill(0);
  let byteOffset = 0;

  const pushChunk = (str: string) => {
    const buf = Buffer.from(str, 'latin1');
    chunks.push(buf);
    byteOffset += buf.length;
  };

  pushChunk('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  for (let id = 1; id <= maxObjId; id++) {
    offsets[id] = byteOffset;
    const body = objects.get(id) || 'null';
    pushChunk(`${id} 0 obj\n${body}\nendobj\n`);
  }

  const xrefOffset = byteOffset;
  pushChunk(`xref\n0 ${maxObjId + 1}\n`);
  pushChunk('0000000000 65535 f \n');
  for (let id = 1; id <= maxObjId; id++) {
    pushChunk(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`);
  }

  pushChunk(
    `trailer\n<< /Size ${maxObjId + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  );

  const buffer = Buffer.concat(chunks);
  const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
  const cleanFilename = `${doc.code}-${doc.filenameSlug}.pdf`;
  const outDir = path.join(process.cwd(), 'data', 'generated-pdfs');
  const savedFilePath = path.join(outDir, cleanFilename);

  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(savedFilePath, buffer);
  } catch {}

  return {
    buffer,
    filename: cleanFilename,
    pageCount: totalPages,
    byteLength: buffer.length,
    sha256,
    savedFilePath,
  };
}
