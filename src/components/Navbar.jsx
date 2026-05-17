import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { BRAND, IMAGES, SCHEDULE_ORDER_URL } from "@/lib/brand";

const links = [
  { to: "/", label: "Home", short: "Home" },
  { to: "/services", label: "Services", short: "Services" },
  { to: "/bergen-laundry-service", label: BRAND.pickup, short: "Bergen" },
  { to: "/about", label: "About Us", short: "About" },
  {
    to: "/new-bridge-laundromat",
    label: "New Bridge Laundromat",
    short: "New Bridge",
  },
  { to: "/contact", label: "Contact Us", short: "Contact" },
];

const BERGEN_PICKUP_PATH = "/bergen-laundry-service";

export default function Navbar() {
  const { pathname } = useLocation();
  const isBergenPickupPage = pathname === BERGEN_PICKUP_PATH;
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setElevated(y > 10);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const mobileDrawer =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open ? (
              <>
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                />
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="fixed top-0 right-0 z-[71] flex h-full w-[min(100vw,22rem)] flex-col bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200/80 lg:hidden"
                  data-testid="mobile-menu"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <span className="font-display text-base font-bold text-slate-900">
                      Menu
                    </span>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800 transition-colors hover:bg-slate-200"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {links.map((l, i) => (
                      <motion.div
                        key={l.to}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.22 }}
                      >
                        <NavLink
                          to={l.to}
                          end={l.to === "/"}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `mb-1 block rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-900"
                                : "text-slate-700 hover:bg-slate-50"
                            }`
                          }
                          data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {l.label}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="border-t border-slate-100 bg-slate-50/90 p-5 space-y-3">
                    <a
                      href={`tel:${BRAND.phoneBergen}`}
                      className="flex items-center gap-3 text-slate-900"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200/80">
                        <Phone className="h-4 w-4 text-blue-700" />
                      </span>
                      <span>
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Call
                        </span>
                        <span className="block font-semibold">{BRAND.phoneBergen}</span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="flex items-center gap-3 text-slate-900"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200/80">
                        <Mail className="h-4 w-4 text-blue-700" />
                      </span>
                      <span>
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Email
                        </span>
                        <span className="block text-sm font-semibold text-blue-800 break-all">
                          {BRAND.email}
                        </span>
                      </span>
                    </a>
                    <a
                      href={SCHEDULE_ORDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/35 ring-1 ring-white/15 transition hover:from-blue-300 hover:via-blue-500 hover:to-blue-600"
                      data-testid="mobile-cta-schedule"
                    >
                      Schedule pickup
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.aside>
              </>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "site-header border-b transition-[box-shadow,background-color] duration-300",
          elevated
            ? "bg-white/92 lg:bg-white shadow-md shadow-slate-900/[0.06] backdrop-blur-xl border-slate-200/90"
            : "bg-white/75 lg:bg-white backdrop-blur-xl border-slate-200/60",
        ].join(" ")}
        data-testid="site-header"
      >
        <div className="container-pad">
          <div className="flex h-[4.25rem] md:h-[4.5rem] items-center justify-between gap-4 lg:gap-8">
            <Link
              to="/"
              className="group flex min-w-0 items-center gap-3"
              data-testid="brand-link"
              aria-label={
                isBergenPickupPage
                  ? `${BRAND.pickup} — ${BRAND.parent} home`
                  : `${BRAND.parent} home`
              }
            >
              <div
                className={`logo-surface relative flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-lg overflow-hidden p-1.5 ${
                  isBergenPickupPage ? "h-11 w-11" : "h-[4.5rem] w-[4.5rem]"
                }`}
              >
                {isBergenPickupPage ? (
                  <img
                    src={IMAGES.logoBergen}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={IMAGES.logoSingh}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              <div className="min-w-0 leading-tight">
                <span className="block whitespace-nowrap font-display text-[0.9375rem] font-bold tracking-tight text-blue-600 transition-colors group-hover:text-blue-700 md:text-base lg:text-xl">
                  {isBergenPickupPage ? BRAND.pickup : BRAND.parent}
                </span>
                <span className="hidden whitespace-nowrap text-[10px] font-medium text-blue-800/90 sm:block lg:text-sm">
                  {isBergenPickupPage
                    ? `A ${BRAND.parent} brand`
                    : "Trust Us With Your Threads"}
                </span>
              </div>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <ul className="flex items-center gap-0.5 xl:gap-1.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        [
                          "relative block whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium tracking-tight transition-colors lg:text-[0.9375rem] xl:text-base xl:px-3",
                          isActive
                            ? "text-blue-900"
                            : "text-blue-600 hover:bg-blue-50/90 hover:text-blue-800",
                        ].join(" ")
                      }
                      data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="hidden 2xl:inline">{l.label}</span>
                          <span className="2xl:hidden">{l.short}</span>
                          {isActive ? (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full bg-blue-600"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden shrink-0 items-center gap-4 lg:flex">
              <div className="flex flex-col items-center text-center text-xs lg:text-base">
                <a
                  href={`tel:${BRAND.phoneBergen}`}
                  className="font-semibold tabular-nums text-blue-600 transition hover:text-blue-800"
                >
                  {BRAND.phoneBergen}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="max-w-[10.5rem] truncate text-[11px] text-blue-600/90 transition hover:text-blue-800 lg:text-sm"
                >
                  {BRAND.email}
                </a>
              </div>
              <a
                href={SCHEDULE_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/35 ring-1 ring-white/20 transition hover:from-blue-300 hover:via-blue-500 hover:to-blue-600 hover:shadow-lg lg:text-base"
                data-testid="navbar-cta-schedule"
              >
                Schuedule a Pickup
                <ArrowRight className="h-4 w-4 opacity-90" />
              </a>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              data-testid="mobile-menu-toggle"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      {mobileDrawer}
    </>
  );
}
