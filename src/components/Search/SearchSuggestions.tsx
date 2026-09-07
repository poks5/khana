import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, TrendingUp } from "lucide-react";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { nepaliVegetables } from "@/data/nepaliVegetables";

interface SearchSuggestionsProps {
  onSelect: (item: any) => void;
  placeholder?: string;
}

export const SearchSuggestions = ({ onSelect, placeholder = "Search foods..." }: SearchSuggestionsProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Set popular items (most commonly searched)
    const popular = [
      { name: { en: "White Rice", ne: "चामल" }, type: "food", category: "grain" },
      { name: { en: "Chicken", ne: "कुखुराको मासु" }, type: "food", category: "protein" },
      { name: { en: "Cauliflower", ne: "काउली" }, type: "food", category: "vegetable" },
      { name: { en: "Lentils", ne: "दाल" }, type: "food", category: "protein" },
      { name: { en: "Potato", ne: "आलु" }, type: "food", category: "vegetable" }
    ];
    setPopularItems(popular);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const allFoods = [
        ...SAMPLE_FOODS.map(food => ({ ...food, type: 'food' })),
        ...nepaliVegetables.map(veg => ({ 
          id: veg.id, 
          name: veg.name, 
          type: 'vegetable',
          category: 'vegetable',
          dialysisSafe: veg.safetyProfile.dialysisSafe 
        }))
      ];

      const filtered = allFoods.filter(item => 
        item.name.en?.toLowerCase().includes(query.toLowerCase()) ||
        item.name.ne?.includes(query) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSelect = (item: any) => {
    // Add to recent searches
    const newRecent = [item.name.en || item.name, ...recentSearches.filter(r => r !== (item.name.en || item.name))].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent-searches', JSON.stringify(newRecent));
    
    setQuery("");
    setShowSuggestions(false);
    onSelect(item);
  };

  const handleRecentSelect = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10"
        />
      </div>

      {(showSuggestions || (!query && recentSearches.length > 0)) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-2">
            {/* Search Results */}
            {suggestions.length > 0 && (
              <div className="space-y-1">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  Search Results
                </div>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.name.ne || item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.name.en || item.category}</span>
                    </div>
                    <Badge variant={item.dialysisSafe !== false ? "default" : "secondary"} className="text-xs">
                      {item.dialysisSafe !== false ? "Safe" : "Caution"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="space-y-1">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 hover:bg-muted rounded cursor-pointer"
                    onClick={() => handleRecentSelect(search)}
                  >
                    <span className="text-sm">{search}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Items */}
            {!query && popularItems.length > 0 && (
              <div className="space-y-1 mt-3 border-t pt-2">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Popular Foods
                </div>
                {popularItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.name.ne}</span>
                      <span className="text-xs text-muted-foreground">{item.name.en}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
