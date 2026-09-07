
export type Language = 'en' | 'ne';

export interface TranslationNamespace {
  common: any;
  navigation: any;
  food: any;
  nutrients: any;
  mealPlanning: any;
  settings: any;
  auth: any;
  onboarding: any;
  validation: any;
  dates: any;
  recommendations: any;
}

export interface I18nConfig {
  defaultLanguage: Language;
  fallbackLanguage: Language;
  supportedLanguages: Language[];
  namespaces: (keyof TranslationNamespace)[];
  interpolation: {
    prefix: string;
    suffix: string;
  };
}

export interface InterpolationValues {
  [key: string]: string | number;
}

export interface TranslationFunction {
  (key: string, values?: InterpolationValues, fallback?: string): string;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}
