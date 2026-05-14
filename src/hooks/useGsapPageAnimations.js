import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

const defaultStart = "top 88%";

/**
 * Scroll-triggered reveals scoped to `pageRef`. Skipped when `reduceMotion`.
 *
 * Markers:
 * - [data-reveal-line] — gradient bar scales in (origin left)
 * - [data-reveal-blur] — blur + fade (headlines / hero blocks)
 * - [data-reveal-scale] — scale + lift with overshoot
 * - [data-reveal-clip] — horizontal clip wipe + fade
 * - [data-reveal-spin] — rotate + scale pop (icon chips)
 * - [data-reveal] — standard fade + rise
 * - [data-reveal-stagger] — children; value "" or "rise" (default), or "slide-x" (alternating)
 */
export function useGsapScrollReveal(pageRef, reduceMotion, options = {}) {
  const {
    start = defaultStart,
    y = 44,
    duration = 0.82,
    ease = "power3.out",
    extraDeps = [],
  } = options;

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const root = pageRef.current;
    if (!root) return;

    const scrollOnce = (trigger, animVars) => ({
      trigger,
      start,
      toggleActions: "play none none none",
      ...animVars,
    });

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-reveal-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.95,
            ease: "power2.inOut",
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal-blur]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.88,
            ease: "back.out(1.05)",
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            clipPath: "inset(0 12% 0 12%)",
          },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.05,
            ease: "power3.inOut",
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal-spin]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, rotate: -28, scale: 0.65 },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.82,
            ease: "back.out(1.35)",
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: scrollOnce(el),
          },
        );
      });

      root.querySelectorAll("[data-reveal-stagger]").forEach((parent) => {
        const kids = gsap.utils.toArray(parent.children);
        if (!kids.length) return;
        const mode = (parent.getAttribute("data-reveal-stagger") || "").trim();

        if (mode === "slide-x") {
          gsap.timeline({
            scrollTrigger: scrollOnce(parent),
          }).from(
            kids,
            {
              opacity: 0,
              y: 42,
              x: (i) => (i % 2 === 0 ? -52 : 52),
              scale: 0.9,
              rotation: (i) => (i % 2 === 0 ? -2.5 : 2.5),
              duration: 0.82,
              stagger: 0.15,
              ease: "back.out(1.02)",
            },
            0,
          );
        } else {
          gsap.fromTo(
            kids,
            { opacity: 0, y: 34, scale: 0.93 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.74,
              stagger: 0.13,
              ease: "back.out(0.95)",
              scrollTrigger: scrollOnce(parent),
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, start, y, duration, ease, ...extraDeps]);
}

/** Gentle idle motion (transform only); keep off elements that use scroll spin. */
export function useGsapFloatAccents(pageRef, reduceMotion, extraDeps = []) {
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const root = pageRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-float]").forEach((el) => {
        gsap.to(el, {
          y: -6,
          duration: 2.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
      root.querySelectorAll("[data-float-slow]").forEach((el) => {
        gsap.to(el, {
          y: -4,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, ...extraDeps]);
}

export function useGsapImgParallax({
  rootRef,
  sectionRef,
  imgRef,
  reduceMotion,
  yFrom = 36,
  yTo = -36,
  scrub = 0.85,
  scaleFrom = 1,
  scaleTo = 1,
  rotateFrom = 0,
  rotateTo = 0,
}) {
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const sec = sectionRef.current;
    const img = imgRef.current;
    if (!root || !sec || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { y: yFrom, scale: scaleFrom, rotation: rotateFrom },
        {
          y: yTo,
          scale: scaleTo,
          rotation: rotateTo,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduceMotion, yFrom, yTo, scrub, scaleFrom, scaleTo, rotateFrom, rotateTo]);
}
