import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadRoute } from "@/lib/routes";
import "./index.css";

const container = document.getElementById("root")!;

// The current route's chunk has to be in memory before the first render, or
// React suspends and swaps the prerendered HTML for the Suspense fallback -
// see src/lib/routeChunk.tsx. Chained rather than top-level await so the
// bundle does not depend on the build target supporting TLA.
void preloadRoute(window.location.pathname).then(() => {
  // Prerendered pages hydrate; the 404.html SPA fallback ships an empty root
  // and renders from scratch.
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
});
