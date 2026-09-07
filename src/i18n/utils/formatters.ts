
import { Language } from '../types/i18n';

/**
 * Date formatting utilities
 */
export const formatDate = (
  date: Date | string,
  language: Language,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = language === 'ne' ? 'ne-NP' : 'en-US';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options })
    .format(dateObj);
};

/**
 * Nutrient value formatting with units
 */
export const formatNutrient = (
  value: number,
  unit: string,
  language: Language
): string => {
  const formattedValue = new Intl.NumberFormat(
    language === 'ne' ? 'ne-NP' : 'en-US',
    { maximumFractionDigits: 1 }
  ).format(value);
  
  return `${formattedValue}${unit}`;
};

/**
 * Currency formatting (if needed for premium features)
 */
export const formatCurrency = (
  amount: number,
  language: Language,
  currency: string = 'USD'
): string => {
  const locale = language === 'ne' ? 'ne-NP' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
};
