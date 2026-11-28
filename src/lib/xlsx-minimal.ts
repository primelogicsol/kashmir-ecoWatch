import zlib from 'zlib';

export interface XlsxSheetInput {
  name: string;
  rows: Array<Record<string, unknown>>;
}

function escapeXml(val: unknown): string {
  return String(val ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function columnLetter(colIndexZeroBased: number): string {
  let n = colIndexZeroBased + 1;
  let letters = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    n = Math.floor((n - 1) / 26);
  }
  return letters;
}

function buildSheetXml(rows: Array<Record<string, unknown>>): string {
  const headers = rows.length > 0 ? Object.keys(rows[0]) : ['Notice'];
  const allRows: Array<unknown[]> = [
    headers,
    ...rows.map((r) => headers.map((h) => r[h] ?? '')),
  ];

  const xmlRows = allRows
    .map((cells, rIdx) => {
      const rNum = rIdx + 1;
      const xmlCells = cells
        .map((v, cIdx) => {
          const ref = `${columnLetter(cIdx)}${rNum}`;
          if (typeof v === 'number' && Number.isFinite(v) && rIdx > 0) {
            return `<c r="${ref}"><v>${v}</v></c>`;
          }
          return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(v)}</t></is></c>`;
        })
        .join('');
      return `<row r="${rNum}">${xmlCells}</row>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${xmlRows}</sheetData></worksheet>`;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZipArchive(entries: Array<{ path: string; data: Buffer }>): Buffer {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.path, 'utf8');
    const uncompressed = entry.data;
    const compressed = zlib.deflateRawSync(uncompressed);
    const crc = crc32(uncompressed);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0x21, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(uncompressed.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, nameBuf, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0x21, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(uncompressed.length, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, nameBuf);
    offset += localHeader.length + nameBuf.length + compressed.length;
  }

  const centralBuf = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(entries.length, 8);
  endRecord.writeUInt16LE(entries.length, 10);
  endRecord.writeUInt32LE(centralBuf.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralBuf, endRecord]);
}

/**
 * Generates a valid OpenXML (.xlsx) multi-sheet workbook buffer using zero external dependencies
 * (replacing unpatched xlsx@0.18.5).
 */
export function buildMinimalXlsxBuffer(sheets: XlsxSheetInput[]): Buffer {
  const safeSheets = sheets.filter((s) => s.rows.length > 0);
  const effectiveSheets =
    safeSheets.length > 0 ? safeSheets : [{ name: 'Summary', rows: [{ Notice: 'No rows' }] }];

  const contentTypesOverrides = effectiveSheets
    .map(
      (_, i) =>
        `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
    )
    .join('');

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${contentTypesOverrides}
</Types>`;

  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

  const workbookSheetsXml = effectiveSheets
    .map((s, i) => {
      const cleanName = escapeXml(s.name.replace(/[:\\/?*[\]]/g, '_').slice(0, 31) || `Sheet${i + 1}`);
      return `<sheet name="${cleanName}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`;
    })
    .join('');

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${workbookSheetsXml}</sheets>
</workbook>`;

  const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${effectiveSheets
    .map(
      (_, i) =>
        `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`
    )
    .join('')}
</Relationships>`;

  const entries: Array<{ path: string; data: Buffer }> = [
    { path: '[Content_Types].xml', data: Buffer.from(contentTypesXml, 'utf8') },
    { path: '_rels/.rels', data: Buffer.from(rootRelsXml, 'utf8') },
    { path: 'xl/workbook.xml', data: Buffer.from(workbookXml, 'utf8') },
    { path: 'xl/_rels/workbook.xml.rels', data: Buffer.from(workbookRelsXml, 'utf8') },
    ...effectiveSheets.map((s, i) => ({
      path: `xl/worksheets/sheet${i + 1}.xml`,
      data: Buffer.from(buildSheetXml(s.rows), 'utf8'),
    })),
  ];

  return buildZipArchive(entries);
}
