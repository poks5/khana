
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FoodEntry, DIALYSIS_LIMITS } from "@/types";
import { NutrientTracker } from "./NutrientTracker";
import { DailyLog } from "./DailyLog";
import { QuickMealTemplates } from "./QuickMealTemplates";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainViewProps {
  foodEntries: FoodEntry[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onDeleteEntry: (id: string) => void;
  onAddFoodClick: () => void;
  onTemplateSelect: (template: any) => void;
  onTemplateQuickAdd?: (template: any) => void;
}

export const MainView = ({
  foodEntries,
  selectedDate,
  onDateChange,
  onDeleteEntry,
  onAddFoodClick,
  onTemplateSelect,
  onTemplateQuickAdd
}: MainViewProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6 w-full">
      <div className="px-1 md:px-0">
        <h2 className={`font-bold text-foreground ${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
          {t('food.tracker.title')}
        </h2>
        <p className={`text-muted-foreground mt-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
          {t('navigation.tracker')}
        </p>
      </div>

      <div className={`grid gap-3 md:gap-4 lg:gap-6 px-1 md:px-0 ${
        isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        <QuickMealTemplates 
          onSelect={onTemplateSelect}
          onQuickAdd={onTemplateQuickAdd}
        />
        
        <Card className="w-full">
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className={isMobile ? 'text-base' : 'text-lg'}>
              {t('food.tracker.new_food')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <Button 
              className={`w-full font-medium ${
                isMobile ? 'h-12 text-base' : 'h-14 md:h-16 text-lg'
              }`}
              onClick={onAddFoodClick}
            >
              <Plus className={`mr-2 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {t('food.tracker.choose_food')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className={`grid gap-3 md:gap-4 lg:gap-6 px-1 md:px-0 ${
        isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'
      }`}>
        <div className={`space-y-3 md:space-y-4 lg:space-y-6 ${
          isMobile ? '' : 'lg:col-span-2'
        }`}>
          <NutrientTracker entries={foodEntries} limits={DIALYSIS_LIMITS} />
          <DailyLog 
            entries={foodEntries} 
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            onDeleteEntry={onDeleteEntry}
          />
        </div>
      </div>
    </div>
  );
};
