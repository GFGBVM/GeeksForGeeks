import { gsap, ScrollTrigger } from './gsapConfig';

/**
 * Reveal elements when scrolled into view
 * @param {HTMLElement|string} targets - Elements to animate
 * @param {Object} options - Custom GSAP/ScrollTrigger overrides
 */
export const initScrollReveal = (targets, options = {}) => {
  const elements = typeof targets === 'string' 
    ? document.querySelectorAll(targets) 
    : targets;

  if (!elements || elements.length === 0) return;

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: options.y || 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none',
          ...options.scrollTrigger,
        },
      }
    );
  });
};

/**
 * Stagger reveal for lists and grids (e.g., Event Cards, Team Cards)
 */
export const initStaggerReveal = (container, items, options = {}) => {
  const parent = typeof container === 'string' ? document.querySelector(container) : container;
  if (!parent) return;

  const children = parent.querySelectorAll(items);
  if (!children.length) return;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: options.y || 50,
      scale: options.scale || 0.98,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: options.duration || 0.7,
      stagger: options.stagger || 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: options.start || 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animates numerical statistics from 0 to target value on scroll
 */
export const initStatCounter = (elements) => {
  const targets = typeof elements === 'string'
    ? document.querySelectorAll(elements)
    : elements;

  if (!targets) return;

  targets.forEach((target) => {
    const endValue = parseInt(target.getAttribute('data-target') || '0', 10);

    gsap.to(target, {
      innerText: endValue,
      duration: 1.8,
      ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: function () {
        target.innerText = Math.ceil(this.targets()[0].innerText);
      },
    });
  });
};