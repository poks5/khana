
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserForm } from './UserForm';
import { Search, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'patient' | 'provider' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+977-9876543210',
      role: 'provider',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Ram Bahadur Sharma',
      email: 'ram.sharma@gmail.com',
      phone: '+977-9841234567',
      role: 'patient',
      status: 'active',
      joinDate: '2024-02-20',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@nephronutrition.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '30 minutes ago'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUser = (userData: any) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...userData }
          : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now'
      };
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'provider': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedUser(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Edit User' : 'Add New User'}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={selectedUser}
              onSave={handleSaveUser}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedUser(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.phone && (
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex space-x-2 mb-1">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last active: {user.lastActive}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
