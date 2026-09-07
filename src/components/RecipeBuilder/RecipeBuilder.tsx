import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChefHat, Heart } from "lucide-react";
import { Recipe } from "@/types";
import { RecipeForm } from "./RecipeForm";
import { RecipeList } from "./RecipeList";
import { nepaliDialysisRecipes } from "@/data/nepaliDialysisRecipes";

export const RecipeBuilder = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Load pre-created Nepali recipes on mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem('custom-recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      // Load default Nepali dialysis-safe recipes
      setRecipes(nepaliDialysisRecipes);
      localStorage.setItem('custom-recipes', JSON.stringify(nepaliDialysisRecipes));
    }
  }, []);

  const handleSaveRecipe = (recipe: Recipe) => {
    let updatedRecipes;
    if (editingRecipe) {
      updatedRecipes = recipes.map(r => r.id === recipe.id ? recipe : r);
    } else {
      updatedRecipes = [...recipes, recipe];
    }
    setRecipes(updatedRecipes);
    localStorage.setItem('custom-recipes', JSON.stringify(updatedRecipes));
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter(r => r.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('custom-recipes', JSON.stringify(updatedRecipes));
  };

  const dialysisSafeCount = recipes.filter(r => r.dialysisSafe).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <ChefHat className="h-8 w-8" />
            नेपाली रेसिपी बिल्डर
          </h2>
          <p className="text-muted-foreground">
            Nepali Recipe Builder - Kidney-friendly recipes with automatic nutrition calculation
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Heart className="h-4 w-4 text-red-500" />
            <span>{dialysisSafeCount} dialysis-safe recipes available</span>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          नयाँ रेसिपी (New Recipe)
        </Button>
      </div>

      {recipes.length === 0 && !showForm ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ChefHat className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your collection of kidney-friendly Nepali recipes
            </p>
            <Button onClick={() => setShowForm(true)}>
              Create Your First Recipe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <RecipeList 
          recipes={recipes}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      )}

      {showForm && (
        <RecipeForm
          recipe={editingRecipe}
          onSave={handleSaveRecipe}
          onClose={() => {
            setShowForm(false);
            setEditingRecipe(null);
          }}
        />
      )}
    </div>
  );
};
