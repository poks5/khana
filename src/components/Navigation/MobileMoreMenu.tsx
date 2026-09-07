
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  ChefHat,
  Database,
  MessageCircle,
  FileText,
  BarChart3,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface MobileMoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange: (tab: string) => void;
}

export const MobileMoreMenu = ({ isOpen, onClose, onTabChange }: MobileMoreMenuProps) => {
  const { t, language } = useLanguage();

  const moreItems = [
    {
      id: 'recipes',
      icon: ChefHat,
      label: t('navigation.tabs.recipes', undefined, 'Recipes'),
      emoji: '🍳',
      description: language === 'ne' ? 'नेपाली व्यञ्जनहरू' : 'Nepali Recipes'
    },
    {
      id: 'database',
      icon: Database,
      label: t('navigation.tabs.database', undefined, 'Database'),
      emoji: '🗃️',
      description: language === 'ne' ? 'खाना डाटाबेस' : 'Food Database'
    },
    {
      id: 'ai_chat',
      icon: MessageCircle,
      label: t('navigation.tabs.ai_chat', undefined, 'AI Chat'),
      emoji: '🤖',
      description: language === 'ne' ? 'AI सहायता' : 'AI Assistant'
    },
    {
      id: 'reports',
      icon: FileText,
      label: t('navigation.tabs.reports', undefined, 'Reports'),
      emoji: '📊',
      description: language === 'ne' ? 'रगत रिपोर्टहरू' : 'Blood Reports'
    },
    {
      id: 'summary',
      icon: Calendar,
      label: t('navigation.tabs.summary', undefined, 'Summary'),
      emoji: '📋',
      description: language === 'ne' ? 'दैनिक सारांश' : 'Daily Summary'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: t('navigation.tabs.analytics', undefined, 'Analytics'),
      emoji: '📈',
      description: language === 'ne' ? 'उन्नत विश्लेषण' : 'Advanced Analytics'
    }
  ];

  const handleItemClick = (tabId: string) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-center">
            {language === 'ne' ? 'थप सुविधाहरू' : 'More Features'}
          </SheetTitle>
        </SheetHeader>
        
        <div className="grid grid-cols-2 gap-3 px-2">
          {moreItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Button
                key={item.id}
                variant="outline"
                onClick={() => handleItemClick(item.id)}
                className="h-auto p-4 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50"
              >
                <div className="flex items-center justify-center">
                  <span className="text-2xl mr-2">{item.emoji}</span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <div className={`font-medium text-sm ${language === 'ne' ? 'font-devanagari' : ''}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs text-muted-foreground ${language === 'ne' ? 'font-devanagari' : ''}`}>
                    {item.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className={`text-xs text-muted-foreground ${language === 'ne' ? 'font-devanagari' : ''}`}>
            {language === 'ne' 
              ? 'कुनै पनि सुविधा छान्नुहोस्' 
              : 'Select any feature to access it'
            }
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
