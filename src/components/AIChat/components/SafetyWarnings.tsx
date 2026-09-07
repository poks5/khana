
import { AlertTriangle } from "lucide-react";

interface SafetyWarningsProps {
  warnings: string[];
}

export const SafetyWarnings = ({ warnings }: SafetyWarningsProps) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-orange-50 dark:bg-orange-950 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Safety Warnings</span>
        </div>
        <ul className="space-y-1">
          {warnings.map((warning, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-orange-700 dark:text-orange-300">
              <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
              {warning}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
