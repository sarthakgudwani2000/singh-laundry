import { useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ANNOUNCEMENT_BAR } from "@/lib/brand";

export default function AnnouncementBar() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="relative z-10 border-b border-blue-700/25 bg-blue-600 text-white/95"
        role="region"
        aria-label="Announcement"
      >
        <div className="container-pad flex items-center justify-center gap-2 py-2 text-center text-xs md:text-[13px] font-medium tracking-wide">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-100 opacity-95" aria-hidden />
          <span className="leading-snug">{ANNOUNCEMENT_BAR}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative z-10 overflow-hidden border-b border-blue-700/25 bg-blue-600"
      role="region"
      aria-label="Announcement"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-300 to-blue-500 opacity-90"
        aria-hidden
      />
      <div className="py-1.5 overflow-hidden">
        <div className="sl-announce-track text-xs md:text-[13px] font-medium text-white/95 tracking-wide">
          <span className="whitespace-nowrap flex items-center gap-2 pl-8">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-100" aria-hidden />
            {ANNOUNCEMENT_BAR}
          </span>
          <span className="whitespace-nowrap flex items-center gap-2" aria-hidden="true">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-100" />
            {ANNOUNCEMENT_BAR}
          </span>
        </div>
      </div>
    </div>
  );
}
