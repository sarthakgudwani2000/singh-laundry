import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapImgParallax,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import {
  MapPin,
  Phone,
  Clock,
  WashingMachine,
  Wifi,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Armchair,
  Tv,
  LayoutGrid,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { BRAND, PRICING, LOCATIONS, HOURS, IMAGES, SCHEDULE_ORDER_URL } from "@/lib/brand";
import { NEW_BRIDGE_AMENITIES } from "@/lib/templateCopy";

const carouselSlides = [
  { src: IMAGES.newBridgeCarousel1, alt: "New Bridge Laundromat slideshow photo 1" },
  { src: IMAGES.newBridgeCarousel2, alt: "New Bridge Laundromat slideshow photo 2" },
  { src: IMAGES.newBridgeCarousel3, alt: "New Bridge Laundromat slideshow photo 3" },
  { src: IMAGES.newBridgeCarousel4, alt: "New Bridge Laundromat slideshow photo 4" },
  { src: IMAGES.newBridgeCarousel5, alt: "New Bridge Laundromat slideshow photo 5" },
];

const amenityIcons = [Wifi, Armchair, Tv, LayoutGrid, ShoppingBag, ShieldCheck];

export default function NewBridge() {
  const pageRef = useRef(null);
  const heroImgSectionRef = useRef(null);
  const heroImgRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const reduceMotion = useReducedMotion() === true;

  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);
  useGsapImgParallax({
    rootRef: pageRef,
    sectionRef: heroImgSectionRef,
    imgRef: heroImgRef,
    reduceMotion,
    yFrom: 30,
    yTo: -30,
    scrub: 0.82,
    scaleFrom: 1.08,
    scaleTo: 1.02,
    rotateFrom: 0.35,
    rotateTo: -0.35,
  });

  const next = () => setSlide((i) => (i + 1) % carouselSlides.length);
  const prev = () =>
    setSlide((i) => (i - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <motion.div
      ref={pageRef}
      data-testid="newbridge-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="page-hero-section pb-5 max-w-5xl" data-reveal-blur>
        <div className="mx-auto mb-4 inline-flex">
          <img
            src={IMAGES.logoNewBridge}
            alt={BRAND.store}
            className="h-24 md:h-28 w-auto max-w-[min(100%,36rem)] object-contain"
          />
        </div>
        <p className="overline mb-2 hidden">{BRAND.store}</p>
        <h1 className="h1 lg:whitespace-nowrap">New Bridge Laundromat</h1>
        <span
          className="mt-4 mx-auto block h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500"
          data-reveal-line
          aria-hidden
        />
        <div className="mt-6 grid sm:grid-cols-3 gap-4" data-reveal-stagger>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float>
              <MapPin className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Address</p>
            <p className="mt-1 font-medium text-slate-900">{LOCATIONS.newBridge.full}</p>
          </div>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float-slow>
              <Phone className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Phone</p>
            <a href={`tel:${BRAND.phoneStore}`} className="mt-1 font-semibold block text-blue-800">
              {BRAND.phoneStore}
            </a>
          </div>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float>
              <Clock className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Hours</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{HOURS.newBridgeWeekday}</p>
            <p className="text-sm font-medium text-slate-900">{HOURS.newBridgeWeekend}</p>
            <p className="text-sm text-slate-500 mt-1">{HOURS.lastWash}</p>
          </div>
        </div>
        <div className="mt-8 text-center" data-reveal>
          <h2 className="h2">Wash, Dry &amp; Fold Service</h2>
          <p className="mt-3 text-base md:text-xl font-semibold text-slate-900">
            {PRICING.newBridgeWashFoldLb}/lb {"·"} Next day pickup on most orders
          </p>
          <span
            className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-700"
            data-reveal-line
            aria-hidden
          />
          <p className="mt-5 text-slate-700 leading-relaxed text-sm md:text-base max-w-3xl mx-auto">
            Tired of laundry day? Let us handle it! Simply drop off your dirty clothes, and
            we&apos;ll take care of the rest. We wash, dry, and fold — then bundle everything for
            easy pickup.
          </p>
          <ul className="mt-6 space-y-3 text-left text-sm text-slate-800 max-w-md mx-auto">
            <li>
              <strong>Self-serve:</strong> Coin operated &amp; laundry cards.
            </li>
            <li>
              <strong>Time saver:</strong> Reclaim your weekends.
            </li>
            <li>
              <strong>Professional clean:</strong> High-quality detergents and techniques.
            </li>
            <li>
              <strong>Stress-free:</strong> We handle sorting, washing, and folding.
            </li>
          </ul>
        </div>
        <p className="mt-4 hidden text-slate-600 flex-wrap items-center justify-center gap-2 text-sm md:text-base">
          <MapPin className="h-4 w-4 text-blue-800 shrink-0" />
          <span>{LOCATIONS.newBridge.full}</span>
        </p>
        <p className="mt-2 hidden">
          <a href={`tel:${BRAND.phoneStore}`} className="font-semibold text-blue-800 text-lg">
            {BRAND.phoneStore}
          </a>
        </p>
        <p className="mt-5 text-slate-600 leading-relaxed text-center">
          Newly renovated in late 2025.<br />
          Our clean, comfortable
          laundromat is designed to make laundry day as easy and stress-free as possible.
          <br />
          Pickup orders for <strong>{BRAND.pickup}</strong> are processed here.
        </p>
      </section>

      <section ref={heroImgSectionRef} className="container-pad pb-8 max-w-4xl mx-auto" data-reveal-clip>
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group card-hover">
          <img
            ref={heroImgRef}
            src={carouselSlides[slide].src}
            alt={carouselSlides[slide].alt}
            className="w-full h-56 md:h-96 object-cover will-change-transform transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
            <button
              type="button"
              onClick={prev}
              className="pointer-events-auto h-11 w-11 rounded-full bg-white/90 text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="pointer-events-auto h-11 w-11 rounded-full bg-white/90 text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === slide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Show slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad pb-3 max-w-4xl mx-auto text-center" data-reveal>
        <p className="content-prose">
          We are committed to providing a comfortable, efficient laundry experience for you.
          <br />
          <strong>Our first-class amenities include:</strong>
        </p>
      </section>

      <section className="container-pad pb-4 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
          {NEW_BRIDGE_AMENITIES.map((a, i) => {
            const Icon = amenityIcons[i] || Wifi;
            return (
              <div
                key={a.title}
                className="surface-card p-6 text-center"
              >
                <span className="inline-block text-blue-800" data-float-slow>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display font-semibold text-slate-900 lg:text-xl">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-pad pb-6 max-w-4xl mx-auto hidden">
        <div className="grid sm:grid-cols-3 gap-4" data-reveal-stagger>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float>
              <MapPin className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Address</p>
            <p className="mt-1 font-medium text-slate-900">{LOCATIONS.newBridge.full}</p>
          </div>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float-slow>
              <Phone className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Phone</p>
            <a href={`tel:${BRAND.phoneStore}`} className="mt-1 font-semibold block text-blue-800">
              {BRAND.phoneStore}
            </a>
          </div>
          <div className="surface-card p-5 text-center" data-reveal>
            <span className="inline-block text-blue-800 will-change-transform" data-float>
              <Clock className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Hours</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{HOURS.newBridgeWeekday}</p>
            <p className="text-sm font-medium text-slate-900">{HOURS.newBridgeWeekend}</p>
            <p className="text-sm text-slate-500 mt-1">{HOURS.lastWash}</p>
          </div>
        </div>
      </section>

      <section
        className="hidden border-y border-slate-200/70 bg-gradient-to-b from-slate-50 to-white pt-6 pb-10 md:pt-8 md:pb-12"
        data-reveal
      >
        <div className="container-pad max-w-5xl mx-auto">
          <h2 className="h2 text-center hidden">Wash, Dry &amp; Fold Service</h2>
          <span
            className="mt-3 mx-auto hidden h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-700"
            data-reveal-line
            aria-hidden
          />
          <div className="mt-6 hidden lg:grid-cols-3 gap-6 items-center">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg order-2 lg:order-1">
              <img
                src={IMAGES.newBridgeWashFoldLeft}
                alt="Colorful folded laundry — professional wash, dry, and fold"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:px-2">
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Tired of laundry day? Let us handle it! Simply drop off your dirty clothes, and
                we&apos;ll take care of the rest. We wash, dry, and fold — then bundle everything for
                easy pickup.
              </p>
              <ul className="mt-6 space-y-3 text-left text-sm text-slate-800 max-w-md mx-auto">
                <li>
                  <strong>Time saver:</strong> Reclaim your weekends.
                </li>
                <li>
                  <strong>Professional clean:</strong> High-quality detergents and techniques.
                </li>
                <li>
                  <strong>Stress-free:</strong> We handle sorting, washing, and folding.
                </li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {PRICING.newBridgeWashFoldLb}/lb · Next day pickup on most orders
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg order-3">
              <img
                src={IMAGES.newBridgeWashFoldRight}
                alt="Clothing on hangers and rails — finishing and pickup"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <ul className="mt-8 hidden space-y-3 text-slate-700 max-w-3xl mx-auto">
            <li className="flex gap-2">
              <WashingMachine className="h-5 w-5 text-blue-800 shrink-0 mt-0.5" />
              <span>
                <strong>Self-serve:</strong> Coin operated &amp; laundry cards.
              </span>
            </li>
            <li className="flex gap-2">
              <Wifi className="h-5 w-5 text-blue-800 shrink-0 mt-0.5" />
              <span>
                <strong>Wash, dry &amp; fold (drop-off):</strong> {PRICING.newBridgeWashFoldLb}/lb.
              </span>
            </li>
          </ul>
          <div className="mt-8 hidden text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              Service pricing
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Current drop-off and dryer pricing.
            </p>
          </div>
          <div className="mt-4 hidden rounded-2xl border border-slate-200 bg-white overflow-hidden max-w-3xl mx-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-left">
                <tr>
                  <th className="p-4">Machine</th>
                  <th className="p-4">From</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["20 lb washer", "$4.50"],
                  ["40 lb washer", "$7.75"],
                  ["60 lb washer", "$10.50"],
                  ["Dryer", "$0.25 / 6 min"],
                  ["Wash · dry · fold (drop-off)", PRICING.newBridgeWashFoldLb + " / lb"],
                ].map(([a, b]) => (
                  <tr
                    key={a}
                    className={`${a.includes("washer") ? "hidden " : ""}border-t border-slate-200`}
                  >
                    <td className="p-4 font-medium">{a}</td>
                    <td className="p-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="p-4 text-xs text-slate-500 border-t border-slate-200">
              Rates can change; signage in-store is authoritative.
            </p>
          </div>
        </div>
      </section>

      <section className="container-pad py-8 text-center hidden" data-reveal-scale>
        <motion.a
          href={SCHEDULE_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Schedule Bergen pickup <ArrowRight className="h-4 w-4" />
        </motion.a>
      </section>
    </motion.div>
  );
}
