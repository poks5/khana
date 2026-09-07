
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recipe, EnhancedRecipeIngredient, NutrientProfile } from "@/types";
import { SAMPLE_FOODS } from "@/data/sampleFoods";
import { BasicInfoTab } from "./BasicInfoTab";
import { IngredientsTab } from "./IngredientsTab";
import { ClinicalTab } from "./ClinicalTab";
import { CulturalTab } from "./CulturalTab";

interface RecipeFormProps {
  recipe?: Recipe | null;
  onSave: (recipe: Recipe) => void;
  onClose: () => void;
}

export const RecipeForm = ({ recipe, onSave, onClose }: RecipeFormProps) => {
  const [nameEn, setNameEn] = useState(recipe?.name.en || "");
  const [nameNe, setNameNe] = useState(recipe?.name.ne || "");
  const [descriptionEn, setDescriptionEn] = useState(recipe?.description.en || "");
  const [descriptionNe, setDescriptionNe] = useState(recipe?.description.ne || "");
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || 0);
  const [cookTime, setCookTime] = useState(recipe?.cookTime || 0);
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>(recipe?.difficulty || 'easy');
  const [category, setCategory] = useState<Recipe['category']>(recipe?.category || 'dal-bhat');
  const [ingredients, setIngredients] = useState<EnhancedRecipeIngredient[]>(recipe?.ingredients || []);
  
  // Dialysis-specific fields
  const [dialysisSafe, setDialysisSafe] = useState(recipe?.dialysisSafe || false);
  const [ckdSafe, setCkdSafe] = useState(recipe?.ckdSafe || false);
  const [riskLevel, setRiskLevel] = useState<Recipe['riskLevel']>(recipe?.riskLevel || 'safe');
  const [doubleBoiling, setDoubleBoiling] = useState(recipe?.preparationMethods.doubleBoiling || false);
  const [soakingRequired, setSoakingRequired] = useState(recipe?.preparationMethods.soakingRequired || false);
  const [phosphateBinderRequired, setPhosphateBinderRequired] = useState(recipe?.clinicalNotes.phosphateBinderRequired || false);

  const updateIngredient = (index: number, field: keyof EnhancedRecipeIngredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'foodId') {
      const food = SAMPLE_FOODS.find(f => f.id === value);
      if (food) {
        updated[index].name = food.name;
        updated[index].unit = food.serving.unit;
        updateIngredientNutrients(index, updated[index].quantity, food);
      }
    } else if (field === 'quantity') {
      const food = SAMPLE_FOODS.find(f => f.id === updated[index].foodId);
      if (food) {
        updateIngredientNutrients(index, value, food);
      }
    }
    
    setIngredients(updated);
  };

  const updateIngredientNutrients = (index: number, quantity: number, food: any) => {
    const multiplier = quantity / food.serving.amount;
    const updated = [...ingredients];
    updated[index].nutrients = {
      calories: food.nutrients.calories * multiplier,
      protein: food.nutrients.protein * multiplier,
      potassium: food.nutrients.potassium * multiplier,
      phosphorus: food.nutrients.phosphorus * multiplier,
      sodium: food.nutrients.sodium * multiplier,
      fluid: food.nutrients.fluid * multiplier,
    };
    setIngredients(updated);
  };

  const calculateTotalNutrients = (): NutrientProfile => {
    return ingredients.reduce((total, ingredient) => ({
      calories: total.calories + ingredient.nutrients.calories,
      protein: total.protein + ingredient.nutrients.protein,
      potassium: total.potassium + ingredient.nutrients.potassium,
      phosphorus: total.phosphorus + ingredient.nutrients.phosphorus,
      sodium: total.sodium + ingredient.nutrients.sodium,
      fluid: total.fluid + ingredient.nutrients.fluid,
    }), { calories: 0, protein: 0, potassium: 0, phosphorus: 0, sodium: 0, fluid: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalNutrients = calculateTotalNutrients();
    const nutritionPerServing: NutrientProfile = {
      calories: totalNutrients.calories / servings,
      protein: totalNutrients.protein / servings,
      potassium: totalNutrients.potassium / servings,
      phosphorus: totalNutrients.phosphorus / servings,
      sodium: totalNutrients.sodium / servings,
      fluid: totalNutrients.fluid / servings,
    };

    const newRecipe: Recipe = {
      id: recipe?.id || crypto.randomUUID(),
      name: { en: nameEn, ne: nameNe },
      description: { en: descriptionEn, ne: descriptionNe },
      servings,
      prepTime,
      cookTime,
      difficulty,
      category,
      ingredients,
      instructions: { en: [], ne: [] }, // Simplified for now
      totalNutrients,
      nutritionPerServing,
      dialysisSafe,
      ckdSafe,
      riskLevel,
      preparationMethods: {
        doubleBoiling,
        soakingRequired,
        waterDiscardSteps: doubleBoiling ? 2 : 0,
        specificInstructions: { en: [], ne: [] }
      },
      clinicalNotes: {
        phosphateBinderRequired,
        fluidRestrictionNotes: { en: "", ne: "" },
        potassiumWarnings: { en: "", ne: "" },
        maxPortionCKD: { amount: 100, unit: "g" },
        maxPortionDialysis: { amount: 150, unit: "g" }
      },
      culturalContext: {
        traditionalOccasion: "",
        regionalVariation: "",
        culturalSignificance: { en: "", ne: "" }
      }
    };

    onSave(newRecipe);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe ? 'Edit Recipe' : 'Create Nepali Dialysis-Safe Recipe'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="basic">
              <BasicInfoTab
                nameEn={nameEn}
                setNameEn={setNameEn}
                nameNe={nameNe}
                setNameNe={setNameNe}
                descriptionEn={descriptionEn}
                setDescriptionEn={setDescriptionEn}
                descriptionNe={descriptionNe}
                setDescriptionNe={setDescriptionNe}
                servings={servings}
                setServings={setServings}
                prepTime={prepTime}
                setPrepTime={setPrepTime}
                cookTime={cookTime}
                setCookTime={setCookTime}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                category={category}
                setCategory={setCategory}
              />
            </TabsContent>

            <TabsContent value="ingredients">
              <IngredientsTab
                ingredients={ingredients}
                setIngredients={setIngredients}
                updateIngredient={updateIngredient}
              />
            </TabsContent>

            <TabsContent value="clinical">
              <ClinicalTab
                dialysisSafe={dialysisSafe}
                setDialysisSafe={setDialysisSafe}
                ckdSafe={ckdSafe}
                setCkdSafe={setCkdSafe}
                riskLevel={riskLevel}
                setRiskLevel={setRiskLevel}
                doubleBoiling={doubleBoiling}
                setDoubleBoiling={setDoubleBoiling}
                soakingRequired={soakingRequired}
                setSoakingRequired={setSoakingRequired}
                phosphateBinderRequired={phosphateBinderRequired}
                setPhosphateBinderRequired={setPhosphateBinderRequired}
              />
            </TabsContent>

            <TabsContent value="cultural">
              <CulturalTab />
            </TabsContent>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!nameEn || !nameNe || ingredients.length === 0}>
                {recipe ? 'Update Recipe' : 'Create Recipe'}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
