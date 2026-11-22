'use client';

import React, { useEffect, useState } from 'react';
import { PrimeLogicErrorView } from '@/components/common/PrimeLogicErrorView';
import { logDiagnosticError } from '@/lib/error-logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [referenceCode, setReferenceCode] = useState<string>('');

  useEffect(() => {
    const entry = logDiagnosticError({
      category: 'UNEXPECTED',
      error,
      module: 'Root Application Shell',
    });
    setReferenceCode(entry.referenceCode);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex items-center justify-center p-0 m-0 font-sans">
        <PrimeLogicErrorView
          category="UNEXPECTED"
          referenceCode={referenceCode}
          onRetry={reset}
          showHome={true}
          variant="full-page"
        />
      </body>
    </html>
  );
}
