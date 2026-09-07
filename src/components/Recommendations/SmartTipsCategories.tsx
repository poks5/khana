
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Bookmark, ChevronDown, AlertTriangle, Droplets, Zap, Shield } from "lucide-react";
import { tipCategories, TipCategory, ClinicalTip } from "@/data/clinicalTips";
import { useUnifiedTranslation } from "@/hooks/useUnifiedTranslation";
import { UnifiedLanguageText } from "@/components/Language/UnifiedLanguageText";

export const SmartTipsCategories = () => {
  const { tt } = useUnifiedTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedTips, setBookmarkedTips] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleBookmark = (tipId: string) => {
    const newBookmarks = new Set(bookmarkedTips);
    if (newBookmarks.has(tipId)) {
      newBookmarks.delete(tipId);
    } else {
      newBookmarks.add(tipId);
    }
    setBookmarkedTips(newBookmarks);
  };

  const toggleSection = (categoryId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedSections(newExpanded);
  };

  const getLocalizedTipData = (category: TipCategory, tip: ClinicalTip) => {
    const titleKey = `recommendations.clinical_tips.${category.id}.tips.${tip.id}.title`;
    const contentKey = `recommendations.clinical_tips.${category.id}.tips.${tip.id}.content`;
    
    return {
      title: tt(titleKey, tip.title),
      content: tt(contentKey, tip.content)
    };
  };

  const filteredCategories = tipCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    if (searchTerm) {
      const categoryTitle = tt(`recommendations.clinical_tips.${category.id}.title`, category.title);
      return categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
             category.tips.some(tip => {
               const tipData = getLocalizedTipData(category, tip);
               return tipData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      tipData.content.toLowerCase().includes(searchTerm.toLowerCase());
             });
    }
    return true;
  });

  const getCategoryIcon = (categoryId: string) => {
    const icons = {
      'hyperkalemia': <Zap className="h-5 w-5" />,
      'hyperphosphatemia': <Shield className="h-5 w-5" />,
      'combined': <AlertTriangle className="h-5 w-5" />,
      'protein': <Zap className="h-5 w-5" />,
      'fluid': <Droplets className="h-5 w-5" />,
      'rice-guide': <Zap className="h-5 w-5" />,
      'tarkari-safety': <Shield className="h-5 w-5" />,
      'achar-safety': <AlertTriangle className="h-5 w-5" />
    };
    return icons[categoryId as keyof typeof icons] || <AlertTriangle className="h-5 w-5" />;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors = {
      'hyperkalemia': 'bg-red-50 border-red-200',
      'hyperphosphatemia': 'bg-orange-50 border-orange-200',
      'combined': 'bg-purple-50 border-purple-200',
      'protein': 'bg-blue-50 border-blue-200',
      'fluid': 'bg-cyan-50 border-cyan-200',
      'rice-guide': 'bg-green-50 border-green-200',
      'tarkari-safety': 'bg-yellow-50 border-yellow-200',
      'achar-safety': 'bg-pink-50 border-pink-200'
    };
    return colors[categoryId as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const getLocalizedCategoryData = (category: TipCategory) => {
    return {
      title: tt(`recommendations.clinical_tips.${category.id}.title`, category.title),
      description: tt(`recommendations.clinical_tips.${category.id}.description`, category.description),
      shortTitle: tt(`recommendations.clinical_tips.${category.id}.short_title`, category.shortTitle)
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">
          <UnifiedLanguageText translationKey="recommendations.smart_tips.title" fallback="Smart Clinical Tips" />
        </h2>
        <p className="text-muted-foreground">
          <UnifiedLanguageText translationKey="recommendations.smart_tips.subtitle" fallback="Evidence-based nutrition advice for kidney patients" />
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={tt('recommendations.smart_tips.search_placeholder', 'Search tips...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            <UnifiedLanguageText translationKey="recommendations.smart_tips.all_tips" fallback="All Tips" />
          </Button>
          {tipCategories.map((category) => {
            const localizedData = getLocalizedCategoryData(category);
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-1"
              >
                {getCategoryIcon(category.id)}
                {localizedData.shortTitle}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tips Categories */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const localizedData = getLocalizedCategoryData(category);
          return (
            <Card key={category.id} className={`${getCategoryColor(category.id)} border-2`}>
              <Collapsible 
                open={expandedSections.has(category.id)}
                onOpenChange={() => toggleSection(category.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.id)}
                        <div>
                          <CardTitle className="text-lg">{localizedData.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{localizedData.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {category.tips.length} {tt('recommendations.smart_tips.tips_count', 'tips')}
                        </Badge>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid gap-4">
                      {category.tips.map((tip) => {
                        const tipData = getLocalizedTipData(category, tip);
                        return (
                          <div key={tip.id} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {tipData.title}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBookmark(tip.id)}
                                className={bookmarkedTips.has(tip.id) ? "text-yellow-600" : "text-gray-400"}
                              >
                                <Bookmark className="h-4 w-4" fill={bookmarkedTips.has(tip.id) ? 'currentColor' : 'none'} />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                              {tipData.content}
                            </p>
                            
                            {tip.foods && tip.foods.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-600 mb-2">
                                  <UnifiedLanguageText translationKey="recommendations.smart_tips.recommended_foods" fallback="Recommended Foods" />:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {tip.foods.map((food, index) => (
                                    <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                      {food}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {tip.avoidFoods && tip.avoidFoods.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-600 mb-2">
                                  <UnifiedLanguageText translationKey="recommendations.smart_tips.foods_to_avoid" fallback="Foods to Avoid" />:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {tip.avoidFoods.map((food, index) => (
                                    <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                      {food}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {tip.cookingTips && tip.cookingTips.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-600 mb-2">Cooking Tips:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {tip.cookingTips.map((cookingTip, index) => (
                                    <li key={index} className="flex items-start gap-1">
                                      <span className="text-green-600">•</span>
                                      {cookingTip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                <UnifiedLanguageText translationKey="recommendations.smart_tips.priority" fallback="Priority" />: {tip.priority}
                              </span>
                              {tip.source && (
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                  {tip.source}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {/* Bookmarked Tips Summary */}
      {bookmarkedTips.size > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-yellow-600" />
              <UnifiedLanguageText translationKey="recommendations.smart_tips.bookmarked_tips" fallback="Bookmarked Tips" /> ({bookmarkedTips.size})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {bookmarkedTips.size === 1 
                ? <UnifiedLanguageText translationKey="recommendations.smart_tips.bookmarked_summary_single" fallback="You have bookmarked 1 tip." />
                : <UnifiedLanguageText translationKey="recommendations.smart_tips.bookmarked_summary_plural" fallback={`You have bookmarked ${bookmarkedTips.size} tips.`} />
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
