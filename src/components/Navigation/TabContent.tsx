import { Suspense } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { 
  LazyFoodTracker,
  LazyMealPlanner,
  LazyAdvancedAnalytics,
  LazyBloodReports,
  LazyAIChat,
  LazyRecipeBuilder,
  LazyFoodMasterDatabase
} from "@/utils/lazyLoading";
import { EnhancedRecommendations } from "@/components/Recommendations/EnhancedRecommendations";
import { DailySummary } from "@/components/Summary/DailySummary";
import { HomePage } from "@/components/Home/HomePage";
import { MePage } from "@/components/Me/MePage";

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

interface TabContentProps {
  onNavigate: (tab: string) => void;
}

export const TabContent = ({ onNavigate }: TabContentProps) => {
  return (
    <>
      <TabsContent value="home" className="mt-0">
        <HomePage onNavigate={onNavigate} />
      </TabsContent>

      <TabsContent value="food" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyFoodTracker />
        </Suspense>
      </TabsContent>

      <TabsContent value="tips" className="mt-0">
        <EnhancedRecommendations />
      </TabsContent>

      <TabsContent value="me" className="mt-0">
        <MePage onNavigate={onNavigate} />
      </TabsContent>

      {/* Hidden tabs accessible via navigation */}
      <TabsContent value="ai-chat" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyAIChat />
        </Suspense>
      </TabsContent>

      <TabsContent value="recipes" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyRecipeBuilder />
        </Suspense>
      </TabsContent>

      <TabsContent value="reports" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyBloodReports />
        </Suspense>
      </TabsContent>

      <TabsContent value="analytics" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyAdvancedAnalytics />
        </Suspense>
      </TabsContent>

      <TabsContent value="summary" className="mt-0">
        <DailySummary />
      </TabsContent>

      <TabsContent value="planner" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyMealPlanner />
        </Suspense>
      </TabsContent>

      <TabsContent value="database" className="mt-0">
        <Suspense fallback={<LoadingFallback />}>
          <LazyFoodMasterDatabase />
        </Suspense>
      </TabsContent>
    </>
  );
};
