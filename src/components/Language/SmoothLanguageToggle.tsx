
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/EnhancedLanguageContext";
import { EnhancedLanguageText } from './EnhancedLanguageText';
import { cn } from '@/lib/utils';

export const SmoothLanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = async (newLang: 'en' | 'ne') => {
    if (newLang === language) return;
    
    setIsTransitioning(true);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      setLanguage(newLang);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 100);
  };

  return (
    <div className="relative">
      <div className={cn(
        "flex items-center gap-1 transition-opacity duration-200",
        isTransitioning ? "opacity-50" : "opacity-100"
      )}>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('en')}
          className={cn(
            "flex items-center gap-1 transition-all duration-200",
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
          className={cn(
            "flex items-center gap-1 transition-all duration-200",
            language === 'ne' 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          {language === 'ne' && <Check className="h-3 w-3" />}
          <EnhancedLanguageText className="font-medium">
            नेपाली
          </EnhancedLanguageText>
        </Button>
      </div>
      
      <Globe className={cn(
        "absolute -top-1 -right-1 h-3 w-3 text-muted-foreground transition-all duration-200",
        isTransitioning ? "animate-spin" : ""
      )} />
    </div>
  );
};
