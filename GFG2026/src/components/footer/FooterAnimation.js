import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initFooterAnimation
 * 
 * GSAP ScrollTrigger animation controller for the Footer section.
 * Provides subtle staggered entrance transitions and smooth background parallax,
 * maintaining high contrast and quick readability.
 */
export const initFooterAnimation = (footer) => {
  if (!footer) return () => {};

  const ctx = gsap.context(() => {
    const eyebrow = footer.querySelector(".footer-eyebrow");
    const title = footer.querySelector(".footer-title");
    const description = footer.querySelector(".footer-description");
    const email = footer.querySelector(".footer-email");
    const info = footer.querySelector(".footer-info");
    const bottom = footer.querySelector(".footer-bottom");
    const glow = footer.querySelector(".footer-glow");
    const backgroundText = footer.querySelector(".footer-background-text");

    /*
     * 1. Set Initial Component States
     */
    gsap.set(eyebrow, {
      y: 20,
      opacity: 0,
    });

    gsap.set(title, {
      y: 50,
      opacity: 0,
    });

    gsap.set(description, {
      y: 25,
      opacity: 0,
    });

    gsap.set(email, {
      y: 15,
      opacity: 0,
    });

    gsap.set(info, {
      y: 35,
      opacity: 0,
    });

    gsap.set(bottom, {
      opacity: 0,
    });

    gsap.set(glow, {
      scale: 0.75,
      opacity: 0,
    });

    gsap.set(backgroundText, {
      opacity: 0,
      y: 20,
    });

    /*
     * 2. Staggered CTA & Grid Entrance Timeline
     */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 78%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .to(eyebrow, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      })
      .to(
        title,
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        description,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.45"
      )
      .to(
        email,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.35"
      )
      .to(
        info,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
        },
        "-=0.2"
      )
      .to(
        bottom,
        {
          opacity: 1,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        backgroundText,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        glow,
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0
      );

    /*
     * 3. Ambient Looping Floating & Parallax Scrub
     */
    if (glow) {
      gsap.to(glow, {
        x: -30,
        y: 25,
        duration: 6.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (backgroundText) {
      gsap.to(backgroundText, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }
  }, footer);

  return () => {
    ctx.revert();
  };
};