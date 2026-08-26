import { gsap } from './gsapConfig';

/**
 * Applies a magnetic force effect to interactive elements (e.g., CTA Buttons)
 * @param {HTMLElement} element - Button or element wrapper
 * @param {number} strength - Magnetic pull strength (default 0.3)
 */
export const initMagneticEffect = (element, strength = 0.3) => {
  if (!element) return;

  const handleMouseMove = (e) => {
    const bounding = element.getBoundingClientRect();
    const x = (e.clientX - bounding.left - bounding.width / 2) * strength;
    const y = (e.clientY - bounding.top - bounding.height / 2) * strength;

    gsap.to(element, {
      x: x,
      y: y,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Custom Cursor Tracker
 */
export const initCustomCursor = (cursorDot, cursorRing) => {
  if (!cursorDot || !cursorRing) return;

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;

    gsap.to(cursorDot, {
      x: clientX,
      y: clientY,
      duration: 0.1,
      ease: 'power2.out',
    });

    gsap.to(cursorRing, {
      x: clientX,
      y: clientY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', onMouseMove);

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
  };
};