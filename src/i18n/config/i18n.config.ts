
import { I18nConfig } from '../types/i18n';

export const i18nConfig: I18nConfig = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  supportedLanguages: ['en', 'ne'],
  namespaces: [
    'common',
    'navigation', 
    'food',
    'nutrients',
    'mealPlanning',
    'settings',
    'auth',
    'onboarding',
    'validation',
    'dates',
    'recommendations'
  ],
  interpolation: {
    prefix: '{',
    suffix: '}'
  }
};

export const STORAGE_KEY = 'app-language';
export const FONT_CLASSES = {
  en: 'font-sans',
  ne: 'font-devanagari'
} as const;
