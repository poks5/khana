import { useMemo } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { consolidatedFoodDatabase } from "@/data/consolidatedFoodDatabase";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";
import { Food } from "@/types";

interface FoodCategoryDetailProps {
  categoryKey: string;
  onBack: () => void;
}

const CATEGORY_META: Record<string, { emoji: string; ne: string; en: string; match: (f: Food) => boolean }> = {
  rice:       { emoji: '🍚', ne: 'भात',     en: 'Rice',       match: (f) => /rice|chiura|bhat|भात|चामल|चिउरा/i.test(f.name.en + f.name.ne) || f.category === 'main-foods-grains' },
  vegetables: { emoji: '🥬', ne: 'तरकारी',   en: 'Vegetables', match: (f) => f.category === 'vegetables' || f.category === 'vegetable' },
  lentils:    { emoji: '🍲', ne: 'दाल',     en: 'Lentils',    match: (f) => /dal|dhal|lentil|दाल/i.test(f.name.en + f.name.ne) || f.category === 'proteins-dal' },
  meat:       { emoji: '🍗', ne: 'मासु',    en: 'Meat',       match: (f) => /meat|chicken|fish|mutton|egg|मासु|कुखुरा|माछा/i.test(f.name.en + f.name.ne) || f.category === 'proteins' },
  fruits:     { emoji: '🍎', ne: 'फलफूल',   en: 'Fruits',     match: (f) => f.category === 'fruits' || /apple|banana|orange|फल/i.test(f.name.en + f.name.ne) },
  dairy:      { emoji: '🥛', ne: 'दूध',     en: 'Dairy',      match: (f) => /milk|yogurt|curd|cheese|paneer|दूध|दही/i.test(f.name.en + f.name.ne) || f.category === 'dairy' },
  pickles:    { emoji: '🥒', ne: 'अचार',    en: 'Pickles',    match: (f) => /achar|pickle|अचार/i.test(f.name.en + f.name.ne) },
  drinks:     { emoji: '🥤', ne: 'पेय',     en: 'Drinks',     match: (f) => f.category === 'beverages-drinks' || f.category === 'beverages' || /tea|coffee|juice|water|पेय|पानी/i.test(f.name.en + f.name.ne) },
};

export const FoodCategoryDetail = ({ categoryKey, onBack }: FoodCategoryDetailProps) => {
  const { language } = useLanguage();
  const meta = CATEGORY_META[categoryKey];

  const veggiesAsFood: Food[] = useMemo(() => nepaliVegetables.map((veg: any) => ({
    id: veg.id,
    name: veg.name,
    category: 'vegetables',
    dialysisSafe: veg.safetyProfile?.dialysisSafe ?? true,
    conditionalSafe: veg.safetyProfile?.preparationRequired,
    nutrients: {
      calories: veg.nutritionPer100g?.calories ?? 0,
      protein: 2,
      potassium: veg.nutritionPer100g?.potassium ?? 0,
      phosphorus: veg.nutritionPer100g?.phosphorus ?? 0,
      sodium: veg.nutritionPer100g?.sodium ?? 0,
      fluid: 90,
    },
    serving: { amount: 100, unit: 'g' },
  })), []);

  const foods = useMemo(() => {
    if (!meta) return [];
    const all = [...consolidatedFoodDatabase, ...SAMPLE_FOODS, ...veggiesAsFood];
    const seen = new Set<string>();
    return all.filter((f) => {
      if (seen.has(f.id)) return false;
      seen.add(f.id);
      return meta.match(f);
    });
  }, [meta, veggiesAsFood]);

  if (!meta) {
    return (
      <div className="aurora-bg min-h-screen -mx-3 -my-4 px-3 py-4 sm:-mx-4 sm:px-4">
        <button onClick={onBack} className="glass-pill px-4 py-2 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> {language === 'ne' ? 'फिर्ता' : 'Back'}
        </button>
        <p className="mt-6 text-center text-muted-foreground">
          {language === 'ne' ? 'कुनै कोटी फेला परेन' : 'Category not found'}
        </p>
      </div>
    );
  }

  const safetyBadge = (f: Food) => {
    if (f.dialysisSafe && !f.conditionalSafe) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-3 w-3" /> {language === 'ne' ? 'सुरक्षित' : 'Safe'}
        </span>
      );
    }
    if (f.conditionalSafe) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-3 w-3" /> {language === 'ne' ? 'सावधानी' : 'Caution'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300">
        <XCircle className="h-3 w-3" /> {language === 'ne' ? 'त्याग्नुहोस्' : 'Avoid'}
      </span>
    );
  };

  return (
    <div className="aurora-bg min-h-screen -mx-3 -my-4 px-3 py-4 sm:-mx-4 sm:px-4">
      <div className="space-y-4 max-w-2xl mx-auto pb-4">
        <button
          onClick={onBack}
          className="glass-pill px-4 py-2 inline-flex items-center gap-2 text-sm font-medium active:scale-95 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" /> {language === 'ne' ? 'फिर्ता' : 'Back'}
        </button>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-4xl shadow-inner">
            {meta.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {language === 'ne' ? meta.ne : meta.en}
            </h1>
            <p className="text-xs text-muted-foreground">
              {foods.length} {language === 'ne' ? 'खानेकुरा' : 'items'}
            </p>
          </div>
        </div>

        {foods.length === 0 ? (
          <div className="glass-card p-8 text-center text-muted-foreground">
            {language === 'ne' ? 'यस कोटीमा कुनै खाना उपलब्ध छैन' : 'No foods available in this category'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {foods.map((f) => (
              <div key={f.id} className="glass-card p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground leading-tight">
                      {language === 'ne' ? f.name.ne : f.name.en}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {language === 'ne' ? f.name.en : f.name.ne}
                    </p>
                  </div>
                  {safetyBadge(f)}
                </div>
                <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-border/40">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase">{language === 'ne' ? 'क्यालोरी' : 'Cal'}</p>
                    <p className="text-xs font-bold">{f.nutrients.calories}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase">K</p>
                    <p className="text-xs font-bold">{f.nutrients.potassium}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase">P</p>
                    <p className="text-xs font-bold">{f.nutrients.phosphorus}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase">Na</p>
                    <p className="text-xs font-bold">{f.nutrients.sodium}</p>
                  </div>
                </div>
                {f.preparationNotes && (
                  <p className="text-[11px] text-muted-foreground italic pt-1">
                    💡 {language === 'ne' ? f.preparationNotes.ne : f.preparationNotes.en}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
