
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/OptimizedLanguageContext';

interface LanguageLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LanguageLoader: React.FC<LanguageLoaderProps> = ({ 
  children, 
  fallback 
}) => {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">Loading translations...</span>
        </div>
      )
    );
  }

  return <>{children}</>;
};
