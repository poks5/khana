import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface FoodCategoriesHeroProps {
  onNavigate: (tab: string) => void;
}

const CATEGORIES = [
  { key: 'rice',       emoji: '🍚', ne: 'भात',     en: 'Rice',       tone: 'from-amber-300/60 to-orange-400/60' },
  { key: 'vegetables', emoji: '🥬', ne: 'तरकारी',   en: 'Vegetables', tone: 'from-emerald-300/60 to-teal-400/60' },
  { key: 'lentils',    emoji: '🍲', ne: 'दाल',     en: 'Lentils',    tone: 'from-yellow-300/60 to-amber-400/60' },
  { key: 'meat',       emoji: '🍗', ne: 'मासु',    en: 'Meat',       tone: 'from-rose-300/60 to-pink-400/60' },
  { key: 'fruits',     emoji: '🍎', ne: 'फलफूल',   en: 'Fruits',     tone: 'from-red-300/60 to-rose-400/60' },
  { key: 'dairy',      emoji: '🥛', ne: 'दूध',     en: 'Dairy',      tone: 'from-sky-300/60 to-indigo-400/60' },
  { key: 'pickles',    emoji: '🥒', ne: 'अचार',    en: 'Pickles',    tone: 'from-lime-300/60 to-green-400/60' },
  { key: 'drinks',     emoji: '🥤', ne: 'पेय',     en: 'Drinks',     tone: 'from-cyan-300/60 to-blue-400/60' },
];

export const FoodCategoriesHero = ({ onNavigate }: FoodCategoriesHeroProps) => {
  const { language } = useLanguage();

  return (
    <section>
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xl font-bold text-foreground">
          {language === 'ne' ? '🍽️ खानाको प्रकार' : '🍽️ Food Types'}
        </h2>
        <span className="text-xs text-muted-foreground">
          {language === 'ne' ? 'थिच्नुहोस्' : 'Tap to explore'}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => onNavigate(`category:${c.key}`)}
            className="glass-card p-3 flex flex-col items-center gap-1 active:scale-95 transition-transform touch-target group"
            aria-label={c.en}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.tone} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
              {c.emoji}
            </div>
            <span className="text-[11px] font-semibold text-foreground leading-tight text-center mt-1">
              {language === 'ne' ? c.ne : c.en}
            </span>
            {language === 'ne' && (
              <span className="text-[9px] text-muted-foreground leading-none">{c.en}</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
