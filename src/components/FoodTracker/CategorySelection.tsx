
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";

// Add "all" category to the beginning
const ENHANCED_FOOD_CATEGORIES = [
  {
    id: 'all',
    name: { ne: 'सबै खाना', en: 'All Foods' },
    emoji: '🍽️',
  },
  ...FOOD_CATEGORIES
];

interface CategorySelectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelection = ({ selectedCategory, onCategoryChange }: CategorySelectionProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg">
          खानाको प्रकार छान्नुहोस् (Choose Food Type)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-2 ${
          isMobile ? 'grid-cols-2' : 'grid-cols-4'
        }`}>
          {ENHANCED_FOOD_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`${isMobile ? 'h-16 text-xs' : 'h-20 text-sm'} flex flex-col items-center justify-center p-2`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className={`${isMobile ? 'text-lg' : 'text-2xl'} mb-1`}>
                {category.emoji}
              </span>
              <div className="text-center">
                <div className="font-semibold">{category.name.ne}</div>
                <div className="text-xs opacity-70">{category.name.en}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ENHANCED_FOOD_CATEGORIES as FOOD_CATEGORIES };
