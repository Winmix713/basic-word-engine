import React from 'react';
import ErrorStackParser from 'error-stack-parser';
import { ErrorBoundaryProps, ErrorBoundaryState, ErrorInfo } from './types';
import { ErrorMessage } from './ErrorMessage';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
      hasError: true
    });

    // Log error to console with stack trace
    console.error('Error caught by ErrorBoundary:', {
      error,
      componentStack: errorInfo.componentStack,
      parsedStack: ErrorStackParser.parse(error)
    });

    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.hasError && this.props.resetKeys) {
      if (
        prevProps.resetKeys &&
        !this.areArraysEqual(prevProps.resetKeys, this.props.resetKeys)
      ) {
        this.resetErrorBoundary();
      }
    }
  }

  private areArraysEqual(arr1: any[], arr2: any[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.();
    this.setState({
      error: null,
      errorInfo: null,
      hasError: false
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorMessage
          error={this.state.error}
          onRetry={this.resetErrorBoundary}
          showDetails={process.env.NODE_ENV === 'development'}
        />
      );
    }

    return this.props.children;
  }
}