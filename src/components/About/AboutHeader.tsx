
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const AboutHeader = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className={`${isMobile ? 'px-4' : 'container mx-auto px-4'} py-4`}>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 ${isMobile ? 'h-10' : ''}`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className={isMobile ? 'text-sm' : ''}>
              {language === 'ne' ? 'मुख्य पृष्ठमा फर्कनुहोस्' : 'Back to Main'}
            </span>
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src="/lovable-uploads/c7f6514d-fd6d-484b-85a0-3f2bf393fb7c.png" 
              alt="Khanasathi Logo" 
              className="h-8 w-8 object-contain flex-shrink-0"
            />
            <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-primary truncate`}>
              {language === 'ne' ? 'हाम्रो एप बारेमा' : 'About Our App'}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
