import { gsap } from './gsapConfig';

/**
 * Handles the preloader exit sequence.
 * @param {HTMLElement|string} loaderElement - Container of loader
 * @param {Function} onComplete - Callback after reveal finishes
 */
export className LoaderTransition {
  static revealSite(loaderContainer, onComplete) {
    if (!loaderContainer) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(loaderContainer, {
      yPercent: -100,
      duration: 1.0,
      ease: 'power4.inOut',
    });

    return tl;
  }
}

/**
 * Smooth transition for page route switches (e.g., Home -> Recruitment)
 */
export const animatePageOut = (container, onComplete) => {
  if (!container) return;

  return gsap.to(container, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.in',
    onComplete,
  });
};

export const animatePageIn = (container) => {
  if (!container) return;

  return gsap.fromTo(
    container,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  );
};