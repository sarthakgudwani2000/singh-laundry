import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  useGsapFloatAccents,
  useGsapScrollReveal,
} from "@/hooks/useGsapPageAnimations";
import { BRAND, IMAGES } from "@/lib/brand";
import Seo from "@/components/Seo";

export default function Privacy() {
  const pageRef = useRef(null);
  const reduceMotion = useReducedMotion() === true;
  useGsapScrollReveal(pageRef, reduceMotion);
  useGsapFloatAccents(pageRef, reduceMotion);

  return (
    <motion.div
      ref={pageRef}
      data-testid="privacy-page"
      className="container-pad py-9 md:py-12 max-w-3xl"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo
        title="Privacy Policy | Singh Laundry"
        description="Read Singh Laundry's privacy policy to understand how we collect, use, and protect your information across our Bergenfield, NJ laundry services."
        path="/privacy"
        image={IMAGES.logoSingh}
      />
      <div data-reveal-clip>
        <p className="overline mb-3">Singh Laundry</p>
        <h1 className="h1">Privacy Policy</h1>
        <span
          className="mt-4 block h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-slate-400"
          data-reveal-line
          aria-hidden
        />
        <p className="mt-4 text-sm text-slate-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6 space-y-6 text-slate-700 text-sm leading-relaxed">
        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            Who we are
          </h2>
          <p className="mt-2">
            This website is operated by <strong>{BRAND.parent}</strong> on behalf
            of <strong>{BRAND.pickup}</strong> and <strong>{BRAND.store}</strong>.
            Questions about this policy:{" "}
            <a href={`mailto:${BRAND.email}`} className="text-blue-800 font-medium">
              {BRAND.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${BRAND.phoneBergen}`} className="text-blue-800 font-medium">
              {BRAND.phoneBergen}
            </a>
            .
          </p>
        </section>

        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            Information we collect
          </h2>
          <p className="mt-2">
            When you use our <strong>Contact</strong> form or <strong>Schedule a pickup</strong>
            form, we collect the information you submit (such as name, phone, email,
            address, service preferences, and messages) so we can respond and provide
            laundry services.
          </p>
        </section>

        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            How we use your information
          </h2>
          <p className="mt-2">
            We use submitted information only to operate our business: to schedule
            pickups and deliveries, communicate about your order, and answer
            inquiries. We do not sell your personal information.
          </p>
        </section>

        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            Cookies &amp; analytics
          </h2>
          <p className="mt-2">
            This marketing site may use basic browser technologies needed for the
            site to function. If we add analytics or advertising cookies later, we
            will update this policy.
          </p>
        </section>

        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            Retention
          </h2>
          <p className="mt-2">
            We retain communications and order-related records only as long as needed
            for customer service, billing, and legal requirements.
          </p>
        </section>

        <section data-reveal>
          <h2 className="font-display text-lg lg:text-xl font-semibold text-slate-900">
            Changes
          </h2>
          <p className="mt-2">
            We may update this policy from time to time. Updates will be posted on
            this page with a revised “Last updated” date.
          </p>
        </section>
      </div>

      <p className="mt-8" data-reveal>
        <Link to="/" className="text-blue-800 font-medium">
          ← Back to home
        </Link>
      </p>
    </motion.div>
  );
}
