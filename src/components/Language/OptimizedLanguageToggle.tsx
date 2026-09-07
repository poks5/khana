
import React, { useState, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { OptimizedLanguageText } from './OptimizedLanguageText';
import { measureLanguageSwitchPerformance } from '@/utils/fontOptimization';
import { cn } from '@/lib/utils';

const performanceMonitor = measureLanguageSwitchPerformance();

export const OptimizedLanguageToggle = memo(() => {
  const { language, setLanguage, isLoading } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = async (newLang: 'en' | 'ne') => {
    if (newLang === language || isLoading) return;
    
    // Start performance monitoring
    performanceMonitor.start();
    setIsTransitioning(true);
    
    // Optimistic UI update - change language immediately
    setLanguage(newLang);
    
    // End transition after a short delay to show visual feedback
    setTimeout(() => {
      setIsTransitioning(false);
      performanceMonitor.end(newLang);
    }, 150);
  };

  return (
    <div className="relative">
      <div className={cn(
        "flex items-center gap-1 transition-opacity duration-150",
        isTransitioning || isLoading ? "opacity-60" : "opacity-100"
      )}>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('en')}
          disabled={isLoading}
          className={cn(
            "flex items-center gap-1 transition-all duration-150",
            language === 'en' 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          {language === 'en' && <Check className="h-3 w-3" />}
          <span className="font-medium">EN</span>
        </Button>
        
        <Button
          variant={language === 'ne' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('ne')}
          disabled={isLoading}
          className={cn(
            "flex items-center gap-1 transition-all duration-150",
            language === 'ne' 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          {language === 'ne' && <Check className="h-3 w-3" />}
          <OptimizedLanguageText className="font-medium">
            नेपाली
          </OptimizedLanguageText>
        </Button>
      </div>
      
      <Globe className={cn(
        "absolute -top-1 -right-1 h-3 w-3 text-muted-foreground transition-all duration-150",
        isTransitioning || isLoading ? "animate-spin" : ""
      )} />
    </div>
  );
});

OptimizedLanguageToggle.displayName = 'OptimizedLanguageToggle';
