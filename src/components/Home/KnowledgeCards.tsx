import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { Droplets, Apple, Salad, HeartPulse } from "lucide-react";

interface KnowledgeCardsProps {
  onNavigate: (tab: string) => void;
}

export const KnowledgeCards = ({ onNavigate }: KnowledgeCardsProps) => {
  const { language } = useLanguage();

  const tips = [
    {
      icon: Droplets,
      ne: 'पानी कति पिउने?',
      en: 'How much water?',
      descNe: 'दैनिक तरल पदार्थ सीमा',
      descEn: 'Daily fluid limits',
      tone: 'from-sky-400/70 to-blue-500/70',
    },
    {
      icon: Apple,
      ne: 'सुरक्षित फलफूल',
      en: 'Safe fruits',
      descNe: 'कुन फल खान हुन्छ',
      descEn: 'Which fruits are OK',
      tone: 'from-rose-400/70 to-pink-500/70',
    },
    {
      icon: Salad,
      ne: 'तरकारी पकाउने तरिका',
      en: 'Cooking veggies',
      descNe: 'पोटासियम घटाउने',
      descEn: 'Reduce potassium',
      tone: 'from-emerald-400/70 to-teal-500/70',
    },
    {
      icon: HeartPulse,
      ne: 'नुन कम गर्नुहोस्',
      en: 'Less salt',
      descNe: 'रक्तचाप नियन्त्रण',
      descEn: 'Control blood pressure',
      tone: 'from-amber-400/70 to-orange-500/70',
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xl font-bold text-foreground">
          {language === 'ne' ? '📚 जान्नुहोस्' : '📚 Learn'}
        </h2>
        <button
          onClick={() => onNavigate('tips')}
          className="text-xs font-semibold text-primary"
        >
          {language === 'ne' ? 'सबै →' : 'View all →'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tips.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.en}
              onClick={() => onNavigate('tips')}
              className="glass-card p-4 text-left active:scale-[0.97] transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.tone} flex items-center justify-center mb-2 shadow-md`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="font-bold text-sm text-foreground leading-tight">
                {language === 'ne' ? t.ne : t.en}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                {language === 'ne' ? t.descNe : t.descEn}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
