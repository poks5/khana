
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const CallToAction = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-r from-primary/10 to-blue-100 border-primary/20">
        <CardContent className={`${isMobile ? 'pt-6 pb-6' : 'pt-8 pb-8'}`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4`}>
            {language === 'ne' ? 'तपाईंको स्वास्थ्य यात्रा सुरु गर्नुहोस्' : 'Start Your Health Journey'}
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-700 mb-6`}>
            {language === 'ne' ? 
              'Khana-Sathi सँग आफ्नो पोषण व्यवस्थापन सुरु गर्नुहोस्' :
              'Begin your nutrition management journey with Khana-Sathi'}
          </p>
          <Button
            onClick={() => navigate('/')}
            size={isMobile ? "default" : "lg"}
            className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full' : ''}`}
          >
            <Star className="h-5 w-5 mr-2" />
            {language === 'ne' ? 'एप प्रयोग गर्न सुरु गर्नुहोस्' : 'Start Using the App'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
