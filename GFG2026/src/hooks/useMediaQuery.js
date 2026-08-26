import { useState, useEffect } from 'react';

/**
 * Reactive media query listener hook.
 * 
 * @param {string} query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} Matches state of the media query
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    // Initial check
    setMatches(mediaQuery.matches);

    // Modern matchMedia listener with fallback for legacy browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};