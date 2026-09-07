
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

interface TestResult {
  testName: string;
  category: string;
  status: 'pass' | 'fail' | 'warning' | 'running';
  executionTime: number;
  details: string;
  timestamp: Date;
}

interface DetailedTestResultsProps {
  results: TestResult[];
}

export const DetailedTestResults: React.FC<DetailedTestResultsProps> = ({ results }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'fail':
        return <Badge variant="destructive">Failed</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const categorizedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, TestResult[]>);

  return (
    <div className="space-y-6">
      {Object.entries(categorizedResults).map(([category, categoryResults]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{category} Test Results</span>
              <Badge variant="outline">
                {categoryResults.filter(r => r.status === 'pass').length}/{categoryResults.length} Passed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Execution Time</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      {result.testName}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(result.status)}
                    </TableCell>
                    <TableCell>
                      {result.executionTime.toFixed(0)}ms
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {result.details}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {result.timestamp.toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
