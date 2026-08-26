import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initTeamAnimation
 * 
 * GSAP ScrollTrigger animation sequence for the Team Section.
 * Handles staggered team card entrance, pull-quote sliding, ambient glow floating,
 * and responsive reveal thresholds.
 */
export const initTeamAnimation = (section) => {
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    const heading = section.querySelector(".team-heading");
    const quote = section.querySelector(".team-quote");
    const cards = section.querySelectorAll(".team-card");
    const bottom = section.querySelector(".team-bottom");
    const glow = section.querySelector(".team-bg-glow");

    /*
     * 1. Set Initial Component States
     */
    gsap.set(heading, {
      y: 50,
      opacity: 0,
    });

    gsap.set(quote, {
      x: -30,
      opacity: 0,
    });

    gsap.set(cards, {
      y: 60,
      opacity: 0,
      scale: 0.95,
    });

    gsap.set(bottom, {
      y: 30,
      opacity: 0,
    });

    gsap.set(glow, {
      opacity: 0,
      scale: 0.8,
    });

    /*
     * 2. Header & Quote Entrance Sequence
     */
    gsap.to(heading, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });

    if (quote) {
      gsap.to(quote, {
        x: 0,
        opacity: 1,
        duration: 0.85,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 85%",
          once: true,
        },
      });
    }

    /*
     * 3. Team Cards Staggered Reveal
     */
    if (cards.length > 0) {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          once: true,
        },
      });
    }

    /*
     * 4. Section Footer & Ambient Glow
     */
    if (bottom) {
      gsap.to(bottom, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottom,
          start: "top 90%",
          once: true,
        },
      });
    }

    if (glow) {
      // Glow Entrance Fade
      gsap.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Ambient Gentle Floating Motion
      gsap.to(glow, {
        x: 35,
        y: 25,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, section);

  return () => {
    ctx.revert();
  };
};