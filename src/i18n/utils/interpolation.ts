
import { InterpolationValues } from '../types/i18n';
import { i18nConfig } from '../config/i18n.config';

/**
 * Advanced string interpolation with support for pluralization and formatting
 */
export const interpolateString = (
  template: string, 
  values?: InterpolationValues
): string => {
  if (!values || typeof template !== 'string') {
    return template;
  }

  const { prefix, suffix } = i18nConfig.interpolation;
  
  return template.replace(
    new RegExp(`\\${prefix}([^\\${suffix}]+)\\${suffix}`, 'g'),
    (match, key) => {
      const value = values[key.trim()];
      return value !== undefined ? String(value) : match;
    }
  );
};

/**
 * Handle pluralization rules
 */
export const pluralize = (
  count: number,
  translations: {
    zero?: string;
    one: string;
    other: string;
  }
): string => {
  if (count === 0 && translations.zero) {
    return translations.zero;
  }
  return count === 1 ? translations.one : translations.other;
};

/**
 * Format numbers with locale-specific formatting
 */
export const formatNumber = (
  number: number,
  language: string,
  options?: Intl.NumberFormatOptions
): string => {
  const locale = language === 'ne' ? 'ne-NP' : 'en-US';
  return new Intl.NumberFormat(locale, options).format(number);
};
