/**
 * Site-wide constants.
 *
 * Each store has its own URL switch. Set APP_STORE_URL when Blasto is live on
 * the App Store and PLAY_STORE_URL when it is live on Google Play - the
 * navbar, hero, footer and feature-page CTAs switch from "Request Beta
 * Access" to the matching store badge(s) automatically, so one store can go
 * live before the other.
 */
export const SITE_URL = "https://blastoivf.com";
export const SUPPORT_EMAIL = "support@moonsify.com";
export const APP_STORE_URL = "";
/** Will be https://play.google.com/store/apps/details?id=com.blastoivf.blasto */
export const PLAY_STORE_URL = "";

export const isOnAppStore = APP_STORE_URL.length > 0;
export const isOnGooglePlay = PLAY_STORE_URL.length > 0;
export const isAppLive = isOnAppStore || isOnGooglePlay;

/** "the App Store and Google Play" / "the App Store" / "Google Play" - only
 *  the stores that are actually live, for copy such as "Now on …". */
export const LIVE_STORES_LABEL = [
  isOnAppStore ? "the App Store" : null,
  isOnGooglePlay ? "Google Play" : null,
]
  .filter(Boolean)
  .join(" and ");

/** Where a single "Download" button should go. With both stores live it
 *  points at the badges on the home page so the visitor picks their store. */
export const DOWNLOAD_HREF =
  isOnAppStore && isOnGooglePlay
    ? "/#get-the-app"
    : isOnAppStore
      ? APP_STORE_URL
      : PLAY_STORE_URL;
