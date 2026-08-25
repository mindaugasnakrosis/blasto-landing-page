import { matchRoutes, type RouteObject } from "react-router-dom";
import { featurePages } from "@/lib/featurePages";
import { guides } from "@/lib/guides";
import { routeChunk } from "@/lib/routeChunk";

/* Every page is its own chunk, so a visitor landing on /privacy or a guide
 * downloads that page instead of the whole site. See routeChunk() for why
 * these are not plain React.lazy. */
const Index = routeChunk("src/pages/Index.tsx", () => import("@/pages/Index"));
const NotFound = routeChunk("src/pages/NotFound.tsx", () => import("@/pages/NotFound"));
const PrivacyPolicy = routeChunk("src/pages/PrivacyPolicy.tsx", () => import("@/pages/PrivacyPolicy"));
const DeleteAccount = routeChunk("src/pages/DeleteAccount.tsx", () => import("@/pages/DeleteAccount"));
const TermsOfService = routeChunk("src/pages/TermsOfService.tsx", () => import("@/pages/TermsOfService"));
const FeatureDetail = routeChunk("src/pages/FeatureDetail.tsx", () => import("@/pages/FeatureDetail"));
const Guides = routeChunk("src/pages/Guides.tsx", () => import("@/pages/Guides"));
const GuideDetail = routeChunk("src/pages/GuideDetail.tsx", () => import("@/pages/GuideDetail"));
const DueDateCalculator = routeChunk("src/pages/DueDateCalculator.tsx", () => import("@/pages/DueDateCalculator"));
const HcgCalculator = routeChunk("src/pages/HcgCalculator.tsx", () => import("@/pages/HcgCalculator"));
const About = routeChunk("src/pages/About.tsx", () => import("@/pages/About"));
const EditorialStandards = routeChunk("src/pages/EditorialStandards.tsx", () => import("@/pages/EditorialStandards"));
const VerifyEmail = routeChunk("src/pages/VerifyEmail.tsx", () => import("@/pages/VerifyEmail"));

/** A route plus the chunk it needs, so matching a URL and preloading it are
 *  driven by one list rather than two that can drift apart. */
type AppRoute = RouteObject & {
  path: string;
  preload: () => Promise<void>;
  module: string;
};

export const routes: AppRoute[] = [
  { path: "/", element: <Index />, preload: Index.preload, module: Index.module },

  // Generated from the data modules — adding an entry there creates the route,
  // its head metadata (src/lib/seo.ts), and its sitemap line.
  ...featurePages.map((page) => ({
    path: page.slug,
    element: <FeatureDetail page={page} />,
    preload: FeatureDetail.preload,
    module: FeatureDetail.module,
  })),

  {
    path: "/ivf-due-date-calculator",
    element: <DueDateCalculator />,
    preload: DueDateCalculator.preload,
    module: DueDateCalculator.module,
  },
  {
    path: "/hcg-doubling-calculator",
    element: <HcgCalculator />,
    preload: HcgCalculator.preload,
    module: HcgCalculator.module,
  },
  { path: "/guides", element: <Guides />, preload: Guides.preload, module: Guides.module },
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    element: <GuideDetail guide={guide} />,
    preload: GuideDetail.preload,
    module: GuideDetail.module,
  })),

  { path: "/about", element: <About />, preload: About.preload, module: About.module },
  {
    path: "/editorial-standards",
    element: <EditorialStandards />,
    preload: EditorialStandards.preload,
    module: EditorialStandards.module,
  },
  { path: "/privacy", element: <PrivacyPolicy />, preload: PrivacyPolicy.preload, module: PrivacyPolicy.module },
  // Google Play requires this URL to resolve for a signed-out visitor with no
  // app installed — it is submitted with the store listing.
  { path: "/delete-account", element: <DeleteAccount />, preload: DeleteAccount.preload, module: DeleteAccount.module },
  { path: "/terms", element: <TermsOfService />, preload: TermsOfService.preload, module: TermsOfService.module },
  { path: "/verify-email", element: <VerifyEmail />, preload: VerifyEmail.preload, module: VerifyEmail.module },

  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", element: <NotFound />, preload: NotFound.preload, module: NotFound.module },
];

/** Fetches the chunk(s) a URL needs so the first render can be synchronous.
 *  Trailing slashes are fine: GitHub Pages serves the prerendered pages at
 *  `/privacy/`, and matchRoutes normalises that to the `/privacy` route. */
export const preloadRoute = async (pathname: string): Promise<void> => {
  const matches = matchRoutes(routes, pathname) ?? [];
  await Promise.all(matches.map((match) => (match.route as AppRoute).preload()));
};

/** Every chunk at once, for the prerenderer: renderToString is synchronous and
 *  cannot wait on an import mid-render. */
export const preloadAllRoutes = async (): Promise<void> => {
  await Promise.all(routes.map((route) => route.preload()));
};

/** The page module(s) a URL renders, for the prerenderer's modulepreload
 *  hints - without them the browser only discovers the page's chunk after the
 *  entry bundle has run, one round trip too late. */
export const routeModules = (pathname: string): string[] =>
  (matchRoutes(routes, pathname) ?? []).map((match) => (match.route as AppRoute).module);
