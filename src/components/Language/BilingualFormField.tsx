
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/EnhancedLanguageContext";
import { EnhancedLanguageText } from './EnhancedLanguageText';
import { cn } from '@/lib/utils';

interface BilingualFormFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email';
  required?: boolean;
  className?: string;
  helpText?: string;
}

export const BilingualFormField: React.FC<BilingualFormFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  className,
  helpText
}) => {
  const { language } = useLanguage();
  
  const getInputClasses = () => {
    if (language === 'ne') {
      return cn(
        'font-devanagari',
        'text-base', // Larger text for better Devanagari readability
        'h-12', // Slightly taller input
        'leading-relaxed'
      );
    }
    return 'h-10';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label className="flex items-center gap-1">
        <EnhancedLanguageText variant="body">
          {label}
        </EnhancedLanguageText>
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={getInputClasses()}
        lang={language}
      />
      
      {helpText && (
        <p className="text-sm text-muted-foreground">
          <EnhancedLanguageText variant="caption">
            {helpText}
          </EnhancedLanguageText>
        </p>
      )}
    </div>
  );
};
