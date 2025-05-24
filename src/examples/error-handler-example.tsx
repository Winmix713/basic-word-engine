import React from 'react';
import { ErrorMessage } from './error-boundary';

interface ErrorHandlerProps {
  children: React.ReactNode;
}

interface ErrorHandlerState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {
  constructor(props: ErrorHandlerProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // You can also log error messages to an error reporting service here
    console.error("Error caught by ErrorHandler:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ error: null, errorInfo: null });
    
    // Reload the page if needed for a complete reset
    // window.location.reload();
  }

  render(): React.ReactNode {
    if (this.state.error) {
      // Error path
      return (
        <ErrorMessage 
          error={this.state.error}
          onRetry={this.handleRetry}
          showDetails={true}
        />
      );
    }
    
    // Normally, just render children
    return this.props.children;
  }
}