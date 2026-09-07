
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton = ({ 
  onClick, 
  icon = <Plus className="h-6 w-6" />, 
  label,
  className,
  variant = 'primary',
  position = 'bottom-right'
}: FloatingActionButtonProps) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
  };

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={cn('fixed z-50', positions[position], className)}>
      <Button
        onClick={onClick}
        className={cn(
          'medical-fab h-14 w-14 rounded-full p-0',
          'group relative overflow-hidden',
          'transform transition-all duration-300',
          'hover:scale-110 active:scale-95',
          'focus:outline-none focus:ring-4 focus:ring-ring/50',
          variants[variant]
        )}
        size="lg"
      >
        <div className="flex items-center justify-center relative z-10">
          {icon}
        </div>
        
        {/* Modern ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-110 transition-transform duration-200" />
        
        {/* Subtle pulsing animation */}
        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Enhanced tooltip */}
        {label && (
          <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm shadow-lg">
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90" />
          </div>
        )}
      </Button>
    </div>
  );
};
