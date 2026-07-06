import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
};

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 90,
    damping: reduceMotion ? 50 : 28,
    mass: reduceMotion ? 0.15 : 0.85,
  });

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtual_page_view",
      page_path: `${pathname}${hash}`,
    });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col relative grain-overlay">
      {!reduceMotion ? (
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div className="ambient-orb ambient-orb-a" />
          <div className="ambient-orb ambient-orb-b" />
        </div>
      ) : null}

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none scroll-progress-glow bg-gradient-to-r from-blue-700 via-sky-400 to-indigo-600"
        style={{
          scaleX: reduceMotion ? scrollYProgress : smoothProgress,
          opacity: reduceMotion ? 0.55 : 0.92,
        }}
      />

      <div className="sticky top-0 z-[52]">
        <Navbar />
      </div>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          {...pageTransition}
          className="flex-1 flex flex-col relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingCTA />
    </div>
  );
}
