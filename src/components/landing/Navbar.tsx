import { Button } from "@/components/ui/button";
import { isAppLive, DOWNLOAD_HREF } from "@/lib/site";
import blastoLogo from "@/assets/blasto-logo.webp";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/guides/", label: "Guides" },
  { href: "/ivf-due-date-calculator/", label: "Due date calculator" },
  { href: "/#faq", label: "FAQ" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2.5">
          <img src={blastoLogo} alt="" className="h-8 w-8 rounded-lg" width={128} height={128} />
          <span className="text-lg font-bold tracking-tight">Blasto</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <Button asChild size="sm" className="rounded-full px-5 font-semibold">
          <a href={isAppLive ? DOWNLOAD_HREF : "/#beta-access"}>
            {isAppLive ? "Download" : "Join the beta"}
          </a>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
