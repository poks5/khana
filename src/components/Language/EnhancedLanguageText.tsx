
import React from 'react';
import { useLanguage } from '@/contexts/EnhancedLanguageContext';
import { cn } from '@/lib/utils';

interface EnhancedLanguageTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'heading' | 'body' | 'caption';
  align?: 'left' | 'center' | 'right';
}

export const EnhancedLanguageText: React.FC<EnhancedLanguageTextProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  align = 'left'
}) => {
  const { language } = useLanguage();
  
  const getVariantClasses = () => {
    const baseClasses = {
      default: '',
      heading: 'font-semibold leading-tight',
      body: 'leading-relaxed',
      caption: 'text-sm leading-normal'
    };
    return baseClasses[variant];
  };

  const getLanguageClasses = () => {
    if (language === 'ne') {
      return cn(
        'font-devanagari',
        'text-rendering-optimizeLegibility',
        // Better line height for Devanagari
        variant === 'heading' ? 'leading-[1.3]' : 'leading-[1.6]',
        // Slightly larger font size for better readability
        variant === 'caption' ? 'text-[15px]' : '',
        variant === 'body' ? 'text-[17px]' : '',
        variant === 'heading' ? 'text-[19px]' : ''
      );
    }
    return 'font-sans leading-normal';
  };

  const getAlignmentClass = () => {
    return {
      left: 'text-left',
      center: 'text-center', 
      right: 'text-right'
    }[align];
  };
  
  const combinedClasses = cn(
    getLanguageClasses(),
    getVariantClasses(),
    getAlignmentClass(),
    className
  );
  
  return (
    <span className={combinedClasses} lang={language}>
      {children}
    </span>
  );
};

// Responsive multilingual text component
interface ResponsiveMultilingualTextProps {
  en: string;
  ne: string;
  className?: string;
  variant?: 'default' | 'heading' | 'body' | 'caption';
  maxLength?: number;
}

export const ResponsiveMultilingualText: React.FC<ResponsiveMultilingualTextProps> = ({ 
  en, 
  ne, 
  className = '',
  variant = 'default',
  maxLength
}) => {
  const { language } = useLanguage();
  
  const getText = () => {
    const text = language === 'ne' ? ne : en;
    if (maxLength && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <EnhancedLanguageText className={className} variant={variant}>
      {getText()}
    </EnhancedLanguageText>
  );
};
