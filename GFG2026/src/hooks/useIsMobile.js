import { useMediaQuery } from './useMediaQuery';

/**
 * Convenience hook to determine if current device width is mobile (<768px).
 * 
 * @param {number} breakpoint - Pixel width threshold (default: 768)
 * @returns {boolean} True if viewport is smaller than breakpoint
 */
export const useIsMobile = (breakpoint = 768) => {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
};