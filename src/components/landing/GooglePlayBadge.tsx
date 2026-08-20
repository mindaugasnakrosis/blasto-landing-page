import { PLAY_STORE_URL } from "@/lib/site";

/** "Get it on Google Play" badge, rendered inline in the same monochrome style
 * as AppStoreBadge so the pair reads as a set. Only shown once PLAY_STORE_URL
 * is set. */
const GooglePlayBadge = ({ className = "" }: { className?: string }) => {
  if (!PLAY_STORE_URL) return null;
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Blasto on Google Play"
      className={`inline-flex items-center gap-3 rounded-xl bg-foreground px-5 py-3 text-background shadow-lg transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M3.6 1.8c-.4.3-.6.8-.6 1.4v17.6c0 .6.2 1.1.6 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1z" />
        <path d="M16.9 15.7l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1z" opacity=".85" />
        <path d="M17 15.6L13.6 12 3.6 22.2c.4.4 1 .4 1.7.1L17 15.6" opacity=".7" />
        <path d="M17 8.4L5.3 1.7c-.7-.4-1.3-.3-1.7.1L13.6 12 17 8.4z" opacity=".55" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[0.65rem] uppercase tracking-wide opacity-80">Get it on</span>
        <span className="block text-lg font-semibold -mt-0.5">Google Play</span>
      </span>
    </a>
  );
};

export default GooglePlayBadge;
