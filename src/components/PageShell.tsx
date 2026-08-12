import { ReactNode } from "react";
import { motion } from "framer-motion";
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
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "container px-4 pt-28 pb-20",
        width === "prose" ? "max-w-3xl" : "max-w-5xl",
        className
      )}
    >
      {children}
    </motion.main>
    <Footer />
  </>
);

export default PageShell;
