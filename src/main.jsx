import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      const err = this.state.error;
      const message = err?.message || String(err);
      const stack = err?.stack || "";
      return (
        <div
          style={{
            padding: 24,
            fontFamily: "system-ui, sans-serif",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <h1 style={{ color: "#b91c1c", marginTop: 0 }}>App crashed</h1>
          <p style={{ color: "#334155" }}>
            Open DevTools (F12) → Console for details. Common fixes: stop dev
            server, delete <code>node_modules/.vite</code>, run{" "}
            <code>npm run dev</code> again.
          </p>
          <pre
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              padding: 16,
              borderRadius: 12,
              overflow: "auto",
              color: "#0f172a",
              fontSize: 13,
            }}
          >
            {message}
            {stack ? `\n\n${stack}` : ""}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const el = document.getElementById("root");
if (!el) {
  throw new Error("Missing #root element in index.html");
}

createRoot(el).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);
