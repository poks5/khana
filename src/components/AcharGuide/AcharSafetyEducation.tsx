
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Heart, Droplets } from "lucide-react";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

export const AcharSafetyEducation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">
          <UnifiedLanguageText>Achar Safety Education for Kidney Patients</UnifiedLanguageText>
        </h3>
        <p className="text-muted-foreground">
          <UnifiedLanguageText>मिर्गौला बिरामीहरूका लागि अचार सुरक्षा शिक्षा</UnifiedLanguageText>
        </p>
      </div>

      <div className="grid gap-6">
        {/* Safe Achars */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <UnifiedLanguageText>Safe Achars (Daily Use)</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-700">
              <UnifiedLanguageText>
                These achars are made from kidney-safe ingredients and can be consumed in small amounts daily.
              </UnifiedLanguageText>
            </p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-semibold text-green-800 flex items-center gap-2">
                  🌿 <UnifiedLanguageText>Fresh Herb Achars</UnifiedLanguageText>
                </h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• धनिया अचार (Coriander Pickle) - 1 tsp/meal</li>
                  <li>• पुदिना चटनी (Mint Chutney) - 1 tsp/meal</li>
                  <li>• हरियो खुर्सानी (Green Chili Pickle) - minimal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* High-Risk Achars */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <XCircle className="h-5 w-5" />
              <UnifiedLanguageText>High-Risk Achars (Avoid Completely)</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-700">
              <UnifiedLanguageText>
                These achars contain extremely high levels of potassium, sodium, or other harmful compounds.
              </UnifiedLanguageText>
            </p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-red-200">
                <h4 className="font-semibold text-red-800 flex items-center gap-2">
                  🍅 <UnifiedLanguageText>Tomato-Based Achars</UnifiedLanguageText>
                </h4>
                <div className="text-sm text-red-700 mt-2">
                  <p className="font-medium">गोलभेडा अचार (Tomato Pickle)</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge className="bg-red-100 text-red-800">Very High K+</Badge>
                    <Badge className="bg-red-100 text-red-800">High Sodium</Badge>
                    <Badge className="bg-red-100 text-red-800">Acidic</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border border-red-200">
                <h4 className="font-semibold text-red-800 flex items-center gap-2">
                  🥬 <UnifiedLanguageText>Fermented Vegetables</UnifiedLanguageText>
                </h4>
                <div className="text-sm text-red-700 mt-2">
                  <p className="font-medium">गुन्द्रुक अचार (Gundruk Pickle)</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge className="bg-red-100 text-red-800">High K+</Badge>
                    <Badge className="bg-red-100 text-red-800">Fermented</Badge>
                    <Badge className="bg-red-100 text-red-800">High Na+</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Achars Are Risky */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Heart className="h-5 w-5" />
                <UnifiedLanguageText>Cardiac Risk</UnifiedLanguageText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-orange-800">High Potassium Effects:</p>
                <ul className="text-orange-700 mt-1 space-y-1">
                  <li>• Irregular heartbeat</li>
                  <li>• Cardiac arrest risk</li>
                  <li>• Muscle weakness</li>
                  <li>• हृदयघात को जोखिम</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Droplets className="h-5 w-5" />
                <UnifiedLanguageText>Fluid Retention</UnifiedLanguageText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-blue-800">High Sodium Effects:</p>
                <ul className="text-blue-700 mt-1 space-y-1">
                  <li>• Increased thirst</li>
                  <li>• Fluid overload</li>
                  <li>• High blood pressure</li>
                  <li>• सुन्निने र सास फेर्न गाह्रो</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practical Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <UnifiedLanguageText>Practical Tips for Achar Consumption</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">✅ Do This:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Make fresh coriander chutney at home</li>
                  <li>• Use minimal salt in preparation</li>
                  <li>• Limit to 1 teaspoon per meal</li>
                  <li>• घरमा बनाएको धनिया चटनी प्रयोग गर्नुहोस्</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">❌ Avoid This:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Commercial pickles with preservatives</li>
                  <li>• Oil-based achars</li>
                  <li>• Large portions (greater than 1 tsp)</li>
                  <li>• बजारमा पाइने अचारहरू नखानुहोस्</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
