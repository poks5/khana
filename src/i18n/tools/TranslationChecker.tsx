
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, XCircle, Download } from "lucide-react";
import { i18nConfig } from '../config/i18n.config';

interface TranslationStats {
  namespace: string;
  totalKeys: number;
  translatedKeys: number;
  missingKeys: string[];
  percentage: number;
}

export const TranslationChecker: React.FC = () => {
  const [stats, setStats] = useState<TranslationStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ne'>('ne');

  useEffect(() => {
    checkTranslationCompleteness();
  }, [selectedLanguage]);

  const checkTranslationCompleteness = async () => {
    setIsLoading(true);
    const translationStats: TranslationStats[] = [];

    for (const namespace of i18nConfig.namespaces) {
      try {
        // Load English (base) translations
        const enModule = await import(`../../translations/en/${namespace}.json`);
        const enTranslations = enModule.default || enModule;
        
        // Load target language translations
        const targetModule = await import(`../../translations/${selectedLanguage}/${namespace}.json`);
        const targetTranslations = targetModule.default || targetModule;

        const enKeys = getAllKeys(enTranslations);
        const targetKeys = getAllKeys(targetTranslations);
        
        const missingKeys = enKeys.filter(key => !hasKey(targetTranslations, key));
        
        translationStats.push({
          namespace,
          totalKeys: enKeys.length,
          translatedKeys: enKeys.length - missingKeys.length,
          missingKeys,
          percentage: Math.round(((enKeys.length - missingKeys.length) / enKeys.length) * 100)
        });
      } catch (error) {
        console.error(`Failed to check translations for ${namespace}:`, error);
        translationStats.push({
          namespace,
          totalKeys: 0,
          translatedKeys: 0,
          missingKeys: [],
          percentage: 0
        });
      }
    }

    setStats(translationStats);
    setIsLoading(false);
  };

  const getAllKeys = (obj: any, prefix = ''): string[] => {
    let keys: string[] = [];
    
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  };

  const hasKey = (obj: any, key: string): boolean => {
    const keys = key.split('.');
    let current = obj;
    
    for (const k of keys) {
      if (current === null || current === undefined || !(k in current)) {
        return false;
      }
      current = current[k];
    }
    
    return current !== null && current !== undefined && current !== '';
  };

  const generateTranslationReport = () => {
    const report = {
      language: selectedLanguage,
      timestamp: new Date().toISOString(),
      overall: {
        totalNamespaces: stats.length,
        averageCompletion: Math.round(stats.reduce((acc, stat) => acc + stat.percentage, 0) / stats.length),
        totalKeys: stats.reduce((acc, stat) => acc + stat.totalKeys, 0),
        totalTranslated: stats.reduce((acc, stat) => acc + stat.translatedKeys, 0)
      },
      details: stats
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-report-${selectedLanguage}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const overallCompletion = stats.length > 0 
    ? Math.round(stats.reduce((acc, stat) => acc + stat.percentage, 0) / stats.length)
    : 0;

  const getStatusIcon = (percentage: number) => {
    if (percentage === 100) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (percentage >= 80) return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Translation Completeness Checker
            <div className="flex gap-2">
              <Button
                variant={selectedLanguage === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('en')}
              >
                English
              </Button>
              <Button
                variant={selectedLanguage === 'ne' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('ne')}
              >
                नेपाली
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateTranslationReport}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm text-muted-foreground">{overallCompletion}%</span>
              </div>
              <Progress value={overallCompletion} className="h-2" />
            </div>
          )}

          <div className="grid gap-4">
            {isLoading ? (
              <div className="text-center py-8">Loading translation analysis...</div>
            ) : (
              stats.map((stat) => (
                <Card key={stat.namespace} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(stat.percentage)}
                      <span className="font-medium capitalize">{stat.namespace}</span>
                      <Badge variant={stat.percentage === 100 ? 'default' : 'secondary'}>
                        {stat.translatedKeys}/{stat.totalKeys}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
                  </div>
                  
                  <Progress value={stat.percentage} className="h-1 mb-2" />
                  
                  {stat.missingKeys.length > 0 && (
                    <Alert className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="text-sm">
                          <strong>Missing keys:</strong>
                          <div className="mt-1 text-xs text-muted-foreground max-h-20 overflow-y-auto">
                            {stat.missingKeys.slice(0, 5).join(', ')}
                            {stat.missingKeys.length > 5 && ` ... and ${stat.missingKeys.length - 5} more`}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
