
import { EnhancedPortionSelector } from "./portions/EnhancedPortionSelector";
import { Food } from "@/types";

interface PortionSelectorProps {
  foodName: string;
  servingUnit: string;
  onSelect: (portion: number, label: string) => void;
  onBack: () => void;
  food?: Food; // Add food prop for enhanced functionality
}

export const PortionSelector = ({ foodName, servingUnit, onSelect, onBack, food }: PortionSelectorProps) => {
  // If we have the full food object, use the enhanced selector
  if (food) {
    return (
      <EnhancedPortionSelector 
        food={food}
        onSelect={onSelect}
        onBack={onBack}
      />
    );
  }

  // Fallback to simple selector for backward compatibility
  const portions = [
    { amount: 0.5, label: "आधा", icon: "🤏" },
    { amount: 1, label: "१", icon: "👌" },
    { amount: 1.5, label: "डेढ", icon: "✋" },
    { amount: 2, label: "२", icon: "🖐️" },
    { amount: 3, label: "३", icon: "🫴" }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <div className="text-lg font-semibold">{foodName}</div>
        <div className="text-sm text-muted-foreground">कति मात्रा? (How much?)</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {portions.map((portion) => (
          <button
            key={portion.amount}
            className="h-20 flex flex-col items-center justify-center text-lg border rounded-lg hover:bg-gray-50"
            onClick={() => onSelect(portion.amount, portion.label)}
          >
            <span className="text-2xl mb-1">{portion.icon}</span>
            <span className="font-semibold">{portion.label} {servingUnit}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          फर्कनुहोस् (Back)
        </button>
      </div>
    </div>
  );
};
