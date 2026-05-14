import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { SPECIAL_ITEMS_LIST } from "@/lib/brand";

export default function SpecialItemsDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="special-items-dialog-title"
            className="relative w-full max-w-lg rounded-3xl border border-white/70 bg-white/95 p-6 md:p-8 shadow-2xl shadow-slate-900/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="special-items-dialog-title"
                className="font-display text-xl font-semibold text-slate-900"
              >
                Special Items
              </h2>
              <motion.button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Close"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Note oversized or delicate pieces in your pickup request — we&apos;ll
              confirm handling and pricing before wash.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-800">
              {SPECIAL_ITEMS_LIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  className="flex gap-2"
                >
                  <Check className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.button
              type="button"
              onClick={onClose}
              className="btn-primary mt-8 w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
