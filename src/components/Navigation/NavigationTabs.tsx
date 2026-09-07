import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Utensils, Heart, User } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  const { language } = useLanguage();

  return (
    <TabsList className="grid w-full grid-cols-4 mb-6 h-12">
      <TabsTrigger value="home" className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4" />
        <span>{language === 'ne' ? 'गृह' : 'Home'}</span>
      </TabsTrigger>
      <TabsTrigger value="food" className="flex items-center gap-2 text-sm">
        <Utensils className="h-4 w-4" />
        <span>{language === 'ne' ? 'खाना' : 'Food'}</span>
      </TabsTrigger>
      <TabsTrigger value="tips" className="flex items-center gap-2 text-sm">
        <Heart className="h-4 w-4" />
        <span>{language === 'ne' ? 'सुझाव' : 'Tips'}</span>
      </TabsTrigger>
      <TabsTrigger value="me" className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4" />
        <span>{language === 'ne' ? 'म' : 'Me'}</span>
      </TabsTrigger>
    </TabsList>
  );
};
