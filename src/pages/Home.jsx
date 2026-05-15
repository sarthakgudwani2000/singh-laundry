import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "@/lib/gsap";
import {
  useGsapFloatAccents,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
} from "lucide-react";
import SpecialItemsDialog from "@/components/SpecialItemsDialog";
import {
  BRAND,
  PRICING,
  LOCATIONS,
  HOURS,
  IMAGES,
  SCHEDULE_ORDER_URL,
} from "@/lib/brand";

export default function Home() {
  const [specialOpen, setSpecialOpen] = useState(false);
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = reduceMotionPref === true;
  const homeRootRef = useRef(null);
  const heroRef = useRef(null);
  const heroOrb1Ref = useRef(null);
  const heroOrb2Ref = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const mxS = useSpring(mx, { stiffness: 42, damping: 22, restDelta: 0.001 });
  const myS = useSpring(my, { stiffness: 42, damping: 22, restDelta: 0.001 });
  const spotX = useTransform(mxS, (v) => v * 100);
  const spotY = useTransform(myS, (v) => v * 100);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}% ${spotY}%, rgba(59, 130, 246, 0.2), transparent 62%)`;

  useGsapScrollReveal(homeRootRef, reduceMotion);
  useGsapFloatAccents(homeRootRef, reduceMotion);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const root = homeRootRef.current;
    const hero = heroRef.current;
    const o1 = heroOrb1Ref.current;
    const o2 = heroOrb2Ref.current;
    if (!root || !hero || !o1 || !o2) return;

    const ctx = gsap.context(() => {
      gsap.to(o1, {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      });
      gsap.to(o2, {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  const onHeroPointer = (e) => {
    if (reduceMotion) return;
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / Math.max(r.width, 1));
    my.set((e.clientY - r.top) / Math.max(r.height, 1));
  };
  const onHeroPointerLeave = () => {
    mx.set(0.5);
    my.set(0.35);
  };

  const heroHighlights = [
    {
      icon: Truck,
      title: `${PRICING.bergenWashFoldLb}/lb wash & fold`,
      detail: `${PRICING.minOrderLbs} lb minimum · ${PRICING.pickupDeliveryFree}`,
    },
    {
      icon: Clock,
      title: "Next-day returns",
      detail: PRICING.nextDayNote,
    },
    {
      icon: RefreshCw,
      title: "Recurring & volume",
      detail: "Automatic orders · volume discounts",
    },
  ];

  return (
    <div ref={homeRootRef} data-testid="home-page">
      <SpecialItemsDialog open={specialOpen} onClose={() => setSpecialOpen(false)} />
      {/* Hero + parent clarity */}
      <section
        ref={heroRef}
        className="container-pad pt-8 md:pt-10 pb-8 md:pb-10"
      >
        <motion.div
          className="relative overflow-hidden rounded-[2rem] glass-panel p-6 md:p-8 lg:p-10 border border-white/80"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          onPointerMove={onHeroPointer}
          onPointerLeave={onHeroPointerLeave}
        >
        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] mix-blend-multiply opacity-90"
            style={{ background: spotlight }}
            aria-hidden
          />
        ) : null}
        <div
          ref={heroOrb1Ref}
          className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl z-0 will-change-transform"
          aria-hidden
        />
        <div
          ref={heroOrb2Ref}
          className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-blue-200/25 blur-3xl z-0 will-change-transform"
          aria-hidden
        />
        <motion.div
          className="relative z-[2] grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="min-w-0">
            <motion.div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="overline mb-0">Singh Laundry</p>
              <span className="hidden sm:inline text-slate-300" aria-hidden>
                ·
              </span>
              <p className="text-sm font-medium text-slate-600">
                Trust Us With Your Threads
              </p>
            </motion.div>

            <h1 className="h1 mt-4 max-w-xl lg:max-w-none">
              North Jersey&apos;s best free laundry pickup &amp; delivery
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              <span className="font-display font-semibold text-slate-800">
                New Jersey&apos;s finest laundromats
              </span>
              {" "}
              — &quot;Clean Clothes, Happy Life.&quot;{" "}
              <strong>{BRAND.pickup}</strong> &amp; <strong>{BRAND.store}</strong>{" "}
              under <strong>{BRAND.parent}</strong>.
            </p>

            <ul className="mt-6 grid sm:grid-cols-2 gap-3" aria-label="Service highlights">
              {heroHighlights.map(({ icon: Icon, title, detail }) => (
                <li
                  key={title}
                  className="flex gap-3 rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900 leading-snug">
                      {title}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-600 leading-relaxed">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-slate-600 max-w-xl">
              Pickup orders are washed, dried, and folded at our Bergenfield
              location.{" "}
              <Link
                to="/services#pickup-delivery"
                className="font-medium text-blue-800 hover:underline"
              >
                Service details
              </Link>
            </p>

            <motion.div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
              <motion.a
                href={SCHEDULE_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
                data-testid="hero-cta-schedule"
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a pickup <ArrowRight className="h-4 w-4" />
              </motion.a>
              <Link
                to="/new-bridge-laundromat"
                className="btn-secondary justify-center"
              >
                New Bridge Laundromat
              </Link>
              <Link
                to="/bergen-laundry-service"
                className="btn-secondary justify-center"
              >
                {BRAND.pickup}
              </Link>
            </motion.div>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <a
                href={`tel:${BRAND.phoneBergen}`}
                className="inline-flex items-center gap-1.5 font-medium hover:text-slate-800"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {BRAND.phoneBergen}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:text-slate-800 break-all"
              >
                {BRAND.email}
              </a>
            </p>
          </div>

          <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[340px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/10 ring-1 ring-white/70">
            <img
              src={IMAGES.homePromoVan}
              alt="Bergen Laundry Service delivery van — free pickup and delivery"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent pointer-events-none"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <p className="inline-flex w-fit items-center rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md ring-2 ring-white/30">
                Free pickup &amp; delivery
              </p>
              <p className="text-sm font-medium text-white/95 max-w-[14rem] leading-snug drop-shadow-sm">
                {PRICING.firstOrderHeadline}{" "}
                <span className="font-mono font-bold">{PRICING.firstOrderCode}</span>
              </p>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </section>

      {/* Legacy template: seal + van + FIRST10 promo */}
      <section className="container-pad py-8 md:py-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-center">
          <div className="flex justify-center lg:justify-start" data-reveal>
            <div className="w-44 h-44 rounded-full border-4 border-blue-800 bg-gradient-to-br from-sky-50 via-blue-50 to-white flex flex-col items-center justify-center p-4 shadow-xl shadow-blue-900/15 ring-4 ring-sky-100/90">
              <img
                src={IMAGES.logoBergen}
                alt="Bergen Laundry Service"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div
            className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl min-h-[260px] md:min-h-[300px]"
            data-reveal-scale
          >
            <img
              src={IMAGES.homePromoVan}
              alt="Delivery van representing free laundry pickup and delivery"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" aria-hidden />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-display font-bold text-xs md:text-sm tracking-wide shadow-lg whitespace-nowrap ring-2 ring-white/40">
              BERGEN LAUNDRY SERVICE
            </div>
          </div>
          <div
            className="text-center lg:text-left rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/90 p-6 md:p-8 shadow-inner"
            data-reveal
          >
            <p className="font-display text-xl md:text-2xl font-bold text-emerald-900">
              {PRICING.firstOrderHeadline}
            </p>
            <p className="mt-2 text-slate-700 font-medium">
              {PRICING.firstOrderSubhead}
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Coupon:{" "}
              <span className="font-mono font-bold text-slate-900">
                {PRICING.firstOrderCode}
              </span>
            </p>
            <a
              href={SCHEDULE_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full sm:w-auto inline-flex justify-center"
            >
              Schedule a pickup
            </a>
          </div>
        </div>
      </section>

      <section className="container-pad pb-9 md:pb-12">
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-6 text-sm md:text-base">
          Wash &amp; Fold Drop Off Laundry Service is available 7 days a week at{" "}
          {BRAND.store}.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="surface-card overflow-hidden flex flex-col" data-reveal>
            <img
              src={IMAGES.homeNewBridgeAside}
              alt="Laundry detergents and machines — drop-off wash and fold at New Bridge"
              className="h-44 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <p className="font-display font-bold text-lg text-slate-900">
                {BRAND.store}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Where {BRAND.pickup} orders are processed.
              </p>
              <p className="mt-3 text-sm text-slate-600 flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-blue-700 mt-0.5" />
                <span>{LOCATIONS.newBridge.full}</span>
              </p>
              <p className="mt-2 text-sm">
                <a
                  href={`tel:${BRAND.phoneStore}`}
                  className="font-semibold text-blue-800"
                >
                  {BRAND.phoneStore}
                </a>
              </p>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {HOURS.newBridgeWeekday}
                <br />
                {HOURS.newBridgeWeekend}
                <br />
                <span className="text-slate-500">{HOURS.lastWash}</span>
              </p>
              <Link
                to="/new-bridge-laundromat"
                className="mt-4 text-sm font-semibold text-blue-800 inline-flex items-center gap-1 hover:underline"
              >
                Store details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="surface-card overflow-hidden flex flex-col" data-reveal>
            <img
              src={IMAGES.homeCardRenovated}
              alt="Staff finishing laundry — renovated wash-and-fold service"
              className="h-44 w-full object-cover"
            />
            <div className="p-6 flex-1">
              <p className="font-display font-bold text-slate-900">
                Fully Renovated November 2025
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>· Brand New Washers &amp; Dryers</li>
                <li>· Coin Operated &amp; Laundry Cards</li>
                <li>· Free WiFi</li>
              </ul>
              <p className="mt-4 text-xs font-semibold text-blue-900">
                {BRAND.store}
              </p>
            </div>
          </div>
          <div className="surface-card overflow-hidden flex flex-col" data-reveal>
            <img
              src={IMAGES.homeCardWashFold}
              alt="Staff folding laundry — professional wash, dry, and fold"
              className="h-44 w-full object-cover"
            />
            <div className="p-6 flex-1">
              <p className="font-display font-bold text-lg text-slate-900">
                Wash, Dry &amp; Fold Service
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Tired of laundry day? Let us handle it! We use high-quality
                detergents to get your clothes their cleanest.
              </p>
              <p className="mt-3 text-sm text-slate-700 flex gap-2 items-start">
                <Truck className="h-4 w-4 shrink-0 text-blue-700 mt-0.5" />
                <span>
                  Drop-off wash, dry &amp; fold:{" "}
                  <strong>{PRICING.newBridgeWashFoldLb}/lb</strong>
                </span>
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Next Day Pickup (on most orders)
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact */}
      <section
        className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-9 md:py-12 overflow-hidden ring-1 ring-white/10"
        id="contact"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_rgb(59_130_246_/_0.35),_transparent_55%)]"
          aria-hidden
        />
        <motion.div className="container-pad relative grid md:grid-cols-2 gap-7 lg:gap-9 items-start">
          <div data-reveal>
            <p className="overline text-blue-300 mb-2">Contact Singh Laundry</p>
            <h2 className="h2 text-white">Reach the right team</h2>
            <p className="mt-3 text-slate-300 text-sm">
              Pickup &amp; delivery + upper management
            </p>
            <p className="mt-1">
              <a
                href={`tel:${BRAND.phoneBergen}`}
                className="text-xl font-semibold text-white hover:text-blue-200"
              >
                {BRAND.phoneBergen}
              </a>
            </p>
            <p className="mt-6 text-slate-300 text-sm">New Bridge Laundromat</p>
            <p className="mt-1">
              <a
                href={`tel:${BRAND.phoneStore}`}
                className="text-xl font-semibold text-white hover:text-blue-200"
              >
                {BRAND.phoneStore}
              </a>
            </p>
            <p className="mt-6 text-slate-300 text-sm">Email (all inquiries)</p>
            <p className="mt-1">
              <a
                href={`mailto:${BRAND.email}`}
                className="text-lg font-semibold text-white hover:text-blue-200"
              >
                {BRAND.email}
              </a>
            </p>
          </div>
          <div
            className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-xl shadow-black/20"
            data-reveal-scale
          >
            <p className="text-slate-300 text-sm leading-relaxed">
              Prefer a form? Messages go to the same inbox as{" "}
              <strong className="text-white">{BRAND.email}</strong>.
            </p>
            <Link
              to="/contact"
              className="btn-primary mt-6 bg-white !text-blue-900 hover:!bg-blue-50"
            >
              Contact form <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section
        className="container-pad py-7 text-center text-sm text-slate-500"
        data-reveal
      >
        <p className="mb-3">
          <span>*4% credit card fee per order / *min order: 15 lbs / </span>
          <button
            type="button"
            onClick={() => setSpecialOpen(true)}
            className="text-blue-800 font-medium underline underline-offset-2"
          >
            *Special Items
          </button>
          <span> / </span>
          <Link
            to="/bergen-laundry-service#terms"
            className="text-blue-800 font-medium underline underline-offset-2"
          >
            Terms of Service
          </Link>
        </p>
        <Link to="/services" className="text-blue-800 font-medium">
          View all services
        </Link>
        {" · "}
        <Link to="/about" className="text-blue-800 font-medium">
          About &amp; service area
        </Link>
      </section>
    </div>
  );
}
