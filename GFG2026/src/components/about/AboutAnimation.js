import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes GSAP ScrollTrigger animations for the About section.
 *
 * @param {HTMLElement} section - Section container node reference
 * @returns {Function} Cleanup function to revert context on unmount
 */
export const initAboutAnimation = (section) => {
  if (!section) return () => {};

  // Respect reduced-motion accessibility preference by skipping entrance transforms
  if (prefersReducedMotion()) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    const heading = section.querySelector(".about-heading");
    const content = section.querySelector(".about-content");
    const visual = section.querySelector(".about-visual");
    const circle = section.querySelector(".about-circle");
    const copy = section.querySelector(".about-copy");
    const cta = section.querySelector(".about-cta");
    const stats = section.querySelectorAll(".about-stat");
    const glow = section.querySelector(".about-glow");
    const backgroundText = section.querySelector(".about-background-text");

    /*
     * Initial States
     */
    if (heading) gsap.set(heading, { y: 60, opacity: 0 });
    if (visual) gsap.set(visual, { x: -40, opacity: 0, scale: 0.96 });
    if (copy) gsap.set(copy, { x: 40, opacity: 0 });
    if (circle) gsap.set(circle, { scale: 0.5, opacity: 0 });
    if (cta) gsap.set(cta, { y: 20, opacity: 0 });
    if (stats.length > 0) gsap.set(stats, { y: 40, opacity: 0 });
    if (glow) gsap.set(glow, { scale: 0.7, opacity: 0 });
    if (backgroundText) gsap.set(backgroundText, { opacity: 0, x: 50 });

    /*
     * Heading Entrance
     */
    if (heading) {
      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }

    /*
     * Main Visual & Copy Timeline
     */
    if (content) {
      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          once: true,
        },
      });

      if (visual) {
        contentTimeline.to(visual, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (circle) {
        contentTimeline.to(
          circle,
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
      }

      if (copy) {
        contentTimeline.to(
          copy,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      if (cta) {
        contentTimeline.to(
          cta,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }

    /*
     * Statistics Grid Stagger
     */
    if (stats.length > 0) {
      gsap.to(stats, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stats[0],
          start: "top 88%",
          once: true,
        },
      });
    }

    /*
     * Background Ambient Visuals
     */
    if (glow) {
      gsap.to(glow, {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      // Subtle floating ambient loop
      gsap.to(glow, {
        x: 30,
        y: 25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (backgroundText) {
      gsap.to(backgroundText, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    }

    if (circle) {
      gsap.to(circle, {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });
    }
  }, section);

  return () => ctx.revert();
};

export default initAboutAnimation;