'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HimalayanDispatchMasthead } from './HimalayanDispatchMasthead';
import { HimalayanDispatchFooter } from './HimalayanDispatchFooter';

/**
 * Enforces Section 27 Design Standard:
 * Public Himalayan Dispatch pages retain the Ivory/Ink/Copper luxury magazine
 * Masthead and Footer, whereas private `/himalayan-dispatch/newsroom/**` pages
 * render inside the compact, productivity-oriented HDN Application Shell.
 */
export function DispatchPublicChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isPrivateNewsroomApp =
    pathname === '/newsroom' ||
    pathname.startsWith('/newsroom/') ||
    pathname === '/himalayan-dispatch/newsroom' ||
    pathname.startsWith('/himalayan-dispatch/newsroom/');

  if (isPrivateNewsroomApp) {
    return <>{children}</>;
  }

  return (
    <>
      <HimalayanDispatchMasthead />
      <main id="hd-magazine-main">{children}</main>
      <HimalayanDispatchFooter />
    </>
  );
}
