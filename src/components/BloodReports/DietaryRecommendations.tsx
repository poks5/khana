
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DietaryRecommendation } from "@/types";
import { ChevronDown, Heart, Utensils, Pill, Info } from "lucide-react";
import { useState } from "react";

interface DietaryRecommendationsProps {
  recommendations: DietaryRecommendation[];
  onShowExplanation: () => void;
}

export const DietaryRecommendations = ({ recommendations, onShowExplanation }: DietaryRecommendationsProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protein':
        return <Utensils className="h-4 w-4" />;
      case 'vitamin':
      case 'mineral':
        return <Pill className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Heart className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Great Job!</h3>
          <p className="text-muted-foreground text-center">
            Your lab values look good. Continue with your current dietary plan.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">Personalized Dietary Recommendations</h4>
        <Button variant="outline" size="sm" onClick={onShowExplanation}>
          <Info className="h-4 w-4 mr-2" />
          How This Works
        </Button>
      </div>

      <div className="space-y-3">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id}>
            <Collapsible 
              open={expandedItems.includes(recommendation.id)}
              onOpenChange={() => toggleItem(recommendation.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {getCategoryIcon(recommendation.category)}
                      {recommendation.title}
                      <Badge variant={getPriorityColor(recommendation.priority) as "default" | "secondary" | "destructive" | "outline"}>
                        {recommendation.priority} priority
                      </Badge>
                    </CardTitle>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedItems.includes(recommendation.id) ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    {recommendation.description}
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Recommended Foods:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(recommendation.foods || []).map((food, index) => (
                          <li key={index}>{food}</li>
                        ))}
                      </ul>
                    </div>

                    {recommendation.supplements && recommendation.supplements.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">Supplements/Medications:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {recommendation.supplements.map((supplement, index) => (
                            <li key={index}>{supplement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Evidence:</strong> {recommendation.evidence}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};
