import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

export const SafetyOverview = () => {
  const { language } = useLanguage();

  const safetyLevels = [
    {
      icon: CheckCircle,
      title: language === 'ne' ? 'सुरक्षित खानेकुरा' : 'Safe Foods',
      description: language === 'ne' 
        ? 'नियमित रूपमा खान सकिन्छ' 
        : 'Can eat regularly',
      examples: language === 'ne' 
        ? 'सेतो भात, काउली, स्याउ, अण्डाको सेतो भाग' 
        : 'White rice, cauliflower, apples, egg whites',
      colorClass: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      iconClass: 'text-green-600 dark:text-green-400',
      textClass: 'text-green-800 dark:text-green-300',
    },
    {
      icon: AlertTriangle,
      title: language === 'ne' ? 'सावधानी आवश्यक' : 'Use with Caution',
      description: language === 'ne' 
        ? 'सीमित मात्रामा, तयारी विधि अनुसार' 
        : 'Limited portions, special preparation',
      examples: language === 'ne' 
        ? 'दाल (भिजाएको), मासु, दूध' 
        : 'Lentils (soaked), meat, dairy',
      colorClass: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
      iconClass: 'text-amber-600 dark:text-amber-400',
      textClass: 'text-amber-800 dark:text-amber-300',
    },
    {
      icon: XCircle,
      title: language === 'ne' ? 'खान नहुने' : 'Avoid',
      description: language === 'ne' 
        ? 'खान नहुने वा अत्यन्त थोरै मात्रा' 
        : 'Avoid completely or tiny portions',
      examples: language === 'ne' 
        ? 'केरा, प्रशोधित खाना, सुकुटी' 
        : 'Bananas, processed foods, sukuti',
      colorClass: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      iconClass: 'text-red-600 dark:text-red-400',
      textClass: 'text-red-800 dark:text-red-300',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'ne' ? '🚦 खाना सुरक्षा गाइड' : '🚦 Food Safety Guide'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {safetyLevels.map((level) => {
          const Icon = level.icon;
          return (
            <Card key={level.title} className={`border ${level.colorClass} shadow-sm`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${level.iconClass}`} />
                  <span className={`font-semibold text-sm ${level.textClass}`}>{level.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{level.description}</p>
                <p className="text-xs font-medium text-foreground/70">{level.examples}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
