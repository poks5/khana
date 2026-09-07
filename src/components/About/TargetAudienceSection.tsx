import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

export const TargetAudienceSection = () => {
  const { language } = useLanguage();

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="h-6 w-6 text-blue-500" />
          {language === 'ne' ? 'को को प्रयोग गर्न सक्छ?' : 'Who Can Use This App?'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'ne' ? 'डायलिसिस बिरामीहरू' : 'Dialysis Patients'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'ne' ? 'आफ्नो आहार व्यवस्थापन गर्न' : 'Managing their dietary needs'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'ne' ? 'परिवारका सदस्यहरू' : 'Family Members'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'ne' ? 'बिरामीको हेरचाह गर्न' : 'Supporting patient care'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'ne' ? 'स्वास्थ्यकर्मीहरू' : 'Healthcare Professionals'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'ne' ? 'बिरामीको मार्गदर्शन गर्न' : 'Guiding patient nutrition'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
