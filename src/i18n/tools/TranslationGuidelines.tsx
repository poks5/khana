
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Users, Target, CheckSquare } from "lucide-react";

export const TranslationGuidelines: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Translation Guidelines & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="context" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="medical">Medical Terms</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>

            <TabsContent value="context" className="space-y-4">
              <Alert>
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>Contextual Translation Guidelines</strong>
                  <br />Always consider the user's medical condition and cultural background when translating.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medical Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Kidney/Dialysis Terms</Badge>
                      <div className="text-sm space-y-1">
                        <p><strong>English:</strong> Dialysis → <strong>Nepali:</strong> डायलासिस (transliterated, widely understood)</p>
                        <p><strong>English:</strong> Kidney → <strong>Nepali:</strong> मिर्गौला (traditional term preferred)</p>
                        <p><strong>English:</strong> Potassium → <strong>Nepali:</strong> पोटासियम (medical context)</p>
                        <p><strong>English:</strong> Phosphorus → <strong>Nepali:</strong> फस्फोरस (medical context)</p>
                      </div>
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="mb-2">Measurement Units</Badge>
                      <div className="text-sm space-y-1">
                        <p><strong>grams (g)</strong> → <strong>ग्राम (g)</strong> - Keep unit abbreviation</p>
                        <p><strong>milligrams (mg)</strong> → <strong>मिलिग्राम (mg)</strong> - Keep unit abbreviation</p>
                        <p><strong>milliliters (ml)</strong> → <strong>मिलिलिटर (ml)</strong> - Keep unit abbreviation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Food Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Traditional Foods</Badge>
                      <div className="text-sm space-y-1">
                        <p><strong>Rice:</strong> Use "चामल" (chamal) for raw rice, "भात" (bhat) for cooked rice</p>
                        <p><strong>Lentils:</strong> Use "दाल" (dal) - universally understood</p>
                        <p><strong>Vegetables:</strong> Use "तरकारी" (tarkari) for general vegetables</p>
                        <p><strong>Curry:</strong> Use "तरकारी" rather than transliterating "curry"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Medical Translation Priorities:</strong>
                  <br />1. Accuracy over fluency
                  <br />2. Use established medical terms
                  <br />3. Maintain consistency across all contexts
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Critical Medical Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Kidney Function Terms</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Creatinine → क्रिएटिनिन</div>
                        <div>BUN → बीयूएन</div>
                        <div>GFR → जीएफआर</div>
                        <div>Albumin → एल्बुमिन</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Electrolytes</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Sodium → सोडियम</div>
                        <div>Potassium → पोटासियम</div>
                        <div>Calcium → क्याल्सियम</div>
                        <div>Magnesium → म्याग्नेसियम</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Safety Levels</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Safe → सुरक्षित</div>
                        <div>Limited → सीमित</div>
                        <div>Avoid → नखानुहोस्</div>
                        <div>Dangerous → खतरनाक</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cultural" className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Cultural Sensitivity:</strong>
                  <br />Adapt medical advice to fit within Nepali cultural and dietary practices.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cultural Adaptations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Meal Patterns</Badge>
                      <div className="text-sm">
                        <p><strong>Western "Breakfast, Lunch, Dinner"</strong></p>
                        <p><strong>Nepali:</strong> "बिहानको खाना, दिउँसोको खाना, बेलुकीको खाना"</p>
                        <p className="text-muted-foreground mt-1">
                          Note: Consider traditional timing - Nepali dinner is often earlier
                        </p>
                      </div>
                    </div>

                    <div>
                      <Badge variant="outline" className="mb-2">Religious Considerations</Badge>
                      <div className="text-sm">
                        <p><strong>Fasting:</strong> "बसा/व्रत" - Consider religious fasting practices</p>
                        <p><strong>Vegetarian:</strong> "शाकाहारी" - Important dietary restriction</p>
                        <p className="text-muted-foreground mt-1">
                          Always provide vegetarian alternatives for medical recommendations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Variations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <p><strong>Standard Nepali:</strong> Use for medical terms and formal instructions</p>
                      <p><strong>Common Usage:</strong> Mix traditional and transliterated terms as appropriate</p>
                      <p><strong>Food Names:</strong> Prefer traditional Nepali names over English transliterations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Quality Assurance Checklist:</strong>
                  <br />Every translation should pass these quality checks before implementation.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Translation Quality Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">✅ Accuracy Check</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Medical terminology is correct and consistent</li>
                        <li>• Numbers and measurements are preserved accurately</li>
                        <li>• Safety levels (safe/limited/avoid) are clearly conveyed</li>
                        <li>• Context matches the original meaning</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">✅ Cultural Appropriateness</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Uses familiar food terms and concepts</li>
                        <li>• Respects dietary restrictions and preferences</li>
                        <li>• Considers traditional meal patterns</li>
                        <li>• Appropriate tone for medical advice</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">✅ Technical Quality</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Proper Devanagari script rendering</li>
                        <li>• Consistent terminology across app</li>
                        <li>• Appropriate length for UI constraints</li>
                        <li>• No truncation or overflow issues</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">✅ User Experience</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Clear and easy to understand</li>
                        <li>• Actionable instructions</li>
                        <li>• Appropriate reading level</li>
                        <li>• Maintains urgency for safety warnings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
