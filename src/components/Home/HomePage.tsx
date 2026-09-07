import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { SafetyOverview } from "./SafetyOverview";
import { DailySnapshot } from "./DailySnapshot";
import { FoodCategoriesHero } from "./FoodCategoriesHero";
import { KnowledgeCards } from "./KnowledgeCards";
import { MedicalDisclaimerBanner } from "@/components/Common/MedicalDisclaimerBanner";

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { language } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'ne') {
      if (hour < 12) return 'शुभ बिहानी';
      if (hour < 17) return 'शुभ दिउँसो';
      return 'शुभ साँझ';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const emoji = (() => {
    const h = new Date().getHours();
    return h < 12 ? '🌅' : h < 17 ? '☀️' : '🌙';
  })();

  return (
    <div className="aurora-bg min-h-screen -mx-3 -my-4 px-3 py-4 sm:-mx-4 sm:px-4">
      <div className="space-y-5 max-w-2xl mx-auto pb-4">
        {/* Greeting */}
        <div className="glass-card px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              {new Date().toLocaleDateString(language === 'ne' ? 'ne-NP' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {getGreeting()}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {language === 'ne' ? 'खाना-साथी सँग सुरक्षित खानुहोस्' : 'Eat safely with Khana-Sathi'}
            </p>
          </div>
          <span className="text-5xl">{emoji}</span>
        </div>

        {/* PROMINENT medical disclaimer - shown at top */}
        <MedicalDisclaimerBanner variant="prominent" />

        {/* PRIMARY: Food categories - patient-first */}
        <FoodCategoriesHero onNavigate={onNavigate} />

        {/* Knowledge cards - learning before tracking */}
        <KnowledgeCards onNavigate={onNavigate} />

        {/* Safety guide */}
        <SafetyOverview />

        {/* Nutrition tracking moved below knowledge */}
        <DailySnapshot />
      </div>
    </div>
  );
};
