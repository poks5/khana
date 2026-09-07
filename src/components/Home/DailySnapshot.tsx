import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface NutrientRingProps {
  label: string;
  current: number;
  max: number;
  color: string;
}

const NutrientRing = ({ label, current, max, color }: NutrientRingProps) => {
  const percentage = Math.min((current / max) * 100, 100);
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28" fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground">{current}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

export const DailySnapshot = () => {
  const { language } = useLanguage();

  // Load today's data from localStorage
  const today = new Date().toISOString().split('T')[0];
  let totalK = 0, totalP = 0, totalNa = 0;
  
  try {
    const entries = JSON.parse(localStorage.getItem(`food-entries-${today}`) || '[]');
    entries.forEach((e: any) => {
      totalK += (e.food?.potassium || 0) * (e.quantity || 1);
      totalP += (e.food?.phosphorus || 0) * (e.quantity || 1);
      totalNa += (e.food?.sodium || 0) * (e.quantity || 1);
    });
  } catch {}

  return (
    <Card className="border shadow-sm bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'ne' ? '📊 आजको सारांश' : '📊 Today\'s Summary'}
          </h3>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString(language === 'ne' ? 'ne-NP' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex justify-around">
          <NutrientRing
            label={language === 'ne' ? 'पोटासियम' : 'Potassium'}
            current={Math.round(totalK)}
            max={2000}
            color="hsl(var(--medical-caution))"
          />
          <NutrientRing
            label={language === 'ne' ? 'फस्फोरस' : 'Phosphorus'}
            current={Math.round(totalP)}
            max={1000}
            color="hsl(var(--medical-info))"
          />
          <NutrientRing
            label={language === 'ne' ? 'सोडियम' : 'Sodium'}
            current={Math.round(totalNa)}
            max={2000}
            color="hsl(var(--medical-avoid))"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          {language === 'ne' ? 'mg मा दैनिक सेवन' : 'Daily intake in mg'}
        </p>
      </CardContent>
    </Card>
  );
};
