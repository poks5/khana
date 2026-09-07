import React, { useState } from 'react';
import { 
  Home, 
  Utensils, 
  Heart,
  User,
  MoreHorizontal,
  FileText,
  BarChart3,
  ChefHat,
  MessageCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: language === 'ne' ? 'गृह' : 'Home', emoji: '🏠' },
    { id: 'food', icon: Utensils, label: language === 'ne' ? 'खाना' : 'Food', emoji: '🍽️' },
    { id: 'tips', icon: Heart, label: language === 'ne' ? 'सुझाव' : 'Tips', emoji: '💡' },
    { id: 'me', icon: User, label: language === 'ne' ? 'म' : 'Me', emoji: '👤' },
  ];

  const moreItems = [
    { id: 'ai-chat', icon: MessageCircle, label: language === 'ne' ? 'AI सहायता' : 'AI Help', emoji: '🤖' },
    { id: 'recipes', icon: ChefHat, label: language === 'ne' ? 'रेसिपी' : 'Recipes', emoji: '🍳' },
    { id: 'reports', icon: FileText, label: language === 'ne' ? 'रिपोर्ट' : 'Reports', emoji: '📊' },
    { id: 'analytics', icon: BarChart3, label: language === 'ne' ? 'विश्लेषण' : 'Analytics', emoji: '📈' },
  ];

  if (!isMobile) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40 safe-area-inset">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-4 rounded-2xl min-w-[64px] transition-all duration-200',
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 mb-0.5" />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Sheet open={showMore} onOpenChange={setShowMore}>
        <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
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
                  onClick={() => { onTabChange(item.id); setShowMore(false); }}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
