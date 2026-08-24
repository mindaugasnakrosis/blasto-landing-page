import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { routes } from "@/lib/routes";

/** Syncs head tags on client-side navigation; renders nothing.
 *  No-op during prerendering, where the head is baked in by seo.renderHead(). */
const DocumentMeta = () => {
  useDocumentMeta();
  return null;
};

const RoutedPages = () => useRoutes(routes);

/** Router-agnostic app tree, shared by the browser entry (BrowserRouter)
 *  and the prerender entry (StaticRouter in entry-server.tsx). */
export const AppShell = () => (
  <>
    {/* The only provider the site actually needs: three forms raise toasts.
        react-query, sonner and the tooltip provider came with the shadcn
        scaffold, went unused, and cost ~84 kB of the initial bundle. */}
    <Toaster />
    <DocumentMeta />
    {/* Null fallback: the route being rendered has always been preloaded by
        this point, so this only shows while a client-side navigation fetches
        a chunk the visitor does not have yet. */}
    <Suspense fallback={null}>
      <RoutedPages />
    </Suspense>
  </>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
