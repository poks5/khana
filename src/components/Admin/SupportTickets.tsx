
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'account' | 'billing' | 'feature-request' | 'other';
  user: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export const SupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'T001',
      subject: 'Unable to upload blood report',
      description: 'When I try to upload my latest blood report, the app shows an error message and crashes.',
      priority: 'high',
      status: 'open',
      category: 'technical',
      user: 'Ram Sharma',
      createdAt: '2024-06-28T10:30:00Z',
      updatedAt: '2024-06-28T10:30:00Z'
    },
    {
      id: 'T002',
      subject: 'Meal planner suggestions not working',
      description: 'The AI meal planner is not giving me kidney-friendly meal suggestions as expected.',
      priority: 'medium',
      status: 'in-progress',
      category: 'feature-request',
      user: 'Maya Gurung',
      assignedTo: 'Support Team',
      createdAt: '2024-06-27T14:15:00Z',
      updatedAt: '2024-06-28T09:20:00Z'
    },
    {
      id: 'T003',
      subject: 'Account login issues',
      description: 'I cannot log into my account even with the correct password.',
      priority: 'urgent',
      status: 'resolved',
      category: 'account',
      user: 'Sita Devi',
      assignedTo: 'Tech Team',
      createdAt: '2024-06-26T08:45:00Z',
      updatedAt: '2024-06-27T16:30:00Z'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <p className="text-muted-foreground">Manage customer support requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{ticket.subject}</h3>
                      <p className="text-xs text-muted-foreground">
                        {ticket.id} • {ticket.user}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getPriorityColor(ticket.priority)} variant="secondary">
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)} variant="secondary">
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {ticket.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTicket ? `Ticket Details - ${selectedTicket.id}` : 'Select a Ticket'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{selectedTicket.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {selectedTicket.user} • Category: {selectedTicket.category}
                  </p>
                </div>

                <div>
                  <Label>Description</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded mt-1">
                    {selectedTicket.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={selectedTicket.status}
                      onValueChange={(value: SupportTicket['status']) =>
                        updateTicketStatus(selectedTicket.id, value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedTicket.priority)} variant="secondary">
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label htmlFor="response">Response</Label>
                  <Textarea
                    id="response"
                    placeholder="Type your response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={() => setResponseText('')}>
                    Send Response
                  </Button>
                  <Button variant="outline">
                    Add Internal Note
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a ticket to view details and respond</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
