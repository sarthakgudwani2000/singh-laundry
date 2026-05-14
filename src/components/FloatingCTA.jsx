import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { SCHEDULE_ORDER_URL } from "@/lib/brand";

export default function FloatingCTA() {
  return (
    <motion.div
      className="fixed z-50 bottom-5 right-5 md:bottom-8 md:right-8"
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.35 }}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <a
        href={SCHEDULE_ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary shadow-2xl shadow-blue-900/35 ring-1 ring-white/25"
        data-testid="floating-schedule-pickup-cta"
      >
        <CalendarCheck className="h-5 w-5" />
        <span>Schedule a Pickup</span>
      </a>
    </motion.div>
  );
}
