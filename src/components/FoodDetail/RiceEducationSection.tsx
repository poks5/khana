
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

interface RiceEducationSectionProps {
  showEducation: boolean;
}

export const RiceEducationSection = ({ showEducation }: RiceEducationSectionProps) => {
  if (!showEducation) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">
          <UnifiedLanguageText>Rice Selection Education for Kidney Patients</UnifiedLanguageText>
        </h3>
        <p className="text-muted-foreground">
          <UnifiedLanguageText>मिर्गौला बिरामीहरूका लागि चामल छनोट शिक्षा</UnifiedLanguageText>
        </p>
      </div>

      <div className="grid gap-6">
        {/* CKD Patients */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Info className="h-5 w-5" />
              <UnifiedLanguageText>For CKD Patients (Non-Dialysis)</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800">✅ Safe Rice Choices:</h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• सेतो चामल (White Rice) - all varieties</li>
                  <li>• मोटो चामल (Coarse Rice)</li>
                  <li>• उखुवा चामल (Local White Rice)</li>
                  <li>• 150g cooked rice per meal maximum</li>
                </ul>
              </div>
              <div className="bg-red-100 p-3 rounded border border-red-200">
                <h4 className="font-semibold text-red-800">❌ Avoid:</h4>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• कालो चामल (Black Rice) - high K+ and PO₄</li>
                  <li>• रातो चामल (Red Rice) - high minerals</li>
                  <li>• ब्राउन राइस (Brown Rice) - high phosphorus</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dialysis Patients */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <UnifiedLanguageText>For Dialysis Patients</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-semibold text-green-800">✅ Increased Portions Allowed:</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• सेतो चामल (White Rice) - 180-200g cooked per meal</li>
                  <li>• चिउरा (Beaten Rice) - excellent for fluid restriction</li>
                  <li>• Higher protein needs support larger portions</li>
                </ul>
              </div>
              <div className="bg-yellow-100 p-3 rounded border border-yellow-200">
                <h4 className="font-semibold text-yellow-800">⚠️ Special Considerations:</h4>
                <ul className="text-sm text-yellow-700 mt-2 space-य-1">
                  <li>• Monitor fluid intake from rice preparation</li>
                  <li>• Choose chiura for low-fluid meals</li>
                  <li>• Avoid rice porridge (high water content)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diabetes + Kidney Disease */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <AlertTriangle className="h-5 w-5" />
              <UnifiedLanguageText>Diabetes + Kidney Disease</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-purple-200">
                <h4 className="font-semibold text-purple-800">🔄 Complex Management:</h4>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• If kidney function normal: Choose low-GI colored rice</li>
                  <li>• If kidney disease present: White rice + portion control</li>
                  <li>• Combine with protein and vegetables</li>
                  <li>• Monitor blood sugar and kidney function</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cooking Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <UnifiedLanguageText>Smart Cooking Tips</UnifiedLanguageText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">✅ Preparation Tips:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Wash rice thoroughly before cooking</li>
                  <li>• Use appropriate water ratio</li>
                  <li>• For CKD: Cook with extra water, drain excess</li>
                  <li>• चामल राम्ररी धुनुहोस्</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">💡 Smart Choices:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Chiura for fluid restriction</li>
                  <li>• Small frequent meals</li>
                  <li>• Combine with safe vegetables</li>
                  <li>• तरल पदार्थ कम गर्न चिउरा खानुहोस्</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
