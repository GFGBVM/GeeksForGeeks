import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global GSAP defaults matching the editorial/technical feel
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

// Configure ScrollTrigger defaults
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };