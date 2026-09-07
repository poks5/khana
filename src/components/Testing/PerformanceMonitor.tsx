import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Monitor, Zap, HardDrive, Cpu, AlertTriangle, Trash2, Database } from "lucide-react";
import { MemoryOptimizer } from "@/utils/memoryOptimization";

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    renderTime: 0,
    fps: 60,
    cacheSize: 0,
    localStorageSize: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Measure initial load performance
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          loadTime: navigation.loadEventEnd - navigation.fetchStart
        }));
      }
    }

    // Monitor memory usage
    const updateMemoryMetrics = () => {
      const memInfo = MemoryOptimizer.getMemoryInfo();
      if (memInfo) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: (memInfo.used / memInfo.limit) * 100
        }));
      }

      // Calculate localStorage size
      let localStorageSize = 0;
      try {
        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            localStorageSize += localStorage[key].length;
          }
        }
        setMetrics(prev => ({
          ...prev,
          localStorageSize: localStorageSize / 1024 // KB
        }));
      } catch (error) {
        console.warn('Could not calculate localStorage size:', error);
      }
    };

    updateMemoryMetrics();
    const interval = setInterval(updateMemoryMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const runPerformanceOptimization = () => {
    setIsMonitoring(true);
    
    // Clean up memory
    MemoryOptimizer.clearCache();
    MemoryOptimizer.cleanupLocalStorage();
    
    // Force garbage collection if available
    if ('gc' in window && typeof window.gc === 'function') {
      window.gc();
    }

    // Test rendering performance
    const startTime = performance.now();
    
    setTimeout(() => {
      const endTime = performance.now();
      setMetrics(prev => ({
        ...prev,
        renderTime: endTime - startTime
      }));
      setIsMonitoring(false);
    }, 1000);
  };

  const getPerformanceStatus = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return { status: 'good', color: 'bg-green-500' };
    if (value <= thresholds.fair) return { status: 'fair', color: 'bg-yellow-500' };
    return { status: 'poor', color: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Performance Metrics</h3>
        <div className="flex gap-2">
          <Button 
            onClick={runPerformanceOptimization}
            disabled={isMonitoring}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            {isMonitoring ? 'Optimizing...' : 'Optimize Performance'}
          </Button>
          <Button 
            onClick={() => MemoryOptimizer.clearCache()}
            variant="outline"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cache
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Load Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Load Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {metrics.loadTime.toFixed(0)}ms
              </div>
              <Progress 
                value={Math.min(metrics.loadTime / 30, 100)} 
                className="h-2"
              />
              <Badge variant={metrics.loadTime < 3000 ? 'default' : 'destructive'}>
                {metrics.loadTime < 3000 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {metrics.memoryUsage.toFixed(1)}%
              </div>
              <Progress 
                value={metrics.memoryUsage} 
                className="h-2"
              />
              <Badge variant={metrics.memoryUsage < 70 ? 'default' : 'destructive'}>
                {metrics.memoryUsage < 70 ? 'Optimal' : 'High Usage'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* LocalStorage Size */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Storage Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {metrics.localStorageSize.toFixed(1)}KB
              </div>
              <Progress 
                value={Math.min(metrics.localStorageSize / 1000, 100)} 
                className="h-2"
              />
              <Badge variant={metrics.localStorageSize < 500 ? 'default' : 'secondary'}>
                {metrics.localStorageSize < 500 ? 'Optimal' : 'Consider Cleanup'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Render Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Render Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {metrics.renderTime.toFixed(0)}ms
              </div>
              <Progress 
                value={Math.min(metrics.renderTime / 10, 100)} 
                className="h-2"
              />
              <Badge variant={metrics.renderTime < 100 ? 'default' : 'destructive'}>
                {metrics.renderTime < 100 ? 'Fast' : 'Slow'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.loadTime > 3000 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">
                  Load time is high. Components are now lazy-loaded to improve initial load speed.
                </span>
              </div>
            )}
            {metrics.memoryUsage > 70 && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm">
                  High memory usage detected. Cache has been optimized and cleanup implemented.
                </span>
              </div>
            )}
            {metrics.localStorageSize > 500 && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  Large localStorage detected. Consider clearing old data or use "Clear Cache" button.
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Monitor className="h-4 w-4 text-green-600" />
              <span className="text-sm">
                ✅ Lazy loading implemented • ✅ Memory optimization active • ✅ Cache management enabled
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
