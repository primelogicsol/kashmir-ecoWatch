import React from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Newsreader } from 'next/font/google';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata('/about/message');

const msgDisplaySerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-msg-display',
  display: 'swap',
});

const msgBodySerif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-msg-serif',
  display: 'swap',
});

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${msgDisplaySerif.variable} ${msgBodySerif.variable}`}>
      {children}
    </div>
  );
}
