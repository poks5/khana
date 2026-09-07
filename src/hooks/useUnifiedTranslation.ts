
import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/contexts/OptimizedLanguageContext';
import { InterpolationValues } from '@/i18n/types/i18n';

export interface UnifiedTranslationOptions {
  fallback?: string;
  logMissing?: boolean;
}

export const useUnifiedTranslation = () => {
  const { t, language, isReady } = useLanguage();

  // Unified translation function with consistent fallback behavior
  const translate = useCallback((
    key: string,
    values?: InterpolationValues,
    options?: UnifiedTranslationOptions
  ): string => {
    if (!isReady) {
      return options?.fallback || key;
    }

    try {
      const result = t(key, values);
      
      // Check if translation was found (not just the key returned)
      if (result === key && !key.includes('.')) {
        // If it's a simple key and no translation found, use fallback
        const fallback = options?.fallback || key;
        if (options?.logMissing && process.env.NODE_ENV === 'development') {
          console.warn(`Missing translation for key: ${key} in language: ${language}`);
        }
        return fallback;
      }
      
      return result;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return options?.fallback || key;
    }
  }, [t, language, isReady]);

  // Shorthand for common patterns
  const tt = useCallback((key: string, fallback?: string, values?: InterpolationValues) => {
    return translate(key, values, { fallback, logMissing: true });
  }, [translate]);

  // Memoize commonly used values
  const isNepali = useMemo(() => language === 'ne', [language]);
  const isEnglish = useMemo(() => language === 'en', [language]);

  return {
    t: translate,
    tt, // shorthand with automatic fallback and logging
    language,
    isNepali,
    isEnglish,
    isReady
  };
};
