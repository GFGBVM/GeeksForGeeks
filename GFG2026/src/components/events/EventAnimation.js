import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initEventsAnimation
 * 
 * GSAP ScrollTrigger timeline controller for the Events Section.
 * Coordinates staggered reveals for headers, event cards, and ambient background glow.
 */
export const initEventsAnimation = (section) => {
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    const heading = section.querySelector(".events-heading");
    const cards = section.querySelectorAll(".event-card");
    const glow = section.querySelector(".events-glow");

    /*
     * 1. Set Initial Component States
     */
    gsap.set(heading, {
      y: 50,
      opacity: 0,
    });

    if (cards.length > 0) {
      gsap.set(cards, {
        y: 60,
        opacity: 0,
        scale: 0.97,
      });
    }

    if (glow) {
      gsap.set(glow, {
        scale: 0.75,
        opacity: 0,
      });
    }

    /*
     * 2. Heading Animation
     */
    if (heading) {
      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }

    /*
     * 3. Event Cards Staggered Animation
     */
    if (cards.length > 0) {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          once: true,
        },
      });
    }

    /*
     * 4. Ambient Background Glow Animations
     */
    if (glow) {
      gsap.to(glow, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(glow, {
        x: -35,
        y: 25,
        duration: 6.5,
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