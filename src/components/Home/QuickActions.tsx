import { Card, CardContent } from "@/components/ui/card";
import { Utensils, BookOpen, Search, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
}

export const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  const { language } = useLanguage();

  const actions = [
    {
      icon: Utensils,
      label: language === 'ne' ? 'खाना लग गर्नुहोस्' : 'Log Food',
      description: language === 'ne' ? 'आजको खाना रेकर्ड गर्नुहोस्' : 'Record today\'s meals',
      tab: 'food',
      gradient: 'from-blue-500 to-blue-600',
      bgClass: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: BookOpen,
      label: language === 'ne' ? 'सुझाव हेर्नुहोस्' : 'View Tips',
      description: language === 'ne' ? 'खाना सल्लाह र गाइड' : 'Food advice & guides',
      tab: 'tips',
      gradient: 'from-emerald-500 to-emerald-600',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      icon: Search,
      label: language === 'ne' ? 'खाना खोज्नुहोस्' : 'Check Foods',
      description: language === 'ne' ? 'खाना सुरक्षित छ कि छैन जाँच' : 'Is this food safe for me?',
      tab: 'food',
      gradient: 'from-purple-500 to-purple-600',
      bgClass: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      icon: MessageCircle,
      label: language === 'ne' ? 'AI सहायता' : 'AI Help',
      description: language === 'ne' ? 'पोषण बारेमा सोध्नुहोस्' : 'Ask nutrition questions',
      tab: 'ai-chat',
      gradient: 'from-orange-500 to-orange-600',
      bgClass: 'bg-orange-50 dark:bg-orange-950/30',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'ne' ? '⚡ छिटो कार्यहरू' : '⚡ Quick Actions'}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.label}
              className={`${action.bgClass} border-0 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.98]`}
              onClick={() => onNavigate(action.tab)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-sm text-foreground">{action.label}</span>
                <span className="text-xs text-muted-foreground leading-tight">{action.description}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
