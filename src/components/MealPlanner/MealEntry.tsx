import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Trash2 } from "lucide-react";
import { MealPlanEntry } from "@/types/mealPlanning";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface MealEntryProps {
  entry: MealPlanEntry;
  onUpdate: (updates: Partial<MealPlanEntry>) => void;
  onDelete: () => void;
}

export const MealEntry = ({ entry, onUpdate, onDelete }: MealEntryProps) => {
  const [editingEntry, setEditingEntry] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="p-3 border rounded-lg space-y-2 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {editingEntry ? (
            <Input
              value={entry.foodName}
              onChange={(e) => onUpdate({ foodName: e.target.value })}
              onBlur={() => setEditingEntry(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingEntry(false)}
              className="text-sm font-medium"
              autoFocus
            />
          ) : (
            <h4 
              className="font-medium text-sm cursor-pointer hover:text-primary break-words"
              onClick={() => setEditingEntry(true)}
            >
              {entry.foodName}
            </h4>
          )}
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingEntry(true)}
            aria-label={t('mealPlanning.actions.edit_food')}
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
            aria-label={t('mealPlanning.actions.remove_food')}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder={t('mealPlanning.labels.quantity')}
          value={entry.quantity}
          onChange={(e) => onUpdate({ quantity: parseFloat(e.target.value) || 0 })}
          className="text-sm w-16"
          min="0.1"
          step="0.1"
        />
        <Input
          placeholder={t('mealPlanning.labels.unit')}
          value={entry.unit}
          onChange={(e) => onUpdate({ unit: e.target.value })}
          className="text-sm flex-1"
        />
      </div>
      
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex justify-between">
          <span>{t('mealPlanning.labels.calories')}:</span>
          <span className="font-medium">{Math.round(entry.nutrients.calories)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('mealPlanning.labels.protein')}:</span>
          <span className="font-medium">{Math.round(entry.nutrients.protein)}g</span>
        </div>
        <div className="flex justify-between">
          <span>{t('mealPlanning.labels.potassium')}:</span>
          <span className="font-medium">{Math.round(entry.nutrients.potassium)}mg</span>
        </div>
      </div>
    </div>
  );
};
