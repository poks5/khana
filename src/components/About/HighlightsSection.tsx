
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Smartphone, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const HighlightsSection = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const highlights = [
    {
      icon: Globe,
      title: language === 'ne' ? 'द्विभाषी समर्थन' : 'Bilingual Support',
      description: language === 'ne' ? 'अंग्रेजी र नेपाली भाषामा उपलब्ध' : 'Available in English and Nepali'
    },
    {
      icon: Smartphone,
      title: language === 'ne' ? 'अफलाइन कार्यक्षमता' : 'Offline Functionality',
      description: language === 'ne' ? 'इन्टरनेट बिना पनि प्रयोग गर्न सकिन्छ' : 'Works without internet connection'
    },
    {
      icon: Shield,
      title: language === 'ne' ? 'चिकित्सा सुरक्षा' : 'Medical Safety',
      description: language === 'ne' ? 'डायलिसिस बिरामीहरूको लागि सुरक्षित खाना वर्गीकरण' : 'Safe food classification for dialysis patients'
    },
    {
      icon: Heart,
      title: language === 'ne' ? 'सांस्कृतिक संवेदनशीलता' : 'Cultural Sensitivity',
      description: language === 'ne' ? 'नेपाली खाना परम्परालाई सम्मान गर्दै' : 'Respecting Nepali food traditions'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-6`}>
        {language === 'ne' ? 'विशेष विशेषताहरू' : 'Special Highlights'}
      </h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        {highlights.map((highlight, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <highlight.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-2`}>
                    {highlight.title}
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-700`}>
                    {highlight.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
