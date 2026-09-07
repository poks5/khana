
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeatures } from './data/featuresData';

export const FeaturesGrid = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const features = getFeatures(language);

  return (
    <div className="mb-8">
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-6`}>
        {language === 'ne' ? 'मुख्य सुविधाहरू' : 'Key Features'}
      </h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-3 ${isMobile ? 'text-base' : 'text-lg'}`}>
                <feature.icon className={`h-6 w-6 ${feature.color} flex-shrink-0`} />
                <span>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-700`}>
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
