
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Database,
  Settings,
  TestTube,
  BarChart3,
  UserCheck,
  MessageSquare,
  ChefHat
} from "lucide-react";
import { SystemCheckDashboard } from "./SystemCheckDashboard";
import { UserManagement } from "./UserManagement";
import { SystemAnalytics } from "./SystemAnalytics";
import { ContentModeration } from "./ContentModeration";
import { SupportTickets } from "./SupportTickets";
import { FoodManagement } from "./FoodManagement";
import { TestingDashboard } from "../Testing/TestingDashboard";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app this would come from your backend
  const stats = {
    totalUsers: 1247,
    activeUsers: 342,
    totalSessions: 5640,
    errorRate: 0.02,
    systemHealth: 'healthy',
    lastUpdated: new Date()
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your Nephro Nutrition app
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={stats.systemHealth === 'healthy' ? 'default' : 'destructive'}>
              {stats.systemHealth === 'healthy' ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertTriangle className="h-3 w-3 mr-1" />
              )}
              System {stats.systemHealth}
            </Badge>
            <span className="text-sm text-gray-500">
              Last updated: {stats.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +5% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.errorRate * 100).toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">
                -0.5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">
              <Settings className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="food">
              <ChefHat className="h-4 w-4 mr-2" />
              Food DB
            </TabsTrigger>
            <TabsTrigger value="testing">
              <TestTube className="h-4 w-4 mr-2" />
              Testing
            </TabsTrigger>
            <TabsTrigger value="users">
              <UserCheck className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="content">
              <Database className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="support">
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SystemCheckDashboard />
          </TabsContent>

          <TabsContent value="food" className="space-y-6">
            <FoodManagement />
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <TestingDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SystemAnalytics />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <ContentModeration />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <SupportTickets />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
