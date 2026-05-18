import { useState, useEffect, useRef, startTransition } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapImgParallax,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { ArrowRight, Check, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BRAND,
  PRICING,
  LOCATIONS,
  IMAGES,
  SPECIAL_ITEMS_LIST,
  APP_LINKS,
  SCHEDULE_ORDER_URL,
} from "@/lib/brand";
import SpecialItemsDialog from "@/components/SpecialItemsDialog";

const pricing = [
  {
    item: "Wash & fold (pickup & delivery)",
    price: PRICING.bergenWashFoldLb + " / lb",
    note: `${PRICING.minOrderLbs} lb minimum · ${PRICING.pickupDeliveryFree}`,
  },
  { item: "Credit cards", price: PRICING.ccFeeNote, note: "Per order" },
  { item: "Dry cleaning", price: "Quoted", note: "Per piece / garment" },
  { item: "Comforters & bulky", price: "Quoted", note: "Each" },
];

const bergenSlides = [
  { src: IMAGES.bergenPromoVan, alt: "Bergen Laundry Service van and driver" },
  { src: IMAGES.aboutBanner, alt: "Bergenfield laundry facility" },
  { src: IMAGES.bergenPickupAside, alt: "Folded laundry ready for pickup orders", hidden: true },
  { src: IMAGES.bergenParallax, alt: "Laundry staging for pickup and delivery routes", hidden: true },
];

