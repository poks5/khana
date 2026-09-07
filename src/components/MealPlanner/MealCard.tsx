import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MealPlanEntry } from "@/types/mealPlanning";
import { MealEntry } from "./MealEntry";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface MealCardProps {
  mealType: {
    key: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    label: string;
    emoji: string;
  };
  entries: MealPlanEntry[];
  onAddFood: () => void;
  onUpdateEntry: (entryId: string, updates: Partial<MealPlanEntry>) => void;
  onDeleteEntry: (entryId: string) => void;
}

export const MealCard = ({ 
  mealType, 
  entries, 
  onAddFood, 
  onUpdateEntry, 
  onDeleteEntry 
}: MealCardProps) => {
  const { t } = useLanguage();
  const totalCalories = entries.reduce((sum, entry) => sum + entry.nutrients.calories, 0);

  return (
    <Card className="min-h-[300px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>{mealType.emoji}</span>
            <span className="break-words">{mealType.label}</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddFood}
            aria-label={t('mealPlanning.actions.add_food')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">{t('mealPlanning.labels.no_items_planned')}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddFood}
              className="mt-2"
            >
              {t('mealPlanning.actions.add_food')}
            </Button>
          </div>
        ) : (
          entries.map((entry) => (
            <MealEntry
              key={entry.id}
              entry={entry}
              onUpdate={(updates) => onUpdateEntry(entry.id, updates)}
              onDelete={() => onDeleteEntry(entry.id)}
            />
          ))
        )}
        
        {entries.length > 0 && (
          <div className="pt-2 border-t">
            <div className="text-xs font-medium text-muted-foreground">
              {t('mealPlanning.labels.total')}: {Math.round(totalCalories)} {t('mealPlanning.labels.calories').toLowerCase()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
