
import React, { memo } from 'react';
import { useLanguage } from '@/contexts/OptimizedLanguageContext';
import { cn } from '@/lib/utils';

interface OptimizedLanguageTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'heading' | 'body' | 'caption';
  align?: 'left' | 'center' | 'right';
}

// Memoize the component to prevent unnecessary re-renders
export const OptimizedLanguageText = memo<OptimizedLanguageTextProps>(({ 
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
});

OptimizedLanguageText.displayName = 'OptimizedLanguageText';

// Optimized multilingual text component
interface OptimizedMultilingualTextProps {
  en: string;
  ne: string;
  className?: string;
  variant?: 'default' | 'heading' | 'body' | 'caption';
  maxLength?: number;
}

export const OptimizedMultilingualText = memo<OptimizedMultilingualTextProps>(({ 
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
    <OptimizedLanguageText className={className} variant={variant}>
      {getText()}
    </OptimizedLanguageText>
  );
});

OptimizedMultilingualText.displayName = 'OptimizedMultilingualText';
