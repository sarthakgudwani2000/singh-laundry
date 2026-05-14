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
import { ArrowRight, Phone, MapPin, Truck, Gift } from "lucide-react";
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
  const bergenRef = useRef(null);
  const bergenImgRef = useRef(null);
  const newBridgeRef = useRef(null);
  const nbImgRef = useRef(null);

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
    const bSec = bergenRef.current;
    const bImg = bergenImgRef.current;
    const nbSec = newBridgeRef.current;
    const nbImg = nbImgRef.current;
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
      if (bImg && bSec) {
        gsap.fromTo(
          bImg,
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: bSec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      }
      if (nbImg && nbSec) {
        gsap.fromTo(
          nbImg,
          { y: 28 },
          {
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: nbSec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      }
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

  return (
    <div ref={homeRootRef} data-testid="home-page">
      <SpecialItemsDialog open={specialOpen} onClose={() => setSpecialOpen(false)} />
      {/* Hero + parent clarity */}
      <section
        ref={heroRef}
        className="container-pad pt-10 md:pt-14 pb-12 md:pb-16"
      >
        <motion.div
          className="relative overflow-hidden rounded-[2rem] glass-panel p-8 md:p-12 lg:p-14 border border-white/80"
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
        <div className="relative z-[2]">
        <p className="overline mb-3">Singh Laundry</p>
        <p className="text-slate-600 font-medium">Trust Us With Your Threads</p>
        <motion.h2
          className="h2 max-w-3xl mt-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          New Jersey&apos;s Finest Laundromats
        </motion.h2>
        <motion.p
          className="mt-3 font-display text-lg text-slate-700"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          &quot;Clean Clothes, Happy Life&quot;
        </motion.p>
        <motion.h1
          className="h1 max-w-3xl mt-5"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 24, filter: "blur(10px)" }
          }
          whileInView={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Welcome To North Jersey&apos;s Best FREE Laundry Pickup &amp;
          Delivery Service
        </motion.h1>
        <p className="mt-5 text-slate-600 text-lg max-w-2xl leading-relaxed">
          $2.15 per pound* / No Charge For Pickup &amp; Delivery / Next Day
          Returns Mon-Fri
        </p>
        <p className="mt-3 text-slate-600 text-lg max-w-2xl leading-relaxed">
          Automatic Recurring Orders Can Be Set / Volume Based Discounts
          Available
        </p>
        <p className="mt-5 text-slate-600 text-base max-w-2xl leading-relaxed">
          <strong>{BRAND.parent}</strong> is the parent company of{" "}
          <strong>{BRAND.pickup}</strong> &amp; <strong>{BRAND.store}</strong>.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <motion.div
            className="inline-flex"
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0 0 rgba(37, 99, 235, 0)",
                      "0 0 0 10px rgba(37, 99, 235, 0.12)",
                      "0 0 0 0 rgba(37, 99, 235, 0)",
                    ],
                  }
            }
            transition={
              reduceMotion
                ? {}
                : { boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" } }
            }
          >
            <a
              href={SCHEDULE_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-testid="hero-cta-schedule"
            >
              Schedule a pickup <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link to="/new-bridge-laundromat" className="btn-secondary">
            New Bridge Laundromat
          </Link>
          </motion.div>
        </div>
        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-500">SCHEDULE A PICKUP</p>
          <p className="mt-2 text-sm text-slate-500">
            <a href={`tel:${BRAND.phoneBergen}`} className="hover:text-slate-700">
              {BRAND.phoneBergen}
            </a>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            <a href={`mailto:${BRAND.email}`} className="hover:text-slate-700">
              {BRAND.email}
            </a>
          </p>
        </div>
        </div>
        </motion.div>
      </section>

      {/* Legacy template: seal + van + FIRST10 promo */}
      <section className="container-pad py-10 md:py-14">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-center">
          <div className="flex justify-center lg:justify-start" data-reveal>
            <div className="w-44 h-44 rounded-full border-4 border-slate-900 bg-white flex flex-col items-center justify-center text-center p-4 shadow-xl ring-4 ring-slate-200/80">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Est. 2017
              </p>
              <p className="mt-1 font-display text-lg font-bold text-slate-900 leading-tight">
                Bergen Laundry
              </p>
              <p className="mt-1 text-[10px] font-semibold text-slate-600 leading-snug">
                Your pick up &amp; delivery
              </p>
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

      <section className="container-pad pb-14 md:pb-20">
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10 text-sm md:text-base">
          Wash &amp; Fold Drop Off Laundry Service is available 7 days a week at{" "}
          {BRAND.store}.
        </p>
        <div className="grid md:grid-cols-3 gap-6" data-reveal-stagger>
          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/5 overflow-hidden flex flex-col">
            <img
              src={IMAGES.homeCardLaundromat}
              alt="Commercial washers and dryers in a modern laundromat"
              className="h-44 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <p className="font-display font-bold text-lg text-slate-900">
                {BRAND.store}
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
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/5 overflow-hidden flex flex-col">
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
          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/5 overflow-hidden flex flex-col">
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
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Next Day Pickup (on most orders)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A — Bergen Laundry Service (scannable) */}
      <motion.section
        ref={bergenRef}
        className="border-y border-slate-200/80 bg-gradient-to-b from-slate-50/95 to-white py-14 md:py-20"
        data-testid="home-bergen-block"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-pad grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="overline mb-2">BERGEN LAUNDRY SERVICE</p>
            <h2 className="h2">Pickup &amp; delivery</h2>
            <span
              className="mt-3 block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
              data-reveal-line
              aria-hidden
            />
            <ul className="mt-6 space-y-3 text-slate-700">
              <li>
                <strong>Wash &amp; fold:</strong> {PRICING.bergenWashFoldLb}{" "}
                / lb · <strong>{PRICING.minOrderLbs} lb minimum</strong>
              </li>
              <li>{PRICING.ccFeeNote}.</li>
              <li>{PRICING.pickupDeliveryFree}.</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-5 flex gap-3 items-start">
              <span className="inline-flex shrink-0 mt-0.5 text-blue-700 will-change-transform" data-float-slow>
                <Gift className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  First-order savings
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>{PRICING.firstOrderAmount} off</strong> first order
                  with code{" "}
                  <span className="font-mono font-semibold text-slate-900">
                    {PRICING.firstOrderCode}
                  </span>{" "}
                  — always visible here (no pop-up), matching our classic site
                  offer.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SCHEDULE_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Schedule a pickup
              </a>
              <Link to="/bergen-laundry-service" className="btn-secondary">
                Full Bergen Laundry page
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              <button
                type="button"
                onClick={() => setSpecialOpen(true)}
                className="text-blue-800 font-medium underline underline-offset-2"
              >
                Special items (pop-up)
              </button>
              {" · "}
              <Link
                to="/bergen-laundry-service#terms"
                className="text-blue-800 font-medium underline underline-offset-2"
              >
                Terms of service
              </Link>
            </p>
          </div>
          <motion.div
            className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/10 ring-1 ring-white/60 card-hover"
            whileHover={{ scale: 1.02, rotateZ: reduceMotion ? 0 : -0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ perspective: 1200 }}
          >
            <img
              ref={bergenImgRef}
              src={IMAGES.homeBergenAside}
              alt="Customer using self-serve laundry — we also offer pickup and delivery"
              className="w-full h-56 md:h-72 object-cover scale-[1.06] will-change-transform"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* B — New Bridge snapshot */}
      <motion.section
        ref={newBridgeRef}
        className="container-pad py-14 md:py-20"
        data-testid="home-newbridge-block"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/8 ring-1 ring-white/50 order-2 lg:order-1 card-hover"
            whileHover={{ scale: 1.02, rotateZ: reduceMotion ? 0 : 0.35 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
          >
            <img
              ref={nbImgRef}
              src={IMAGES.homeNewBridgeAside}
              alt="Laundry detergents and machines — drop-off wash and fold at New Bridge"
              className="w-full h-56 md:h-72 object-cover scale-[1.05] will-change-transform"
            />
          </motion.div>
          <div className="order-1 lg:order-2">
            <p className="overline mb-2">{BRAND.store}</p>
            <h2 className="h2">Where orders are processed</h2>
            <span
              className="mt-3 block h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400"
              data-reveal-line
              aria-hidden
            />
            <p className="mt-2 font-display text-lg font-semibold text-slate-900">
              Wash, Dry &amp; Fold Service
            </p>
            <p className="mt-4 text-slate-600">
              Tired of laundry day? Let us handle it!
            </p>
            <p className="mt-3 text-slate-600">
              We use high-quality detergents to get your clothes their cleanest.
            </p>
            <p className="mt-3 text-slate-600">
              Wash &amp; Fold Drop Off Laundry Service is available 7 days a week
              at New Bridge Laundromat.
            </p>
            <dl className="mt-6 space-y-4 text-slate-800">
              <div className="flex gap-2">
                <MapPin className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Address
                  </dt>
                  <dd className="font-medium">{LOCATIONS.newBridge.full}</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${BRAND.phoneStore}`}
                      className="font-semibold text-blue-800"
                    >
                      {BRAND.phoneStore}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-2">
                <Truck className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Wash, dry &amp; fold (drop-off)
                  </dt>
                  <dd className="font-medium">
                    {PRICING.newBridgeWashFoldLb}/lb
                  </dd>
                </div>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hours
                </dt>
                <dd className="mt-1 text-sm">
                  {HOURS.newBridgeWeekday}
                  <br />
                  {HOURS.newBridgeWeekend}
                  <br />
                  <span className="text-slate-500">{HOURS.lastWash}</span>
                </dd>
              </div>
            </dl>
            <motion.div className="mt-6 inline-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/new-bridge-laundromat"
              className="btn-secondary mt-0 inline-flex"
            >
              Store details <ArrowRight className="h-4 w-4" />
            </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* C — Contact */}
      <section
        className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-14 md:py-20 overflow-hidden ring-1 ring-white/10"
        id="contact"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_rgb(59_130_246_/_0.35),_transparent_55%)]"
          aria-hidden
        />
        <div className="container-pad relative grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
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
            className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-8 shadow-xl shadow-black/20"
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
        </div>
      </section>

      <section
        className="container-pad py-10 text-center text-sm text-slate-500"
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
