import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapImgParallax,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { BRAND, IMAGES, SCHEDULE_ORDER_URL } from "@/lib/brand";
import { getAboutParagraphs, SERVICE_AREA_LINES } from "@/lib/templateCopy";

export default function About() {
  const pageRef = useRef(null);
  const imgSectionRef = useRef(null);
  const imgRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;

  const aboutParagraphs = useMemo(() => getAboutParagraphs(BRAND), []);

  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);
  useGsapImgParallax({
    rootRef: pageRef,
    sectionRef: imgSectionRef,
    imgRef: imgRef,
    reduceMotion,
    yFrom: 26,
    yTo: -26,
    scrub: 0.8,
    scaleFrom: 1.06,
    scaleTo: 1,
    rotateFrom: -0.25,
    rotateTo: 0.25,
  });

  return (
    <motion.div
      ref={pageRef}
      data-testid="about-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="container-pad pt-14 md:pt-20 pb-12 max-w-3xl mx-auto text-center" data-reveal-blur>
        <h1 className="h1">About Us</h1>
        <span
          className="mt-4 mx-auto block h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-600 to-sky-500"
          data-reveal-line
          aria-hidden
        />
        <div className="mt-10 space-y-6 text-slate-700 leading-relaxed text-base">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section ref={imgSectionRef} className="container-pad pb-14 max-w-4xl mx-auto">
        <img
          ref={imgRef}
          src={IMAGES.aboutBanner}
          alt="New Bridge Laundromat — rows of commercial dryers"
          className="w-full max-h-[360px] object-cover rounded-3xl border border-slate-200 will-change-transform"
        />
      </section>

      <section className="section bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/80 py-14 md:py-16">
        <div className="container-pad max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
            Areas We Service
          </h2>
          <span
            className="mt-3 mx-auto block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
            data-reveal-line
            aria-hidden
          />
          <p className="mt-4 text-sm text-slate-600">
            Pickup &amp; delivery coverage by ZIP (legacy site list; call if yours isn&apos;t listed).
          </p>
          <ul className="mt-10 space-y-1.5 text-sm text-slate-800 font-mono leading-relaxed text-left inline-block max-w-full">
            {SERVICE_AREA_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-pad py-14">
        <div
          className="rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 text-white p-8 md:p-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl shadow-blue-900/30 ring-1 ring-white/15 max-w-3xl mx-auto"
          data-reveal-scale
        >
          <p className="font-display text-xl text-white max-w-md text-center sm:text-left">
            Schedule your pickup online — it only takes a minute.
          </p>
          <a
            href={SCHEDULE_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white !text-blue-900 hover:!bg-blue-50 shrink-0 mx-auto sm:mx-0"
          >
            Schedule a pickup
          </a>
        </div>
      </section>
    </motion.div>
  );
}
