import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Lightbulb, Coffee, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/OptimizedLanguageContext";

export const Recommendations = () => {
  const { t } = useLanguage();

  const tips = [
    {
      id: 'dal_bhat_adaptations',
      icon: <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
    },
    {
      id: 'safe_breakfast_options',
      icon: <Coffee className="h-4 w-4 sm:h-5 sm:w-5" />
    },
    {
      id: 'festival_food_modifications',
      icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
    },
    {
      id: 'newari_dish_modifications',
      icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
    }
  ];

  const getCategoryColor = (tipId: string) => {
    const colorMap: { [key: string]: string } = {
      "dal_bhat_adaptations": "bg-orange-100 text-orange-800",
      "safe_breakfast_options": "bg-green-100 text-green-800",
      "festival_food_modifications": "bg-red-100 text-red-800",
      "newari_dish_modifications": "bg-purple-100 text-purple-800"
    };
    return colorMap[tipId] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold">
          {t('recommendations.cultural_guide.title')}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {t('recommendations.cultural_guide.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {tips.map((tip, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                {tip.icon}
                <span className="line-clamp-2">
                  {t(`recommendations.cultural_guide.tips.${tip.id}.title`)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                {t(`recommendations.cultural_guide.tips.${tip.id}.content`)}
              </p>
              <span className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${getCategoryColor(tip.id)}`}>
                {t(`recommendations.cultural_guide.tips.${tip.id}.category`)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            {t('recommendations.cultural_guide.remember_title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-green-700">
              ✓ {t('recommendations.cultural_guide.safe_foods')}
            </p>
            <p className="font-medium text-yellow-700">
              ⚠️ {t('recommendations.cultural_guide.use_carefully')}
            </p>
            <p className="font-medium text-red-700">
              ✗ {t('recommendations.cultural_guide.avoid_completely')}
            </p>
            <p className="text-muted-foreground mt-3 italic text-xs sm:text-sm">
              {t('recommendations.cultural_guide.health_quote')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
