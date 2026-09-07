
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Search, Filter, BookmarkPlus, AlertTriangle, CheckCircle, XCircle, Plus, Minus } from "lucide-react";
import { nepaliDals, DalProfile } from "@/data/nepaliDals";
import { DalDetailCard } from "./DalDetailCard";
import { DalComparison } from "./DalComparison";
import { toast } from "sonner";

export const DalDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientType, setPatientType] = useState<"ckd" | "dialysis">("ckd");
  const [selectedDals, setSelectedDals] = useState<string[]>([]);
  const [bookmarkedDals, setBookmarkedDals] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    safeOnly: false,
    lowPotassium: false,
    lowPhosphorus: false,
    lowWater: false
  });

  const filteredDals = nepaliDals.filter(dal => {
    const matchesSearch = dal.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dal.name.ne.includes(searchTerm);
    
    const matchesSafety = !filters.safeOnly || 
                         (patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe);
    
    const matchesLowK = !filters.lowPotassium || dal.nutritionPer100gRaw.potassium < 500;
    const matchesLowP = !filters.lowPhosphorus || dal.nutritionPer100gRaw.phosphorus < 250;
    const matchesLowWater = !filters.lowWater || dal.cookingImpact.waterContentCooked < 65;

    return matchesSearch && matchesSafety && matchesLowK && matchesLowP && matchesLowWater;
  });

  const getSafetyIcon = (dal: DalProfile) => {
    const isSafe = patientType === "ckd" ? dal.safetyProfile.ckdSafe : dal.safetyProfile.dialysisSafe;
    if (isSafe) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (dal.safetyProfile.restrictions.includes("completely avoid") || 
        dal.safetyProfile.restrictions.includes("extremely high potassium")) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const toggleBookmark = (dalId: string) => {
    setBookmarkedDals(prev => 
      prev.includes(dalId) 
        ? prev.filter(id => id !== dalId)
        : [...prev, dalId]
    );
    
    const dal = nepaliDals.find(d => d.id === dalId);
    if (dal) {
      const isBookmarked = bookmarkedDals.includes(dalId);
      toast.success(
        isBookmarked 
          ? `Removed ${dal.name.en} from bookmarks`
          : `Added ${dal.name.en} to bookmarks`
      );
    }
  };

  const toggleDalSelection = (dalId: string) => {
    setSelectedDals(prev => {
      if (prev.includes(dalId)) {
        const newSelection = prev.filter(id => id !== dalId);
        const dal = nepaliDals.find(d => d.id === dalId);
        if (dal) {
          toast.info(`Removed ${dal.name.en} from comparison`);
        }
        return newSelection;
      } else {
        if (prev.length >= 3) {
          toast.error("Maximum 3 dals can be compared at once");
          return prev;
        }
        const newSelection = [...prev, dalId];
        const dal = nepaliDals.find(d => d.id === dalId);
        if (dal) {
          toast.success(`Added ${dal.name.en} to comparison`);
        }
        return newSelection;
      }
    });
  };

  const clearAllSelections = () => {
    setSelectedDals([]);
    toast.info("Cleared all dal selections");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">नेपाली दाल पोषण गाइड</h2>
        <p className="text-muted-foreground">Comprehensive Nepali Dal Nutrition & Safety Guide</p>
      </div>

      {/* Patient Type Toggle */}
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <span className="font-medium">Patient Type:</span>
        <div className="flex gap-2">
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
      </div>

      {/* Comparison Status */}
      {selectedDals.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedDals.length}/3 dals selected for comparison</Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedDals.map(id => nepaliDals.find(d => d.id === id)?.name.en).join(", ")}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={clearAllSelections}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="database">Dal Database</TabsTrigger>
          <TabsTrigger value="comparison">
            Compare Dals {selectedDals.length > 0 && `(${selectedDals.length})`}
          </TabsTrigger>
          <TabsTrigger value="bookmarks">My Saved Dals</TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dals... (दाल खोज्नुहोस्)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Toggle
                pressed={filters.safeOnly}
                onPressedChange={(pressed) => setFilters(prev => ({ ...prev, safeOnly: pressed }))}
                size="sm"
              >
                <Filter className="h-3 w-3 mr-1" />
                Safe Only
              </Toggle>
              <Toggle
                pressed={filters.lowPotassium}
                onPressedChange={(pressed) => setFilters(prev => ({ ...prev, lowPotassium: pressed }))}
                size="sm"
              >
                Low K⁺ (&lt;500mg)
              </Toggle>
              <Toggle
                pressed={filters.lowPhosphorus}
                onPressedChange={(pressed) => setFilters(prev => ({ ...prev, lowPhosphorus: pressed }))}
                size="sm"
              >
                Low PO₄ (&lt;250mg)
              </Toggle>
              <Toggle
                pressed={filters.lowWater}
                onPressedChange={(pressed) => setFilters(prev => ({ ...prev, lowWater: pressed }))}
                size="sm"
              >
                Low Water (&lt;65g)
              </Toggle>
            </div>
          </div>

          {/* Dal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDals.map((dal) => (
              <Card key={dal.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getSafetyIcon(dal)}
                        {dal.name.ne}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{dal.name.en}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(dal.id)}
                        className={bookmarkedDals.includes(dal.id) ? "text-yellow-500" : ""}
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Protein: {dal.nutritionPer100gRaw.protein}g</div>
                    <div>K⁺: {dal.nutritionPer100gRaw.potassium}mg</div>
                    <div>PO₄: {dal.nutritionPer100gRaw.phosphorus}mg</div>
                    <div>Water: {dal.cookingImpact.waterContentCooked}g</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {dal.safetyProfile.restrictions.slice(0, 2).map((restriction, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {restriction}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={selectedDals.includes(dal.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDalSelection(dal.id)}
                      disabled={!selectedDals.includes(dal.id) && selectedDals.length >= 3}
                    >
                      {selectedDals.includes(dal.id) ? <Minus className="h-3 w-3 mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
                      {selectedDals.includes(dal.id) ? "Remove" : "Compare"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <DalComparison
            selectedDals={selectedDals.map(id => nepaliDals.find(d => d.id === id)!).filter(Boolean)}
            patientType={patientType}
            onRemoveDal={(dalId) => toggleDalSelection(dalId)}
          />
        </TabsContent>

        <TabsContent value="bookmarks">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Bookmarked Dals</h3>
            {bookmarkedDals.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <BookmarkPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No saved dals yet. Bookmark dals from the database.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedDals.map(dalId => {
                  const dal = nepaliDals.find(d => d.id === dalId);
                  if (!dal) return null;
                  return (
                    <DalDetailCard key={dal.id} dal={dal} patientType={patientType} />
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
