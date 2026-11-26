'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  HD_ROUTES,
  toDispatchCanonicalUrl,
} from '@/lib/himalayan-dispatch-routes';

export interface EditorialBreadcrumbItem {
  label: string;
  href?: string;
}

export function EditorialBreadcrumbs({
  items,
  darkSurface = false,
}: {
  items: EditorialBreadcrumbItem[];
  darkSurface?: boolean;
}) {
  const fullItems: EditorialBreadcrumbItem[] = [
    { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
    ...items,
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: toDispatchCanonicalUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd
        id={`hd-breadcrumb-${fullItems.map((i) => i.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')).join('-')}`}
        data={schema}
      />
      <nav
        aria-label="Breadcrumb"
        className="w-full pb-4 mb-6 border-b"
        style={{
          borderColor: darkSurface ? 'rgba(242, 239, 231, 0.16)' : 'var(--hd-rule)',
        }}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] hd-font-sans tracking-[0.18em] uppercase">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className="w-3 h-3 shrink-0"
                    style={{ color: darkSurface ? '#A39B8B' : 'var(--hd-stone)' }}
                  />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:underline underline-offset-4 transition-opacity hover:opacity-80"
                    style={{ color: darkSurface ? '#D8C3A5' : 'var(--hd-fg-muted)' }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="font-semibold"
                    style={{ color: darkSurface ? '#F2EFE7' : 'var(--hd-copper)' }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
