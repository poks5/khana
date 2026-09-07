
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ShieldCheck, Plus } from "lucide-react";

interface DatabaseHeaderProps {
  totalFoods: number;
  safeFoods: number;
  adminFoods?: number;
}

export const DatabaseHeader = ({ totalFoods, safeFoods, adminFoods = 0 }: DatabaseHeaderProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Database className="h-8 w-8 text-primary" />
          Nephro Nutrition Food Master Database
        </CardTitle>
        <p className="text-muted-foreground">
          Comprehensive kidney-friendly food database with nutritional information and safety guidelines
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalFoods}</div>
            <div className="text-sm text-muted-foreground">Total Foods</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{safeFoods}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Dialysis Safe
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{totalFoods - safeFoods}</div>
            <div className="text-sm text-muted-foreground">Needs Caution</div>
          </div>
          {adminFoods > 0 && (
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{adminFoods}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Plus className="h-3 w-3" />
                Admin Added
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            7 Food Categories
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Bilingual Support
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Cultural Context
          </Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Preparation Notes
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
