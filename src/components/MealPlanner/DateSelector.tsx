import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface DateSelectorProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const DateSelector = ({ currentDate, onDateChange }: DateSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5" />
      <span>{t('mealPlanning.daily_meal_plan')}</span>
      <Input
        type="date"
        value={currentDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-auto ml-auto"
        aria-label={t('mealPlanning.labels.select_date')}
      />
    </div>
  );
};
