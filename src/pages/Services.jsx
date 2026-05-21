import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND, PRICING, LOCATIONS, IMAGES, SCHEDULE_ORDER_URL, BERGEN_SITE_URL, NEW_BRIDGE_SITE_URL } from "@/lib/brand";
import { fillServicesTemplate } from "@/lib/templateCopy";
import {
  useGsapFloatAccents,
  useGsapImgParallax,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";

export default function Services() {
  const { hash } = useLocation();
  const pageRef = useRef(null);
  const pickupRef = useRef(null);
  const pickupImgRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;

  const copy = useMemo(
    () => fillServicesTemplate(BRAND.store, BRAND.pickup),
    [],
  );

  useGsapImgParallax({
    rootRef: pageRef,
    sectionRef: pickupRef,
    imgRef: pickupImgRef,
    reduceMotion,
    yFrom: 32,
    yTo: -32,
    scrub: 0.85,
    scaleFrom: 1.1,
    scaleTo: 1.02,
    rotateFrom: -0.35,
    rotateTo: 0.35,
  });
  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);

  useEffect(() => {
    const id = hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <motion.div
      ref={pageRef}
      data-testid="services-page"
      className="pb-10"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="page-hero-section max-w-none" data-reveal-blur>
        <p className="overline mb-3 hidden">Services</p>
        <h1 className="h1 whitespace-nowrap">Our Laundry Care Services</h1>
        <span
          className="mt-4 mx-auto block h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500"
          data-reveal-line
          aria-hidden
        />
        <p className="mt-6 hidden text-slate-600 text-lg">
          We lead with <strong>{BRAND.pickup}</strong> pickup &amp; delivery — then self-serve, drop-off wash &amp; fold, and commercial laundry at{" "}
          <strong>{BRAND.store}</strong> in Bergenfield (where pickup orders are processed).
        </p>
      </section>

      <motion.section
        ref={pickupRef}
        id="pickup-delivery"
        className="section-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-pad max-w-6xl mx-auto">
          <div className="text-center" data-reveal>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              <a
                href={BERGEN_SITE_URL}
                className="inline-block underline decoration-blue-300 decoration-2 underline-offset-4 transition-all duration-300 hover:-translate-y-1 hover:text-blue-800 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
              >
                {copy.pickup.title}
              </a>
            </h2>
            <span
              className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
              data-reveal-line
              aria-hidden
            />
            <p className="mt-4 max-w-3xl mx-auto text-center font-display text-base md:text-xl font-semibold text-slate-700">
              {copy.pickup.intro}
            </p>
          </div>
          <motion.div className="mt-6" data-reveal-scale>
            <div className="grid lg:grid-cols-3 gap-6 items-stretch">
              <p className="hidden lg:col-span-3 px-8 pt-8 md:px-10 text-center text-slate-700 leading-relaxed">
                {copy.pickup.intro}
              </p>
              <div className="lg:col-span-3 grid md:grid-cols-3 gap-6" data-reveal-stagger>
                {copy.pickup.benefits.map((b) => (
                  <div key={b.title} className="surface-card overflow-hidden flex flex-col" data-reveal>
                    <div className="p-6 flex-1">
                      <p className="font-display font-bold text-lg text-slate-900">{b.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden relative min-h-[220px] lg:min-h-[320px] overflow-hidden bg-white">
                <img
                  ref={pickupImgRef}
                  src={IMAGES.servicesPickup}
                  alt="Laundry pickup — customer with basket and clean clothes"
                  className="absolute inset-0 w-full h-full object-contain will-change-transform"
                />
              </div>
              <div className="hidden lg:col-span-2 p-8 md:p-10 flex flex-col justify-center border-y lg:border-y-0 lg:border-x border-slate-200/80">
                <p className="hidden text-slate-700 leading-relaxed">{copy.pickup.intro}</p>
                <ul className="hidden mt-6 space-y-4 text-left text-sm text-slate-800" data-reveal-stagger>
                  {copy.pickup.benefits.map((b) => (
                    <li key={b.title}>
                      <strong className="text-slate-900">{b.title}:</strong>{" "}
                      {b.text}
                    </li>
                  ))}
                </ul>
                <div className="hidden mt-8 flex flex-wrap gap-3">
                  <motion.a
                    href={SCHEDULE_ORDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule a pickup <ArrowRight className="h-4 w-4" />
                  </motion.a>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <a href={BERGEN_SITE_URL} className="btn-secondary">
                      Pricing &amp; policies
                    </a>
                  </motion.div>
                </div>
                <p className="hidden mt-4 text-xs text-slate-500">
                  {PRICING.bergenWashFoldLb}/lb · {PRICING.minOrderLbs} lb minimum · {PRICING.pickupDeliveryFree}. {PRICING.ccFeeNote}.
                </p>
                <p className="hidden mt-2 text-xs text-slate-500">
                  Orders are processed at <strong className="text-slate-700">{BRAND.store}</strong>,{" "}
                  {LOCATIONS.newBridge.full}.
                </p>
              </div>
              <div className="hidden relative min-h-[220px] lg:min-h-[320px] bg-slate-100 flex items-center justify-center p-8">
                <div className="rounded-full border-4 border-slate-900 bg-white p-6 text-center max-w-[220px] shadow-lg">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Est. 2017
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-slate-900 leading-tight">
                    Bergen Laundry
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    Your pick up &amp; delivery
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="hidden container-pad pt-8 pb-3 max-w-3xl mx-auto text-center" data-reveal-blur>
        <p className="overline mb-2">{BRAND.store}</p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          On-site services (same location)
        </h2>
        <span
          className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400"
          data-reveal-line
          aria-hidden
        />
        <p className="mt-3 content-prose">
          Self-serve, wash &amp; fold drop-off, and commercial accounts — all handled where{" "}
          <strong>{BRAND.pickup}</strong> processes pickups.
        </p>
      </div>

      <section className="container-pad py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center" data-reveal>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              {copy.selfServe.title}
            </h2>
            <span
              className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
              data-reveal-line
              aria-hidden
            />
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6" data-reveal-stagger>
            <div className="surface-card overflow-hidden flex flex-col" data-reveal>
              <div className="p-6 flex-1">
                <p className="font-display font-bold text-lg text-slate-900">
                  Self-Service
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>· Coin operated &amp; laundry cards</li>
                  <li>· Free WiFi, seating, TVs, and folding stations</li>
                  <li>· Vending machines and clean in-store amenities</li>
                </ul>
              </div>
            </div>
            <div className="surface-card overflow-hidden flex flex-col" data-reveal>
              <div className="p-6 flex-1">
                <p className="font-display font-bold text-lg text-slate-900">
                  Wash, Dry &amp; Fold
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>· Drop-off wash, dry &amp; fold at {BRAND.store}</li>
                  <li>· {PRICING.newBridgeWashFoldLb}/lb</li>
                  <li>· Next day pickup on most orders</li>
                </ul>
              </div>
            </div>
            <div className="surface-card overflow-hidden flex flex-col" data-reveal>
              <div className="p-6 flex-1">
                <p className="font-display font-bold text-lg text-slate-900">
                  Commercial Laundry Service
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>· Linens, towels, uniforms, and business laundry</li>
                  <li>· Pickup schedules tailored to your account</li>
                  <li>· Serving Bergen, Passaic, Morris, and Essex Counties</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        id="self-serve"
        className="hidden container-pad pb-12 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div data-reveal>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {copy.selfServe.title}
          </h2>
          <span
            className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
            data-reveal-line
            aria-hidden
          />
          <p className="mt-5 content-prose">{copy.selfServe.body}</p>
        </div>
        <motion.div className="mt-8" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <a href={NEW_BRIDGE_SITE_URL} className="btn-primary inline-flex">
            Visit {BRAND.store} <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.section>

      <section id="wash-fold" className="hidden container-pad py-10 md:py-12 max-w-6xl mx-auto">
        <div className="text-center" data-reveal>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            {copy.washFold.title}
          </h2>
          <span
            className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
            data-reveal-line
            aria-hidden
          />
        </div>
        <div className="mt-6 grid lg:grid-cols-3 gap-6 items-center">
          <div className="hidden lg:block rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[240px] card-hover" data-reveal>
            <img
              src={IMAGES.servicesWashFold}
              alt="Ironing and finishing for wash-and-fold orders"
              className="w-full h-full min-h-[240px] object-cover"
            />
          </div>
          <div className="text-center lg:text-left" data-reveal>
            <p className="content-prose">{copy.washFold.intro}</p>
            <p className="mt-4 text-sm font-semibold text-slate-900">Key benefits</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-800 text-left">
              {copy.washFold.benefits.map((b) => (
                <li key={b.title}>
                  <strong>{b.title}:</strong> {b.text}
                </li>
              ))}
            </ul>
            <motion.div className="mt-6 inline-block" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a href={NEW_BRIDGE_SITE_URL} className="btn-secondary inline-flex">
                Drop-off details <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
          <div className="hidden lg:block rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[240px] card-hover" data-reveal>
            <img
              src={IMAGES.servicesSelfServe}
              alt="Laundry basket at machines — self-serve and drop-off"
              className="w-full h-full min-h-[240px] object-cover"
            />
          </div>
        </div>
      </section>

      <motion.section
        id="commercial"
        className="hidden section-panel bg-slate-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <div data-reveal>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              {copy.commercial.title}
            </h2>
            <span
              className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-slate-400"
              data-reveal-line
              aria-hidden
            />
          </div>
          <div className="hidden lg:block mt-8 rounded-3xl overflow-hidden border border-slate-200 shadow-lg max-w-2xl mx-auto card-hover" data-reveal-clip>
            <img
              src={IMAGES.servicesCommercial}
              alt="Industrial laundry equipment for commercial accounts"
              className="w-full h-52 md:h-64 object-cover"
            />
          </div>
          <p className="mt-5 content-prose" data-reveal>{copy.commercial.body}</p>
          <motion.div className="mt-8" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link to="/contact" className="btn-primary inline-flex">
              Request a commercial quote <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
