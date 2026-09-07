
import React from 'react';
import { useLanguage } from '@/contexts/OptimizedLanguageContext';

interface LanguageTextProps {
  children: React.ReactNode;
  className?: string;
}

export const LanguageText: React.FC<LanguageTextProps> = ({ children, className = '' }) => {
  const { language } = useLanguage();
  
  const languageClass = language === 'ne' ? 'font-devanagari' : 'font-sans';
  const combinedClass = `${languageClass} ${className}`.trim();
  
  return (
    <span className={combinedClass}>
      {children}
    </span>
  );
};

// Helper component for multilingual text display
interface MultilingualTextProps {
  en: string;
  ne: string;
  className?: string;
}

export const MultilingualText: React.FC<MultilingualTextProps> = ({ en, ne, className = '' }) => {
  const { language } = useLanguage();
  
  return (
    <LanguageText className={className}>
      {language === 'ne' ? ne : en}
    </LanguageText>
  );
};
