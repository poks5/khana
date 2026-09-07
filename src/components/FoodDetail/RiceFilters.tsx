
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen } from "lucide-react";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";

interface RiceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPatientType: "ckd" | "dialysis" | "diabetes" | "all";
  setSelectedPatientType: (type: "ckd" | "dialysis" | "diabetes" | "all") => void;
  showEducation: boolean;
  setShowEducation: (show: boolean) => void;
}

export const RiceFilters = ({
  searchTerm,
  setSearchTerm,
  selectedPatientType,
  setSelectedPatientType,
  showEducation,
  setShowEducation
}: RiceFiltersProps) => {
  const { tt } = useUnifiedTranslation();

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={tt('recommendations.rice_guide.search_placeholder', 'Search rice types... (चामलका किसिमहरू खोज्नुहोस्)')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Patient Type Filters */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">
            <UnifiedLanguageText>Patient Type:</UnifiedLanguageText>
          </span>
          {(['all', 'ckd', 'dialysis', 'diabetes'] as const).map(type => (
            <Badge
              key={type}
              variant={selectedPatientType === type ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setSelectedPatientType(type)}
            >
              {type === 'all' ? tt('recommendations.rice_guide.filters.all', 'All') : type.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* Education Toggle */}
        <Button
          variant={showEducation ? "default" : "outline"}
          onClick={() => setShowEducation(!showEducation)}
          size="sm"
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          <UnifiedLanguageText>
            {showEducation ? 'Hide Education' : 'Show Education'}
          </UnifiedLanguageText>
        </Button>
      </div>
    </div>
  );
};
