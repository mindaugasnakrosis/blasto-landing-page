import { ComponentType, createElement, lazy } from "react";

export type RouteChunk<P> = ComponentType<P> & {
  preload: () => Promise<void>;
  /** The page's source path, matching the key Vite writes into the build
   *  manifest. scripts/prerender.mjs turns it into the <link rel="modulepreload">
   *  for this route, and throws if it does not resolve - so a page that moves
   *  fails the build rather than silently costing a round trip. */
  module: string;
};

/**
 * A page component that ships in its own JS chunk.
 *
 * Plain React.lazy would wreck the prerendered pages. On hydration it suspends
 * for a tick, React replaces the server-rendered markup with the Suspense
 * fallback, and the content a crawler (or a visitor on a slow connection)
 * already had on screen flashes away and comes back. So once a chunk has been
 * fetched this renders it synchronously, and both entry points wait for the
 * current route's chunk before the first render:
 *
 *   - src/main.tsx      preloadRoute(location.pathname), then hydrateRoot
 *   - src/entry-server  preloadAllRoutes(), then renderToString
 *
 * The lazy path is therefore only reached by client-side navigation to a route
 * the visitor has not downloaded yet, which is the one case where suspending
 * is the correct behaviour.
 */
export function routeChunk<P extends object>(
  module: string,
  load: () => Promise<{ default: ComponentType<P> }>
): RouteChunk<P> {
  let loaded: ComponentType<P> | undefined;

  const Lazy = lazy(async () => {
    const mod = await load();
    loaded = mod.default;
    return mod;
  });

  // The cast is only to satisfy createElement's overloads: a LazyExoticComponent
  // renders like any other component, but is not assignable to ComponentType.
  const Chunk = (props: P) => createElement((loaded ?? Lazy) as ComponentType<P>, props);

  Chunk.preload = async () => {
    loaded = (await load()).default;
  };
  Chunk.module = module;

  return Chunk as RouteChunk<P>;
}
