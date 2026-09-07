
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle, XCircle, Flag } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'recipe' | 'comment' | 'report' | 'feedback';
  content: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
  createdAt: string;
}

export const ContentModeration = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'recipe',
      content: 'Low-sodium Nepali Dal Recipe for kidney patients...',
      author: 'Dr. Sarah Johnson',
      status: 'pending',
      flagReason: 'Medical accuracy review needed',
      createdAt: '2024-06-28T10:30:00Z'
    },
    {
      id: '2',
      type: 'comment',
      content: 'This recipe helped me a lot with my kidney diet...',
      author: 'Ram Sharma',
      status: 'approved',
      createdAt: '2024-06-28T09:15:00Z'
    },
    {
      id: '3',
      type: 'feedback',
      content: 'The app crashes when I try to save my meal plan',
      author: 'Maya Gurung',
      status: 'pending',
      flagReason: 'Technical issue report',
      createdAt: '2024-06-28T08:45:00Z'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [moderationNote, setModerationNote] = useState('');

  const handleApprove = (itemId: string) => {
    setContentItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, status: 'approved' as const } : item
      )
    );
  };

  const handleReject = (itemId: string, reason: string) => {
    setContentItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, status: 'rejected' as const, flagReason: reason } : item
      )
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recipe': return '🍽️';
      case 'comment': return '💬';
      case 'report': return '📊';
      case 'feedback': return '📝';
      default: return '📄';
    }
  };

  const pendingItems = contentItems.filter(item => item.status === 'pending');
  const approvedItems = contentItems.filter(item => item.status === 'approved');
  const rejectedItems = contentItems.filter(item => item.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Moderation</h2>
        <p className="text-muted-foreground">Review and moderate user-generated content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems.length}</div>
            <p className="text-xs text-muted-foreground">Items awaiting moderation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedItems.length}</div>
            <p className="text-xs text-muted-foreground">Content approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedItems.length}</div>
            <p className="text-xs text-muted-foreground">Content rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold capitalize">{item.type}</h3>
                        <Badge className={getStatusBadgeColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">By {item.author}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {item.content}
                  </p>
                  {item.flagReason && (
                    <div className="flex items-center space-x-2 mt-2 text-sm text-yellow-700">
                      <Flag className="h-4 w-4" />
                      <span>{item.flagReason}</span>
                    </div>
                  )}
                </div>

                {item.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(item.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(item.id, 'Content does not meet guidelines')}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
