import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initContactAnimation
 * 
 * GSAP ScrollTrigger timeline controller for the Contact Section.
 * Handles staggered reveals for headings, the primary CTA card,
 * address/email detail blocks, social badges, and ambient background glow.
 */
export const initContactAnimation = (section) => {
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    const heading = section.querySelector(".contact-heading");
    const content = section.querySelector(".contact-content");
    const cta = section.querySelector(".contact-cta");
    const details = section.querySelector(".contact-details");
    const detailItems = section.querySelectorAll(".contact-detail-item");
    const socials = section.querySelector(".contact-socials");
    const glow = section.querySelector(".contact-glow");

    /*
     * 1. Set Initial Component States
     */
    gsap.set(heading, {
      y: 50,
      opacity: 0,
    });

    gsap.set(content, {
      y: 35,
      opacity: 0,
    });

    gsap.set(cta, {
      scale: 0.97,
    });

    gsap.set(details, {
      x: 20,
    });

    gsap.set(detailItems, {
      x: 15,
      opacity: 0,
    });

    gsap.set(socials, {
      y: 20,
      opacity: 0,
    });

    gsap.set(glow, {
      scale: 0.75,
      opacity: 0,
    });

    /*
     * 2. Staggered Revealing Sequence
     */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
      })
      .to(
        content,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        cta,
        {
          scale: 1,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        details,
        {
          x: 0,
          duration: 0.7,
        },
        "-=0.6"
      )
      .to(
        detailItems,
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
        },
        "-=0.4"
      )
      .to(
        socials,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
        },
        "-=0.2"
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
     * 3. Ambient Looping Motion
     */
    if (glow) {
      gsap.to(glow, {
        x: 35,
        y: -20,
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