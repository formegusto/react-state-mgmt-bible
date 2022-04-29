import React from "react";

class ErrorBoundary extends React.Component<React.PropsWithChildren<any>, any> {
  constructor(props: React.PropsWithChildren<any>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render(): React.ReactNode {
    return this.state.error ? (
      <div>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
