
import { useCallback } from 'react';
import { useLanguage } from '@/contexts/OptimizedLanguageContext';
import { InterpolationValues } from '../types/i18n';
import { pluralize, formatNumber } from '../utils/interpolation';
import { formatDate, formatNutrient } from '../utils/formatters';

export const useTranslation = () => {
  const { t, language } = useLanguage();

  const tPlural = useCallback((
    keyBase: string,
    count: number,
    values?: InterpolationValues
  ) => {
    const translations = {
      zero: t(`${keyBase}.zero`, values),
      one: t(`${keyBase}.one`, values),
      other: t(`${keyBase}.other`, values)
    };
    
    return pluralize(count, translations);
  }, [t]);

  const tNumber = useCallback((
    number: number,
    options?: Intl.NumberFormatOptions
  ) => {
    return formatNumber(number, language, options);
  }, [language]);

  const tDate = useCallback((
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ) => {
    return formatDate(date, language, options);
  }, [language]);

  const tNutrient = useCallback((
    value: number,
    unit: string
  ) => {
    return formatNutrient(value, unit, language);
  }, [language]);

  return {
    t,
    tPlural,
    tNumber,
    tDate,
    tNutrient,
    language
  };
};
