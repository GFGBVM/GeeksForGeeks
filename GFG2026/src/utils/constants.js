/**
 * Website Configuration
 * Core identity and meta constants.
 */
export const SITE_CONFIG = {
  name: "GeeksforGeeks Student Chapter BVM",
  shortName: "GFG BVM",
  year: 2026,
  location: "Birla Vishvakarma Mahavidyalaya, Anand, Gujarat",
  url: "https://geeksforgeeks-six.vercel.app/",
};

/**
 * Section IDs
 * Must remain synchronized with `id=""` attributes in DOM elements.
 * Used for ScrollSpy, GSAP Triggers, and Navbar highlighting.
 */
export const SECTION_IDS = {
  HOME: "Home",
  ABOUT: "About",
  EVENTS: "Events",
  TEAM: "Team",
  CONTACT: "Contact",
};

/**
 * Breakpoints
 * Used purely when JavaScript requires viewport-aware behavior 
 * (e.g., selectively disabling GSAP animations or auto-closing menus).
 * Tailwind handles CSS breakpoints natively.
 */
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
};

/**
 * Animation Configuration
 * Centralized GSAP timing, staggering, and easing tokens for consistency.
 */
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.4,
    normal: 0.7,
    slow: 1,
  },
  ease: {
    default: "power3.out",
    smooth: "power4.out",
    soft: "power2.out",
  },
  stagger: {
    small: 0.08,
    normal: 0.12,
    large: 0.18,
  },
};

/**
 * Z-Index Layers
 * Strict stacking context tokens to prevent layout overlap issues.
 */
export const Z_INDEX = {
  NAVBAR: 1000,
  DROPDOWN: 2000,
  MODAL: 5000,
  LIGHTBOX: 10000,
  LOADER: 99999,
};

/**
 * Global Feature Limits
 */
export const EVENT_CONFIG = {
  maxPreviewTags: 3,
  galleryThumbnailLimit: 6,
};

/**
 * Social Platform Identifiers
 */
export const SOCIAL_PLATFORMS = {
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  FACEBOOK: "facebook",
  X: "x",
  GITHUB: "github",
};