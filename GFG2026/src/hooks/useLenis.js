import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../animations/gsapConfig";

/**
 * Initialize Lenis smooth scrolling and synchronize it
 * with GSAP ScrollTrigger.
 */
export const useLenis = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    /*
     * Make sure native document scrolling is not
     * accidentally disabled by another component.
     */
    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    /*
     * Initialize Lenis.
     *
     * Do NOT use the deprecated `smoothWheel` option.
     * Current Lenis versions handle wheel smoothing
     * through the default configuration.
     */
    const lenis = new Lenis({
      duration: 1.2,

      easing: (t) =>
        Math.min(
          1,
          1.001 - Math.pow(2, -10 * t)
        ),

      orientation: "vertical",
      gestureOrientation: "vertical",

      wheelMultiplier: 1,
      touchMultiplier: 1,

      infinite: false,

      autoRaf: false,

      ...options,
    });

    lenisRef.current = lenis;

    // Expose a global reference to the Lenis instance so other UI
    // layers (modals, menus) can temporarily pause scrolling when needed.
    try {
      window.__LENIS = lenis;
    } catch (e) {
      // ignore in non-browser contexts
    }

    /*
     * Explicitly start Lenis and drive it via requestAnimationFrame.
     * Driving Lenis with rAF ensures wheel/touch gestures are processed
     * reliably across platforms.
     */
    lenis.start();

    const rafLoop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    };

    let rafId = requestAnimationFrame(rafLoop);

    /*
     * Lenis -> GSAP ScrollTrigger
     */
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    // Ensure ScrollTrigger recalculates after Lenis initialized
    ScrollTrigger.refresh();

    /*
     * Cleanup
     */
    return () => {
      if (rafId) cancelAnimationFrame(rafId);

      lenis.off("scroll", handleScroll);

      lenis.stop();
      lenis.destroy();

      try {
        // Remove global reference
        if (window.__LENIS === lenis) delete window.__LENIS;
      } catch (e) {}

      /*
       * Restore whatever the document had before
       * this hook mounted.
       */
      document.body.style.overflow = previousBodyOverflow;

      document.documentElement.style.overflow = previousHtmlOverflow;

      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

export default useLenis;