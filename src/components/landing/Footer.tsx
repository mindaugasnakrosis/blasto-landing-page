import blastoLogo from "@/assets/blasto-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-blasto-cream py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={blastoLogo}
              alt="Blasto logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-xl font-bold">Blasto</span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Nurturing every step of your fertility journey
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          © 2026 Blasto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
