
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock, Users, AlertTriangle } from "lucide-react";

interface EnhancedMealTemplatesProps {
  onQuickAdd: (template: any) => void;
  onSelectWithMeal: (template: any) => void;
}

// Enhanced meal templates with more complete Nepali meals
const MEAL_TEMPLATES = [
  // Breakfast Templates
  {
    id: "morning_simple",
    mealType: "breakfast",
    nepali: "सामान्य बिहानको खाना",
    english: "Simple Breakfast",
    emoji: "🌅",
    time: "६-८ बजे",
    calories: 280,
    safe: true,
    items: ["चिया - १ कप", "बिस्कुट - २ टुक्रा", "अण्डा - १ टुक्रा"],
    description: "हल्का र सुरक्षित बिहानको खाना"
  },
  {
    id: "morning_chiura",
    mealType: "breakfast", 
    nepali: "चिउरा नाश्ता",
    english: "Beaten Rice Breakfast",
    emoji: "🥣",
    time: "६-८ बजे", 
    calories: 320,
    safe: true,
    items: ["चिउरा - १ कप", "चिनी - १ चम्चा", "दूध - आधा कप"],
    description: "पारम्परिक नेपाली नाश्ता"
  },

  // Lunch Templates
  {
    id: "basic_dal_bhat",
    mealType: "lunch",
    nepali: "सामान्य दाल भात",
    english: "Basic Dal Bhat",
    emoji: "🍛",
    time: "११-१ बजे",
    calories: 450,
    safe: false,
    items: ["भात - १ कप", "दाल - आधा कप", "तरकारी - आधा कप"],
    description: "नेपाली मुख्य खाना - सावधानीसाथ"
  },
  {
    id: "safe_lunch",
    mealType: "lunch",
    nepali: "सुरक्षित दिउँसोको खाना", 
    english: "Safe Lunch",
    emoji: "🥗",
    time: "११-१ बजे",
    calories: 350,
    safe: true,
    items: ["भात - आधा कप", "काउली - १ कप", "अण्डा - १ टुक्रा"],
    description: "डायलाइसिस बिरामीका लागि सुरक्षित"
  },

  // Dinner Templates  
  {
    id: "light_dinner",
    mealType: "dinner",
    nepali: "हल्का बेलुकीको खाना",
    english: "Light Dinner", 
    emoji: "🌙",
    time: "६-८ बजे",
    calories: 300,
    safe: true,
    items: ["रोटी - २ टुक्रा", "तरकारी - आधा कप", "चिया - १ कप"],
    description: "हल्का र पाच्य खाना"
  },
  {
    id: "traditional_dinner",
    mealType: "dinner", 
    nepali: "पारम्परिक बेलुकीको खाना",
    english: "Traditional Dinner",
    emoji: "🍽️",
    time: "६-८ बजे", 
    calories: 400,
    safe: false,
    items: ["भात - आधा कप", "मासु - १ टुक्रा", "साग - आधा कप"],
    description: "पारम्परिक - डाक्टरसँग सल्लाह लिनुहोस्"
  },

  // Snack Templates
  {
    id: "healthy_snack",
    mealType: "snack",
    nepali: "स्वस्थ खाजा",
    english: "Healthy Snack",
    emoji: "🍎", 
    time: "कुनै पनि समय",
    calories: 150,
    safe: true,
    items: ["स्याउ - १ टुक्रा", "बिस्कुट - १ टुक्रा"],
    description: "भुकको लागि स्वस्थ विकल्प"
  }
];

export const EnhancedMealTemplates = ({ onQuickAdd, onSelectWithMeal }: EnhancedMealTemplatesProps) => {
  const isMobile = useIsMobile();

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'bg-yellow-50 border-yellow-200';
      case 'lunch': return 'bg-orange-50 border-orange-200'; 
      case 'dinner': return 'bg-purple-50 border-purple-200';
      case 'snack': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getMealTypeIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙'; 
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  const groupedTemplates = MEAL_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.mealType]) {
      acc[template.mealType] = [];
    }
    acc[template.mealType].push(template);
    return acc;
  }, {} as Record<string, typeof MEAL_TEMPLATES>);

  return (
    <Card data-testid="meal-templates">
      <CardHeader className="pb-3">
        <CardTitle className="text-center">
          <div className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
            तयार खानाको सूची (Ready Meal Templates)
          </div>
          <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
            छिटो थप्न एक क्लिक गर्नुहोस्
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {Object.entries(groupedTemplates).map(([mealType, templates]) => (
            <div key={mealType}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getMealTypeIcon(mealType)}</span>
                <h3 className="font-semibold capitalize">
                  {mealType === 'breakfast' && 'बिहानको खाना'}
                  {mealType === 'lunch' && 'दिउँसोको खाना'}
                  {mealType === 'dinner' && 'बेलुकीको खाना'}
                  {mealType === 'snack' && 'खाजा'}
                </h3>
              </div>
              
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-1'}`}>
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`${getMealTypeColor(template.mealType)} border transition-all hover:shadow-md`}
                  >
                    <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{template.emoji}</span>
                            <div>
                              <h4 className="font-semibold text-base">{template.nepali}</h4>
                              <p className="text-xs text-muted-foreground">{template.english}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{template.time}</span>
                            <Badge variant={template.safe ? "default" : "destructive"} className="text-xs">
                              {template.safe ? "सुरक्षित" : "सावधान"}
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-muted-foreground mb-2">
                            <strong>{template.calories} calories</strong>
                          </div>
                          
                          <div className="text-xs mb-2">
                            <div className="font-medium mb-1">समावेश:</div>
                            <ul className="list-disc list-inside space-y-1">
                              {template.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <p className="text-xs text-blue-600 italic">{template.description}</p>
                        </div>
                        
                        <div className="flex flex-col gap-1 ml-2">
                          <Button
                            size="sm"
                            onClick={() => onQuickAdd(template)}
                            className="text-xs px-2 py-1 h-8"
                          >
                            झट्टै थप्नुहोस्
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectWithMeal(template)}
                            className="text-xs px-2 py-1 h-8"
                          >
                            समय छान्नुहोस्
                          </Button>
                        </div>
                      </div>
                      
                      {!template.safe && (
                        <div className="mt-2 p-2 bg-red-50 rounded flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-600" />
                          <p className="text-xs text-red-600">
                            डाक्टरको सल्लाह लिएर मात्र खानुहोस्
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-4 text-muted-foreground text-center ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-medium mb-2">कसरी प्रयोग गर्ने:</div>
            <div className="space-y-1 text-xs">
              <div>• "झट्टै थप्नुहोस्" - सीधा आफ्नो खाना सूचीमा थप्छ</div>
              <div>• "समय छान्नुहोस्" - कुन समयको खाना हो त्यो छान्न सक्नुहुन्छ</div>
              <div>• सुरक्षित खाना निर्धक्क खानुहोस्</div>
              <div>• सावधान भनिएको खाना डाक्टरसँग सोधेर खानुहोस्</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
