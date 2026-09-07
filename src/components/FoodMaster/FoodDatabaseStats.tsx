
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Database, Shield } from "lucide-react";
import { consolidatedFoodDatabase, FOOD_CATEGORIES, getFoodsByCategory } from "@/data/consolidatedFoodDatabase";

export const FoodDatabaseStats = () => {
  const totalFoods = consolidatedFoodDatabase.length;
  const ckdSafeFoods = consolidatedFoodDatabase.filter(food => 
    food.dialysisSafe && food.nutrients.potassium < 200 && food.nutrients.phosphorus < 100
  ).length;
  const dialysisSafeFoods = consolidatedFoodDatabase.filter(food => food.dialysisSafe).length;
  const cautionFoods = consolidatedFoodDatabase.filter(food => 
    food.conditionalSafe && !food.dialysisSafe
  ).length;
  const avoidFoods = consolidatedFoodDatabase.filter(food => 
    !food.dialysisSafe && !food.conditionalSafe
  ).length;

  const categoryBreakdown = FOOD_CATEGORIES.map(category => {
    const categoryFoods = getFoodsByCategory(category.id);
    const safeFoods = categoryFoods.filter(food => food.dialysisSafe).length;
    return {
      ...category,
      total: categoryFoods.length,
      safe: safeFoods,
      percentage: categoryFoods.length > 0 ? (safeFoods / categoryFoods.length) * 100 : 0
    };
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Database className="h-6 w-6" />
          Database Statistics
        </h2>
        <p className="text-muted-foreground">Cleaned & Consolidated Food Database Analytics</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-center">Total Foods</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold">{totalFoods}</div>
            <Badge variant="outline" className="mt-1">Unique Items</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-center flex items-center justify-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              CKD Safe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-green-600">{ckdSafeFoods}</div>
            <Badge className="bg-green-100 text-green-800 mt-1">
              {Math.round((ckdSafeFoods / totalFoods) * 100)}%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-center flex items-center justify-center gap-1">
              <Shield className="h-4 w-4 text-blue-500" />
              Dialysis Safe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-blue-600">{dialysisSafeFoods}</div>
            <Badge className="bg-blue-100 text-blue-800 mt-1">
              {Math.round((dialysisSafeFoods / totalFoods) * 100)}%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-center flex items-center justify-center gap-1">
              <XCircle className="h-4 w-4 text-red-500" />
              Avoid/Caution
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-red-600">{cautionFoods + avoidFoods}</div>
            <Badge className="bg-red-100 text-red-800 mt-1">
              {Math.round(((cautionFoods + avoidFoods) / totalFoods) * 100)}%
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Category Safety Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryBreakdown.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{category.name.en}</span>
                  <span className="text-sm text-muted-foreground ml-2">({category.name.ne})</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-600 font-semibold">{category.safe}</span>
                  <span className="text-muted-foreground">/{category.total}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={category.percentage} className="flex-1 h-2" />
                <span className="text-sm font-medium min-w-[40px]">
                  {Math.round(category.percentage)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Improvements */}
      <Card>
        <CardHeader>
          <CardTitle>🧾 Cleanup Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Completed</h4>
              <ul className="text-sm space-y-1">
                <li>• Merged duplicate entries (cucumber, chicken, rice varieties)</li>
                <li>• Standardized naming format (English / Nepali)</li>
                <li>• Organized into 7 logical categories</li>
                <li>• Applied consistent safety tagging</li>
                <li>• Corrected serving sizes and units</li>
                <li>• Enhanced preparation notes</li>
                <li>• Mobile-optimized card display</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">🎯 Database Quality</h4>
              <ul className="text-sm space-y-1">
                <li>• {totalFoods} unique, validated entries</li>
                <li>• Bilingual search support</li>
                <li>• Clinical safety validation</li>
                <li>• Consistent nutritional data</li>
                <li>• Cultural context preserved</li>
                <li>• Patient-type filtering</li>
                <li>• Preparation guidance included</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
