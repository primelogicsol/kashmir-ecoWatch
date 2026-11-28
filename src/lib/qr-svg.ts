// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH — STANDARDS-COMPLIANT ISO/IEC 18004 QR CODE MATRIX ENCODER
// Pure TypeScript, zero external dependencies, zero third-party network calls.
// Supports Byte Mode (UTF-8) Versions 1–9 (ECC Level L, up to 230 bytes).
// ─────────────────────────────────────────────────────────────────────────────

interface QrVersionSpec {
  version: number;
  size: number;
  dataCodewords: number;
  ecCodewordsPerBlock: number;
  numBlocks: number;
  alignmentCenters: number[];
}

const VERSION_SPECS: QrVersionSpec[] = [
  { version: 1, size: 21, dataCodewords: 19, ecCodewordsPerBlock: 7, numBlocks: 1, alignmentCenters: [] },
  { version: 2, size: 25, dataCodewords: 34, ecCodewordsPerBlock: 10, numBlocks: 1, alignmentCenters: [6, 18] },
  { version: 3, size: 29, dataCodewords: 55, ecCodewordsPerBlock: 15, numBlocks: 1, alignmentCenters: [6, 22] },
  { version: 4, size: 33, dataCodewords: 80, ecCodewordsPerBlock: 20, numBlocks: 1, alignmentCenters: [6, 26] },
  { version: 5, size: 37, dataCodewords: 108, ecCodewordsPerBlock: 26, numBlocks: 1, alignmentCenters: [6, 30] },
  { version: 6, size: 41, dataCodewords: 136, ecCodewordsPerBlock: 18, numBlocks: 2, alignmentCenters: [6, 34] },
  { version: 7, size: 45, dataCodewords: 156, ecCodewordsPerBlock: 20, numBlocks: 2, alignmentCenters: [6, 22, 38] },
  { version: 8, size: 49, dataCodewords: 194, ecCodewordsPerBlock: 24, numBlocks: 2, alignmentCenters: [6, 24, 42] },
  { version: 9, size: 53, dataCodewords: 232, ecCodewordsPerBlock: 30, numBlocks: 2, alignmentCenters: [6, 26, 46] },
];

function computeVersionInfoBits(version: number): number {
  let rem = version << 12;
  for (let i = 5; i >= 0; i--) {
    if (rem & (1 << (i + 12))) {
      rem ^= 0x1f25 << i;
    }
  }
  return (version << 12) | rem;
}

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function reedSolomonGenerator(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    const root = GF_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], root);
    }
    poly = next;
  }
  return poly;
}

function reedSolomonRemainder(data: Uint8Array, degree: number): Uint8Array {
  const gen = reedSolomonGenerator(degree);
  const rem = new Uint8Array(degree);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ rem[0];
    rem.copyWithin(0, 1);
    rem[degree - 1] = 0;
    for (let j = 0; j < degree; j++) {
      rem[j] ^= gfMul(gen[j + 1], factor);
    }
  }
  return rem;
}

