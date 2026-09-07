
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HealthMetric {
  label: string;
  value: number;
  previousValue?: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

interface SystemHealthMetricsProps {
  metrics: HealthMetric[];
}

export const SystemHealthMetrics: React.FC<SystemHealthMetricsProps> = ({ metrics }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return <Minus className="h-3 w-3 text-gray-400" />;
    if (current > previous) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              {metric.label}
              <Badge className={getStatusBadge(metric.status)}>
                {metric.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}{metric.unit}
                </span>
                {getTrendIcon(metric.value, metric.previousValue)}
              </div>
              
              {metric.unit === '%' && (
                <Progress value={metric.value} className="h-2" />
              )}
              
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              
              {metric.previousValue && (
                <div className="text-xs text-muted-foreground">
                  Previous: {metric.previousValue}{metric.unit}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
