import { ReactNode } from "react";
import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Constrains the body column. Feature pages run wider than prose. */
  width?: "prose" | "wide";
  className?: string;
};

/**
 * Layout for pages below the landing page. Carries the site nav and footer so
 * every sub-page keeps the internal links that hold the topic cluster together
 * — an orphaned page with no path back to the homepage is a wasted URL.
 */
const PageShell = ({ children, width = "prose", className }: Props) => (
  <>
    <Navbar />
    {/* CSS keyframes, not framer-motion: these pages are prerendered, and a
        JS-driven `initial={{ opacity: 0 }}` served their copy invisible until
        the animation library had loaded. See .animate-rise-in in index.css. */}
    <main
      className={cn(
        "animate-rise-in container px-4 pt-28 pb-20",
        width === "prose" ? "max-w-3xl" : "max-w-5xl",
        className
      )}
    >
      {children}
    </main>
    <Footer />
  </>
);

export default PageShell;
