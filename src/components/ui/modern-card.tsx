
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  safety?: 'safe' | 'caution' | 'avoid';
  emoji?: string;
  badge?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const ModernCard = ({
  title,
  description,
  children,
  className,
  safety,
  emoji,
  badge,
  onClick,
  interactive = false
}: ModernCardProps) => {
  const safetyConfig = {
    safe: {
      badge: '✅ Safe',
      className: 'badge-safe',
      borderColor: 'border-l-green-400',
      bgAccent: 'bg-green-50/50 dark:bg-green-900/10'
    },
    caution: {
      badge: '⚠️ Caution',
      className: 'badge-caution',
      borderColor: 'border-l-amber-400',
      bgAccent: 'bg-amber-50/50 dark:bg-amber-900/10'
    },
    avoid: {
      badge: '❌ Avoid',
      className: 'badge-avoid',
      borderColor: 'border-l-red-400',
      bgAccent: 'bg-red-50/50 dark:bg-red-900/10'
    }
  };

  return (
    <Card 
      className={cn(
        'medical-card group overflow-hidden',
        safety && `border-l-4 ${safetyConfig[safety].borderColor} ${safetyConfig[safety].bgAccent}`,
        interactive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] smooth-transition hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      {(title || description || safety || badge) && (
        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {title && (
                <CardTitle className="flex items-center gap-2 text-mobile-lg text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {emoji && <span className="text-xl flex-shrink-0">{emoji}</span>}
                  <span className="truncate">{title}</span>
                </CardTitle>
              )}
              {description && (
                <CardDescription className="text-mobile-sm mt-1.5 text-muted-foreground leading-relaxed">
                  {description}
                </CardDescription>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {safety && (
                <Badge className={`${safetyConfig[safety].className} text-xs font-medium whitespace-nowrap`}>
                  {safetyConfig[safety].badge}
                </Badge>
              )}
              {badge && (
                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Subtle gradient overlay for interactive cards */}
          {interactive && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}
        </CardHeader>
      )}
      
      <CardContent className="pt-0 relative z-10">
        {children}
      </CardContent>
    </Card>
  );
};
