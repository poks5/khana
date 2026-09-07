
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FoodEntry } from "@/types";
import { Calendar, Trash2, Clock } from "lucide-react";

interface DailyLogProps {
  entries: FoodEntry[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onDeleteEntry: (id: string) => void;
}

export const DailyLog = ({ entries, selectedDate, onDateChange, onDeleteEntry }: DailyLogProps) => {
  const groupedEntries = entries.reduce((groups, entry) => {
    const meal = entry.meal || 'other';
    if (!groups[meal]) groups[meal] = [];
    groups[meal].push(entry);
    return groups;
  }, {} as Record<string, FoodEntry[]>);

  const mealTitles = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snacks',
    other: 'Other'
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Food Log
          </CardTitle>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-auto"
          />
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No food entries for this date</p>
            <p className="text-sm">Start tracking your meals above</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(mealTitles).map(([mealKey, mealTitle]) => {
              const mealEntries = groupedEntries[mealKey] || [];
              if (mealEntries.length === 0) return null;

              return (
                <div key={mealKey}>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    {mealTitle}
                    <Badge variant="secondary">{mealEntries.length}</Badge>
                  </h3>
                  <div className="space-y-2">
                    {mealEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{entry.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.quantity} {entry.unit} • 
                            {Math.round(entry.nutrients.calories)} cal • 
                            {Math.round(entry.nutrients.protein)}g protein
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteEntry(entry.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
