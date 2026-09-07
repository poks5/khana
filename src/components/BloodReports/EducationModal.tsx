
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, ExternalLink } from "lucide-react";

interface EducationModalProps {
  open: boolean;
  onClose: () => void;
}

export const EducationModal = ({ open, onClose }: EducationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            How Our Recommendations Work
          </DialogTitle>
          <DialogDescription>
            Understanding the science behind your personalized dietary advice
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Evidence-Based Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Our recommendations are based on internationally recognized clinical practice guidelines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>KDOQI (Kidney Disease Outcomes Quality Initiative)</strong> - Clinical Practice Guidelines for Nutrition in Chronic Kidney Disease</li>
                <li><strong>KDIGO (Kidney Disease: Improving Global Outcomes)</strong> - Guidelines for CKD-Mineral and Bone Disorders</li>
                <li><strong>NKF (National Kidney Foundation)</strong> - Clinical Practice Recommendations</li>
                <li><strong>ISRNM (International Society for Renal Nutrition & Metabolism)</strong> - Evidence-based recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                How We Analyze Your Labs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Lab Value Assessment</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Compare your values to dialysis-specific normal ranges</li>
                    <li>Identify patterns that indicate nutritional deficiencies</li>
                    <li>Assess severity based on clinical significance</li>
                    <li>Consider interactions between different parameters</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recommendation Generation</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Rule-based algorithms using clinical protocols</li>
                    <li>Priority scoring based on health impact</li>
                    <li>Renal-specific food and supplement suggestions</li>
                    <li>Evidence citations for transparency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Lab Parameters Explained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Albumin</h5>
                    <p>Reflects protein status and inflammation. Low levels suggest need for more high-quality protein.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Phosphorus</h5>
                    <p>High levels cause bone disease and heart problems. Requires dietary restriction and binders.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Potassium</h5>
                    <p>High levels can cause dangerous heart rhythms. Requires dietary limitation and proper dialysis.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">iPTH</h5>
                    <p>Measures parathyroid hormone. High levels indicate bone metabolism problems.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Hemoglobin</h5>
                    <p>Measures anemia. Low levels require iron supplementation and adequate protein.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Vitamin D</h5>
                    <p>Essential for bone health and immune function. Often deficient in dialysis patients.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Ferritin</h5>
                    <p>Measures iron stores. Important for managing anemia in dialysis patients.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Uric Acid</h5>
                    <p>Waste product that can cause gout. High levels may indicate inadequate dialysis.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>⚠️ Medical Supervision Required:</strong> Always consult your nephrologist and renal dietitian before making significant dietary changes.</p>
              <p><strong>📊 Individual Variation:</strong> Normal ranges may vary based on your specific condition, age, and treatment plan.</p>
              <p><strong>🔄 Regular Monitoring:</strong> Lab values change over time. Regular testing is essential for proper management.</p>
              <p><strong>💊 Medication Interactions:</strong> Some recommendations may interact with your medications. Always check with your healthcare team.</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
