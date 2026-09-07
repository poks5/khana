
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const SafetyStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-4xl text-center mb-4">⚕️</div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Safety Color Coding:</h4>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline" className="bg-green-50">Safe</Badge>
          <Badge variant="outline" className="bg-yellow-50">Caution</Badge>
          <Badge variant="outline" className="bg-red-50">Limit</Badge>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">Remember:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Follow your healthcare team's advice</li>
          <li>• Monitor your lab values regularly</li>
          <li>• Adjust portions based on your needs</li>
          <li>• Stay hydrated as recommended</li>
        </ul>
      </div>
    </div>
  );
};
