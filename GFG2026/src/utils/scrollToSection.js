import { prefersReducedMotion } from "./helpers";

/**
 * Smoothly scroll to a section by its element ID.
 * Automatically computes top offset if a fixed header exists.
 *
 * @param {string} sectionId - Target element ID (e.g., "Events", "About")
 * @param {Object} options - Navigation configuration settings
 * @param {number} [options.offset] - Custom pixel offset (default auto-calculates header height)
 * @param {ScrollBehavior} [options.behavior] - Smooth or instant scroll behavior
 */
export const scrollToSection = (sectionId, options = {}) => {
  if (!sectionId || typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  // Auto-calculate sticky header height if custom offset is not provided
  const headerElement = document.querySelector("header") || document.querySelector("nav");
  const defaultOffset = headerElement ? headerElement.offsetHeight : 80;

  const {
    offset = defaultOffset,
    behavior = prefersReducedMotion() ? "auto" : "smooth",
  } = options;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementPosition - offset;

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior,
  });
};

/**
 * Scroll to top of page.
 *
 * @param {ScrollBehavior} [behavior] - Smooth or instant scroll behavior
 */
export const scrollToTop = (behavior) => {
  if (typeof window === "undefined") return;

  const scrollBehavior = behavior || (prefersReducedMotion() ? "auto" : "smooth");

  window.scrollTo({
    top: 0,
    behavior: scrollBehavior,
  });
};

/**
 * Create a reusable click handler for links and navigation buttons.
 *
 * @param {string} sectionId - Target section ID
 * @param {Object} [options] - Navigation configuration settings
 * @param {Function} [onNavigate] - Callback invoked after scroll trigger (e.g., close mobile menu)
 * @returns {Function} Event listener callback
 */
export const createSectionHandler = (sectionId, options = {}, onNavigate) => {
  return (event) => {
    if (event) {
      event.preventDefault();
    }

    scrollToSection(sectionId, options);

    if (typeof onNavigate === "function") {
      onNavigate(sectionId);
    }
  };
};

export default scrollToSection;