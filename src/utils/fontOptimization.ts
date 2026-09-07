
// Font preloading utility for better performance
export const preloadNepaliFont = () => {
  // Only preload on client side
  if (typeof window === 'undefined') return;

  // Check if font is already preloaded
  if (document.querySelector('link[href*="Noto+Sans+Devanagari"]')) {
    return;
  }

  // Create preload link for Nepali font
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
  link.type = 'text/css';
  link.crossOrigin = 'anonymous';
  
  document.head.appendChild(link);

  // Also add the actual stylesheet if not present
  if (!document.querySelector('link[href*="Noto+Sans+Devanagari"]')) {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
    document.head.appendChild(styleLink);
  }
};

// Performance monitoring utility
export const measureLanguageSwitchPerformance = () => {
  let switchStartTime: number;
  
  return {
    start: () => {
      switchStartTime = performance.now();
    },
    end: (language: string) => {
      const duration = performance.now() - switchStartTime;
      console.log(`Language switch to ${language} took ${duration.toFixed(2)}ms`);
      
      // Report if switching is too slow
      if (duration > 300) {
        console.warn(`Slow language switch detected: ${duration.toFixed(2)}ms`);
      }
    }
  };
};
