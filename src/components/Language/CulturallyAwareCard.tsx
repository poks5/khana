
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/EnhancedLanguageContext";
import { EnhancedLanguageText } from './EnhancedLanguageText';
import { cn } from '@/lib/utils';

interface CulturallyAwareCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  culturalEmoji?: string;
}

export const CulturallyAwareCard: React.FC<CulturallyAwareCardProps> = ({
  title,
  children,
  className,
  headerActions,
  culturalEmoji
}) => {
  const { language } = useLanguage();
  
  const getCardStyles = () => {
    // Nepali design preferences: slightly more padding, warmer colors
    if (language === 'ne') {
      return cn(
        "border-l-4 border-l-orange-200",
        "bg-gradient-to-r from-orange-50/30 to-transparent"
      );
    }
    return "";
  };

  const getHeaderStyles = () => {
    if (language === 'ne') {
      return "pb-4"; // More spacing for Devanagari text
    }
    return "pb-3";
  };

  return (
    <Card className={cn(getCardStyles(), className)}>
      <CardHeader className={getHeaderStyles()}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {culturalEmoji && (
              <span className="text-xl">{culturalEmoji}</span>
            )}
            <EnhancedLanguageText variant="heading">
              {title}
            </EnhancedLanguageText>
          </div>
          {headerActions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
