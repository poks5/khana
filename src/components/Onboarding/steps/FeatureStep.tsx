
import React from 'react';
import { CheckCircle } from "lucide-react";

interface FeatureStepProps {
  icon: string;
  features: string[];
}

export const FeatureStep: React.FC<FeatureStepProps> = ({ icon, features }) => {
  return (
    <div className="space-y-4">
      <div className="text-4xl text-center mb-4">{icon}</div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
