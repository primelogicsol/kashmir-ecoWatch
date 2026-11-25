import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app/providers';
import { SafeHeader } from '@/components/common/SafeHeader';
import { SafeFooter } from '@/components/common/SafeFooter';
import { MobileQuickTelemetryBar } from '@/components/navigation/MobileQuickTelemetryBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { DiscoveryReferralBeacon } from '@/components/seo/DiscoveryReferralBeacon';
import { CANONICAL_HOMEPAGE_URL, CANONICAL_SITE_URL, KEW_IDENTITY } from '@/lib/seo/entity-identity';
import { buildRootEntityGraph } from '@/lib/seo/structured-data';

const inter = Inter({ subsets: ['latin'] });
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020617',
};

const verificationOther: Record<string, string> = {};
if (process.env.BING_SITE_VERIFICATION) {
  verificationOther['msvalidate.01'] = process.env.BING_SITE_VERIFICATION;
}
if (process.env.BAIDU_SITE_VERIFICATION) {
  verificationOther['baidu-site-verification'] = process.env.BAIDU_SITE_VERIFICATION;
}

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  applicationName: KEW_IDENTITY.applicationName,
  title: {
    default: KEW_IDENTITY.homepageTitle,
    template: `%s | ${KEW_IDENTITY.officialName}`,
  },
  description: KEW_IDENTITY.homepageDescription,
  keywords: [
    'Kashmir EcoWatch',
    'Kashmir Eco Watch',
    'Kashmir Ecowatch',
    'KEW',
    'KEW Western Himalayan',
    'Kashmir EcoWatch Western Himalayan',
    'Kashmir Eco Watch Western Himalayan',
    'Kashmir Ecowatch Western Himalayan',
    'Kashmir environment',
    'Western Himalayan ecology',
    'Dal Lake pollution',
    'Sheshnag Lake ecology',
    'Wular Lake',
    'Hokersar Wetland',
    'Kolahoi Glacier',
    'Hangul conservation',
    'Kashmir biodiversity',
    'Kashmir GIS',
  ],
  authors: [{ name: KEW_IDENTITY.extendedName, url: CANONICAL_HOMEPAGE_URL }],
  creator: KEW_IDENTITY.extendedName,
  publisher: KEW_IDENTITY.extendedName,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [KEW_IDENTITY.logoPath],
    apple: [KEW_IDENTITY.logoPath],
  },
  alternates: {
    canonical: CANONICAL_HOMEPAGE_URL,
  },
  openGraph: {
    title: KEW_IDENTITY.homepageTitle,
    description: KEW_IDENTITY.homepageDescription,
    url: CANONICAL_HOMEPAGE_URL,
    siteName: KEW_IDENTITY.officialName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: KEW_IDENTITY.logoPath,
        alt: `${KEW_IDENTITY.extendedName} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: KEW_IDENTITY.twitterHandle,
    creator: KEW_IDENTITY.twitterHandle,
    title: KEW_IDENTITY.homepageTitle,
    description: KEW_IDENTITY.homepageDescription,
    images: [KEW_IDENTITY.logoPath],
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.YANDEX_VERIFICATION
      ? { yandex: process.env.YANDEX_VERIFICATION }
      : {}),
    ...(process.env.YAHOO_VERIFICATION
      ? { yahoo: process.env.YAHOO_VERIFICATION }
      : {}),
    ...(Object.keys(verificationOther).length > 0 ? { other: verificationOther } : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoNastaliqUrdu.variable} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <a
          href="#kew-main-surface"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-600 focus:text-white focus:text-xs focus:font-bold focus:shadow-xl"
        >
          Skip to main content
        </a>
        <JsonLd id="kew-entity-graph" data={buildRootEntityGraph()} />
        <Providers>
          <DiscoveryReferralBeacon />
          <SafeHeader />
          <div id="kew-main-surface" className="pb-16 md:pb-0 min-h-screen flex flex-col">
            {children}
          </div>
          <MobileQuickTelemetryBar />
          <SafeFooter />
        </Providers>
      </body>
    </html>
  );
}