export default function BergenLaundry() {
  const [specialOpen, setSpecialOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const { hash } = useLocation();
  const pageRef = useRef(null);
  const heroImgSectionRef = useRef(null);
  const heroImgRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;
  const visibleBergenSlides = bergenSlides.filter((s) => !s.hidden);

  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);
  useGsapImgParallax({
    rootRef: pageRef,
    sectionRef: heroImgSectionRef,
    imgRef: heroImgRef,
    reduceMotion,
    yFrom: 34,
    yTo: -34,
    scrub: 0.82,
    scaleFrom: 1.1,
    scaleTo: 1.02,
    rotateFrom: -0.45,
    rotateTo: 0.45,
  });

  useEffect(() => {
    const prev = document.title;
    document.title = `${BRAND.pickup} | ${BRAND.parent}`;
    return () => {
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    if (hash === "#special-items") {
      startTransition(() => setSpecialOpen(true));
      return;
    }
    if (hash === "#terms") {
      requestAnimationFrame(() => {
        document.getElementById("terms")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [hash]);

  const next = () => setSlide((i) => (i + 1) % visibleBergenSlides.length);
  const prev = () =>
    setSlide((i) => (i - 1 + visibleBergenSlides.length) % visibleBergenSlides.length);

  return (
    <motion.div
      ref={pageRef}
      data-testid="bergen-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpecialItemsDialog open={specialOpen} onClose={() => setSpecialOpen(false)} />

      <section className="page-hero-section pb-5" data-reveal-blur>
        <div className="mx-auto mb-4 flex w-44 h-44 items-center justify-center">
          <img
            src={IMAGES.logoBergen}
            alt="Bergen Laundry Service"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="overline mb-3 hidden">{BRAND.pickup}</p>
        <h1 className="h1 max-w-3xl lg:whitespace-nowrap">Bergen Laundry Service</h1>
        <h2 className="mt-3 font-display text-xl md:text-2xl font-semibold text-slate-900">
          Welcome To North Jersey&apos;s Best FREE Laundry Pickup &amp; Delivery Service
        </h2>
        <span
          className="mt-4 mx-auto block h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500"
          data-reveal-line
          aria-hidden
        />
        <div className="mt-6 max-w-3xl mx-auto rounded-3xl border border-blue-200/70 bg-white/90 p-5 md:p-7 shadow-2xl shadow-blue-900/10 ring-1 ring-white/90 backdrop-blur-xl">
          <p className="rounded-2xl bg-gradient-to-r from-blue-50 via-white to-sky-50 px-4 py-3 text-slate-700 text-base md:text-lg leading-relaxed ring-1 ring-blue-100/80">
            <span className="hidden">
              <strong>{BRAND.parent}</strong> is the parent company of{" "}
              <strong>{BRAND.pickup}</strong> and <strong>{BRAND.store}</strong>.
            </span>
            Pickup orders are washed, dried, and folded at{" "}
            <strong>{BRAND.store}</strong>, {LOCATIONS.newBridge.full}.
          </p>
          <p className="mt-5 flex flex-wrap justify-center gap-2 rounded-2xl border border-blue-100 bg-white/85 px-4 py-3 font-display text-base md:text-lg font-semibold text-blue-950 shadow-sm">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 ring-1 ring-blue-100">
              $2.15 per pound*
            </span>
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 ring-1 ring-blue-100">
              No Charge For Pickup &amp; Delivery
            </span>
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 ring-1 ring-blue-100">
              Next Day Returns Mon-Fri
            </span>
          </p>
          <p className="mt-3 rounded-2xl bg-slate-50/90 px-4 py-3 text-slate-700 text-base md:text-lg font-medium leading-relaxed ring-1 ring-slate-200/80">
            Automatic Recurring Orders Can Be Set / Volume Based Discounts
            Available
          </p>
          <p className="mt-3 rounded-2xl bg-slate-50/90 px-4 py-3 text-slate-700 text-base md:text-lg font-medium leading-relaxed ring-1 ring-slate-200/80">
            *{PRICING.ccFeeNote} / *min order: {PRICING.minOrderLbs} lbs
          </p>
          <p className="mt-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-4 py-3 font-display text-lg md:text-xl font-bold leading-relaxed text-white shadow-lg shadow-blue-700/25 ring-1 ring-blue-300/40">
            {PRICING.firstOrderAmount} Off Your 1st Order!!! / Coupon Code:{" "}
            <span className="font-mono rounded-lg bg-white/15 px-2 py-0.5">{PRICING.firstOrderCode}</span>
          </p>
          <p className="mt-3 rounded-2xl bg-slate-50/90 px-4 py-3 text-slate-700 text-base md:text-lg font-medium leading-relaxed ring-1 ring-slate-200/80">
            Orders are billed by weight. Some{" "}
            <button
              type="button"
              onClick={() => setSpecialOpen(true)}
              className="text-blue-800 font-medium underline underline-offset-2"
            >
              Special Items
            </button>{" "}
            are billed individually.
          </p>
          <p className="mt-3 rounded-2xl bg-slate-50/90 px-4 py-3 text-slate-700 text-base md:text-lg font-medium leading-relaxed ring-1 ring-slate-200/80">
            <a
              href={`${import.meta.env.BASE_URL}terms-of-service-for-bergen-laundry-pickup-delivery.pdf`}
              className="text-blue-800 font-medium underline underline-offset-2"
            >
              Terms of Service
            </a>{" "}
            for Laundry Pickup and Delivery
          </p>
        </div>
        <div className="mt-8 hidden flex-wrap gap-3">
          <a
            href={SCHEDULE_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-testid="bergen-top-cta"
          >
            Schedule a pickup <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setSpecialOpen(true)}
            className="btn-secondary"
          >
            Special items (pop-up)
          </button>
          <a href="#pricing" className="btn-secondary">
            Jump to pricing
          </a>
        </div>
      </section>

      {/* Same “seal + van + FIRST10” row as singhlaundry.com home */}
      <section className="container-pad pb-7 md:pb-9" data-testid="bergen-home-mirror-promo">
        <div className="max-w-4xl mx-auto">
          <div className="hidden justify-center lg:justify-start" data-reveal>
            <div className="w-44 h-44 flex flex-col items-center justify-center p-4">
              <img
                src={IMAGES.logoBergen}
                alt="Bergen Laundry Service"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div
            className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl min-h-[300px] md:min-h-[380px]"
            data-reveal-scale
          >
            <img
              src={visibleBergenSlides[slide].src}
              alt={visibleBergenSlides[slide].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" aria-hidden />
            <div className="hidden absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-display font-bold text-xs md:text-sm tracking-wide shadow-lg whitespace-nowrap ring-2 ring-white/40">
              BERGEN LAUNDRY SERVICE
            </div>
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
              {visibleBergenSlides.map((_, i) => (
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
          <div
            className="hidden text-center lg:text-left rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/90 p-6 md:p-8 shadow-inner"
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

      {/* Pickup pricing & policies */}
      <motion.section
        className="hidden border-y border-slate-200/80 bg-gradient-to-b from-slate-50/95 to-white py-9 md:py-11"
        data-testid="bergen-home-mirror-pickup"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-pad grid lg:grid-cols-2 gap-7 lg:gap-9 items-start">
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
              <li>
                Orders are processed at <strong>{BRAND.store}</strong>,{" "}
                {LOCATIONS.newBridge.full}.
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-5 flex gap-3 items-start">
              <span className="inline-flex shrink-0 mt-0.5 text-blue-700 will-change-transform" data-float-slow>
                <Gift className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">First-order savings</p>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>{PRICING.firstOrderAmount} off</strong> first order with code{" "}
                  <span className="font-mono font-semibold text-slate-900">
                    {PRICING.firstOrderCode}
                  </span>{" "}
                  — always visible here (no pop-up), matching our classic site offer.
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
              <Link to="/" className="btn-secondary">
                Singh Laundry home
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
              <a href="#terms" className="text-blue-800 font-medium underline underline-offset-2">
                Terms of service
              </a>
            </p>
          </div>
          <motion.div
            className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/10 ring-1 ring-white/60 card-hover"
            whileHover={{ scale: reduceMotion ? 1 : 1.02, rotateZ: reduceMotion ? 0 : -0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ perspective: 1200 }}
          >
            <img
              src={IMAGES.bergenPickupAside}
              alt="Neatly folded towels ready for customer orders"
              className="w-full h-56 md:h-72 object-cover scale-[1.06] will-change-transform"
            />
          </motion.div>
        </div>
      </motion.section>

      <section ref={heroImgSectionRef} className="hidden container-pad pb-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 max-w-4xl">
          <img
            ref={heroImgRef}
            src={IMAGES.bergenParallax}
            alt="Warehouse-style staging for high-volume laundry routes"
            className="w-full h-56 md:h-72 object-cover will-change-transform"
          />
        </div>
      </section>

      <section className="hidden section bg-slate-50" id="pricing" data-reveal>
        <div className="container-pad max-w-3xl">
          <h2 className="h2">Pricing</h2>
          <span
            className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
            data-reveal-line
            aria-hidden
          />
          <div className="mt-6 surface-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-left">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="p-4 font-medium">{p.item}</td>
                    <td className="p-4 text-blue-800 font-semibold">{p.price}</td>
                    <td className="p-4 text-slate-600">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-600">{PRICING.nextDayNote}.</p>
          <p className="mt-3 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setSpecialOpen(true)}
              className="text-blue-800 font-medium underline underline-offset-2"
            >
              *Special Items
            </button>
            <span> / </span>
            <a
              href={`${import.meta.env.BASE_URL}terms-of-service-for-bergen-laundry-pickup-delivery.pdf`}
              className="text-blue-800 font-medium underline underline-offset-2"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </section>

      <section className="hidden section container-pad max-w-3xl" id="special-items" data-reveal>
        <h2 className="h2">Special items</h2>
        <p className="mt-3 text-slate-600">
          Note oversized or delicate pieces in your pickup request — we&apos;ll
          confirm handling and pricing before wash.
        </p>
        <button
          type="button"
          onClick={() => setSpecialOpen(true)}
          className="btn-secondary mt-4"
        >
          Open special items (pop-up)
        </button>
        <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-slate-800" data-reveal-stagger>
          {SPECIAL_ITEMS_LIST.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="hidden section bg-slate-50" id="terms" data-reveal>
        <div className="container-pad max-w-3xl">
          <h2 className="h2">Terms of service</h2>
          <div className="mt-4 text-slate-600 space-y-3 text-sm leading-relaxed">
            <p>
              Pickup windows are typically two hours; we text when we&apos;re
              en route. Orders are billed at a {PRICING.minOrderLbs} lb minimum
              where applicable. {PRICING.ccFeeNote}. Special-care items are
              itemized separately. Items not collected within 14 days of ready
              notice may incur storage fees. Full written policies available on
              request.
            </p>
          </div>
        </div>
      </section>

      <section className="hidden section container-pad max-w-3xl" id="app" data-reveal>
        <h2 className="h2">Bergen Laundry Service app</h2>
        <p className="mt-4 text-slate-600">
          The mobile app does the same job as the{" "}
          <a
            href={SCHEDULE_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 font-semibold"
          >
            schedule a pickup
          </a>{" "}
          link in your browser — schedule routes, track orders, and manage
          recurring service on the go.
        </p>
        {(APP_LINKS.ios || APP_LINKS.android) ? (
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {APP_LINKS.ios ? (
              <li>
                <a
                  href={APP_LINKS.ios}
                  className="text-blue-800 font-semibold underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on the App Store
                </a>
              </li>
            ) : null}
            {APP_LINKS.android ? (
              <li>
                <a
                  href={APP_LINKS.android}
                  className="text-blue-800 font-semibold underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
                </a>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-600">
            Download from the <strong>App Store</strong> or{" "}
            <strong>Google Play</strong> (search &quot;Bergen Laundry Service&quot;)
            or ask us for direct links when you call {BRAND.phoneBergen}.
          </p>
        )}
      </section>

      <section className="hidden container-pad py-6 text-center text-sm text-slate-500 border-t border-slate-200/80">
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
          <a
            href={`${import.meta.env.BASE_URL}terms-of-service-for-bergen-laundry-pickup-delivery.pdf`}
            className="text-blue-800 font-medium underline underline-offset-2"
          >
            Terms of Service
          </a>
        </p>
        <Link to="/services" className="text-blue-800 font-medium">
          View all services
        </Link>
        {" · "}
        <Link to="/about" className="text-blue-800 font-medium">
          About &amp; service area
        </Link>
        {" · "}
        <Link to="/contact" className="text-blue-800 font-medium">
          Contact form
        </Link>
      </section>

      <section className="hidden bg-blue-800 text-white" data-reveal-scale>
        <div className="container-pad py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-display text-xl text-white">Ready to book?</p>
          <a
            href={SCHEDULE_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white !text-blue-900 hover:!bg-blue-50"
          >
            Schedule a pickup
          </a>
        </div>
      </section>
    </motion.div>
  );
}
