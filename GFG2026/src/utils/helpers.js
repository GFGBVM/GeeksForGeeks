/**
 * Format a number with leading zeros.
 *
 * @param {number|string} number - Value to format
 * @param {number} digits - Target width of formatted string
 * @returns {string} Formatted string with leading zeros
 * 
 * @example formatNumber(1) -> "01"
 * @example formatNumber(12) -> "12"
 */
export const formatNumber = (number, digits = 2) => {
  if (number === null || number === undefined || Number.isNaN(Number(number))) {
    return "0".repeat(digits);
  }
  return String(number).padStart(digits, "0");
};

/**
 * Safely truncate text to a maximum length with ellipsis.
 *
 * @param {string} text - Raw string input
 * @param {number} maxLength - Character length cap
 * @returns {string} Truncated text string
 */
export const truncateText = (text = "", maxLength = 120) => {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Safely open an external URL in a new browser tab with secure rel directives.
 *
 * @param {string} url - Destination URL
 */
export const openExternalLink = (url) => {
  if (!url || typeof window === "undefined") return;

  const newWindow = window.open(url, "_blank");
  // Ensure the new window cannot access window.opener for security
  if (newWindow) newWindow.opener = null;
};

/**
 * Check whether a variable contains a defined, non-empty value.
 *
 * @param {any} value - Property to evaluate
 * @returns {boolean} True if defined, non-null, and non-empty
 */
export const isValidValue = (value) => {
  return value !== null && value !== undefined && value !== "";
};

/**
 * Safely retrieve image URL or fallback asset.
 *
 * @param {string} image - Target image path
 * @param {string} fallback - Fallback image path
 * @returns {string} Safe image path string
 */
export const getImageUrl = (
  image,
  fallback = "/assets/images/fallback.jpg"
) => {
  return image && typeof image === "string" ? image : fallback;
};

/**
 * Prevent infinite error loops when an image fails to render in the DOM.
 *
 * @param {SyntheticEvent} event - React image synthetic event
 * @param {string} fallback - Fallback image path
 */
export const handleImageError = (
  event,
  fallback = "/assets/images/fallback.jpg"
) => {
  const image = event.currentTarget;

  if (!image || image.src.includes(fallback)) {
    return;
  }

  image.onerror = null; // Unbind handler to prevent infinite loop if fallback fails
  image.src = fallback;
};

/**
 * Conditionally join classNames together.
 *
 * @param  {...any} classes - Array or arguments of conditional classnames
 * @returns {string} Joined class string
 */
export const cn = (...classes) => {
  return classes
    .flat()
    .filter((cls) => Boolean(cls) && typeof cls === "string")
    .join(" ");
};

/**
 * Check whether user prefers reduced motion in browser settings.
 *
 * @returns {boolean} True if prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Safely get current viewport width.
 *
 * @returns {number} Viewport width in pixels
 */
export const getViewportWidth = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth;
};

/**
 * Debounce function to limit high-frequency operational calls.
 *
 * @param {Function} callback - Function to execute after delay
 * @param {number} delay - Time delay in milliseconds
 * @returns {Function} Wrapped debounced execution call
 */
export const debounce = (callback, delay = 200) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};