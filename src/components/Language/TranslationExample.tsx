
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { LanguageText } from './LanguageText';

export const TranslationExample: React.FC = () => {
  const { t, tPlural, tNumber, tDate, tNutrient } = useTranslation();

  const examples = {
    // Basic translation
    basic: t('common.save'),
    
    // Translation with interpolation
    interpolated: t('mealPlanning.add_food_to_meal', { meal: 'Breakfast' }),
    
    // Pluralization example
    itemsCount: tPlural('food.items', 5),
    
    // Number formatting
    calories: tNumber(1250.5),
    
    // Date formatting
    today: tDate(new Date()),
    
    // Nutrient formatting
    protein: tNutrient(45, 'g')
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <LanguageText>{t('settings.language_settings')}</LanguageText>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(examples).map(([key, value]) => (
            <div key={key} className="p-3 border rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {key}:
              </div>
              <div className="font-medium">
                <LanguageText>{value}</LanguageText>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <Button className="w-full">
            <LanguageText>{t('common.save')}</LanguageText>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
