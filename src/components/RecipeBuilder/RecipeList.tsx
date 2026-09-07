
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types";
import { Clock, Users, Edit, Trash2, ChefHat } from "lucide-react";

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const RecipeList = ({ recipes, onEdit, onDelete }: RecipeListProps) => {
  const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{recipe.name.en}</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(recipe)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(recipe.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="capitalize">
                {recipe.category}
              </Badge>
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {recipe.description.en}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {recipe.servings} servings
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.prepTime + recipe.cookTime} min
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Nutrition per serving:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Calories: {Math.round(recipe.nutritionPerServing.calories)}</div>
                <div>Protein: {Math.round(recipe.nutritionPerServing.protein)}g</div>
                <div>K: {Math.round(recipe.nutritionPerServing.potassium)}mg</div>
                <div>P: {Math.round(recipe.nutritionPerServing.phosphorus)}mg</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
