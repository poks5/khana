
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Heart,
  Droplets,
  Zap,
  Shield
} from "lucide-react";
import { consolidatedFoodDatabase, getFoodsByCategory, getSafeFoodsForCondition, FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { Food } from "@/types";

export const CleanedFoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [patientType, setPatientType] = useState<"ckd" | "dialysis" | "all">("all");
  const [showSafeOnly, setShowSafeOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");

  const filteredFoods = useMemo(() => {
    let foods = consolidatedFoodDatabase;

    // Apply category filter
    if (selectedCategory !== "all") {
      foods = getFoodsByCategory(selectedCategory);
    }

    // Apply patient type filter
    if (patientType !== "all" && showSafeOnly) {
      foods = getSafeFoodsForCondition(patientType);
    }

    // Apply search filter
    if (searchTerm) {
      foods = foods.filter(food => 
        food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.name.ne.includes(searchTerm)
      );
    }

    return foods;
  }, [searchTerm, selectedCategory, patientType, showSafeOnly]);

  const getSafetyIcon = (food: Food) => {
    if (food.dialysisSafe && food.nutrients.potassium < 200) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (food.dialysisSafe && food.conditionalSafe) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getSafetyBadge = (food: Food) => {
    if (food.dialysisSafe && food.nutrients.potassium < 200) {
      return <Badge className="bg-green-100 text-green-800">CKD Safe</Badge>;
    }
    if (food.dialysisSafe) {
      return <Badge className="bg-blue-100 text-blue-800">Dialysis Safe</Badge>;
    }
    if (food.conditionalSafe) {
      return <Badge className="bg-yellow-100 text-yellow-800">Use Caution</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Avoid</Badge>;
  };

  const getNutrientColor = (value: number, type: 'potassium' | 'phosphorus' | 'sodium') => {
    const thresholds = {
      potassium: { safe: 200, caution: 300 },
      phosphorus: { safe: 100, caution: 200 },
      sodium: { safe: 150, caution: 300 }
    };
    
    const threshold = thresholds[type];
    if (value <= threshold.safe) return "text-green-600";
    if (value <= threshold.caution) return "text-yellow-600";
    return "text-red-600";
  };

  const categoryStats = useMemo(() => {
    return FOOD_CATEGORIES.map(category => ({
      ...category,
      count: getFoodsByCategory(category.id).length,
      safeCount: getFoodsByCategory(category.id).filter(food => food.dialysisSafe).length
    }));
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab("browse");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">🧾 Cleaned Food Database</h1>
        <p className="text-muted-foreground">
          Consolidated & Standardized • {consolidatedFoodDatabase.length} Unique Foods • 7 Categories
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {consolidatedFoodDatabase.filter(f => f.dialysisSafe && f.nutrients.potassium < 200).length} CKD Safe
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-blue-500" />
            {consolidatedFoodDatabase.filter(f => f.dialysisSafe).length} Dialysis Safe
          </span>
        </div>
      </div>

      {/* Quick Patient Type Selector */}
      <div className="flex justify-center gap-2">
        <Button
          variant={patientType === "all" ? "default" : "outline"}
          onClick={() => setPatientType("all")}
          size="sm"
        >
          All Foods
        </Button>
        <Button
          variant={patientType === "ckd" ? "default" : "outline"}
          onClick={() => setPatientType("ckd")}
          size="sm"
        >
          CKD Patient
        </Button>
        <Button
          variant={patientType === "dialysis" ? "default" : "outline"}
          onClick={() => setPatientType("dialysis")}
          size="sm"
        >
          Dialysis Patient
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Foods</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="search">Search & Filter</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={showSafeOnly ? "default" : "outline"}
              onClick={() => setShowSafeOnly(!showSafeOnly)}
              size="sm"
            >
              <Filter className="h-3 w-3 mr-1" />
              Safe Only
            </Button>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoods.map((food) => (
              <Card key={food.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSafetyIcon(food)}
                        <div>
                          <div className="text-base font-semibold">{food.name.ne}</div>
                          <div className="text-sm text-muted-foreground font-normal">{food.name.en}</div>
                        </div>
                      </CardTitle>
                    </div>
                    {getSafetyBadge(food)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Nutritional Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{food.nutrients.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>{food.nutrients.protein}g protein</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.potassium, 'potassium')}`}>
                      <Heart className="h-3 w-3" />
                      <span>K⁺: {food.nutrients.potassium}mg</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.phosphorus, 'phosphorus')}`}>
                      <span>PO₄: {food.nutrients.phosphorus}mg</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.sodium, 'sodium')}`}>
                      <span>Na⁺: {food.nutrients.sodium}mg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      <span>{food.nutrients.fluid}ml</span>
                    </div>
                  </div>

                  {/* Serving Size */}
                  <div className="text-xs text-center bg-muted px-2 py-1 rounded">
                    Per {food.serving.amount} {food.serving.unit}
                  </div>

                  {/* Category Tag */}
                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-xs">
                      {FOOD_CATEGORIES.find(cat => cat.id === food.category)?.name.en || food.category}
                    </Badge>
                  </div>

                  {/* Preparation Notes (if any) */}
                  {food.preparationNotes && (
                    <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
                      💡 {food.preparationNotes.en}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No foods found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCategoryClick(category.id)}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <div>{category.name.ne}</div>
                    <div className="text-sm font-normal text-muted-foreground">{category.name.en}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Foods:</span>
                      <span className="font-semibold">{category.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Safe Options:</span>
                      <span className="font-semibold text-green-600">{category.safeCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(category.safeCount / category.count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          {/* Advanced Search Controls */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search foods in English or Nepali... (खाना खोज्नुहोस्)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {FOOD_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={patientType} onValueChange={(value: any) => setPatientType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Patient Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="ckd">CKD Patient</SelectItem>
                  <SelectItem value="dialysis">Dialysis Patient</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showSafeOnly ? "default" : "outline"}
                onClick={() => setShowSafeOnly(!showSafeOnly)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showSafeOnly ? "Showing Safe Only" : "Show Safe Only"}
              </Button>
            </div>
          </div>

          {/* Search Results Summary */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Showing {filteredFoods.length} foods
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory !== "all" && ` in ${FOOD_CATEGORIES.find(cat => cat.id === selectedCategory)?.name.en}`}
              {showSafeOnly && ` (safe for ${patientType} patients)`}
            </p>
          </div>

          {/* Results Grid - Same as browse tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoods.map((food) => (
              <Card key={food.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSafetyIcon(food)}
                        <div>
                          <div className="text-base font-semibold">{food.name.ne}</div>
                          <div className="text-sm text-muted-foreground font-normal">{food.name.en}</div>
                        </div>
                      </CardTitle>
                    </div>
                    {getSafetyBadge(food)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{food.nutrients.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>{food.nutrients.protein}g protein</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.potassium, 'potassium')}`}>
                      <Heart className="h-3 w-3" />
                      <span>K⁺: {food.nutrients.potassium}mg</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.phosphorus, 'phosphorus')}`}>
                      <span>PO₄: {food.nutrients.phosphorus}mg</span>
                    </div>
                    <div className={`flex items-center gap-1 ${getNutrientColor(food.nutrients.sodium, 'sodium')}`}>
                      <span>Na⁺: {food.nutrients.sodium}mg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      <span>{food.nutrients.fluid}ml</span>
                    </div>
                  </div>

                  <div className="text-xs text-center bg-muted px-2 py-1 rounded">
                    Per {food.serving.amount} {food.serving.unit}
                  </div>

                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-xs">
                      {FOOD_CATEGORIES.find(cat => cat.id === food.category)?.name.en || food.category}
                    </Badge>
                  </div>

                  {food.preparationNotes && (
                    <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
                      💡 {food.preparationNotes.en}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
