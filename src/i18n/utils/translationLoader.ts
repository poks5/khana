
interface TranslationCache {
  [language: string]: {
    [namespace: string]: any;
  };
}

interface LoadingState {
  [key: string]: Promise<any>;
}

class TranslationLoader {
  private cache: TranslationCache = {};
  private loadingPromises: LoadingState = {};
  private preloadedLanguages = new Set<string>();

  // Preload translations to avoid blocking during language switch
  async preloadLanguage(language: string, namespaces: string[]): Promise<void> {
    if (this.preloadedLanguages.has(language)) return;

    const preloadPromises = namespaces.map(namespace => 
      this.loadNamespace(language, namespace)
    );

    await Promise.all(preloadPromises);
    this.preloadedLanguages.add(language);
  }

  // Load single namespace with caching
  async loadNamespace(language: string, namespace: string): Promise<any> {
    // Return cached version if available
    if (this.cache[language]?.['`namespace`']) {
      return this.cache[language][namespace];
    }

    // Return existing promise if already loading
    const cacheKey = `${language}-${namespace}`;
    if (this.loadingPromises[cacheKey]) {
      return this.loadingPromises[cacheKey];
    }

    // Create loading promise
    this.loadingPromises[cacheKey] = this.loadTranslationFile(language, namespace);
    
    try {
      const translations = await this.loadingPromises[cacheKey];
      
      // Cache the result
      if (!this.cache[language]) {
        this.cache[language] = {};
      }
      this.cache[language][namespace] = translations;
      
      return translations;
    } finally {
      // Clean up loading promise
      delete this.loadingPromises[cacheKey];
    }
  }

  private async loadTranslationFile(language: string, namespace: string): Promise<any> {
    try {
      const module = await import(`../../translations/${language}/${namespace}.json`);
      return module.default || module;
    } catch (error) {
      console.warn(`Failed to load translation: ${language}/${namespace}`, error);
      return {};
    }
  }

  // Batch load multiple namespaces efficiently
  async loadLanguageComplete(language: string, namespaces: string[]): Promise<Record<string, any>> {
    const loadPromises = namespaces.map(namespace => 
      this.loadNamespace(language, namespace).then(data => ({ namespace, data }))
    );

    const results = await Promise.all(loadPromises);
    
    return results.reduce((acc, { namespace, data }) => {
      acc[namespace] = data;
      return acc;
    }, {} as Record<string, any>);
  }

  // Get cached translations synchronously
  getCachedTranslations(language: string): Record<string, any> | null {
    return this.cache[language] || null;
  }

  // Clear cache for memory management
  clearCache(language?: string): void {
    if (language) {
      delete this.cache[language];
      this.preloadedLanguages.delete(language);
    } else {
      this.cache = {};
      this.preloadedLanguages.clear();
    }
  }
}

export const translationLoader = new TranslationLoader();
