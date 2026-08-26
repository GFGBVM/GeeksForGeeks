import gsap from "gsap";

/**
 * createLoaderAnimation
 * 
 * Master GSAP timeline controlling the entrance loader reveal and exit sequence.
 * Fully synced with the Premium Greenish-White / Forest Mint design theme.
 * 
 * Sequence:
 * MINT WHITE SCREEN → Grid & Glow Fade In → <GFG> Badge Back-Scale → 
 * Title & Subtitle Reveal → Progress Bar Sweep (0-100%) → Curtain Exit
 */
export const createLoaderAnimation = ({ loader, onComplete }) => {
  if (!loader) return () => {};

  const logo = loader.querySelector(".loader-logo");
  const mark = loader.querySelector(".loader-mark");
  const title = loader.querySelector(".loader-title");
  const subtitle = loader.querySelector(".loader-subtitle");

  const glow = loader.querySelector(".loader-glow");
  const grid = loader.querySelector(".loader-grid");

  const labels = loader.querySelectorAll(
    ".loader-label, .loader-year, .loader-status"
  );

  const percentage = loader.querySelector(".loader-percentage");
  const progress = loader.querySelector(".loader-progress");

  const ctx = gsap.context(() => {
    /*
     * 1. Set Initial Element States
     */
    gsap.set(glow, {
      scale: 0.5,
      opacity: 0,
    });

    gsap.set(grid, {
      opacity: 0,
      scale: 1.05,
    });

    gsap.set(labels, {
      opacity: 0,
      y: 10,
    });

    gsap.set(mark, {
      scale: 0.6,
      opacity: 0,
      rotation: -8,
    });

    gsap.set(title, {
      yPercent: 110,
      opacity: 0,
    });

    gsap.set(subtitle, {
      yPercent: 110,
      opacity: 0,
    });

    gsap.set(progress, {
      width: "0%",
    });

    /*
     * 2. Master Orchestrated Animation Timeline
     */
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      // Ambient Mint Background & Grid Reveal
      .to(
        glow,
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      )
      .to(
        grid,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        0
      )

      // Technical Label Displays
      .to(
        labels,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
        },
        0.2
      )

      // GFG Emblem Pop-in
      .to(
        mark,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
        },
        0.35
      )

      // Emerald Ambient Drop Shadow Glow Pulse
      .to(
        mark,
        {
          filter: "drop-shadow(0 0 30px rgba(30,81,59,0.30))",
          duration: 0.6,
        },
        1.05
      )

      // Main Heading Reveal
      .to(
        title,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        1.1
      )

      // Subtitle Reveal
      .to(
        subtitle,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        },
        1.3
      )

      // Progress Line Bar Sweep & Sync Percentage Counter
      .to(
        progress,
        {
          width: "100%",
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (!percentage) return;

            // Use actual DOM widths to compute percentage reliably (gsap.getProperty may return px string)
            if (!progress || !progress.parentElement) return;
            const currentWidth = progress.getBoundingClientRect().width;
            const parentWidth = progress.parentElement.getBoundingClientRect().width || 1;
            const calculatedPercentage = Math.round((currentWidth / parentWidth) * 100);

            percentage.textContent = `${Math.min(calculatedPercentage, 100)}%`;
          },
        },
        1.2
      )

      // Brief Hold Step
      .to({}, { duration: 0.35 })

      // Exit Elements Sequence
      .to(logo, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      })
      .to(
        labels,
        {
          opacity: 0,
          y: -15,
          duration: 0.4,
        },
        "<"
      )
      .to(
        grid,
        {
          opacity: 0,
          duration: 0.4,
        },
        "<"
      )
      .to(
        glow,
        {
          scale: 1.4,
          opacity: 0,
          duration: 0.6,
        },
        "<"
      )

      // Final Curtain Lift Reveal (Sliding Up)
      .to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          onComplete?.();
        },
      });
  }, loader);

  return () => {
    ctx.revert();
  };
};