import React from 'react';
import { headers } from 'next/headers';
import { Cormorant_Garamond, Newsreader, Inter } from 'next/font/google';
import './editorial.css';
import { DispatchThemeProvider } from '@/components/himalayan-dispatch/DispatchThemeContext';
import { DispatchPublicChromeShell } from '@/components/himalayan-dispatch/DispatchPublicChromeShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { CANONICAL_SITE_URL, KEW_IDENTITY } from '@/lib/seo/entity-identity';
import {
  CANONICAL_DISPATCH_URL,
  DISPATCH_IDENTITY,
  isDispatchHostname,
} from '@/lib/himalayan-dispatch-routes';
import { enterDispatchRequestContext } from '@/lib/himalayan-dispatch-server-context';

export const dynamic = 'force-dynamic';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-hd-display',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-hd-body',
  display: 'swap',
});

const editorialSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hd-sans',
  display: 'swap',
});

const periodicalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NewsMediaOrganization',
      '@id': `${CANONICAL_DISPATCH_URL}/#organization`,
      name: DISPATCH_IDENTITY.officialName,
      alternateName: DISPATCH_IDENTITY.extendedName,
      url: DISPATCH_IDENTITY.canonicalHomepageUrl,
      publishingPrinciples: `${CANONICAL_DISPATCH_URL}/editorial-charter`,
      ethicsPolicy: `${CANONICAL_DISPATCH_URL}/ethics-governance`,
      correctionsPolicy: `${CANONICAL_DISPATCH_URL}/corrections`,
      verificationFactCheckingPolicy: `${CANONICAL_DISPATCH_URL}/source-protection-verification`,
      masthead: `${CANONICAL_DISPATCH_URL}/editorial-board`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: DISPATCH_IDENTITY.headquartersLocality,
        addressRegion: DISPATCH_IDENTITY.headquartersRegion,
        postalCode: DISPATCH_IDENTITY.headquartersPostalCode,
        addressCountry: DISPATCH_IDENTITY.headquartersCountry,
      },
      parentOrganization: {
        '@type': 'Organization',
        '@id': `${CANONICAL_SITE_URL}/#organization`,
        name: KEW_IDENTITY.extendedName,
        url: `${CANONICAL_SITE_URL}/`,
      },
    },
    {
      '@type': 'Periodical',
      '@id': `${CANONICAL_DISPATCH_URL}/#periodical`,
      name: DISPATCH_IDENTITY.officialName,
      alternateName: DISPATCH_IDENTITY.extendedName,
      description:
        'An independent digital environmental periodical exploring fragile landscapes, mountain communities, investigative accountability, and ecological truth across the Western Himalayas.',
      url: DISPATCH_IDENTITY.canonicalHomepageUrl,
      publisher: {
        '@id': `${CANONICAL_DISPATCH_URL}/#organization`,
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebSite',
      '@id': `${CANONICAL_DISPATCH_URL}/#website`,
      name: DISPATCH_IDENTITY.officialName,
      url: DISPATCH_IDENTITY.canonicalHomepageUrl,
      publisher: {
        '@id': `${CANONICAL_DISPATCH_URL}/#organization`,
      },
      inLanguage: 'en',
    },
  ],
};

export default async function HimalayanDispatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const rawHost = hdrs.get('x-forwarded-host') || hdrs.get('host') || '';
  const isSubdomain = hdrs.get('x-hd-subdomain') === '1' || isDispatchHostname(rawHost);
  enterDispatchRequestContext(isSubdomain);

  return (
    <div className={`${cormorant.variable} ${newsreader.variable} ${editorialSans.variable}`}>
      <JsonLd id="hd-periodical-schema" data={periodicalStructuredData} />
      <DispatchThemeProvider>
        <DispatchPublicChromeShell>{children}</DispatchPublicChromeShell>
      </DispatchThemeProvider>
    </div>
  );
}
