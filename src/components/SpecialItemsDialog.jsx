import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { SPECIAL_ITEMS_LIST } from "@/lib/brand";

const specialItemPricing = {
  laundryServices: [
    ["Bathroom Floor Mat", "$5.00 / item"],
    ["Blanket", "$15.00 / item"],
    ["Blanket - Weighted", "$25.00 / item"],
    ["Comforter", "$20.00 / item"],
    ["Duvet Cover", "$25.00 / item"],
    ["Floor Mat (Big)", "$15.00 / item"],
    ["Floor Mats (Small)", "$10.00 / item"],
    ["Non-Laundry Item Sorting", "$10.00 / item"],
    ["Hang Dry Items", "$0.25 / item"],
    ["Oversized Carpet", "$35.00 / item"],
    ["Pillow - Down", "$20.00 / item"],
    ["Pillows - Any Size", "$16.00 / item"],
    ["Same Day Fee", "$15.00 / item"],
    ["Separation Fee", "$4.00 / item"],
    ["Wet Laundry Fee", "$10.00 / item"],
  ],
  products: [
    ["Hanger(pants)", "$0.50 / item"],
    ["Hanger(Shirt)", "$0.25 / item"],
    ["Laundry Bag(Blue)", "$8.00 / item"],
  ],
};

export default function SpecialItemsDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-3 sm:p-5 md:items-center"
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
            className="relative z-10 my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl shadow-slate-950/25 md:max-h-[calc(100dvh-3rem)]"
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h2
                  id="special-items-dialog-title"
                  className="font-display text-xl font-bold leading-tight text-slate-900 sm:text-2xl"
                >
                  Pricing For Special Items
                </h2>
                <p className="mt-1 text-sm font-medium text-red-600 sm:text-base">
                  These items are not billed by weight.
                </p>
              </div>
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
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm text-slate-900 sm:px-6 sm:py-5">
            <p className="hidden mt-3 text-sm text-slate-600 leading-relaxed">
              Note oversized or delicate pieces in your pickup request — we&apos;ll
              confirm handling and pricing before wash.
            </p>
            <div>
              <p className="font-display text-base font-bold text-slate-950">Laundry Services</p>
              <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/60">
                {specialItemPricing.laundryServices.map(([item, price]) => (
                  <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-2.5 sm:px-4">
                    <span className="text-left leading-snug text-slate-700">{item}</span>
                    <span className="whitespace-nowrap text-right font-bold text-slate-950">{price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-display text-base font-bold text-slate-950">Products</p>
              <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/60">
                {specialItemPricing.products.map(([item, price]) => (
                  <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-2.5 sm:px-4">
                    <span className="text-left leading-snug text-slate-700">{item}</span>
                    <span className="whitespace-nowrap text-right font-bold text-slate-950">{price}</span>
                  </div>
                ))}
              </div>
            </div>
            <ul className="hidden mt-5 space-y-2.5 text-sm text-slate-800">
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
            </div>
            <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
              <motion.button
                type="button"
                onClick={onClose}
                className="btn-primary w-full justify-center sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(dialog, document.body)
    : dialog;
}
