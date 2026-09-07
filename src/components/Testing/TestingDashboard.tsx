
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Monitor, 
  Database, 
  Wifi, 
  WifiOff,
  Users,
  Clock,
  Download
} from "lucide-react";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { DataIntegrityChecker } from "./DataIntegrityChecker";
import { UserFeedbackCollector } from "./UserFeedbackCollector";
import { ErrorTracker } from "./ErrorTracker";

export const TestingDashboard = () => {
  const [systemStatus, setSystemStatus] = useState({
    database: 'healthy',
    offline: navigator.onLine,
    performance: 'good',
    errors: 0,
    users: 0
  });

  const [testResults, setTestResults] = useState({
    functional: { passed: 0, failed: 0, total: 8 },
    ui: { passed: 0, failed: 0, total: 6 },
    localization: { passed: 0, failed: 0, total: 4 },
    performance: { passed: 0, failed: 0, total: 4 }
  });

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setSystemStatus(prev => ({ ...prev, offline: true }));
    const handleOffline = () => setSystemStatus(prev => ({ ...prev, offline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const runAutomaticTests = () => {
    // Simulate running automatic tests
    console.log('Running automatic tests...');
    
    // Check localStorage functionality
    try {
      localStorage.setItem('test', 'value');
      localStorage.removeItem('test');
      console.log('✅ localStorage test passed');
    } catch (error) {
      console.error('❌ localStorage test failed:', error);
    }

    // Check language switching
    const currentLang = localStorage.getItem('language') || 'ne';
    console.log(`✅ Current language: ${currentLang}`);

    // Check food database
    const foodData = localStorage.getItem('food-entries-' + new Date().toISOString().split('T')[0]);
    console.log(`✅ Food data check: ${foodData ? 'Data exists' : 'No data'}`);
  };

  const exportTestReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      systemStatus,
      testResults,
      userAgent: navigator.userAgent,
      language: navigator.language,
      online: navigator.onLine
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nephro-test-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testing Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={runAutomaticTests} variant="outline">
            Run Tests
          </Button>
          <Button onClick={exportTestReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <Badge variant={systemStatus.database === 'healthy' ? 'default' : 'destructive'}>
                {systemStatus.database}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {systemStatus.offline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <Badge variant={systemStatus.offline ? 'default' : 'secondary'}>
                {systemStatus.offline ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <Badge variant="default">{systemStatus.performance}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <Badge variant={systemStatus.errors > 0 ? 'destructive' : 'default'}>
                {systemStatus.errors}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <Badge variant="default">{systemStatus.users}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(testResults).map(([category, results]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium capitalize">{category}</h4>
                <div className="flex gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    ✅ {results.passed}
                  </Badge>
                  <Badge variant="destructive">
                    ❌ {results.failed}
                  </Badge>
                  <Badge variant="secondary">
                    {results.total} total
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Testing Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="data">Data Integrity</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <PerformanceMonitor />
        </TabsContent>

        <TabsContent value="data">
          <DataIntegrityChecker />
        </TabsContent>

        <TabsContent value="errors">
          <ErrorTracker />
        </TabsContent>

        <TabsContent value="feedback">
          <UserFeedbackCollector />
        </TabsContent>
      </Tabs>
    </div>
  );
};
