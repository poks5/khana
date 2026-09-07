
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export const SafetyClassificationGuide = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Info className="h-6 w-6" />
          Dialysis Food Safety Classification
        </h2>
        <p className="text-muted-foreground">
          Understanding safety levels for dialysis patients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Safe Foods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              Dialysis Safe
            </Badge>
            <div className="text-sm space-y-2">
              <p><strong>Criteria:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Potassium &lt; 200mg per serving</li>
                <li>Phosphorus &lt; 150mg per serving</li>
                <li>Sodium &lt; 300mg per serving</li>
                <li>Can be eaten regularly</li>
              </ul>
            </div>
            <div className="text-sm">
              <p><strong>Examples:</strong></p>
              <p className="text-muted-foreground">White rice, cauliflower, apples, egg whites</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              Use with Caution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
              Preparation Required
            </Badge>
            <div className="text-sm space-y-2">
              <p><strong>Criteria:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Moderate potassium/phosphorus</li>
                <li>Requires special preparation</li>
                <li>Limited portion sizes</li>
                <li>Monitor frequency</li>
              </ul>
            </div>
            <div className="text-sm">
              <p><strong>Examples:</strong></p>
              <p className="text-muted-foreground">Lentils (soaked), meat proteins, dairy products</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="h-5 w-5" />
              Avoid/Restrict
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
              High Risk
            </Badge>
            <div className="text-sm space-y-2">
              <p><strong>Criteria:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Potassium &gt; 400mg per serving</li>
                <li>Phosphorus &gt; 250mg per serving</li>
                <li>Sodium &gt; 600mg per serving</li>
                <li>Avoid completely or tiny portions</li>
              </ul>
            </div>
            <div className="text-sm">
              <p><strong>Examples:</strong></p>
              <p className="text-muted-foreground">Bananas, processed foods, dried meat (sukuti)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preparation Methods for Safety</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Double Boiling Method:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Boil food with water for 5-10 minutes</li>
                <li>Discard the cooking water completely</li>
                <li>Add fresh water and cook until done</li>
                <li>Reduces potassium by 30-50%</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Soaking Method:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Soak food in water for 4+ hours</li>
                <li>Change water 2-3 times</li>
                <li>Discard all soaking water</li>
                <li>Reduces potassium by 20-30%</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
