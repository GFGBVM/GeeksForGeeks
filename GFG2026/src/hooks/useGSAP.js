import { useLayoutEffect, useEffect } from 'react';
import { gsap } from '../animations/gsapConfig';

// Use useLayoutEffect on client side to avoid layout flashes, fallback to useEffect for SSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom hook to safely execute GSAP animations with automatic context cleanup.
 * 
 * @param {Function} callback - Animation logic returning optional cleanup
 * @param {React.RefObject|HTMLElement} scope - Root element scope for selector queries
 * @param {Array} dependencies - Dependency array to trigger re-run
 */
export const useGSAP = (callback, scope = null, dependencies = []) => {
  useIsomorphicLayoutEffect(() => {
    // If scope is a React ref, extract current DOM element
    const scopeElement = scope && 'current' in scope ? scope.current : scope;

    // Create scoped GSAP context. gsap.context passes the created context into the callback,
    // so accept it as an argument and forward it to the user callback to avoid TDZ issues.
    const ctx = gsap.context((gsapCtx) => {
      // Pass the gsap context to the user's callback so they can create animations scoped to it
      callback(gsapCtx);
    }, scopeElement || undefined);

    // Revert all animations and ScrollTriggers created within this context on unmount
    return () => ctx.revert();
  }, dependencies);
};