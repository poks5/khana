
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FeedbackEntry {
  id: string;
  timestamp: Date;
  type: 'bug' | 'feature' | 'improvement' | 'general';
  rating: number;
  message: string;
  userAgent: string;
  resolved: boolean;
}

export const UserFeedbackCollector = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    type: 'general' as const,
    rating: 5,
    message: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    // Load existing feedback from localStorage
    const savedFeedback = localStorage.getItem('user-feedback');
    if (savedFeedback) {
      try {
        const parsed = JSON.parse(savedFeedback);
        setFeedbacks(parsed.map((feedback: any) => ({
          ...feedback,
          timestamp: new Date(feedback.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load feedback:', error);
      }
    }
  }, []);

  const submitFeedback = () => {
    if (!newFeedback.message.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide your feedback message",
        variant: "destructive"
      });
      return;
    }

    const feedback: FeedbackEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      type: newFeedback.type,
      rating: newFeedback.rating,
      message: newFeedback.message,
      userAgent: navigator.userAgent,
      resolved: false
    };

    const updatedFeedbacks = [feedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedback', JSON.stringify(updatedFeedbacks));

    // Reset form
    setNewFeedback({
      type: 'general',
      rating: 5,
      message: ''
    });
    setShowFeedbackForm(false);

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
  };

  const toggleResolved = (id: string) => {
    const updatedFeedbacks = feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, resolved: !feedback.resolved } : feedback
    );
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedback', JSON.stringify(updatedFeedbacks));
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return '🐛';
      case 'feature':
        return '✨';
      case 'improvement':
        return '🔧';
      default:
        return '💬';
    }
  };

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case 'bug':
        return 'destructive';
      case 'feature':
        return 'default';
      case 'improvement':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          User Feedback
        </h3>
        <Button 
          onClick={() => setShowFeedbackForm(!showFeedbackForm)}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {showFeedbackForm ? 'Hide Form' : 'Add Feedback'}
        </Button>
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bug Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {feedbacks.filter(f => f.type === 'bug').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Feature Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {feedbacks.filter(f => f.type === 'feature').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.length > 0 
                ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
                : '0.0'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Feedback Type</label>
                <Select value={newFeedback.type} onValueChange={(value: any) => 
                  setNewFeedback(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewFeedback(prev => ({ ...prev, rating: i + 1 }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${i < newFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={newFeedback.message}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please share your feedback, suggestions, or report any issues..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitFeedback}>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
              <Button variant="outline" onClick={() => setShowFeedbackForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {feedbacks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No feedback submitted yet. Be the first to share your thoughts!
              </div>
            ) : (
              feedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getFeedbackIcon(feedback.type)}</span>
                      <Badge variant={getFeedbackColor(feedback.type)}>
                        {feedback.type.toUpperCase()}
                      </Badge>
                      <div className="flex gap-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {feedback.timestamp.toLocaleDateString()}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleResolved(feedback.id)}
                      >
                        {feedback.resolved ? <ThumbsUp className="h-3 w-3" /> : <ThumbsDown className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">{feedback.message}</div>
                  {feedback.resolved && (
                    <Badge variant="default" className="text-xs">
                      ✅ Resolved
                    </Badge>
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
