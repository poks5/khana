
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Beef, Milk, CheckCircle, Carrot } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}: SearchAndFilterProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "nepali_proteins":
        return <Beef className="h-3 w-3" />;
      case "nepali_dairy":
        return <Milk className="h-3 w-3" />;
      case "nepali_traditional":
        return <CheckCircle className="h-3 w-3" />;
      case "vegetable":
        return <Carrot className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    if (category === "all") return t('food.categories.all');
    return t(`food.categories.${category}`, undefined, category.replace("_", " "));
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('food.search.placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 ${isMobile ? 'h-12 text-base' : 'h-10'}`}
        />
      </div>
      
      {/* Category Filters */}
      {isMobile ? (
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2" style={{ width: 'max-content' }}>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize whitespace-nowrap ${
                  isMobile ? 'h-10 px-4 text-sm' : 'h-8 px-3 text-xs'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {getCategoryLabel(category)}
                </span>
              </Badge>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setSelectedCategory(category)}
            >
              <span className="flex items-center gap-1">
                {getCategoryIcon(category)}
                {getCategoryLabel(category)}
              </span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
