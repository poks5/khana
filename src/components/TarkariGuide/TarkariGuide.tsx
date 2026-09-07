
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nepaliVegetables } from "@/data/nepaliVegetables";
import { VegetableProfile } from "@/data/nepaliVegetables";
import { Search, Carrot, AlertTriangle, Info } from "lucide-react";
import { VegetableCard } from "./VegetableCard";
import { PreparationGuide } from "./PreparationGuide";
import { SafetyLegend } from "./SafetyLegend";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

export const TarkariGuide = () => {
  const { tt, isNepali } = useUnifiedTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSafety, setSelectedSafety] = useState("all");
  const [selectedPotassium, setSelectedPotassium] = useState("all");

  const filteredVegetables = nepaliVegetables.filter(vegetable => {
    const matchesSearch = vegetable.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vegetable.name.ne.includes(searchTerm);
    
    const matchesSafety = selectedSafety === "all" || 
                         (selectedSafety === "safe" && vegetable.safetyProfile.ckdSafe) ||
                         (selectedSafety === "caution" && !vegetable.safetyProfile.ckdSafe && vegetable.safetyProfile.preparationRequired) ||
                         (selectedSafety === "avoid" && !vegetable.safetyProfile.ckdSafe && !vegetable.safetyProfile.preparationRequired);
    
    const matchesPotassium = selectedPotassium === "all" || vegetable.potassiumLevel === selectedPotassium;
    
    return matchesSearch && matchesSafety && matchesPotassium;
  });

  const safetyCategories = ["all", "safe", "caution", "avoid"];
  const potassiumLevels = ["all", "low", "medium", "high"];

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "safe": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "caution": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "avoid": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getSafetyLabel = (safety: string) => {
    const labels = {
      safe: tt('recommendations.tarkari_guide.safety.safe', '✅ CKD Safe'),
      caution: tt('recommendations.tarkari_guide.safety.caution', '⚠️ Use Caution'),
      avoid: tt('recommendations.tarkari_guide.safety.avoid', '❌ Avoid/Limit'),
      all: tt('recommendations.tarkari_guide.safety.all', 'All Vegetables')
    };
    return labels[safety as keyof typeof labels] || safety;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Carrot className="h-8 w-8" />
          <UnifiedLanguageText translationKey="recommendations.tarkari_guide.title" fallback="Tarkari Guide: Vegetables for Kidney Health" />
        </h2>
        <p className="text-muted-foreground">
          <UnifiedLanguageText translationKey="recommendations.tarkari_guide.subtitle" fallback="तरकारी गाइड: मिर्गौला स्वास्थ्यका लागि तरकारी छनोट र तयारी" />
        </p>
      </div>

      <Tabs defaultValue="vegetables" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vegetables" className="flex items-center gap-2">
            <Carrot className="h-4 w-4" />
            <UnifiedLanguageText translationKey="recommendations.tarkari_guide.tabs.vegetables" fallback="Vegetables" />
          </TabsTrigger>
          <TabsTrigger value="preparation" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <UnifiedLanguageText translationKey="recommendations.tarkari_guide.tabs.preparation" fallback="Preparation Guide" />
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <UnifiedLanguageText translationKey="recommendations.tarkari_guide.tabs.safety" fallback="Safety Guide" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vegetables" className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tt('recommendations.tarkari_guide.search_placeholder', 'Search vegetables in English or Nepali... (तरकारी खोज्नुहोस्)')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">
                  <UnifiedLanguageText translationKey="recommendations.tarkari_guide.filters.safety_level" fallback="Safety Level:" />
                </span>
                {safetyCategories.map(safety => (
                  <Badge
                    key={safety}
                    variant={selectedSafety === safety ? "default" : "outline"}
                    className={`cursor-pointer capitalize ${selectedSafety === safety ? '' : getSafetyColor(safety)}`}
                    onClick={() => setSelectedSafety(safety)}
                  >
                    {getSafetyLabel(safety)}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">
                  <UnifiedLanguageText translationKey="recommendations.tarkari_guide.filters.potassium" fallback="Potassium:" />
                </span>
                {potassiumLevels.map(level => (
                  <Badge
                    key={level}
                    variant={selectedPotassium === level ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedPotassium(level)}
                  >
                    {level === "all" ? tt('recommendations.tarkari_guide.filters.all_levels', 'All Levels') : `${level} K+`}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Vegetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVegetables.map((vegetable) => (
              <VegetableCard key={vegetable.id} vegetable={vegetable} />
            ))}
          </div>

          {filteredVegetables.length === 0 && (
            <div className="text-center py-12">
              <Carrot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                <UnifiedLanguageText translationKey="recommendations.tarkari_guide.no_results.title" fallback="No vegetables found" />
              </h3>
              <p className="text-muted-foreground">
                <UnifiedLanguageText translationKey="recommendations.tarkari_guide.no_results.description" fallback="Try adjusting your search terms or filters" />
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="preparation">
          <PreparationGuide />
        </TabsContent>

        <TabsContent value="safety">
          <SafetyLegend />
        </TabsContent>
      </Tabs>
    </div>
  );
};
