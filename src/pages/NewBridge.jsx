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
  { src: IMAGES.newBridgeCarousel1, alt: "New Bridge Laundromat — commercial dryers" },
  { src: IMAGES.newBridgeCarousel2, alt: "Wash, dry & fold — staff finishing orders" },
  { src: IMAGES.newBridgeCarousel3, alt: "Bergen Laundry Service delivery van" },
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
      <section className="container-pad pt-14 md:pt-20 pb-8 text-center max-w-3xl mx-auto" data-reveal-blur>
        <p className="overline mb-2">{BRAND.store}</p>
        <h1 className="h1">New Bridge Laundromat</h1>
        <p className="mt-4 text-slate-600 flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
          <MapPin className="h-4 w-4 text-blue-800 shrink-0" />
          <span>{LOCATIONS.newBridge.full}</span>
        </p>
        <p className="mt-2">
          <a href={`tel:${BRAND.phoneStore}`} className="font-semibold text-blue-800 text-lg">
            {BRAND.phoneStore}
          </a>
        </p>
        <p className="mt-5 text-slate-600 leading-relaxed">
          Newly renovated — updated <strong>November 2025</strong>. Our clean, comfortable
          laundromat is designed to make laundry day as easy and stress-free as possible.
          Pickup orders for <strong>{BRAND.pickup}</strong> are processed here.
        </p>
      </section>

      <section ref={heroImgSectionRef} className="container-pad pb-12 max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
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

      <section className="container-pad pb-12 max-w-4xl mx-auto text-center">
        <p className="text-slate-700 text-base md:text-lg">
          We are committed to providing a comfortable, efficient laundry experience for you.{" "}
          <strong>Our first-class amenities include:</strong>
        </p>
      </section>

      <section className="container-pad pb-16 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
          {NEW_BRIDGE_AMENITIES.map((a, i) => {
            const Icon = amenityIcons[i] || Wifi;
            return (
              <div
                key={a.title}
                className="rounded-2xl border border-blue-200/80 bg-white p-6 shadow-md shadow-slate-900/5 text-left"
              >
                <Icon className="h-6 w-6 text-blue-800" />
                <h3 className="mt-4 font-display font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-pad pb-12">
        <div
          className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          data-reveal-stagger="slide-x"
        >
          <div className="rounded-2xl border border-slate-200 p-5">
            <span className="inline-block text-blue-800 will-change-transform" data-float>
              <MapPin className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Address</p>
            <p className="mt-1 font-medium text-slate-900">{LOCATIONS.newBridge.full}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <span className="inline-block text-blue-800 will-change-transform" data-float-slow>
              <Phone className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-semibold uppercase text-slate-500">Phone</p>
            <a href={`tel:${BRAND.phoneStore}`} className="mt-1 font-semibold block text-blue-800">
              {BRAND.phoneStore}
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
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

      <section className="section bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/70" data-reveal>
        <div className="container-pad max-w-5xl mx-auto">
          <h2 className="h2 text-center">Wash, Dry &amp; Fold Service</h2>
          <span
            className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-700"
            data-reveal-line
            aria-hidden
          />
          <div className="mt-10 grid lg:grid-cols-3 gap-8 items-center">
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
          <ul className="mt-8 space-y-3 text-slate-700 max-w-3xl mx-auto">
            <li className="flex gap-2">
              <WashingMachine className="h-5 w-5 text-blue-800 shrink-0 mt-0.5" />
              <span>
                <strong>Self-serve:</strong> Coin operated &amp; laundry cards — see desk for current
                machine rates. Free WiFi.
              </span>
            </li>
            <li className="flex gap-2">
              <Wifi className="h-5 w-5 text-blue-800 shrink-0 mt-0.5" />
              <span>
                <strong>Wash, dry &amp; fold (drop-off):</strong> {PRICING.newBridgeWashFoldLb}/lb.
              </span>
            </li>
          </ul>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden max-w-3xl mx-auto">
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
                  <tr key={a} className="border-t border-slate-200">
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

      <section className="container-pad py-12 text-center" data-reveal-scale>
        <a
          href={SCHEDULE_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex"
        >
          Schedule Bergen pickup <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </motion.div>
  );
}
