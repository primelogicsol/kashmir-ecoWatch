'use client';

import React, { useEffect, useState } from 'react';
import { PrimeLogicErrorView } from '@/components/common/PrimeLogicErrorView';
import { logDiagnosticError } from '@/lib/error-logger';

export default function Error({
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
      module: 'Global Application Router',
    });
    setReferenceCode(entry.referenceCode);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <PrimeLogicErrorView
        category="UNEXPECTED"
        referenceCode={referenceCode}
        onRetry={reset}
        showHome={true}
        variant="full-page"
      />
    </main>
  );
}
