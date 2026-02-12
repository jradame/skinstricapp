import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700 }}>Something crashed.</h1>
          <p style={{ marginTop: 8 }}>
            Open DevTools → Console for the exact error. This screen prevents the blank page.
          </p>
          <pre style={{ marginTop: 12, background: "#111", color: "#0f0", padding: 12, overflow: "auto" }}>
            {String(this.state.error)}
          </pre>
          <button
            style={{ marginTop: 12, padding: "10px 14px", cursor: "pointer" }}
            onClick={() => window.location.assign("/")}
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
