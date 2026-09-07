import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, BarChart3, Calendar, ChefHat, Database, 
  MessageCircle, Settings, Info, ChevronRight 
} from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useNavigate } from "react-router-dom";

interface MePageProps {
  onNavigate: (tab: string) => void;
}

export const MePage = ({ onNavigate }: MePageProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      title: language === 'ne' ? 'स्वास्थ्य' : 'Health',
      items: [
        { id: 'reports', icon: FileText, label: language === 'ne' ? 'रगत रिपोर्ट' : 'Blood Reports', emoji: '🩸' },
        { id: 'summary', icon: Calendar, label: language === 'ne' ? 'दैनिक सारांश' : 'Daily Summary', emoji: '📋' },
        { id: 'analytics', icon: BarChart3, label: language === 'ne' ? 'विश्लेषण' : 'Analytics', emoji: '📈' },
      ]
    },
    {
      title: language === 'ne' ? 'उपकरणहरू' : 'Tools',
      items: [
        { id: 'planner', icon: Calendar, label: language === 'ne' ? 'भोजन योजना' : 'Meal Planner', emoji: '📅' },
        { id: 'recipes', icon: ChefHat, label: language === 'ne' ? 'रेसिपी' : 'Recipes', emoji: '🍳' },
        { id: 'database', icon: Database, label: language === 'ne' ? 'खाना डाटाबेस' : 'Food Database', emoji: '🗃️' },
        { id: 'ai-chat', icon: MessageCircle, label: language === 'ne' ? 'AI सहायता' : 'AI Assistant', emoji: '🤖' },
      ]
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center pt-2">
        <h1 className="text-2xl font-bold text-foreground">
          {language === 'ne' ? 'मेरो प्रोफाइल' : 'My Profile'}
        </h1>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {section.title}
          </h3>
          <Card className="border shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 font-medium text-sm text-foreground">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Settings & About links */}
      <Card className="border shadow-sm">
        <CardContent className="p-0 divide-y divide-border">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
          >
            <span className="text-xl">⚙️</span>
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 font-medium text-sm text-foreground">
              {language === 'ne' ? 'सेटिङ' : 'Settings'}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate('/about')}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
          >
            <span className="text-xl">ℹ️</span>
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 font-medium text-sm text-foreground">
              {language === 'ne' ? 'बारेमा' : 'About'}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
