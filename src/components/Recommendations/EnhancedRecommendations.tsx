
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, Utensils, Wheat, Carrot, Cherry } from "lucide-react";
import { Recommendations } from "./Recommendations";
import { SmartTipsCategories } from "./SmartTipsCategories";
import { DalDatabase } from "@/components/FoodDetail/DalDatabase";
import { RiceDatabase } from "@/components/FoodDetail/RiceDatabase";
import { TarkariGuide } from "@/components/TarkariGuide/TarkariGuide";
import { AcharGuide } from "@/components/AcharGuide/AcharGuide";
import { MobileTabsDropdown } from "./MobileTabsDropdown";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const EnhancedRecommendations = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("smart-tips");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
          {t('recommendations.title', undefined, 'Nutrition Recommendations')}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {t('recommendations.subtitle', undefined, 'Comprehensive dietary guidance for dialysis patients')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile: Use dropdown */}
        {isMobile ? (
          <div className="px-2 mb-4">
            <MobileTabsDropdown activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        ) : (
          /* Desktop: Use responsive tabs */
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="smart-tips" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.smart_tips', undefined, 'Smart Tips')}
              </span>
            </TabsTrigger>
            <TabsTrigger value="cultural-tips" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.cultural_tips', undefined, 'Cultural Guide')}
              </span>
            </TabsTrigger>
            <TabsTrigger value="tarkari-guide" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Carrot className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.tarkari_guide', undefined, 'Tarkari Guide')}
              </span>
            </TabsTrigger>
            <TabsTrigger value="achar-guide" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Cherry className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.achar_guide', undefined, 'Achar Guide')}
              </span>
            </TabsTrigger>
            <TabsTrigger value="dal-guide" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Utensils className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.dal_guide', undefined, 'Dal Guide')}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rice-guide" className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Wheat className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm truncate">
                {t('recommendations.tabs.rice_guide', undefined, 'Rice Guide')}
              </span>
            </TabsTrigger>
          </TabsList>
        )}

        <div className="px-2 sm:px-0">
          <TabsContent value="smart-tips" className="mt-6">
            <SmartTipsCategories />
          </TabsContent>

          <TabsContent value="cultural-tips" className="mt-6">
            <Recommendations />
          </TabsContent>

          <TabsContent value="tarkari-guide" className="mt-6">
            <TarkariGuide />
          </TabsContent>

          <TabsContent value="achar-guide" className="mt-6">
            <AcharGuide />
          </TabsContent>

          <TabsContent value="dal-guide" className="mt-6">
            <DalDatabase />
          </TabsContent>

          <TabsContent value="rice-guide" className="mt-6">
            <RiceDatabase />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
