import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

/**
 * Renders safe, server-compatible Schema.org JSON-LD script blocks.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const serialized = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
