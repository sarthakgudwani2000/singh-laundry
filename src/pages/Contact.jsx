import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { ScrollTrigger } from "@/lib/gsap";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND, IMAGES, LOCATIONS, MAPS_LINK_NEW_BRIDGE } from "@/lib/brand";
import ContactForm from "@/components/ContactForm";
import Seo from "@/components/Seo";

const contactSlides = [
  { src: IMAGES.contactSideA, alt: "Bergen Laundry Service delivery van" },
  {
    src: IMAGES.contactSideB,
    alt: "New Bridge Laundromat — self-serve dryers and folding area",
  },
  {
    src: IMAGES.contactSlideNew,
    alt: "Bergen Laundry Service branded van parked outside the storefront",
  },
];

export default function Contact() {
  const pageRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const reduceMotion = useReducedMotion() === true;
  const next = () => setSlide((i) => (i + 1) % contactSlides.length);
  const prev = () =>
    setSlide((i) => (i - 1 + contactSlides.length) % contactSlides.length);
  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const refresh = () => ScrollTrigger.refresh();
    const id = requestAnimationFrame(refresh);
    const timeoutId = setTimeout(refresh, 450);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      ref={pageRef}
      data-testid="contact-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo
        title="Contact Singh Laundry | Bergenfield, NJ"
        description="Get in touch with Singh Laundry for wash & fold, pickup & delivery, or self-serve laundromat questions in Bergenfield, NJ and surrounding towns."
        path="/contact"
        image={IMAGES.logoSingh}
      />
      <section className="page-hero-section pb-6" data-reveal-blur>
        <h1 className="h1">We&apos;d love to hear from you</h1>
        <span
          className="mt-4 mx-auto block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
          data-reveal-line
          aria-hidden
        />
        <p className="mt-5 text-slate-600 text-lg">
          Questions, quotes, or feedback, please use the form or call{" "}
          <a href={`tel:${BRAND.phoneBergen}`} className="text-blue-800 font-semibold">
            {BRAND.phoneBergen}
          </a>
          .
        </p>
      </section>

      <section className="container-pad pb-14 grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
        <motion.div className="order-2 lg:order-1 space-y-5">
          <motion.div className="space-y-5">
            <motion.a
              href={MAPS_LINK_NEW_BRIDGE}
              target="_blank"
              rel="noopener noreferrer"
              className="block surface-card p-8 text-center hover:border-blue-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="inline-block text-blue-800" data-reveal-spin>
                <MapPin className="h-10 w-10 mx-auto" aria-hidden />
              </span>
              <p className="mt-3 font-semibold text-slate-900">View on Google Maps</p>
              <p className="mt-2 text-sm text-slate-600">{LOCATIONS.newBridge.full}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-800">
                Open map →
              </span>
            </motion.a>
            <motion.div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md card-hover h-52 lg:h-72">
              <img
                src={contactSlides[slide].src}
                alt={contactSlides[slide].alt}
                className="w-full h-full object-cover"
              />
              <motion.div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                <button
                  type="button"
                  onClick={prev}
                  className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
              <motion.div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-slate-900/45 px-2.5 py-2 backdrop-blur-sm">
                {contactSlides.map((_, i) => (
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="order-1 lg:order-2" data-reveal-scale>
          <ContactForm />
        </motion.div>
      </section>
    </motion.div>
  );
}
