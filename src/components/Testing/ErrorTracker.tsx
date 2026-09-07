
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, XCircle, Info, Clock, Trash2 } from "lucide-react";

interface ErrorLog {
  id: string;
  timestamp: Date;
  type: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  userAgent: string;
  url: string;
}

export const ErrorTracker = () => {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');

  useEffect(() => {
    // Load existing errors from localStorage
    const savedErrors = localStorage.getItem('error-logs');
    if (savedErrors) {
      try {
        const parsed = JSON.parse(savedErrors);
        setErrors(parsed.map((error: any) => ({
          ...error,
          timestamp: new Date(error.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load error logs:', error);
      }
    }

    // Set up global error handlers
    const handleError = (event: ErrorEvent) => {
      const errorLog: ErrorLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        type: 'error',
        message: event.message,
        stack: event.error?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      addError(errorLog);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorLog: ErrorLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        type: 'error',
        message: `Unhandled Promise Rejection: ${event.reason}`,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      addError(errorLog);
    };

    // Override console methods to capture warnings and info
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleInfo = console.info;

    console.error = (...args: any[]) => {
      const errorLog: ErrorLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        type: 'error',
        message: args.join(' '),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      addError(errorLog);
      originalConsoleError(...args);
    };

    console.warn = (...args: any[]) => {
      const errorLog: ErrorLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        type: 'warning',
        message: args.join(' '),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      addError(errorLog);
      originalConsoleWarn(...args);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.info = originalConsoleInfo;
    };
  }, []);

  const addError = (errorLog: ErrorLog) => {
    setErrors(prev => {
      const updated = [errorLog, ...prev].slice(0, 100); // Keep only last 100 errors
      localStorage.setItem('error-logs', JSON.stringify(updated));
      return updated;
    });
  };

  const clearErrors = () => {
    setErrors([]);
    localStorage.removeItem('error-logs');
  };

  const filteredErrors = errors.filter(error => 
    filter === 'all' || error.type === filter
  );

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getErrorBadgeVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Error Tracker
        </h3>
        <div className="flex gap-2">
          <Button onClick={clearErrors} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Error Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Critical Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {errors.filter(e => e.type === 'error').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {errors.filter(e => e.type === 'warning').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent (1hr)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {errors.filter(e => 
                new Date().getTime() - e.timestamp.getTime() < 3600000
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {(['all', 'error', 'warning', 'info'] as const).map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {filterType !== 'all' && (
              <Badge variant="secondary" className="ml-2">
                {errors.filter(e => e.type === filterType).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Error List */}
      <Card>
        <CardHeader>
          <CardTitle>Error Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredErrors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No errors found. Your app is running smoothly! 🎉
              </div>
            ) : (
              filteredErrors.map((error) => (
                <div key={error.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getErrorIcon(error.type)}
                      <Badge variant={getErrorBadgeVariant(error.type)}>
                        {error.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {error.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium">{error.message}</div>
                  {error.stack && (
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer">Stack Trace</summary>
                      <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
