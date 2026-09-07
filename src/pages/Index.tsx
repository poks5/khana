import { Tabs } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { OnboardingFlow } from "@/components/Onboarding/OnboardingFlow";
import { AppHeader } from "@/components/Layout/AppHeader";
import { NavigationTabs } from "@/components/Navigation/NavigationTabs";
import { BottomNavigation } from "@/components/Navigation/BottomNavigation";
import { TabContent } from "@/components/Navigation/TabContent";
import { FoodCategoryDetail } from "@/components/Home/FoodCategoryDetail";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [categoryView, setCategoryView] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [largeFontMode, setLargeFontMode] = useState(false);
  const isMobile = useIsMobile();

  const handleNavigate = (tab: string) => {
    if (tab.startsWith("category:")) {
      setCategoryView(tab.slice("category:".length));
      return;
    }
    setCategoryView(null);
    setActiveTab(tab);
  };

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboarding-completed');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }

    const largeFontPref = localStorage.getItem('large-font-mode');
    if (largeFontPref === 'true') {
      setLargeFontMode(true);
      document.documentElement.classList.add('large-font');
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <div className={`min-h-screen bg-background ${largeFontMode ? 'large-font' : ''}`}>
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      <AppHeader />
      
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!isMobile && (
            <div className="container mx-auto px-4 py-4">
              <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          )}
          
          <div className={`${isMobile ? 'px-3 py-4 pb-24' : 'container mx-auto px-4 py-4'} min-h-[calc(100vh-120px)]`}>
            {categoryView ? (
              <FoodCategoryDetail categoryKey={categoryView} onBack={() => setCategoryView(null)} />
            ) : (
              <TabContent onNavigate={handleNavigate} />
            )}
          </div>
          
          {isMobile && (
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
