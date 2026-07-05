'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-2xl border border-red-500/20 bg-slate-900/90 backdrop-blur-sm p-8 text-center">
        <div className="mb-4 text-4xl">🌿</div>
        <h1 className="text-white font-bold text-2xl mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Kashmir EcoWatch encountered an unexpected error while loading environmental intelligence layers.
          This is usually temporary — please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors"
          >
            ↻ Try Again
          </button>
          <a
            href="/"
            className="px-5 py-2.5 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-300 font-medium text-sm transition-colors"
          >
            Go Home
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
              Error details (dev only)
            </summary>
            <pre className="mt-2 p-3 rounded-lg bg-slate-950 text-red-400 text-xs overflow-auto max-h-40">
              {error.message}
              {'\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
