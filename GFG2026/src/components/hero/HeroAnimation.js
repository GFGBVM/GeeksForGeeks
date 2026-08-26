import gsap from "gsap";

/**
 * initHeroAnimation
 * 
 * Master GSAP animation controller for the Hero entrance sequence.
 * Fully synced with the Forest Mint palette and Montserrat typography reveals.
 * 
 * Sequence:
 * Grid & Glow Reveal → Eyebrow Tag → Masked Title Line Drop →
 * Body Text & CTA Scale-In → Floating Badges & Technical Indicators
 */
export const initHeroAnimation = (hero) => {
  if (!hero) return () => {};

  const ctx = gsap.context(() => {
    const eyebrow = hero.querySelector(".hero-eyebrow");
    const titleLines = hero.querySelectorAll(".hero-title-line");
    const titleWords = hero.querySelectorAll(".hero-title-word");
    const description = hero.querySelector(".hero-description");
    const actions = hero.querySelector(".hero-actions");
    const meta = hero.querySelector(".hero-meta");
    const scrollIndicator = hero.querySelector(".hero-scroll-indicator");
    const cornerLabel = hero.querySelector(".hero-corner-label");

    const grid = hero.querySelector(".hero-grid");
    const glow = hero.querySelector(".hero-glow");
    const glowSecondary = hero.querySelector(".hero-glow-secondary");
    const floatingElements = hero.querySelectorAll(".hero-float");
    const circles = hero.querySelectorAll(".hero-circle");
    const bracket = hero.querySelector(".hero-bracket");
    const scrollLine = hero.querySelector(".hero-scroll-line");

    /*
     * 1. Set Initial Element States
     */
    gsap.set(eyebrow, {
      y: 20,
      opacity: 0,
    });

    gsap.set(titleLines, {
      clipPath: "inset(0% 0% 100% 0%)",
    });

    gsap.set(titleWords, {
      yPercent: 110,
      opacity: 0,
    });

    gsap.set(description, {
      y: 25,
      opacity: 0,
    });

    gsap.set(actions, {
      y: 20,
      opacity: 0,
    });

    gsap.set(meta, {
      y: 15,
      opacity: 0,
    });

    gsap.set(scrollIndicator, {
      opacity: 0,
    });

    gsap.set(cornerLabel, {
      opacity: 0,
    });

    gsap.set(grid, {
      opacity: 0,
      scale: 1.03,
    });

    gsap.set(glow, {
      opacity: 0,
      scale: 0.7,
    });

    gsap.set(glowSecondary, {
      opacity: 0,
      scale: 0.7,
    });

    gsap.set(floatingElements, {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    gsap.set(circles, {
      opacity: 0,
      scale: 0,
    });

    gsap.set(bracket, {
      opacity: 0,
      x: 30,
    });

    gsap.set(scrollLine, {
      scaleY: 0,
      transformOrigin: "top",
    });

    /*
     * 2. Master Hero Entrance Timeline
     */
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      // Ambient Background & Grid Fade-In
      .to(
        grid,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      )
      .to(
        glow,
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        glowSecondary,
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0.15
      )

      // Technical Eyebrow Tag Reveal
      .to(
        eyebrow,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        0.2
      )

      // Masked Title Words Line Reveal
      .to(
        titleLines,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.35
      )
      .to(
        titleWords,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.4
      )

      // Subtitle & Action Buttons Reveal
      .to(
        description,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
        },
        0.8
      )
      .to(
        actions,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
        },
        0.9
      )

      // Metadata Bar Reveal
      .to(
        meta,
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
        },
        1.1
      )

      // Floating Badges & Decorative Dots
      .to(
        floatingElements,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        0.75
      )
      .to(
        circles,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        0.95
      )
      .to(
        bracket,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
        0.95
      )

      // Corner & Scroll Indicator Reveal
      .to(
        scrollIndicator,
        {
          opacity: 1,
          duration: 0.5,
        },
        1.35
      )
      .to(
        cornerLabel,
        {
          opacity: 1,
          duration: 0.5,
        },
        1.25
      );

    /*
     * 3. Ambient Infinite Looping Animations
     */

    // Subtle Levitation Effect for Floating Badges
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: index % 2 === 0 ? -10 : 10,
        duration: 2.8 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });
    });

    // Ambient Radial Glow Pulse
    gsap.to(glow, {
      scale: 1.06,
      opacity: 0.8,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Continuous Scroll Indicator Downward Sweep
    gsap.to(scrollLine, {
      scaleY: 1,
      duration: 1.1,
      repeat: -1,
      repeatDelay: 0.9,
      ease: "power2.inOut",
      delay: 1.8,
    });
  }, hero);

  return () => {
    ctx.revert();
  };
};