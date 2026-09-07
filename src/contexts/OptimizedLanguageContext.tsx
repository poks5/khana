
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { Language, LanguageContextType, InterpolationValues } from '@/i18n/types/i18n';
import { i18nConfig, STORAGE_KEY } from '@/i18n/config/i18n.config';
import { interpolateString } from '@/i18n/utils/interpolation';
import { translationLoader } from '@/i18n/utils/translationLoader';

const OptimizedLanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(OptimizedLanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within an OptimizedLanguageProvider');
  }
  return context;
};

interface OptimizedLanguageProviderProps {
  children: ReactNode;
}

export const OptimizedLanguageProvider: React.FC<OptimizedLanguageProviderProps> = ({ children }) => {
  console.log('OptimizedLanguageProvider rendering...');
  
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved as Language) || i18nConfig.defaultLanguage;
    } catch {
      return i18nConfig.defaultLanguage;
    }
  });

  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized translation function to prevent unnecessary re-renders
  const t = useCallback((
    key: string, 
    values?: InterpolationValues, 
    fallback?: string
  ): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    // Navigate through the nested translation object
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // If we found a translation
    if (typeof value === 'string') {
      return interpolateString(value, values);
    }
    
    // Fallback strategy
    return fallback || keys[keys.length - 1] || key;
  }, [translations]);

  // Optimized language loading with preloading
  const loadTranslations = useCallback(async (lang: Language) => {
    console.log('Loading translations for:', lang);
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get cached translations first
      const cachedTranslations = translationLoader.getCachedTranslations(lang);
      
      if (cachedTranslations) {
        console.log('Using cached translations for:', lang);
        setTranslations(cachedTranslations);
        setIsReady(true);
        setIsLoading(false);
        return;
      }

      // Load all namespaces efficiently
      const mergedTranslations = await translationLoader.loadLanguageComplete(
        lang, 
        i18nConfig.namespaces
      );

      console.log('Loaded translations for:', lang);
      setTranslations(mergedTranslations);
      setIsReady(true);
      
      // Preload the other language for faster switching
      const otherLanguage = lang === 'en' ? 'ne' : 'en';
      translationLoader.preloadLanguage(otherLanguage, i18nConfig.namespaces);
      
    } catch (err) {
      console.error(`Failed to load translations for ${lang}:`, err);
      setError(`Failed to load translations for ${lang}`);
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimized language setter with immediate UI feedback
  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    
    console.log('Setting language to:', lang);
    setLanguageState(lang);
    
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      console.warn('Failed to save language to localStorage:', err);
    }
    
    // Check if translations are already available
    const cachedTranslations = translationLoader.getCachedTranslations(lang);
    if (cachedTranslations) {
      setTranslations(cachedTranslations);
      setIsReady(true);
    } else {
      loadTranslations(lang);
    }
  }, [language, loadTranslations]);

  // Load initial translations
  useEffect(() => {
    console.log('OptimizedLanguageProvider useEffect running...');
    loadTranslations(language);
  }, []); // Only run once on mount

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<LanguageContextType>(() => ({
    language,
    setLanguage,
    t,
    isLoading,
    isReady,
    error
  }), [language, setLanguage, t, isLoading, isReady, error]);

  console.log('OptimizedLanguageProvider rendering with:', { language, isLoading, isReady });

  return (
    <OptimizedLanguageContext.Provider value={contextValue}>
      {children}
    </OptimizedLanguageContext.Provider>
  );
};
