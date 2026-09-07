
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { LanguageText, MultilingualText } from "@/components/Language/LanguageText";

export const BilingualTestComponent: React.FC = () => {
  const { t, language } = useLanguage();

  const testData = {
    en: "This is a test with English text that might be quite long and should wrap properly",
    ne: "यो नेपाली पाठसँग परीक्षण हो जुन धेरै लामो हुन सक्छ र राम्रोसँग र्याप हुनुपर्छ"
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <LanguageText>
              {t('common.language')} Testing - {language.toUpperCase()}
            </LanguageText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Font Rendering Test */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t('settings.language_settings')}</h3>
            <MultilingualText
              en="Font rendering test for English"
              ne="अंग्रेजी र नेपालीका लागि फन्ट रेन्डरिङ परीक्षण"
              className="text-sm"
            />
          </div>

          {/* Layout Test */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <LanguageText className="text-sm">
                  {testData[language]}
                </LanguageText>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <Badge variant="outline">
                  <LanguageText>{t('mealPlanning.meal_types.breakfast')}</LanguageText>
                </Badge>
                <Badge variant="outline">
                  <LanguageText>{t('mealPlanning.meal_types.lunch')}</LanguageText>
                </Badge>
                <Badge variant="outline">
                  <LanguageText>{t('mealPlanning.meal_types.dinner')}</LanguageText>
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Button Test */}
          <div className="flex flex-wrap gap-2">
            <Button>
              <LanguageText>{t('common.save')}</LanguageText>
            </Button>
            <Button variant="outline">
              <LanguageText>{t('common.cancel')}</LanguageText>
            </Button>
            <Button variant="secondary">
              <LanguageText>{t('mealPlanning.actions.add_food')}</LanguageText>
            </Button>
          </div>

          {/* Nutrition Labels Test */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">1200</div>
              <LanguageText className="text-sm">{t('nutrients.calories')}</LanguageText>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">45g</div>
              <LanguageText className="text-sm">{t('nutrients.protein')}</LanguageText>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">2000mg</div>
              <LanguageText className="text-sm">{t('nutrients.potassium')}</LanguageText>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
