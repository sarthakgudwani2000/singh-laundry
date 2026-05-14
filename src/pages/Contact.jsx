import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { MapPin } from "lucide-react";
import { BRAND, IMAGES, LOCATIONS, MAPS_LINK_NEW_BRIDGE } from "@/lib/brand";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const pageRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;
  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);

  return (
    <motion.div
      ref={pageRef}
      data-testid="contact-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="container-pad pt-14 md:pt-20 pb-10 text-center max-w-3xl mx-auto" data-reveal-blur>
        <p className="overline mb-4">Contact Us</p>
        <h1 className="h1">We&apos;d love to hear from you</h1>
        <span
          className="mt-4 mx-auto block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
          data-reveal-line
          aria-hidden
        />
        <p className="mt-5 text-slate-600 text-lg">
          Questions, quotes, or feedback — use the form or call{" "}
          <a href={`tel:${BRAND.phoneBergen}`} className="text-blue-800 font-semibold">
            {BRAND.phoneBergen}
          </a>
          .
        </p>
      </section>

      <section className="container-pad pb-24 grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        <div className="space-y-5" data-reveal-stagger>
          <a
            href={MAPS_LINK_NEW_BRIDGE}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-slate-200 shadow-md bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 text-center hover:border-blue-300 transition-colors"
          >
            <MapPin className="h-10 w-10 text-blue-800 mx-auto" aria-hidden />
            <p className="mt-3 font-semibold text-slate-900">View on Google Maps</p>
            <p className="mt-2 text-sm text-slate-600">{LOCATIONS.newBridge.full}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-blue-800">
              Open map →
            </span>
          </a>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={IMAGES.contactSideA}
              alt="Bergen Laundry Service delivery van"
              className="w-full h-52 object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={IMAGES.contactSideB}
              alt="New Bridge Laundromat — self-serve dryers and folding area"
              className="w-full h-52 object-cover"
            />
          </div>
        </div>
        <div data-reveal-scale>
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}
