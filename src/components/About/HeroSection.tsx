
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="text-center mb-8">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 mb-6`}>
        <img 
          src="/lovable-uploads/c7f6514d-fd6d-484b-85a0-3f2bf393fb7c.png" 
          alt="Khanasathi Logo" 
          className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} object-contain`}
        />
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-primary mb-2`}>
            Khana-Sathi (खाना साथी)
          </h1>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-muted-foreground`}>
            {language === 'ne' ? 
              'तपाईंको व्यापक पोषण साथी' : 
              'Your comprehensive nutrition companion'}
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-700 mb-6 leading-relaxed`}>
          {language === 'ne' ? 
            'Khana-Sathi एक विशेष एप हो जुन डायलिसिस बिरामीहरूका लागि नेपाली खानाको पोषण व्यवस्थापन गर्न बनाइएको छ। यसले परम्परागत नेपाली खानालाई चिकित्सा सुरक्षासँग जोड्छ।' :
            'Khana-Sathi is a specialized app designed for dialysis patients to manage Nepali food nutrition. It combines traditional Nepali cuisine with medical safety considerations.'}
        </p>
        
        <div className={`flex items-center justify-center gap-2 ${isMobile ? 'flex-col' : 'flex-row flex-wrap'}`}>
          <Badge className="bg-green-100 text-green-800 px-3 py-1 mb-2">
            <Utensils className="h-4 w-4 mr-1" />
            {language === 'ne' ? '१००० + नेपाली खानाहरू' : '1000+ Nepali Foods'}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1 mb-2">
            <Globe className="h-4 w-4 mr-1" />
            {language === 'ne' ? 'द्विभाषी समर्थन' : 'Bilingual Support'}
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-3 py-1 mb-2">
            <Shield className="h-4 w-4 mr-1" />
            {language === 'ne' ? 'चिकित्सा सुरक्षा' : 'Medical Safety'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
