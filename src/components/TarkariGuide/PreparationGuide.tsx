
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Flame, Clock, AlertCircle } from "lucide-react";

export const PreparationGuide = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">How to Prepare Tarkari for Kidney Patients</h3>
        <p className="text-muted-foreground">मिर्गौला बिरामीहरूका लागि तरकारी तयार गर्ने तरिका</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Double Boiling Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Double Boiling Method
            </CardTitle>
            <p className="text-sm text-muted-foreground">दुई पटक उमाल्ने तरिका</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                <div>
                  <p className="font-medium">Cut vegetables small</p>
                  <p className="text-sm text-muted-foreground">तरकारी साना साना काट्नुहोस्</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                <div>
                  <p className="font-medium">Boil for 3-5 minutes</p>
                  <p className="text-sm text-muted-foreground">३-५ मिनेट उमाल्नुहोस्</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-red-100 text-red-800 min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                <div>
                  <p className="font-medium">Discard all water completely</p>
                  <p className="text-sm text-muted-foreground">सबै पानी फ्याँक्नुहोस्</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-100 text-green-800 min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                <div>
                  <p className="font-medium">Boil again in fresh water</p>
                  <p className="text-sm text-muted-foreground">फेरि नयाँ पानीमा उमाल्नुहोस्</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm font-medium text-green-800">
                ✅ Reduces potassium by 30-50%
              </p>
              <p className="text-xs text-green-700">पोटासियम ३०-५०% कम हुन्छ</p>
            </div>
          </CardContent>
        </Card>

        {/* Salt-Free Seasoning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-600" />
              Salt-Free Seasoning
            </CardTitle>
            <p className="text-sm text-muted-foreground">नुन बिना मसला</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium text-green-700">✅ Use These:</p>
              <ul className="space-y-1 text-sm">
                <li>• Fresh ginger (अदुवा)</li>
                <li>• Fresh garlic (लसुन)</li>
                <li>• Turmeric (बेसार)</li>
                <li>• Coriander seeds (धनियाको दाना)</li>
                <li>• Cumin seeds (जीरा)</li>
                <li>• Fresh herbs (हरियो धनिया)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-red-700">❌ Avoid These:</p>
              <ul className="space-y-1 text-sm">
                <li>• Salt (नुन)</li>
                <li>• Ready-made masala</li>
                <li>• Soy sauce</li>
                <li>• Pickles (अचार)</li>
                <li>• MSG</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Cooking Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Best Cooking Methods
            </CardTitle>
            <p className="text-sm text-muted-foreground">राम्रो पकाउने तरिका</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">✅ Recommended</Badge>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Steaming (भाप देखि पकाउने)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Double boiling (दुई पटक उमाल्ने)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Light sautéing (हल्का भुट्ने)
              </li>
            </ul>
            
            <div className="flex items-center gap-2 mt-4">
              <Badge className="bg-red-100 text-red-800">❌ Avoid</Badge>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Deep frying (गहिरो तेल मा भुट्ने)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Raw consumption of high-K+ vegetables
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Portion Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Portion Control Guidelines
            </CardTitle>
            <p className="text-sm text-muted-foreground">मात्रा नियन्त्रण</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-green-700">Low K+ Vegetables:</p>
                <p className="text-sm text-muted-foreground">1-2 cups per meal (safe)</p>
              </div>
              <div>
                <p className="font-medium text-yellow-700">Medium K+ Vegetables:</p>
                <p className="text-sm text-muted-foreground">1/2 - 3/4 cup per meal (with double boiling)</p>
              </div>
              <div>
                <p className="font-medium text-red-700">High K+ Vegetables:</p>
                <p className="text-sm text-muted-foreground">1/4 cup or less (only if double boiled)</p>
              </div>
            </div>
            <div className="bg-amber-50 p-3 rounded">
              <p className="text-sm font-medium text-amber-800">
                ⚠️ Always consult with your dietitian for personalized portions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
