import { gsap } from './gsapConfig';

/**
 * Reveals text character by character (ideal for Hero titles & Loading screens)
 * @param {HTMLElement|string} target - Text element
 * @param {Object} options - Configuration options
 */
export const animateCharReveal = (target, options = {}) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  // Ensure content is prepared as inline spans if not using a library like SplitType
  const chars = el.querySelectorAll('.char');
  if (!chars.length) return;

  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: options.y || 20,
      filter: 'blur(4px)',
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: options.duration || 0.5,
      stagger: options.stagger || 0.03,
      ease: 'power2.out',
      delay: options.delay || 0,
    }
  );
};

/**
 * Reveals section titles line by line with a clip-path effect
 */
export const animateLineReveal = (elements, scrollTriggerStart = 'top 85%') => {
  const targets = typeof elements === 'string'
    ? document.querySelectorAll(elements)
    : elements;

  if (!targets) return;

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: scrollTriggerStart,
          toggleActions: 'play none none none',
        },
      }
    );
  });
};