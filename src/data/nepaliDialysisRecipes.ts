
import { Recipe } from "@/types";
import { mainDishRecipes } from "./recipes/mainDishes";
import { vegetableCurryRecipes } from "./recipes/vegetableCurries";
import { riceAndGrainRecipes } from "./recipes/riceAndGrains";
import { snacksAndSpecialRecipes } from "./recipes/snacksAndSpecial";

export const nepaliDialysisRecipes: Recipe[] = [
  ...mainDishRecipes,
  ...vegetableCurryRecipes,
  ...riceAndGrainRecipes,
  ...snacksAndSpecialRecipes
];
