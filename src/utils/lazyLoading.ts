
import { lazy, ComponentType } from 'react';

// Lazy load heavy components to reduce initial bundle size
export const LazyFoodTracker = lazy(() => 
  import('@/components/FoodTracker/FoodTracker').then(module => ({ default: module.FoodTracker }))
);
export const LazyMealPlanner = lazy(() => 
  import('@/components/MealPlanner/MealPlanner').then(module => ({ default: module.MealPlanner }))
);
export const LazyAdvancedAnalytics = lazy(() => 
  import('@/components/Analytics/AdvancedAnalytics').then(module => ({ default: module.AdvancedAnalytics }))
);
export const LazyBloodReports = lazy(() => 
  import('@/components/BloodReports/BloodReports').then(module => ({ default: module.BloodReports }))
);

// AI Chat component - using EnhancedAIChat which we can modify
export const LazyAIChat = lazy(() => {
  console.log('Loading Enhanced AI Chat component...');
  return import('@/components/AIChat/EnhancedAIChat').then(module => {
    console.log('Enhanced AI Chat component loaded successfully');
    return { default: module.EnhancedAIChat };
  }).catch(error => {
    console.error('Failed to load Enhanced AI Chat component:', error);
    throw error;
  });
});

export const LazyRecipeBuilder = lazy(() => 
  import('@/components/RecipeBuilder/RecipeBuilder').then(module => ({ default: module.RecipeBuilder }))
);
export const LazyFoodMasterDatabase = lazy(() => 
  import('@/components/FoodMaster/FoodMasterDatabase').then(module => ({ default: module.FoodMasterDatabase }))
);

// Generic lazy loading with error boundary
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
) => {
  return lazy(importFn);
};
