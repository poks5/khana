
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Database, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const DataIntegrityChecker = () => {
  const [checks, setChecks] = useState({
    localStorage: { status: 'pending', message: '' },
    foodEntries: { status: 'pending', message: '' },
    userProfile: { status: 'pending', message: '' },
    medications: { status: 'pending', message: '' },
    dataFormat: { status: 'pending', message: '' }
  });

  const [isRunning, setIsRunning] = useState(false);

  const runDataIntegrityChecks = async () => {
    setIsRunning(true);
    const newChecks = { ...checks };

    // Check localStorage availability
    try {
      localStorage.setItem('integrity-test', 'test');
      localStorage.removeItem('integrity-test');
      newChecks.localStorage = { status: 'passed', message: 'localStorage is working correctly' };
    } catch (error) {
      newChecks.localStorage = { status: 'failed', message: 'localStorage is not available' };
    }

    // Check food entries data structure
    try {
      const today = new Date().toISOString().split('T')[0];
      const foodData = localStorage.getItem(`food-entries-${today}`);
      if (foodData) {
        const parsed = JSON.parse(foodData);
        if (Array.isArray(parsed)) {
          const validEntries = parsed.every(entry => 
            entry.id && entry.name && entry.nutrients && typeof entry.nutrients.calories === 'number'
          );
          newChecks.foodEntries = { 
            status: validEntries ? 'passed' : 'warning', 
            message: validEntries ? `${parsed.length} valid food entries found` : 'Some food entries have invalid format'
          };
        } else {
          newChecks.foodEntries = { status: 'failed', message: 'Food entries data is not an array' };
        }
      } else {
        newChecks.foodEntries = { status: 'warning', message: 'No food entries found for today' };
      }
    } catch (error) {
      newChecks.foodEntries = { status: 'failed', message: 'Failed to parse food entries data' };
    }

    // Check user profile data
    try {
      const profileData = localStorage.getItem('patient-profile');
      if (profileData) {
        const parsed = JSON.parse(profileData);
        if (parsed.dialysisType && parsed.weight && parsed.height) {
          newChecks.userProfile = { status: 'passed', message: 'User profile is complete and valid' };
        } else {
          newChecks.userProfile = { status: 'warning', message: 'User profile is incomplete' };
        }
      } else {
        newChecks.userProfile = { status: 'warning', message: 'No user profile found' };
      }
    } catch (error) {
      newChecks.userProfile = { status: 'failed', message: 'Failed to parse user profile data' };
    }

    // Check medications data
    try {
      const medicationsData = localStorage.getItem('patient-medications');
      if (medicationsData) {
        const parsed = JSON.parse(medicationsData);
        if (Array.isArray(parsed)) {
          newChecks.medications = { 
            status: 'passed', 
            message: `${parsed.length} medications found with valid structure` 
          };
        } else {
          newChecks.medications = { status: 'failed', message: 'Medications data is not an array' };
        }
      } else {
        newChecks.medications = { status: 'warning', message: 'No medications data found' };
      }
    } catch (error) {
      newChecks.medications = { status: 'failed', message: 'Failed to parse medications data' };
    }

    // Check data format consistency
    try {
      const allKeys = Object.keys(localStorage);
      const dataKeys = allKeys.filter(key => 
        key.startsWith('food-entries-') || 
        key.startsWith('meal-plan-') ||
        key.includes('patient-') ||
        key.includes('medication-')
      );
      
      let formatIssues = 0;
      for (const key of dataKeys) {
        try {
          JSON.parse(localStorage.getItem(key) || '{}');
        } catch {
          formatIssues++;
        }
      }

      newChecks.dataFormat = {
        status: formatIssues === 0 ? 'passed' : 'failed',
        message: formatIssues === 0 ? 
          `All ${dataKeys.length} data entries have valid JSON format` : 
          `${formatIssues} data entries have invalid JSON format`
      };
    } catch (error) {
      newChecks.dataFormat = { status: 'failed', message: 'Failed to check data format consistency' };
    }

    setChecks(newChecks);
    setIsRunning(false);

    // Show summary toast
    const failedChecks = Object.values(newChecks).filter(check => check.status === 'failed').length;
    const warningChecks = Object.values(newChecks).filter(check => check.status === 'warning').length;
    
    if (failedChecks > 0) {
      toast({
        title: "Data Integrity Issues Found",
        description: `${failedChecks} critical issues and ${warningChecks} warnings detected`,
        variant: "destructive"
      });
    } else if (warningChecks > 0) {
      toast({
        title: "Data Integrity Check Complete",
        description: `${warningChecks} warnings found, but no critical issues`,
      });
    } else {
      toast({
        title: "Data Integrity Check Passed",
        description: "All data integrity checks passed successfully",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Database className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const fixDataIssues = () => {
    // Attempt to fix common data issues
    let fixedCount = 0;

    // Fix malformed JSON entries
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('food-entries-') || key.startsWith('meal-plan-')) {
        try {
          const data = localStorage.getItem(key);
          if (data && data !== 'undefined' && data !== 'null') {
            JSON.parse(data);
          }
        } catch {
          // Remove malformed entries
          localStorage.removeItem(key);
          fixedCount++;
        }
      }
    });

    toast({
      title: "Data Cleanup Complete",
      description: `Fixed ${fixedCount} data integrity issues`,
    });

    // Re-run checks
    runDataIntegrityChecks();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Data Integrity Checker
        </h3>
        <div className="flex gap-2">
          <Button 
            onClick={runDataIntegrityChecks}
            disabled={isRunning}
            variant="outline"
          >
            {isRunning ? 'Checking...' : 'Run Checks'}
          </Button>
          <Button onClick={fixDataIssues} variant="secondary">
            Fix Issues
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(checks).map(([checkName, check]) => (
          <Card key={checkName}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="capitalize">{checkName.replace(/([A-Z])/g, ' $1')}</span>
                {getStatusIcon(check.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant={getStatusColor(check.status)}>
                  {check.status.toUpperCase()}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {check.message || 'Not checked yet'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(checks).filter(c => c.status === 'passed').length}
              </div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Object.values(checks).filter(c => c.status === 'warning').length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(checks).filter(c => c.status === 'failed').length}
              </div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
