
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Brain, Heart, Carrot, Cherry, Utensils, Wheat } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface MobileTabsDropdownProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const MobileTabsDropdown = ({ activeTab, onTabChange }: MobileTabsDropdownProps) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    {
      value: "smart-tips",
      label: t('recommendations.tabs.smart_tips', undefined, 'Smart Tips'),
      icon: Brain
    },
    {
      value: "cultural-tips",  
      label: t('recommendations.tabs.cultural_tips', undefined, 'Cultural Guide'),
      icon: Heart
    },
    {
      value: "tarkari-guide",
      label: t('recommendations.tabs.tarkari_guide', undefined, 'Tarkari Guide'),
      icon: Carrot
    },
    {
      value: "achar-guide",
      label: t('recommendations.tabs.achar_guide', undefined, 'Achar Guide'),
      icon: Cherry
    },
    {
      value: "dal-guide",
      label: t('recommendations.tabs.dal_guide', undefined, 'Dal Guide'),
      icon: Utensils
    },
    {
      value: "rice-guide",
      label: t('recommendations.tabs.rice_guide', undefined, 'Rice Guide'),
      icon: Wheat
    }
  ];

  const activeTabData = tabs.find(tab => tab.value === activeTab) || tabs[0];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between min-h-[44px]">
          <div className="flex items-center gap-2 min-w-0">
            <activeTabData.icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate text-left">{activeTabData.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[280px] bg-white border shadow-lg z-50" 
        align="start"
      >
        {tabs.map((tab) => (
          <DropdownMenuItem
            key={tab.value}
            onClick={() => {
              onTabChange(tab.value);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 py-3 px-3 hover:bg-gray-50 cursor-pointer"
          >
            <tab.icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{tab.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
