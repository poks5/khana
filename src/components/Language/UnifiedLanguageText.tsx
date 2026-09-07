
import React, { memo } from 'react';
import { useUnifiedTranslation } from '@/hooks/useUnifiedTranslation';
import { cn } from '@/lib/utils';

interface UnifiedLanguageTextProps {
  translationKey?: string;
  fallback?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'heading' | 'body' | 'caption';
}

export const UnifiedLanguageText = memo<UnifiedLanguageTextProps>(({
  translationKey,
  fallback,
  children,
  className = '',
  variant = 'default'
}) => {
  const { tt, isNepali } = useUnifiedTranslation();

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
    if (isNepali) {
      return cn(
        'font-devanagari text-rendering-optimizeLegibility',
        variant === 'heading' ? 'leading-[1.3]' : 'leading-[1.6]'
      );
    }
    return 'font-sans leading-normal';
  };

  const combinedClasses = cn(
    getLanguageClasses(),
    getVariantClasses(),
    className
  );

  const content = translationKey ? tt(translationKey, fallback) : children;

  return (
    <span className={combinedClasses}>
      {content}
    </span>
  );
});

UnifiedLanguageText.displayName = 'UnifiedLanguageText';
