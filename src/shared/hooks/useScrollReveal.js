import { useEffect } from 'react';

/**
 * Custom hook to trigger scroll animations using IntersectionObserver.
 * Elements matching selector will have 'is-visible' class added when scrolled into view.
 */
export default function useScrollReveal(selector = '.reveal-on-scroll', deps = []) {
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: immediately reveal all elements if IntersectionObserver is not available
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve once revealed for performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    };

    // Initial observe
    observeElements();

    // Auto-detect dynamically rendered cards
    let mutationObserver = null;
    if (typeof window !== 'undefined' && 'MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        observeElements();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [selector, ...deps]);
}
