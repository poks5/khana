
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { consolidatedFoodDatabase, FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void;
  onBack: () => void;
}

export const CategorySelector = ({ onCategorySelect, onBack }: CategorySelectorProps) => {
  const { t } = useLanguage();
  
  // Calculate total foods available from all sources
  const totalFoods = consolidatedFoodDatabase.length + SAMPLE_FOODS.length + nepaliVegetables.length;

  // Map old categories to new categories for backward compatibility
  const mapOldCategoryToNew = (oldCategory: string): string => {
    const categoryMap: Record<string, string> = {
      'dal-legumes': 'proteins-dal',
      'rice-grains': 'main-foods-grains',
      'nepali_staples': 'main-foods-grains',
      'nepali_proteins': 'proteins-dal',
      'nepali_traditional': 'ready-meals',
      'proteins': 'proteins-dal',
      'beverages': 'beverages-drinks',
      'newari_dishes': 'ready-meals',
      'breakfast-cereals': 'breakfast-snacks',
      'breakfast-bread': 'breakfast-snacks',
      'breakfast-proteins': 'breakfast-snacks',
      'breakfast-beverages': 'beverages-drinks',
      'quick-meals': 'ready-meals',
      'traditional-breakfast': 'breakfast-snacks',
      'meal-templates': 'ready-meals',
      'processed-foods': 'ready-meals',
      'traditional-foods': 'ready-meals',
      'vegetable': 'vegetables'
    };
    
    return categoryMap[oldCategory] || oldCategory;
  };

  // Get category counts with mapping
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return totalFoods;
    
    const consolidated = consolidatedFoodDatabase.filter(food => 
      food.category === categoryId
    ).length;
    
    const sample = SAMPLE_FOODS.filter(food => {
      const mappedCategory = mapOldCategoryToNew(food.category);
      return mappedCategory === categoryId;
    }).length;
    
    const vegetables = categoryId === "vegetables" ? nepaliVegetables.length : 0;
    
    return consolidated + sample + vegetables;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← {t('common.back')}
        </button>
        <Badge variant="outline">
          {totalFoods} {t('common.total')} {t('food.search.foods_found')}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('food.tracker.select_category')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => onCategorySelect("all")}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🍽️</span>
                    {t('food.categories.all')}
                  </h3>
                  <p className="text-sm text-gray-600">Browse all available foods</p>
                </div>
                <Badge variant="secondary">{totalFoods}</Badge>
              </div>
            </div>

            {FOOD_CATEGORIES.map((category) => {
              const count = getCategoryCount(category.id);
              return (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <span>{category.emoji}</span>
                        {category.name.en}
                      </h3>
                      <p className="text-sm text-gray-600">{category.name.ne}</p>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
