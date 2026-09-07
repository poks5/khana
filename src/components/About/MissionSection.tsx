
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const MissionSection = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
          <Heart className="h-6 w-6 text-red-500" />
          {language === 'ne' ? 'हाम्रो मिशन' : 'Our Mission'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-700 leading-relaxed`}>
          {language === 'ne' ? 
            'हाम्रो लक्ष्य डायलिसिस बिरामीहरूलाई उनीहरूको सांस्कृतिक खाना परम्परालाई सुरक्षित रूपमा कायम राख्न मद्दत गर्नु हो। हामी नेपाली खानाको पोषण मूल्य र चिकित्सा सुरक्षाको बीचमा सन्तुलन कायम गर्छौं, जसले बिरामीहरूलाई स्वस्थ र खुशी जीवन बिताउन मद्दत गर्छ।' :
            'Our goal is to help dialysis patients safely maintain their cultural food traditions. We balance the nutritional value of Nepali cuisine with medical safety requirements, enabling patients to live healthier and happier lives while staying connected to their cultural roots.'}
        </p>
      </CardContent>
    </Card>
  );
};
