
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface FoodSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const FoodSearchBar = ({ searchTerm, onSearchChange }: FoodSearchBarProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="खाना खोज्नुहोस् / Search food..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 text-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
};
