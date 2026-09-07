
import React from 'react';
import { useLanguage } from "@/contexts/EnhancedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from '@/lib/utils';

interface ResponsiveTextContainerProps {
  children: React.ReactNode;
  className?: string;
  breakOnLongText?: boolean;
  maxTextLength?: number;
}

export const ResponsiveTextContainer: React.FC<ResponsiveTextContainerProps> = ({
  children,
  className,
  breakOnLongText = true,
  maxTextLength = 50
}) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  const getResponsiveClasses = () => {
    const baseClasses = [];
    
    // Mobile-specific adjustments
    if (isMobile) {
      baseClasses.push('text-sm', 'leading-relaxed');
      
      if (language === 'ne') {
        baseClasses.push('text-[15px]', 'leading-[1.7]');
      }
    } else {
      if (language === 'ne') {
        baseClasses.push('text-base', 'leading-[1.6]');
      }
    }
    
    // Text wrapping for different languages
    if (breakOnLongText) {
      if (language === 'ne') {
        baseClasses.push('break-words', 'hyphens-none');
      } else {
        baseClasses.push('break-words', 'hyphens-auto');
      }
    }
    
    return baseClasses;
  };

  return (
    <div className={cn(
      ...getResponsiveClasses(),
      className
    )}>
      {children}
    </div>
  );
};

// Grid component that adjusts columns based on text length
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: number;
  adaptToLanguage?: boolean;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  minItemWidth = 200,
  adaptToLanguage = true
}) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  const getGridClasses = () => {
    if (isMobile) {
      return 'grid-cols-1';
    }
    
    // Adjust grid based on language - Nepali text tends to be longer
    if (adaptToLanguage && language === 'ne') {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
    
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className={cn(
      'grid gap-4',
      getGridClasses(),
      className
    )}>
      {children}
    </div>
  );
};
