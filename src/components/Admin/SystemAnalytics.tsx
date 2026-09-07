
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const SystemAnalytics = () => {
  // Mock data - in real app, this would come from API
  const userGrowthData = [
    { month: 'Jan', users: 45, reports: 120 },
    { month: 'Feb', users: 72, reports: 189 },
    { month: 'Mar', users: 98, reports: 245 },
    { month: 'Apr', users: 134, reports: 312 },
    { month: 'May', users: 167, reports: 398 },
    { month: 'Jun', users: 203, reports: 467 }
  ];

  const featureUsageData = [
    { name: 'Food Tracker', value: 35 },
    { name: 'Blood Reports', value: 25 },
    { name: 'Meal Planner', value: 20 },
    { name: 'AI Chat', value: 15 },
    { name: 'Recipe Builder', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const dailyActiveUsers = [
    { day: 'Mon', users: 234 },
    { day: 'Tue', users: 267 },
    { day: 'Wed', users: 198 },
    { day: 'Thu', users: 301 },
    { day: 'Fri', users: 289 },
    { day: 'Sat', users: 156 },
    { day: 'Sun', users: 178 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Analytics</h2>
        <p className="text-muted-foreground">Monitor app performance and user engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" name="New Users" />
                <Bar dataKey="reports" fill="#82ca9d" name="Blood Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={featureUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {featureUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Server Response Time</span>
                <span className="font-semibold text-green-600">142ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database Query Time</span>
                <span className="font-semibold text-green-600">23ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Success Rate</span>
                <span className="font-semibold text-green-600">99.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Error Rate</span>
                <span className="font-semibold text-red-600">0.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Sessions</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Cache Hit Rate</span>
                <span className="font-semibold text-green-600">89.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-medium">Database Backup Completed</span>
                <p className="text-sm text-muted-foreground">Automated backup finished successfully</p>
              </div>
              <span className="text-sm text-green-600">Success</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <span className="font-medium">System Update Deployed</span>
                <p className="text-sm text-muted-foreground">Version 2.1.3 deployed with bug fixes</p>
              </div>
              <span className="text-sm text-blue-600">Info</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <span className="font-medium">High Memory Usage</span>
                <p className="text-sm text-muted-foreground">Server memory usage reached 85%</p>
              </div>
              <span className="text-sm text-yellow-600">Warning</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
