/**
 * Site-wide constants.
 *
 * When the app goes live on the App Store, set APP_STORE_URL to the real
 * listing URL — the navbar, hero, and footer CTAs switch from "Request Beta
 * Access" to a Download-on-the-App-Store badge automatically.
 */
export const SITE_URL = "https://blastoivf.com";
export const SUPPORT_EMAIL = "support@moonsify.com";
export const APP_STORE_URL = "";

export const isAppLive = APP_STORE_URL.length > 0;