export function encodeQrMatrix(text: string): boolean[][] {
  const bytes = new TextEncoder().encode(text);
  // Pick smallest version that fits mode(4 bits) + len(8 bits) + payload
  const spec =
    VERSION_SPECS.find((v) => bytes.length + 2 <= v.dataCodewords) ||
    VERSION_SPECS[VERSION_SPECS.length - 1];

  const maxPayload = spec.dataCodewords - 2;
  const payload = bytes.length > maxPayload ? bytes.slice(0, maxPayload) : bytes;

  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
  };

  // Byte mode indicator = 0100, 8-bit byte count (Versions 1–9)
  pushBits(0b0100, 4);
  pushBits(payload.length, 8);
  for (let i = 0; i < payload.length; i++) pushBits(payload[i], 8);

  const totalDataBits = spec.dataCodewords * 8;
  const terminator = Math.min(4, totalDataBits - bits.length);
  pushBits(0, terminator);
  while (bits.length % 8 !== 0) bits.push(0);

  const dataWords = new Uint8Array(spec.dataCodewords);
  for (let i = 0; i < bits.length / 8; i++) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i * 8 + j];
    dataWords[i] = b;
  }
  let padIdx = 0;
  for (let i = bits.length / 8; i < spec.dataCodewords; i++) {
    dataWords[i] = padIdx % 2 === 0 ? 0xec : 0x11;
    padIdx++;
  }

  // Split into blocks & compute Reed-Solomon ECC
  const blockLen = spec.dataCodewords / spec.numBlocks;
  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  for (let b = 0; b < spec.numBlocks; b++) {
    const slice = dataWords.slice(b * blockLen, (b + 1) * blockLen);
    dataBlocks.push(slice);
    ecBlocks.push(reedSolomonRemainder(slice, spec.ecCodewordsPerBlock));
  }

  const finalCodewords: number[] = [];
  for (let i = 0; i < blockLen; i++) {
    for (let b = 0; b < spec.numBlocks; b++) finalCodewords.push(dataBlocks[b][i]);
  }
  for (let i = 0; i < spec.ecCodewordsPerBlock; i++) {
    for (let b = 0; b < spec.numBlocks; b++) finalCodewords.push(ecBlocks[b][i]);
  }

  const size = spec.size;
  const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const setFunc = (r: number, c: number, dark: boolean) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      modules[r][c] = dark;
      isFunction[r][c] = true;
    }
  };

  // Finder patterns + separators
  const drawFinder = (topR: number, leftC: number) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const dist = Math.max(Math.abs(dr - 3), Math.abs(dc - 3));
        const dark = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6 && (dist === 3 || dist <= 1);
        setFunc(topR + dr, leftC + dc, dark);
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    setFunc(6, i, i % 2 === 0);
    setFunc(i, 6, i % 2 === 0);
  }

  // Alignment patterns
  const centers = spec.alignmentCenters;
  for (const r of centers) {
    for (const c of centers) {
      if ((r === 6 && c === 6) || (r === 6 && c === size - 7) || (r === size - 7 && c === 6)) {
        continue;
      }
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc));
          setFunc(r + dr, c + dc, dist !== 1);
        }
      }
    }
  }

  // Reserve format info modules & dark module
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) {
      if (!isFunction[8][i]) setFunc(8, i, false);
      if (!isFunction[i][8]) setFunc(i, 8, false);
    }
  }
  for (let i = 0; i < 8; i++) {
    setFunc(8, size - 1 - i, false);
    setFunc(size - 1 - i, 8, false);
  }
  setFunc(size - 8, 8, true);

  // Version information blocks (two 6x3 regions required for ISO 18004 Versions >= 7)
  if (spec.version >= 7) {
    const versionBits = computeVersionInfoBits(spec.version);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        const dark = ((versionBits >>> (i * 3 + j)) & 1) === 1;
        setFunc(size - 11 + j, i, dark);
        setFunc(i, size - 11 + j, dark);
      }
    }
  }

  // Place data bits in upward/downward 2-column zig-zag
  const allBits: number[] = [];
  for (const cw of finalCodewords) {
    for (let b = 7; b >= 0; b--) allBits.push((cw >>> b) & 1);
  }
  // Remainder bits (7 for V2–V6, 0 for V1 and V7–V9)
  if (spec.version >= 2 && spec.version <= 6) {
    for (let i = 0; i < 7; i++) allBits.push(0);
  }

  let bitPtr = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      const r = upward ? size - 1 - vert : vert;
      for (let j = 0; j < 2; j++) {
        const c = right - j;
        if (!isFunction[r][c]) {
          const bit = bitPtr < allBits.length ? allBits[bitPtr++] === 1 : false;
          // Apply Mask 0: (r + c) % 2 === 0
          modules[r][c] = (r + c) % 2 === 0 ? !bit : bit;
        }
      }
    }
    upward = !upward;
  }

  // Format information for ECC Level L (01) + Mask 0 (000) => precomputed BCH = 0x77c4
  const formatBits = 0x77c4;
  const getFmtBit = (idx: number) => ((formatBits >>> idx) & 1) === 1;

  for (let i = 0; i <= 5; i++) modules[8][i] = getFmtBit(i);
  modules[8][7] = getFmtBit(6);
  modules[8][8] = getFmtBit(7);
  modules[7][8] = getFmtBit(8);
  for (let i = 9; i < 15; i++) modules[14 - i][8] = getFmtBit(i);

  for (let i = 0; i < 8; i++) modules[8][size - 1 - i] = getFmtBit(i);
  for (let i = 8; i < 15; i++) modules[size - 15 + i][8] = getFmtBit(i);

  return modules;
}

export function renderQrSvgString(text: string, quietZone = 3): string {
  const matrix = encodeQrMatrix(text);
  const n = matrix.length;
  const total = n + quietZone * 2;
  const rects: string[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c]) {
        rects.push(`<rect x="${c + quietZone}" y="${r + quietZone}" width="1" height="1" fill="#0f172a"/>`);
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#ffffff"/>${rects.join('')}</svg>`;
}
