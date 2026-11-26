// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH × CRAFTLORE — PREMIUM A4 SCIENTIFIC MONOGRAPH PDF ENGINE
// Standards-Compliant %PDF-1.4 Binary Generator with:
// • Page 1: Universal Minimalist International Scientific Cover (Craftlore
//   Obsidian #080a12 + Pashm Heritage Gold #c6a87c + Discipline Vector Geometry,
//   ZERO landscape/tourist photography on cover)
// • Interior: Warm Archival Paper (#faf8f5) & Parchment Callouts (#f4efe6),
//   Editorial Serif Typography (Times-Bold / Times-Italic + Helvetica / Courier),
//   Native /DCTDecode Embedded Photographic Chapter-Opening & Visual Spreads,
//   Pull Quotations, Discipline Equipment Manifests, Vector Process Diagrams,
//   Vector Comparative Bar Charts, Structured Tables & PDF /Outlines Bookmarks.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import type { ResearchDivisionId } from '@/types/sectoral-eia';
import {
  CRAFTLORE_PUBLICATION_TOKENS,
  getCoverGeometryForDivision,
} from '@/lib/design/craftlore-publication-tokens';

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
  editorialStandfirst?: string;
  paragraphs: string[];
  equation?: {
    expression: string;
    explanation: string;
  };
  table?: ScientificPdfTable;
  chart?: ScientificPdfChart;
  limitationsNote?: string;
}

export interface PdfVisualPlateInput {
  publicSrc: string;
  figureLabel: string;
  title: string;
  caption: string;
  locationLabel: string;
  provenanceDisclosure: string;
}

export interface ScientificPdfDocumentInput {
  code: string;
  sequenceNumber?: number;
  divisionId?: ResearchDivisionId;
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
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  equipmentSummary?: {
    discipline: string;
    instruments: string[];
  };
  editorialPlates?: {
    opening?: PdfVisualPlateInput;
    fieldMethodology?: PdfVisualPlateInput;
    analyticalLab?: PdfVisualPlateInput;
  };
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

type PdfFontCode = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7';
// F1: Helvetica, F2: Helvetica-Bold, F3: Helvetica-Oblique, F4: Courier
// F5: Times-Bold (Editorial Display Serif), F6: Times-Italic (Standfirst/Pull Quote), F7: Times-Roman

interface EmbeddedImageAsset {
  name: 'Im1' | 'Im2' | 'Im3' | 'ImLogoCov' | 'ImLogoHdr';
  width: number;
  height: number;
  filter: 'DCTDecode' | 'FlateDecode';
  bytes: Buffer;
  objId?: number;
}

let cachedOfficialLogoAssets: {
  coverLogo: EmbeddedImageAsset;
  headerLogo: EmbeddedImageAsset;
} | null | undefined;

/**
 * Loads the single authoritative official KEW logo (`public/kew_LOGO.png`, 8-bit RGBA),
 * crops tightly to its non-transparent artwork bounds, and composites anti-aliased
 * `/FlateDecode` RGB XObjects for both the Page 1 Cover (#080a12) and Interior Running Headers.
 */
function loadOfficialKewLogoAssets(): {
  coverLogo: EmbeddedImageAsset;
  headerLogo: EmbeddedImageAsset;
} | null {
  if (cachedOfficialLogoAssets !== undefined) return cachedOfficialLogoAssets;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'kew_LOGO.png');
    if (!fs.existsSync(logoPath)) {
      cachedOfficialLogoAssets = null;
      return null;
    }
    const png = fs.readFileSync(logoPath);
    if (png.length < 32 || png[0] !== 0x89 || png[1] !== 0x50) {
      cachedOfficialLogoAssets = null;
      return null;
    }

    let w = 0;
    let h = 0;
    let bitDepth = 0;
    let colorType = 0;
    const idatChunks: Buffer[] = [];
    let pos = 8;
    while (pos + 8 <= png.length) {
      const len = png.readUInt32BE(pos);
      const type = png.subarray(pos + 4, pos + 8).toString('ascii');
      const data = png.subarray(pos + 8, pos + 8 + len);
      if (type === 'IHDR') {
        w = data.readUInt32BE(0);
        h = data.readUInt32BE(4);
        bitDepth = data[8];
        colorType = data[9];
      } else if (type === 'IDAT') {
        idatChunks.push(data);
      } else if (type === 'IEND') {
        break;
      }
      pos += 12 + len;
    }

    if (w <= 0 || h <= 0 || bitDepth !== 8 || colorType !== 6 || idatChunks.length === 0) {
      cachedOfficialLogoAssets = null;
      return null;
    }

    const raw = zlib.inflateSync(Buffer.concat(idatChunks));
    const bpp = 4;
    const stride = w * bpp;
    const rgba = Buffer.alloc(w * h * bpp);

    const paeth = (a: number, b: number, c: number) => {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      if (pa <= pb && pa <= pc) return a;
      if (pb <= pc) return b;
      return c;
    };

    for (let y = 0; y < h; y++) {
      const filterType = raw[y * (stride + 1)];
      const rowSrc = y * (stride + 1) + 1;
      const rowDst = y * stride;
      const prevDst = (y - 1) * stride;
      for (let i = 0; i < stride; i++) {
        const xByte = raw[rowSrc + i];
        const left = i >= bpp ? rgba[rowDst + i - bpp] : 0;
        const up = y > 0 ? rgba[prevDst + i] : 0;
        const upLeft = y > 0 && i >= bpp ? rgba[prevDst + i - bpp] : 0;
        let val = xByte;
        if (filterType === 1) val = (xByte + left) & 0xff;
        else if (filterType === 2) val = (xByte + up) & 0xff;
        else if (filterType === 3) val = (xByte + ((left + up) >> 1)) & 0xff;
        else if (filterType === 4) val = (xByte + paeth(left, up, upLeft)) & 0xff;
        rgba[rowDst + i] = val;
      }
    }

