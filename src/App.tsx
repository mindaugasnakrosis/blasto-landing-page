import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { featurePages } from "@/lib/featurePages";
import { guides } from "@/lib/guides";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FeatureDetail from "./pages/FeatureDetail";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import DueDateCalculator from "./pages/DueDateCalculator";
import About from "./pages/About";
import EditorialStandards from "./pages/EditorialStandards";

const queryClient = new QueryClient();

/** Syncs head tags on client-side navigation; renders nothing.
 *  No-op during prerendering, where the head is baked in by seo.renderHead(). */
const DocumentMeta = () => {
  useDocumentMeta();
  return null;
};

/** Router-agnostic app tree, shared by the browser entry (BrowserRouter)
 *  and the prerender entry (StaticRouter in entry-server.tsx). */
export const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Generated from the data modules — adding an entry there creates the
            route, its head metadata (src/lib/seo.ts), and its sitemap line. */}
        {featurePages.map((page) => (
          <Route key={page.slug} path={page.slug} element={<FeatureDetail page={page} />} />
        ))}

        <Route path="/ivf-due-date-calculator" element={<DueDateCalculator />} />
        <Route path="/guides" element={<Guides />} />
        {guides.map((guide) => (
          <Route
            key={guide.slug}
            path={`/guides/${guide.slug}`}
            element={<GuideDetail guide={guide} />}
          />
        ))}

        <Route path="/about" element={<About />} />
        <Route path="/editorial-standards" element={<EditorialStandards />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
