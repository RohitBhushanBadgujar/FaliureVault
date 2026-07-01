import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-bg-card rounded-xl border border-border-subtle mt-8 max-w-2xl mx-auto shadow-lg">
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Something went wrong</h2>
          <p className="text-text-secondary mb-6 max-w-md">
            {this.props.fallbackMessage || 'The workspace failed to load properly. The module has been isolated to prevent a complete crash.'}
          </p>
          {this.state.error && (
            <div className="text-left w-full bg-bg-elevated p-4 rounded-lg overflow-auto border border-border-subtle mb-6">
              <pre className="text-[10px] text-danger font-mono whitespace-pre-wrap">
                {this.state.error.toString()}
              </pre>
            </div>
          )}
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2 bg-bg-elevated hover:bg-bg-primary text-text-primary border border-border-subtle rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
