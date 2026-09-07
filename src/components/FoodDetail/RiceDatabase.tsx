import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wheat } from "lucide-react";
import { nepaliRice } from "@/data/nepaliRice";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";
import { RiceEducationSection } from "./RiceEducationSection";
import { RiceFilters } from "./RiceFilters";
import { RiceCard } from "./RiceCard";

export const RiceDatabase = () => {
  const { t } = useLanguage();
  const [selectedPatientType, setSelectedPatientType] = useState<"ckd" | "dialysis" | "diabetes" | "all">("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showEducation, setShowEducation] = useState(false);

  const toggleCardExpansion = (riceId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(riceId)) {
      newExpanded.delete(riceId);
    } else {
      newExpanded.add(riceId);
    }
    setExpandedCards(newExpanded);
  };

  const filteredRice = nepaliRice.filter(rice => {
    if (searchTerm && !rice.name.en.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !rice.name.ne.includes(searchTerm)) {
      return false;
    }
    
    if (selectedPatientType === "all") return true;
    
    switch (selectedPatientType) {
      case "ckd":
        return rice.safetyProfile.ckdSafe;
      case "dialysis":
        return rice.safetyProfile.dialysisSafe;
      case "diabetes":
        return rice.safetyProfile.diabetesSafe;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Wheat className="h-8 w-8" />
          {t('recommendations.clinical_tips.rice-safety.title')}
        </h2>
        <p className="text-muted-foreground">{t('recommendations.clinical_tips.rice-safety.description')}</p>
      </div>

      <RiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPatientType={selectedPatientType}
        setSelectedPatientType={setSelectedPatientType}
        showEducation={showEducation}
        setShowEducation={setShowEducation}
      />

      <RiceEducationSection showEducation={showEducation} />

      {/* Rice Cards */}
      <div className="grid gap-4">
        {filteredRice.map((rice) => (
          <RiceCard
            key={rice.id}
            rice={rice}
            isExpanded={expandedCards.has(rice.id)}
            onToggleExpansion={() => toggleCardExpansion(rice.id)}
          />
        ))}
      </div>

      {filteredRice.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">{t('food.search.no_results')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
