'use client';

import React from 'react';
import { PrimeLogicErrorView } from '@/components/common/PrimeLogicErrorView';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <PrimeLogicErrorView
        category="NOT_FOUND"
        title="Page not found"
        description="The requested Kashmir EcoWatch page could not be found. You can return to the homepage or search our environmental intelligence atlas."
        showHome={true}
        showBack={true}
        showRetry={false}
        variant="full-page"
        moduleName="Resource Locator"
      />
    </main>
  );
}