    // Find tight non-transparent bounding box so logo renders crisp without blank margin waste
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const a = rgba[(y * w + x) * 4 + 3];
        if (a > 12) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (minX >= maxX || minY >= maxY) {
      minX = 0; minY = 0; maxX = w - 1; maxY = h - 1;
    }
    const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.05);
    const cX0 = Math.max(0, minX - pad);
    const cY0 = Math.max(0, minY - pad);
    const cW = Math.min(w - cX0, maxX - minX + pad * 2);
    const cH = Math.min(h - cY0, maxY - minY + pad * 2);

    const renderDownsampledRgb = (
      outMaxDim: number,
      bgR: number,
      bgG: number,
      bgB: number,
      name: 'ImLogoCov' | 'ImLogoHdr'
    ): EmbeddedImageAsset => {
      const scale = outMaxDim / Math.max(cW, cH);
      const outW = Math.max(16, Math.round(cW * scale));
      const outH = Math.max(16, Math.round(cH * scale));
      const rgbOut = Buffer.alloc(outW * outH * 3);

      for (let oy = 0; oy < outH; oy++) {
        const sy0 = cY0 + Math.floor((oy * cH) / outH);
        const sy1 = Math.min(cY0 + cH, Math.max(sy0 + 1, cY0 + Math.floor(((oy + 1) * cH) / outH)));
        for (let ox = 0; ox < outW; ox++) {
          const sx0 = cX0 + Math.floor((ox * cW) / outW);
          const sx1 = Math.min(cX0 + cW, Math.max(sx0 + 1, cX0 + Math.floor(((ox + 1) * cW) / outW)));
          let rAcc = 0, gAcc = 0, bAcc = 0, cnt = 0;
          const stepY = Math.max(1, Math.floor((sy1 - sy0) / 3));
          const stepX = Math.max(1, Math.floor((sx1 - sx0) / 3));
          for (let sy = sy0; sy < sy1; sy += stepY) {
            for (let sx = sx0; sx < sx1; sx += stepX) {
              const idx = (sy * w + sx) * 4;
              const alpha = rgba[idx + 3] / 255;
              rAcc += rgba[idx] * alpha + bgR * (1 - alpha);
              gAcc += rgba[idx + 1] * alpha + bgG * (1 - alpha);
              bAcc += rgba[idx + 2] * alpha + bgB * (1 - alpha);
              cnt++;
            }
          }
          const dIdx = (oy * outW + ox) * 3;
          rgbOut[dIdx] = Math.round(rAcc / cnt);
          rgbOut[dIdx + 1] = Math.round(gAcc / cnt);
          rgbOut[dIdx + 2] = Math.round(bAcc / cnt);
        }
      }

      return {
        name,
        width: outW,
        height: outH,
        filter: 'FlateDecode',
        bytes: zlib.deflateSync(rgbOut),
      };
    };

    cachedOfficialLogoAssets = {
      coverLogo: renderDownsampledRgb(220, 8, 10, 18, 'ImLogoCov'),
      headerLogo: renderDownsampledRgb(96, 8, 10, 18, 'ImLogoHdr'),
    };
    return cachedOfficialLogoAssets;
  } catch {
    cachedOfficialLogoAssets = null;
    return null;
  }
}

const PAGE_W = 595.28; // A4 width pt
const PAGE_H = 841.89; // A4 height pt
const MARGIN_L = 48;
const MARGIN_R = 48;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;
const TOP_Y = PAGE_H - 64;
const BOTTOM_Y = 58;

/**
 * Parses baseline/progressive RGB JPEG dimensions & raw bytes for native /DCTDecode XObject embedding.
 */
function loadJpegFromPublic(
  publicSrc: string | undefined,
  name: 'Im1' | 'Im2' | 'Im3'
): EmbeddedImageAsset | null {
  if (!publicSrc || !/\.jpe?g$/i.test(publicSrc)) return null;
  try {
    const cleanRel = publicSrc.replace(/^\/+/, '');
    const diskPath = path.join(process.cwd(), 'public', cleanRel);
    if (!fs.existsSync(diskPath)) return null;
    const buf = fs.readFileSync(diskPath);
    if (buf.length < 24 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker === 0xff) {
        offset++;
        continue;
      }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const segLen = buf.readUInt16BE(offset + 2);
      // SOF0 (0xC0), SOF1 (0xC1), SOF2 (0xC2)
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        const bits = buf[offset + 4];
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        const components = buf[offset + 9];
        if (bits === 8 && components === 3 && width > 0 && height > 0) {
          return { name, width, height, filter: 'DCTDecode', bytes: buf };
        }
        return null;
      }
      if (segLen < 2) break;
      offset += 2 + segLen;
    }
  } catch {}
  return null;
}

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
    .replace(/\u03B4/g, 'd')
    .replace(/\u03B7/g, 'eta')
    .replace(/\u03C4/g, 'tau')
    .replace(/\u03C1/g, 'rho')
    .replace(/\u0394/g, 'Delta ')
    .replace(/\u2212/g, '-')
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

function approxCharWidthFactor(font: PdfFontCode): number {
  if (font === 'F4') return 0.6; // Courier
  if (font === 'F2' || font === 'F5') return 0.54; // Bold Sans / Times-Bold
  if (font === 'F6' || font === 'F7') return 0.48; // Times-Italic / Times-Roman
  return 0.51; // Helvetica
}

