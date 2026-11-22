'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { PrimeLogicErrorView } from './PrimeLogicErrorView';
import { ErrorCategory, logDiagnosticError } from '@/lib/error-logger';

interface Props {
  children: ReactNode;
  category?: ErrorCategory;
  moduleName?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  variant?: 'full-page' | 'embedded';
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  referenceCode?: string;
}

export class PrimeLogicErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const log = logDiagnosticError({
      category: this.props.category || 'UNEXPECTED',
      error,
      module: this.props.moduleName || 'Nested Component Boundary',
    });
    this.setState({ referenceCode: log.referenceCode });
  }

  handleReset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <PrimeLogicErrorView
          category={this.props.category || 'UNEXPECTED'}
          title={this.props.fallbackTitle}
          description={this.props.fallbackDescription}
          moduleName={this.props.moduleName}
          referenceCode={this.state.referenceCode}
          onRetry={this.handleReset}
          variant={this.props.variant || 'embedded'}
        />
      );
    }

    return this.props.children;
  }
}
