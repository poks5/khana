
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LanguageContextType, InterpolationValues } from '@/i18n/types/i18n';
import { i18nConfig, STORAGE_KEY } from '@/i18n/config/i18n.config';
import { interpolateString } from '@/i18n/utils/interpolation';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const EnhancedLanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Language) || i18nConfig.defaultLanguage;
  });

  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTranslations = useCallback(async (lang: Language) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const translationPromises = i18nConfig.namespaces.map(async (namespace) => {
        try {
          const translationModule = await import(`../translations/${lang}/${namespace}.json`);
          return { namespace, data: translationModule.default || translationModule };
        } catch (err) {
          console.warn(`Failed to load translation namespace ${namespace} for ${lang}:`, err);
          
          // Try fallback language if current language fails
          if (lang !== i18nConfig.fallbackLanguage) {
            try {
              const fallbackModule = await import(`../translations/${i18nConfig.fallbackLanguage}/${namespace}.json`);
              return { namespace, data: fallbackModule.default || fallbackModule };
            } catch (fallbackErr) {
              console.error(`Fallback translation also failed for ${namespace}:`, fallbackErr);
              return { namespace, data: {} };
            }
          }
          
          return { namespace, data: {} };
        }
      });

      const loadedTranslations = await Promise.all(translationPromises);
      
      // Merge all translation namespaces into a single object
      const mergedTranslations = loadedTranslations.reduce((acc, { namespace, data }) => {
        acc[namespace] = data;
        return acc;
      }, {} as Record<string, any>);

      setTranslations(mergedTranslations);
      setIsReady(true);
    } catch (err) {
      console.error(`Failed to load translations for ${lang}:`, err);
      setError(`Failed to load translations for ${lang}`);
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language, loadTranslations]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

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
    if (value === undefined) {
      // Try fallback language if available
      if (language !== i18nConfig.fallbackLanguage && translations[keys[0]]) {
        // This is a simplified fallback - in production, you'd want to load fallback translations
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
      }
      
      // Return provided fallback, or key parts, or the full key
      return fallback || keys[keys.length - 1] || key;
    }
    
    return fallback || key;
  }, [translations, language]);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoading,
    isReady,
    error
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
