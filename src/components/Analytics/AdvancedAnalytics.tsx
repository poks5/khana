
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Target, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    weeklyTrends: [],
    nutritionBreakdown: [],
    adherenceScore: 0,
    alerts: []
  });

  useEffect(() => {
    // Load analytics data from localStorage or API
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    // Simulate loading analytics data
    const mockData = {
      weeklyTrends: [
        { date: '2024-01-01', calories: 1800, protein: 120, potassium: 2200, phosphorus: 800 },
        { date: '2024-01-02', calories: 1750, protein: 115, potassium: 2100, phosphorus: 750 },
        { date: '2024-01-03', calories: 1900, protein: 130, potassium: 2400, phosphorus: 850 },
        { date: '2024-01-04', calories: 1850, protein: 125, potassium: 2300, phosphorus: 820 },
        { date: '2024-01-05', calories: 1780, protein: 118, potassium: 2150, phosphorus: 780 },
        { date: '2024-01-06', calories: 1920, protein: 135, potassium: 2350, phosphorus: 860 },
        { date: '2024-01-07', calories: 1870, protein: 128, potassium: 2280, phosphorus: 830 }
      ],
      nutritionBreakdown: [
        { name: 'Calories', value: 85, color: '#8884d8' },
        { name: 'Protein', value: 92, color: '#82ca9d' },
        { name: 'Potassium', value: 78, color: '#ffc658' },
        { name: 'Phosphorus', value: 88, color: '#ff7300' }
      ],
      adherenceScore: 87,
      alerts: [
        { type: 'warning', message: 'Potassium intake trending higher this week', trend: 'up' },
        { type: 'success', message: 'Protein goals consistently met', trend: 'stable' },
        { type: 'info', message: 'Consider increasing fiber intake', trend: 'down' }
      ]
    };
    setAnalyticsData(mockData);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-green-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-300 bg-yellow-50';
      case 'success':
        return 'border-green-300 bg-green-50';
      default:
        return 'border-blue-300 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="h-8 w-8" />
          Advanced Analytics
        </h2>
        <p className="text-muted-foreground">Track your nutrition trends and progress over time</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Adherence Score</p>
                <p className="text-2xl font-bold">{analyticsData.adherenceScore}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={analyticsData.adherenceScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Average</p>
                <p className="text-2xl font-bold">1,850</p>
                <p className="text-xs text-muted-foreground">calories/day</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{analyticsData.alerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Nutrition Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" name="Calories" />
                    <Line type="monotone" dataKey="protein" stroke="#82ca9d" name="Protein (g)" />
                    <Line type="monotone" dataKey="potassium" stroke="#ffc658" name="Potassium (mg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Goal Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.nutritionBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrient Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.nutritionBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {analyticsData.nutritionBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {analyticsData.alerts.map((alert, index) => (
              <Card key={index} className={`border-2 ${getAlertColor(alert.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getTrendIcon(alert.trend)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <Badge variant="outline" className="mt-1">
                        {alert.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