function wrapText(
  text: string,
  fontSize: number,
  maxWidth: number,
  font: PdfFontCode = 'F1'
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
  const cRgb = CRAFTLORE_PUBLICATION_TOKENS.pdfRgb;

  // Load official KEW organizational logo + up to 3 interior editorial JPEG plates
  const officialLogos = loadOfficialKewLogoAssets();
  const imOpening = loadJpegFromPublic(doc.editorialPlates?.opening?.publicSrc, 'Im1');
  const imField = loadJpegFromPublic(doc.editorialPlates?.fieldMethodology?.publicSrc, 'Im2');
  const imLab = loadJpegFromPublic(doc.editorialPlates?.analyticalLab?.publicSrc, 'Im3');
  const embeddedImages: EmbeddedImageAsset[] = [
    officialLogos ? { ...officialLogos.coverLogo } : null,
    officialLogos ? { ...officialLogos.headerLogo } : null,
    imOpening,
    imField,
    imLab,
  ].filter((x): x is EmbeddedImageAsset => x !== null);

  const bodyPages: PageBuilder[] = [];
  const chapterTocEntries: Array<{
    number: string;
    title: string;
    bodyPageIndex: number;
  }> = [];

  let curPage: PageBuilder = { ops: [] };
  let cursorY = TOP_Y;

  const paintArchivalPaperBg = (opsArr: string[]) => {
    opsArr.unshift(
      `q ${cRgb.warmPaper[0].toFixed(3)} ${cRgb.warmPaper[1].toFixed(3)} ${cRgb.warmPaper[2].toFixed(3)} rg 0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)} re f Q`
    );
  };

  const startNewBodyPage = (bookmarkTitle?: string) => {
    if (curPage.ops.length > 0) {
      paintArchivalPaperBg(curPage.ops);
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
    font: PdfFontCode = 'F1',
    rgb: [number, number, number] = cRgb.inkPrimary
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
    const cmds: string[] = ['q', `${lineWidth.toFixed(2)} w`];
    if (fillRgb) {
      cmds.push(`${fillRgb[0].toFixed(3)} ${fillRgb[1].toFixed(3)} ${fillRgb[2].toFixed(3)} rg`);
    }
    if (strokeRgb) {
      cmds.push(`${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG`);
    }
    const paintOp = fillRgb && strokeRgb ? 'B' : fillRgb ? 'f' : 'S';
    cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${paintOp}`, 'Q');
    curPage.ops.push(cmds.join(' '));
  };

  const drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeRgb: [number, number, number] = cRgb.paperBorder,
    lineWidth = 0.6
  ) => {
    curPage.ops.push(
      `q ${lineWidth.toFixed(2)} w ${strokeRgb[0].toFixed(3)} ${strokeRgb[1].toFixed(3)} ${strokeRgb[2].toFixed(3)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`
    );
  };

  const drawEditorialPhotoPlate = (
    img: EmbeddedImageAsset | null,
    meta: PdfVisualPlateInput | undefined
  ) => {
    if (!img || !meta) return;
    const imgDrawW = CONTENT_W;
    const aspect = img.height / img.width;
    const imgDrawH = Math.min(235, Math.round(imgDrawW * aspect));
    const isIllus = meta.provenanceDisclosure === 'Illustration';
    const captionBody = `${meta.locationLabel} -- ${meta.caption}${isIllus ? ' (Illustration)' : ''}`;
    const capLines = wrapText(captionBody, 8.2, CONTENT_W - 20, 'F1').slice(0, 3);
    const capBoxH = 12 + capLines.length * 10.5;
    const totalBlockH = imgDrawH + capBoxH;

    ensureSpace(totalBlockH + 12);

    // Draw unobstructed JPEG image via PDF XObject (Zero badges or overlays on photograph)
    const imgBottomY = cursorY - imgDrawH;
    curPage.ops.push(
      `q ${imgDrawW.toFixed(2)} 0 0 ${imgDrawH.toFixed(2)} ${MARGIN_L.toFixed(2)} ${imgBottomY.toFixed(2)} cm /${img.name} Do Q`
    );

    // Restrained Caption Strip Below Photograph
    drawRect(MARGIN_L, imgBottomY - capBoxH, CONTENT_W, capBoxH, cRgb.parchmentBox, cRgb.paperBorder, 0.5);
    let cy = imgBottomY - 12;
    for (const cl of capLines) {
      drawTextLine(cl, MARGIN_L + 10, cy, 8.2, 'F1', cRgb.inkSecondary);
      cy -= 10.5;
    }

    cursorY = imgBottomY - capBoxH - 14;
  };

  // ── RENDER ALL 20 CHAPTERS WITH EDITORIAL STORYTELLING SPREADS ─────────────
  for (const ch of doc.chapters) {
    // Give Chapter 01, Chapter 08, and Chapter 10 clean page starts when visual plates are present
    const forceFreshSpread =
      (ch.number === '01' && imOpening) ||
      (ch.number === '08' && imField) ||
      (ch.number === '10' && imLab);

    if (forceFreshSpread && curPage.ops.length > 0) {
      startNewBodyPage(`Chapter ${ch.number}: ${ch.title}`);
    } else if (cursorY < TOP_Y - 120 && curPage.ops.length > 0 && cursorY - BOTTOM_Y < 175) {
      startNewBodyPage(`Chapter ${ch.number}: ${ch.title}`);
    }

    if (curPage.ops.length === 0 && !curPage.titleForBookmark) {
      curPage.titleForBookmark = `Chapter ${ch.number}: ${ch.title}`;
    }

    const currentBodyIdx = bodyPages.length;
    chapterTocEntries.push({
      number: ch.number,
      title: ch.title,
      bodyPageIndex: currentBodyIdx,
    });

    // Inject Chapter-Opening Documentary Spread at Chapter 01
    if (ch.number === '01' && imOpening) {
      drawEditorialPhotoPlate(imOpening, doc.editorialPlates?.opening);
    }
    // Inject Field Investigation Spread at Chapter 08
    if (ch.number === '08' && imField) {
      drawEditorialPhotoPlate(imField, doc.editorialPlates?.fieldMethodology);
    }
    // Inject Analytical Laboratory / GIS Spread at Chapter 10
    if (ch.number === '10' && imLab) {
      drawEditorialPhotoPlate(imLab, doc.editorialPlates?.analyticalLab);
    }

    // Craftlore Editorial Chapter Header Rubric + Serif Display Title
    ensureSpace(54);
    drawRect(MARGIN_L, cursorY - 17, 78, 14, cRgb.coverObsidian, cRgb.heritageGold, 0.5);
    drawTextLine(`CHAPTER ${ch.number}`, MARGIN_L + 7, cursorY - 13, 7.6, 'F2', cRgb.heritageGold);
    cursorY -= 31;

    const chTitleLines = wrapText(ch.title, 15.5, CONTENT_W, 'F5');
    for (const tl of chTitleLines) {
      ensureSpace(20);
      drawTextLine(tl, MARGIN_L, cursorY, 15.5, 'F5', cRgb.inkPrimary);
      cursorY -= 19;
    }

    if (ch.editorialStandfirst || ch.subtitle) {
      const standfirst = ch.editorialStandfirst || ch.subtitle || '';
      const subLines = wrapText(standfirst, 10.2, CONTENT_W, 'F6');
      for (const sl of subLines) {
        ensureSpace(14);
        drawTextLine(sl, MARGIN_L, cursorY, 10.2, 'F6', cRgb.walnutBronze);
        cursorY -= 13.5;
      }
    }
    drawLine(MARGIN_L, cursorY + 3, PAGE_W - MARGIN_R, cursorY + 3, cRgb.walnutBronze, 0.9);
    cursorY -= 11;

    // Chapter Prose (Serif-harmonized high-legibility measure)
    for (const para of ch.paragraphs) {
      const lines = wrapText(para, 10, CONTENT_W, 'F7');
      ensureSpace(Math.min(lines.length * 14 + 8, 60));
      for (const ln of lines) {
        ensureSpace(14.5);
        drawTextLine(ln, MARGIN_L, cursorY, 10, 'F7', cRgb.inkPrimary);
        cursorY -= 14;
      }
      cursorY -= 6;
    }

    // Pull Quotation & Equipment Callout after Chapter 02
    if (ch.number === '02' && doc.pullQuote) {
      const qLines = wrapText(`"${doc.pullQuote.quote}"`, 10.5, CONTENT_W - 28, 'F6');
      const qBoxH = qLines.length * 14 + 28;
      ensureSpace(qBoxH + 12);
      drawRect(MARGIN_L, cursorY - qBoxH + 6, CONTENT_W, qBoxH, cRgb.parchmentBox, cRgb.paperBorder, 0.6);
      drawRect(MARGIN_L, cursorY - qBoxH + 6, 3.5, qBoxH, cRgb.walnutBronze);
      let qy = cursorY - 10;
      for (const ql of qLines) {
        drawTextLine(ql, MARGIN_L + 14, qy, 10.5, 'F6', cRgb.inkPrimary);
        qy -= 14;
      }
      drawTextLine(`-- ${doc.pullQuote.attribution}`, MARGIN_L + 14, qy - 2, 8, 'F2', cRgb.walnutBronze);
      cursorY -= qBoxH + 12;
    }

    // Discipline-Specific Instrumentation Fact Box in Chapter 09
    if (ch.number === '09' && doc.equipmentSummary) {
      const instText = doc.equipmentSummary.instruments.join('  |  ');
      const iLines = wrapText(instText, 8.6, CONTENT_W - 24, 'F1');
      const iBoxH = iLines.length * 12 + 28;
      ensureSpace(iBoxH + 10);
      drawRect(MARGIN_L, cursorY - iBoxH + 6, CONTENT_W, iBoxH, cRgb.parchmentBox, cRgb.registryBlue, 0.6);
      drawTextLine(
        `DISCIPLINE INSTRUMENTATION STANDARD: ${doc.equipmentSummary.discipline.toUpperCase()}`,
        MARGIN_L + 10,
        cursorY - 8,
        7.8,
        'F2',
        cRgb.registryNavy
      );
      iLines.forEach((il, idx) => {
        drawTextLine(il, MARGIN_L + 10, cursorY - 21 - idx * 12, 8.6, 'F1', cRgb.inkSecondary);
      });
      cursorY -= iBoxH + 10;
    }

    // Governing Equation Box
    if (ch.equation) {
      const expLines = wrapText(ch.equation.explanation, 8.6, CONTENT_W - 20, 'F1');
      const boxH = 36 + expLines.length * 11.5;
      ensureSpace(boxH + 12);
      drawRect(MARGIN_L, cursorY - boxH + 8, CONTENT_W, boxH, cRgb.parchmentBox, cRgb.walnutBronze, 0.7);
      drawTextLine(
        'GOVERNING ANALYTICAL MODEL / MASS-BALANCE EXPRESSION',
        MARGIN_L + 10,
        cursorY - 4,
        7.5,
        'F2',
        cRgb.walnutBronze
      );
      drawTextLine(ch.equation.expression, MARGIN_L + 10, cursorY - 17, 9.5, 'F4', cRgb.inkPrimary);
      let eqY = cursorY - 30;
      for (const el of expLines) {
        drawTextLine(el, MARGIN_L + 10, eqY, 8.6, 'F1', cRgb.inkSecondary);
        eqY -= 11.5;
      }
      cursorY -= boxH + 10;
    }

    // Structured Scientific Table (Craftlore Obsidian/Gold Header)
    if (ch.table && ch.table.rows.length > 0) {
      const colCount = ch.table.headers.length;
      const colW = CONTENT_W / colCount;
      ensureSpace(64);
      drawTextLine(
        `${ch.table.tableNumber}. ${ch.table.title}`,
        MARGIN_L,
        cursorY,
        9.4,
        'F2',
        cRgb.inkPrimary
      );
      cursorY -= 14;

      drawRect(MARGIN_L, cursorY - 16, CONTENT_W, 18, cRgb.coverObsidian, cRgb.goldHairline, 0.5);
      ch.table.headers.forEach((hdr, cIdx) => {
        const truncated = sanitizePdfText(hdr).slice(0, Math.max(10, Math.floor(colW / 4.8)));
        drawTextLine(truncated, MARGIN_L + cIdx * colW + 5, cursorY - 10, 7.8, 'F2', cRgb.heritageGold);
      });
      cursorY -= 18;

      ch.table.rows.forEach((row, rIdx) => {
        const wrappedCells = row.map((cell) =>
          wrapText(String(cell ?? ''), 8, colW - 10, 'F1').slice(0, 3)
        );
        const maxLines = Math.max(1, ...wrappedCells.map((c) => c.length));
        const rowH = maxLines * 10.5 + 6;
        ensureSpace(rowH + 16);
        const fill: [number, number, number] =
          rIdx % 2 === 0 ? [1, 0.996, 0.988] : cRgb.parchmentBox;
        drawRect(MARGIN_L, cursorY - rowH + 2, CONTENT_W, rowH, fill, cRgb.paperBorder, 0.4);
        wrappedCells.forEach((cellLines, cIdx) => {
          cellLines.forEach((cl, lIdx) => {
            drawTextLine(
              cl,
              MARGIN_L + cIdx * colW + 5,
              cursorY - 8 - lIdx * 10.5,
              8,
              cIdx === 0 ? 'F2' : 'F1',
              cRgb.inkPrimary
            );
          });
        });
        cursorY -= rowH;
      });

      const srcLines = wrapText(`Source & Provenance: ${ch.table.sourceNote}`, 7.8, CONTENT_W, 'F6');
      for (const sl of srcLines) {
        ensureSpace(12);
        drawTextLine(sl, MARGIN_L, cursorY - 6, 7.8, 'F6', cRgb.inkMuted);
        cursorY -= 10;
      }
      cursorY -= 10;
    }

    // Vector-Drawn Scientific Comparative Chart (Craftlore Registry Navy + Walnut Bronze)
    if (ch.chart && ch.chart.bars.length > 0) {
      const chartBoxH = 152;
      ensureSpace(chartBoxH + 38);
      drawTextLine(
        `${ch.chart.figureNumber}. ${ch.chart.title} (${ch.chart.unit})`,
        MARGIN_L,
        cursorY,
        9.4,
        'F2',
        cRgb.inkPrimary
      );
      cursorY -= 10;

      const boxTop = cursorY;
      const boxBottom = cursorY - chartBoxH;
      drawRect(MARGIN_L, boxBottom, CONTENT_W, chartBoxH, [1, 0.996, 0.99], cRgb.paperBorder, 0.6);

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

      for (let g = 0; g <= 4; g++) {
        const gy = plotBottom + (plotH * g) / 4;
        drawLine(plotLeft, gy, plotRight, gy, [0.88, 0.85, 0.8], 0.4);
        const tickVal = ((maxVal * g) / 4).toFixed(maxVal >= 20 ? 0 : 1);
        drawTextLine(tickVal, MARGIN_L + 8, gy - 3, 7, 'F4', cRgb.inkMuted);
      }

      drawRect(plotRight - 175, boxTop - 14, 8, 8, cRgb.registryBlue);
      drawTextLine('Baseline / Sustainable', plotRight - 163, boxTop - 13, 7.3, 'F1', cRgb.inkSecondary);
      drawRect(plotRight - 80, boxTop - 14, 8, 8, cRgb.walnutBronze);
      drawTextLine('Observed / Conventional', plotRight - 68, boxTop - 13, 7.3, 'F1', cRgb.inkSecondary);

      const groupW = plotW / ch.chart.bars.length;
      ch.chart.bars.forEach((b, idx) => {
        const gx = plotLeft + idx * groupW + groupW * 0.18;
        const barW = Math.min(22, groupW * 0.28);
        const hBase = Math.max(2, (b.baseline / maxVal) * plotH);
        const hObs = Math.max(2, (b.observed / maxVal) * plotH);

        drawRect(gx, plotBottom, barW, hBase, cRgb.registryBlue);
        drawRect(gx + barW + 4, plotBottom, barW, hObs, cRgb.walnutBronze);

        const lbl = sanitizePdfText(b.label).slice(0, 16);
        drawTextLine(lbl, gx - 2, boxBottom + 10, 7, 'F1', cRgb.inkSecondary);
      });

      cursorY = boxBottom - 12;
      const capLines = wrapText(
        `Period: ${ch.chart.observationPeriod} | Source: ${ch.chart.source} | Interpretation: ${ch.chart.interpretation}`,
        7.8,
        CONTENT_W,
        'F6'
      );
      for (const cl of capLines) {
        ensureSpace(11);
        drawTextLine(cl, MARGIN_L, cursorY, 7.8, 'F6', cRgb.inkMuted);
        cursorY -= 10.5;
      }
      cursorY -= 8;
    }

    if (ch.limitationsNote) {
      const limLines = wrapText(
        `Methodological & Provenance Note: ${ch.limitationsNote}`,
        8.2,
        CONTENT_W - 16,
        'F6'
      );
      const lBoxH = limLines.length * 11 + 10;
      ensureSpace(lBoxH + 8);
      drawRect(MARGIN_L, cursorY - lBoxH + 4, CONTENT_W, lBoxH, cRgb.parchmentBox, cRgb.walnutBronze, 0.5);
      limLines.forEach((ll, idx) => {
        drawTextLine(ll, MARGIN_L + 8, cursorY - 7 - idx * 11, 8.2, 'F6', cRgb.inkSecondary);
      });
      cursorY -= lBoxH + 8;
    }

    cursorY -= 10;
  }

  // Bibliography & Limitations Appendix
  ensureSpace(80);
  const bibPageIdx = bodyPages.length;
  chapterTocEntries.push({
    number: 'BIB',
    title: 'Verified Scientific References & Source Provenance',
    bodyPageIndex: bibPageIdx,
  });
  drawRect(MARGIN_L, cursorY - 18, 155, 15, cRgb.coverObsidian, cRgb.heritageGold, 0.5);
  drawTextLine('VERIFIED BIBLIOGRAPHY', MARGIN_L + 7, cursorY - 13, 7.8, 'F2', cRgb.heritageGold);
  cursorY -= 30;

  for (const ref of doc.references) {
    const refStr = `[${ref.num}] ${ref.citation}${ref.urlOrDoi ? ` -- ${ref.urlOrDoi}` : ''}`;
    const rLines = wrapText(refStr, 8.6, CONTENT_W, 'F7');
    ensureSpace(rLines.length * 11.5 + 6);
    for (const rl of rLines) {
      drawTextLine(rl, MARGIN_L, cursorY, 8.6, 'F7', cRgb.inkPrimary);
      cursorY -= 11.5;
    }
    cursorY -= 4;
  }

  ensureSpace(75);
  cursorY -= 8;
  drawTextLine(
    'METHODOLOGICAL SCOPE & SCIENTIFIC UNCERTAINTIES',
    MARGIN_L,
    cursorY,
    9.5,
    'F2',
    cRgb.walnutBronze
  );
  cursorY -= 14;
  for (const lim of doc.limitations) {
    const lLines = wrapText(`* ${lim}`, 8.6, CONTENT_W, 'F7');
    ensureSpace(lLines.length * 11.5 + 4);
    for (const ll of lLines) {
      drawTextLine(ll, MARGIN_L, cursorY, 8.6, 'F7', cRgb.inkSecondary);
      cursorY -= 11.5;
    }
  }

  if (curPage.ops.length > 0) {
    paintArchivalPaperBg(curPage.ops);
    bodyPages.push(curPage);
  }

  // TOC + Abstract Front-Matter Page(s)
  const tocPageCount = Math.max(1, Math.ceil(chapterTocEntries.length / 24));
  const frontMatterPagesCount = 1 + tocPageCount; // Cover (Page 1) + Colophon/TOC (Page 2..)
  const totalPages = frontMatterPagesCount + bodyPages.length;

  // ── PAGE 1: UNIVERSAL MINIMALIST INTERNATIONAL SCIENTIFIC COVER ────────────
  // Strictly Craftlore Obsidian (#080a12) + Pashm Gold (#c6a87c) + Vector Geometry
  // ZERO landscape photographs, mountains, houseboats, or tourist motifs on cover!
  const coverOps: string[] = [];
  const geom = getCoverGeometryForDivision(doc.divisionId || 'sector-12-cumulative-impacts');
  const seqThree = String(doc.sequenceNumber || 1).padStart(3, '0');

  // Full-bleed Craftlore Premiere Obsidian canvas
  coverOps.push(
    `q ${cRgb.coverObsidian[0].toFixed(3)} ${cRgb.coverObsidian[1].toFixed(3)} ${cRgb.coverObsidian[2].toFixed(3)} rg 0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)} re f Q`
  );

  // Architectural Gold Hairline Margin Frame & Horizontal Dividers
  coverOps.push(
    `q 0.75 w ${cRgb.goldHairline[0].toFixed(3)} ${cRgb.goldHairline[1].toFixed(3)} ${cRgb.goldHairline[2].toFixed(3)} RG 30 30 ${(PAGE_W - 60).toFixed(2)} ${(PAGE_H - 60).toFixed(2)} re S Q`,
    `q 0.50 w ${cRgb.goldHairline[0].toFixed(3)} ${cRgb.goldHairline[1].toFixed(3)} ${cRgb.goldHairline[2].toFixed(3)} RG 30 ${(PAGE_H - 122).toFixed(2)} m ${(PAGE_W - 30).toFixed(2)} ${(PAGE_H - 122).toFixed(2)} l S Q`,
    `q 0.50 w ${cRgb.goldHairline[0].toFixed(3)} ${cRgb.goldHairline[1].toFixed(3)} ${cRgb.goldHairline[2].toFixed(3)} RG 30 132 m ${(PAGE_W - 30).toFixed(2)} 132 l S Q`
  );

  // Subtle Discipline-Specific Abstract Scientific Vector Isolines / Lattice
  for (let i = 0; i < 8; i++) {
    const r = 46 + i * 24;
    const cx = 430;
    const cy = 390;
    coverOps.push(
      `q 0.45 w 0.165 0.149 0.125 RG ${(cx - r).toFixed(2)} ${(cy - r * 0.68).toFixed(2)} ${(r * 2).toFixed(2)} ${(r * 1.36).toFixed(2)} re S Q`
    );
  }
  for (let j = 0; j < 9; j++) {
    const yLine = 210 + j * 42;
    coverOps.push(
      `q 0.35 w 0.145 0.165 0.215 RG 290 ${yLine.toFixed(2)} m ${(PAGE_W - 36).toFixed(2)} ${(yLine + 18).toFixed(2)} l S Q`
    );
  }

  const pushCoverText = (
    text: string,
    x: number,
    y: number,
    size: number,
    font: PdfFontCode,
    rgb: [number, number, number]
  ) => {
    coverOps.push(
      `BT /${font} ${size.toFixed(2)} Tf ${rgb[0].toFixed(3)} ${rgb[1].toFixed(3)} ${rgb[2].toFixed(3)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfLiteral(text)}) Tj ET`
    );
  };

  // Top Institutional Identity with Official Embedded KEW Organizational Logo
  let brandTextX = MARGIN_L;
  if (officialLogos) {
    const covLogo = officialLogos.coverLogo;
    const logoDrawH = 44;
    const logoDrawW = Math.round((covLogo.width / covLogo.height) * logoDrawH);
    const logoY = PAGE_H - 96;
    coverOps.push(
      `q 0.5 w ${cRgb.goldHairline[0].toFixed(3)} ${cRgb.goldHairline[1].toFixed(3)} ${cRgb.goldHairline[2].toFixed(3)} RG ${MARGIN_L.toFixed(2)} ${(logoY - 3).toFixed(2)} ${(logoDrawW + 6).toFixed(2)} ${(logoDrawH + 6).toFixed(2)} re S Q`,
      `q ${logoDrawW.toFixed(2)} 0 0 ${logoDrawH.toFixed(2)} ${(MARGIN_L + 3).toFixed(2)} ${logoY.toFixed(2)} cm /ImLogoCov Do Q`
    );
    brandTextX = MARGIN_L + logoDrawW + 14;
  }
  pushCoverText('KASHMIR ECOWATCH', brandTextX, PAGE_H - 68, 15, 'F2', cRgb.ivoryText);
  pushCoverText('KEW WESTERN HIMALAYAN   |   2026', brandTextX, PAGE_H - 85, 8.2, 'F4', cRgb.heritageGold);
  pushCoverText(
    geom.disciplineSuperLabel.slice(0, 44),
    PAGE_W - MARGIN_R - 215,
    PAGE_H - 68,
    7.5,
    'F2',
    cRgb.heritageGold
  );
  pushCoverText(
    doc.sectorClassification.toUpperCase().slice(0, 44),
    PAGE_W - MARGIN_R - 215,
    PAGE_H - 84,
    7.3,
    'F4',
    [0.72, 0.74, 0.78]
  );

  // Central Minimalist Monograph Title Block
  let covY = PAGE_H - 235;
  coverOps.push(
    `q ${cRgb.heritageGold[0].toFixed(3)} ${cRgb.heritageGold[1].toFixed(3)} ${cRgb.heritageGold[2].toFixed(3)} rg ${MARGIN_L} ${(covY + 26).toFixed(2)} 46 2.2 re f Q`
  );
  pushCoverText(
    `SCIENTIFIC RESEARCH SERIES   |   2026 / ${seqThree}`,
    MARGIN_L,
    covY + 6,
    8.8,
    'F4',
    cRgb.heritageGold
  );
  covY -= 26;

  const coverTitleLines = wrapText(doc.title, 22, CONTENT_W - 20, 'F5');
  for (const tl of coverTitleLines) {
    pushCoverText(tl, MARGIN_L, covY, 22, 'F5', cRgb.ivoryText);
    covY -= 28;
  }

  covY -= 6;
  const coverSubLines = wrapText(doc.subtitle, 11.5, CONTENT_W - 40, 'F6');
  for (const sl of coverSubLines) {
    pushCoverText(sl, MARGIN_L, covY, 11.5, 'F6', [0.82, 0.83, 0.86]);
    covY -= 16;
  }

  // Governance Notice on Cover (Subtle Restrained Box if Proposed)
  if (doc.governanceNotice) {
    covY -= 24;
    const gLines = wrapText(doc.governanceNotice, 8.2, CONTENT_W - 24, 'F1').slice(0, 4);
    const gH = gLines.length * 11.5 + 22;
    coverOps.push(
      `q 0.6 w ${cRgb.coverElevated[0].toFixed(3)} ${cRgb.coverElevated[1].toFixed(3)} ${cRgb.coverElevated[2].toFixed(3)} rg ${cRgb.goldHairline[0].toFixed(3)} ${cRgb.goldHairline[1].toFixed(3)} ${cRgb.goldHairline[2].toFixed(3)} RG ${MARGIN_L} ${(covY - gH + 10).toFixed(2)} ${CONTENT_W.toFixed(2)} ${gH.toFixed(2)} re B Q`
    );
    pushCoverText(
      'SCIENTIFIC GOVERNANCE & SECONDARY-DATA SCOPING CLASSIFICATION',
      MARGIN_L + 12,
      covY - 4,
      7.5,
      'F2',
      cRgb.heritageGold
    );
    gLines.forEach((gl, idx) => {
      pushCoverText(gl, MARGIN_L + 12, covY - 17 - idx * 11.5, 8.2, 'F1', [0.78, 0.8, 0.84]);
    });
  }

  // Bottom Cover Colophon — Natural Wrapping for Long Working Group Names
  pushCoverText(doc.code, MARGIN_L, 108, 11, 'F4', cRgb.heritageGold);
  const wgLines = wrapText(
    `${doc.isProposedWorkingGroup ? 'Proposed Working Group' : 'Working Group'}: ${doc.workingGroup}`,
    8.4,
    CONTENT_W,
    'F1'
  ).slice(0, 2);
  wgLines.forEach((wgl, idx) => {
    pushCoverText(wgl, MARGIN_L, 91 - idx * 11, 8.4, 'F1', cRgb.ivoryText);
  });
  const metaY = wgLines.length > 1 ? 66 : 75;
  pushCoverText(
    `Classification: ${doc.status} (${doc.version})   |   Date: ${doc.publicationDate}   |   PDF Pages: ${totalPages}`,
    MARGIN_L,
    metaY,
    7.8,
    'F4',
    [0.7, 0.72, 0.76]
  );
  pushCoverText(
    'kashmir-ecowatch.com   |   Supported by Dr. Kumar Foundation USA & Kumar Trust USA',
    MARGIN_L,
    46,
    7.6,
    'F1',
    cRgb.heritageGold
  );

  // ── PAGE 2..: EXECUTIVE ABSTRACT & SYNCHRONIZED TABLE OF CONTENTS ──────────
  const tocPages: PageBuilder[] = [];
  for (let tp = 0; tp < tocPageCount; tp++) {
    const tOps: string[] = [];
    paintArchivalPaperBg(tOps);

    let ty = TOP_Y - 4;
    if (tp === 0) {
      // Executive Abstract Block at top of Page 2
      const absLines = wrapText(doc.abstract, 9.4, CONTENT_W - 24, 'F7').slice(0, 6);
      const absBoxH = absLines.length * 13 + 30;
      tOps.push(
        `q 0.7 w ${cRgb.parchmentBox[0].toFixed(3)} ${cRgb.parchmentBox[1].toFixed(3)} ${cRgb.parchmentBox[2].toFixed(3)} rg ${cRgb.walnutBronze[0].toFixed(3)} ${cRgb.walnutBronze[1].toFixed(3)} ${cRgb.walnutBronze[2].toFixed(3)} RG ${MARGIN_L} ${(ty - absBoxH + 10).toFixed(2)} ${CONTENT_W.toFixed(2)} ${absBoxH.toFixed(2)} re B Q`,
        `BT /F2 8.20 Tf ${cRgb.walnutBronze[0].toFixed(3)} ${cRgb.walnutBronze[1].toFixed(3)} ${cRgb.walnutBronze[2].toFixed(3)} rg ${MARGIN_L + 12} ${(ty - 6).toFixed(2)} Td (EXECUTIVE SCIENTIFIC ABSTRACT  |  ${escapePdfLiteral(doc.studyAreaSummary.slice(0, 58))}) Tj ET`
      );
      absLines.forEach((al, idx) => {
        tOps.push(
          `BT /F7 9.40 Tf ${cRgb.inkPrimary[0].toFixed(3)} ${cRgb.inkPrimary[1].toFixed(3)} ${cRgb.inkPrimary[2].toFixed(3)} rg ${MARGIN_L + 12} ${(ty - 21 - idx * 13).toFixed(2)} Td (${escapePdfLiteral(al)}) Tj ET`
        );
      });
      ty -= absBoxH + 18;
    }

    tOps.push(
      `BT /F5 14.50 Tf ${cRgb.inkPrimary[0].toFixed(3)} ${cRgb.inkPrimary[1].toFixed(3)} ${cRgb.inkPrimary[2].toFixed(3)} rg ${MARGIN_L} ${ty.toFixed(2)} Td (CONTENTS & MONOGRAPH ARCHITECTURE) Tj ET`,
      `q 1.0 w ${cRgb.walnutBronze[0].toFixed(3)} ${cRgb.walnutBronze[1].toFixed(3)} ${cRgb.walnutBronze[2].toFixed(3)} RG ${MARGIN_L} ${(ty - 7).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(ty - 7).toFixed(2)} l S Q`
    );
    ty -= 26;

    const slice = chapterTocEntries.slice(tp * 24, (tp + 1) * 24);
    for (const entry of slice) {
      const actualPageNum = frontMatterPagesCount + entry.bodyPageIndex + 1;
      const label = `${entry.number}.   ${sanitizePdfText(entry.title)}`;
      const rightStr = `Page ${actualPageNum}`;
      tOps.push(
        `BT /F2 9.00 Tf ${cRgb.inkPrimary[0].toFixed(3)} ${cRgb.inkPrimary[1].toFixed(3)} ${cRgb.inkPrimary[2].toFixed(3)} rg ${MARGIN_L} ${ty.toFixed(2)} Td (${escapePdfLiteral(label.slice(0, 74))}) Tj ET`,
        `BT /F4 8.60 Tf ${cRgb.walnutBronze[0].toFixed(3)} ${cRgb.walnutBronze[1].toFixed(3)} ${cRgb.walnutBronze[2].toFixed(3)} rg ${(PAGE_W - MARGIN_R - 48).toFixed(2)} ${ty.toFixed(2)} Td (${rightStr}) Tj ET`,
        `q 0.3 w ${cRgb.paperBorder[0].toFixed(3)} ${cRgb.paperBorder[1].toFixed(3)} ${cRgb.paperBorder[2].toFixed(3)} RG ${MARGIN_L} ${(ty - 5).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(ty - 5).toFixed(2)} l S Q`
      );
      ty -= 20;
    }

    tocPages.push({
      ops: tOps,
      titleForBookmark: tp === 0 ? 'Abstract & Table of Contents' : undefined,
    });
  }

  const allPages: PageBuilder[] = [
    { ops: coverOps, titleForBookmark: `${doc.code} Minimalist Cover` },
    ...tocPages,
    ...bodyPages,
  ];

  // Running Headers & Footers on Interior Pages (Pages 2..N) with Embedded Official KEW Logo
  allPages.forEach((p, idx) => {
    if (idx === 0) return;
    const pageNum = idx + 1;
    const headerLeft = `KASHMIR ECOWATCH  |  ${doc.code}  |  ${sanitizePdfText(doc.title).slice(0, 50)}`;
    const footerLeft = `Kashmir EcoWatch Scientific Research Series (${doc.version} - ${doc.status})`;
    const footerRight = `${pageNum} / ${totalPages} PDF Pages`;
    const hdrTextX = officialLogos ? MARGIN_L + 18 : MARGIN_L;
    const hdrLogoOp = officialLogos
      ? `q 13 0 0 13 ${MARGIN_L.toFixed(2)} ${(PAGE_H - 38.5).toFixed(2)} cm /ImLogoHdr Do Q`
      : '';

    // Push after the background rect (index 1) so header/footer render on top of archival paper
    p.ops.splice(
      1,
      0,
      ...(hdrLogoOp ? [hdrLogoOp] : []),
      `q 0.5 w ${cRgb.paperBorder[0].toFixed(3)} ${cRgb.paperBorder[1].toFixed(3)} ${cRgb.paperBorder[2].toFixed(3)} RG ${MARGIN_L} ${(PAGE_H - 42).toFixed(2)} m ${PAGE_W - MARGIN_R} ${(PAGE_H - 42).toFixed(2)} l S Q`,
      `BT /F4 7.30 Tf ${cRgb.inkMuted[0].toFixed(3)} ${cRgb.inkMuted[1].toFixed(3)} ${cRgb.inkMuted[2].toFixed(3)} rg ${hdrTextX.toFixed(2)} ${(PAGE_H - 34).toFixed(2)} Td (${escapePdfLiteral(headerLeft)}) Tj ET`,
      `q 0.5 w ${cRgb.paperBorder[0].toFixed(3)} ${cRgb.paperBorder[1].toFixed(3)} ${cRgb.paperBorder[2].toFixed(3)} RG ${MARGIN_L} 40.00 m ${PAGE_W - MARGIN_R} 40.00 l S Q`,
      `BT /F1 7.50 Tf ${cRgb.inkMuted[0].toFixed(3)} ${cRgb.inkMuted[1].toFixed(3)} ${cRgb.inkMuted[2].toFixed(3)} rg ${MARGIN_L} 26.00 Td (${escapePdfLiteral(footerLeft)}) Tj ET`,
      `BT /F2 8.00 Tf ${cRgb.walnutBronze[0].toFixed(3)} ${cRgb.walnutBronze[1].toFixed(3)} ${cRgb.walnutBronze[2].toFixed(3)} rg ${(PAGE_W - MARGIN_R - 78).toFixed(2)} 26.00 Td (${escapePdfLiteral(footerRight)}) Tj ET`
    );
  });

  // ── ASSEMBLE BINARY %PDF-1.4 WITH FONTS + BINARY JPEG XOBJECTS ─────────────
  // Object IDs:
  // 1: Catalog, 2: Pages, 3..9: Fonts F1..F7, 10: Info, 11: Outlines Root
  const objects = new Map<number, string | Buffer>();
  const pageObjIds: number[] = [];

  objects.set(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  objects.set(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  objects.set(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
  objects.set(6, '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>');
  objects.set(7, '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>');
  objects.set(8, '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>');
  objects.set(9, '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>');

  const nowPdfDate = `D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z`;
  objects.set(
    10,
    `<< /Title (${escapePdfLiteral(`${doc.code}: ${doc.title}`)}) /Author (${escapePdfLiteral(doc.workingGroup)}) /Subject (${escapePdfLiteral(doc.abstract.slice(0, 220))}) /Creator (Kashmir EcoWatch x Craftlore Editorial Monograph Engine) /Producer (KEW-Craftlore PDF Engine v3.0) /CreationDate (${nowPdfDate}) >>`
  );

  let nextObjId = 12;

  // Register Embedded Image XObjects (/DCTDecode for JPEGs, /FlateDecode for Official KEW Logo)
  for (const img of embeddedImages) {
    const imgObjId = nextObjId++;
    img.objId = imgObjId;
    const dictHeader = Buffer.from(
      `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /${img.filter} /Length ${img.bytes.length} >>\nstream\n`,
      'latin1'
    );
    const dictFooter = Buffer.from('\nendstream', 'latin1');
    objects.set(imgObjId, Buffer.concat([dictHeader, img.bytes, dictFooter]));
  }

  const xObjectResStr =
    embeddedImages.length > 0
      ? `/XObject << ${embeddedImages.map((im) => `/${im.name} ${im.objId} 0 R`).join(' ')} >>`
      : '';

  allPages.forEach((p) => {
    const pId = nextObjId++;
    const cId = nextObjId++;
    pageObjIds.push(pId);
    const streamData = p.ops.join('\n');
    const streamByteLen = Buffer.byteLength(streamData, 'latin1');
    objects.set(cId, `<< /Length ${streamByteLen} >>\nstream\n${streamData}\nendstream`);
    objects.set(
      pId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R /F5 7 0 R /F6 8 0 R /F7 9 0 R >> ${xObjectResStr} >> /Contents ${cId} 0 R >>`
    );
  });

  // PDF Outline Bookmarks
  const bookmarkItems: Array<{ objId: number; title: string; pageObjId: number }> = [
    { objId: nextObjId++, title: `${doc.code} Minimalist Cover`, pageObjId: pageObjIds[0] },
    { objId: nextObjId++, title: 'Abstract & Contents', pageObjId: pageObjIds[1] },
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
      `<< /Title (${escapePdfLiteral(bm.title)}) /Parent 11 0 R ${prevPart}${nextPart}/Dest [${bm.pageObjId} 0 R /XYZ 0 ${PAGE_H.toFixed(2)} null] >>`
    );
  });

  objects.set(
    11,
    `<< /Type /Outlines /First ${bookmarkItems[0].objId} 0 R /Last ${bookmarkItems[bookmarkItems.length - 1].objId} 0 R /Count ${bookmarkItems.length} >>`
  );

  objects.set(
    2,
    `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>`
  );
  objects.set(1, '<< /Type /Catalog /Pages 2 0 R /Outlines 11 0 R /PageMode /UseOutlines >>');

  const maxObjId = nextObjId - 1;
  const chunks: Buffer[] = [];
  const offsets: number[] = new Array(maxObjId + 1).fill(0);
  let byteOffset = 0;

  const pushStr = (str: string) => {
    const buf = Buffer.from(str, 'latin1');
    chunks.push(buf);
    byteOffset += buf.length;
  };
  const pushBuf = (buf: Buffer) => {
    chunks.push(buf);
    byteOffset += buf.length;
  };

  pushStr('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  for (let id = 1; id <= maxObjId; id++) {
    offsets[id] = byteOffset;
    pushStr(`${id} 0 obj\n`);
    const body = objects.get(id) || 'null';
    if (Buffer.isBuffer(body)) {
      pushBuf(body);
    } else {
      pushStr(body);
    }
    pushStr('\nendobj\n');
  }

  const xrefOffset = byteOffset;
  pushStr(`xref\n0 ${maxObjId + 1}\n`);
  pushStr('0000000000 65535 f \n');
  for (let id = 1; id <= maxObjId; id++) {
    pushStr(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`);
  }

  pushStr(
    `trailer\n<< /Size ${maxObjId + 1} /Root 1 0 R /Info 10 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
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
