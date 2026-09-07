import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

export const SafetyDisclaimer = () => {
  const { language } = useLanguage();

  return (
    <Card className="mb-12 border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Shield className="h-6 w-6" />
          {language === 'ne' ? 'चिकित्सा अस्वीकरण' : 'Medical Disclaimer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-amber-800">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              {language === 'ne' ? 
                'यो एप शिक्षा र सूचनाको लागि मात्र हो। चिकित्सा सल्लाहको विकल्प होइन।' :
                'This app is for educational and informational purposes only. Not a substitute for medical advice.'}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              {language === 'ne' ? 
                'कुनै पनि आहार परिवर्तन गर्नु अघि सधैं आफ्नो डाक्टर वा पोषण विशेषज्ञसँग सल्लाह लिनुहोस्।' :
                'Always consult your doctor or nutritionist before making any dietary changes.'}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              {language === 'ne' ? 
                'व्यक्तिगत स्वास्थ्य अवस्था फरक हुन सक्छ। सामान्य सिफारिसहरू सबैमा लागू नहुन सक्छ।' :
                'Individual health conditions vary. General recommendations may not apply to everyone.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
