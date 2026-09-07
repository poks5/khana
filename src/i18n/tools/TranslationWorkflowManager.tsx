
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranslationChecker } from './TranslationChecker';
import { TranslationGuidelines } from './TranslationGuidelines';
import { DynamicTranslationManager } from './DynamicTranslationManager';
import { Settings, FileText, Globe, CheckCircle } from "lucide-react";

export const TranslationWorkflowManager: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Translation Management Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="checker" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="checker" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Quality Check
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Guidelines
              </TabsTrigger>
              <TabsTrigger value="dynamic" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Dynamic Content
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Workflow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checker">
              <TranslationChecker />
            </TabsContent>

            <TabsContent value="guidelines">
              <TranslationGuidelines />
            </TabsContent>

            <TabsContent value="dynamic">
              <DynamicTranslationManager />
            </TabsContent>

            <TabsContent value="workflow">
              <Card>
                <CardHeader>
                  <CardTitle>Translation Workflow Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-lg">1. Content Creation</h3>
                      <p className="text-sm text-muted-foreground">
                        Developers add new content using translation keys with context comments
                      </p>
                      <code className="text-xs bg-muted p-1 rounded block mt-1">
                        t('medical.potassium_warning', {'{}'}, 'High potassium foods should be avoided')
                      </code>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h3 className="font-semibold text-lg">2. Translation Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Use the Quality Checker to identify missing translations and review completeness
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold text-lg">3. Medical Review</h3>
                      <p className="text-sm text-muted-foreground">
                        All medical translations must be reviewed by a qualified Nepali-speaking healthcare professional
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="font-semibold text-lg">4. User Testing</h3>
                      <p className="text-sm text-muted-foreground">
                        Test translations with target users to ensure clarity and cultural appropriateness
                      </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h3 className="font-semibold text-lg">5. Quality Assurance</h3>
                      <p className="text-sm text-muted-foreground">
                        Final review using the guidelines checklist before deployment
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🚨 Critical Safety Reminder</h4>
                    <p className="text-sm">
                      All medical translations must be verified by qualified healthcare professionals 
                      who understand both languages and dialysis patient care requirements.
                    </p>
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
