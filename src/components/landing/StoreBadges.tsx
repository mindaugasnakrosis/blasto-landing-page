import AppStoreBadge from "./AppStoreBadge";
import GooglePlayBadge from "./GooglePlayBadge";

/** Every store badge that is currently live, side by side. Each badge renders
 * nothing until its own URL is set in lib/site.ts, so this is safe to place
 * anywhere a download CTA belongs. */
const StoreBadges = ({ className = "", id }: { className?: string; id?: string }) => (
  <div id={id} className={`flex flex-wrap items-center justify-center gap-3 lg:justify-start ${className}`}>
    <AppStoreBadge />
    <GooglePlayBadge />
  </div>
);

export default StoreBadges;
