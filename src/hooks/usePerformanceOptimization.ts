
import { useEffect, useCallback, useMemo } from 'react';

export const usePerformanceOptimization = () => {
  // Debounce function to reduce excessive API calls
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Throttle function for scroll events
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return (...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Memory cleanup
  useEffect(() => {
    const cleanup = () => {
      // Clear any intervals or timeouts
      if (typeof window !== 'undefined') {
        // Force garbage collection if available
        if ('gc' in window && typeof window.gc === 'function') {
          window.gc();
        }
      }
    };

    return cleanup;
  }, []);

  return { debounce, throttle };
};
