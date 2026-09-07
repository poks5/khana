
// Memory optimization utilities
export class MemoryOptimizer {
  private static cacheSize = 100;
  private static cache = new Map();

  // LRU Cache implementation
  static getFromCache<T>(key: string): T | null {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  static setCache<T>(key: string, value: T): void {
    if (this.cache.size >= this.cacheSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  static clearCache(): void {
    this.cache.clear();
  }

  // Clean up localStorage periodically
  static cleanupLocalStorage(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;

      keys.forEach(key => {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (parsed.timestamp && (now - parsed.timestamp) > oneWeek) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          // Skip invalid JSON items
        }
      });
    } catch (error) {
      console.warn('LocalStorage cleanup failed:', error);
    }
  }

  // Memory monitoring
  static getMemoryInfo() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return null;
  }
}

// Virtual scrolling for large lists
export const useVirtualScrolling = (items: any[], itemHeight: number, containerHeight: number) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = 0; // This would be calculated based on scroll position
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  
  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    totalHeight: items.length * itemHeight
  };
};
