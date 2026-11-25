import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

/**
 * Renders safe, server-compatible Schema.org JSON-LD script blocks.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
