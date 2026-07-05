'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional name shown in the fallback UI to help identify which section failed */
  sectionName?: string;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary — catches runtime errors in any child component tree
 * and renders a graceful fallback instead of crashing the whole page to blank.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[ErrorBoundary] ${this.props.sectionName || 'Component'} crashed:`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full py-8 px-4">
          <div className="mx-auto max-w-2xl rounded-2xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-sm p-6 text-center">
            <div className="mb-3 text-amber-400 text-2xl">⚠️</div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {this.props.sectionName
                ? `${this.props.sectionName} — Temporarily Unavailable`
                : 'Section Temporarily Unavailable'}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              This module encountered an issue while loading. The rest of the platform remains fully operational.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-600/30 transition-colors"
            >
              ↻ Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
                  Developer details
                </summary>
                <pre className="mt-2 p-3 rounded-lg bg-slate-950 text-red-400 text-xs overflow-auto max-h-40">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
