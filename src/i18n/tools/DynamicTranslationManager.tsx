
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, Trash2, Globe, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/EnhancedLanguageContext";

interface DynamicTranslation {
  id: string;
  key: string;
  en: string;
  ne: string;
  context: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'pending' | 'deprecated';
  createdAt: string;
  updatedAt: string;
}

export const DynamicTranslationManager: React.FC = () => {
  const { t } = useLanguage();
  const [translations, setTranslations] = useState<DynamicTranslation[]>([]);
  const [newTranslation, setNewTranslation] = useState<Partial<DynamicTranslation>>({
    key: '',
    en: '',
    ne: '',
    context: '',
    category: 'general',
    priority: 'medium',
    status: 'active'
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDynamicTranslations();
  }, []);

  const loadDynamicTranslations = () => {
    // In a real app, this would load from your backend/database
    const stored = localStorage.getItem('dynamic-translations');
    if (stored) {
      setTranslations(JSON.parse(stored));
    }
  };

  const saveDynamicTranslations = (updatedTranslations: DynamicTranslation[]) => {
    localStorage.setItem('dynamic-translations', JSON.stringify(updatedTranslations));
    setTranslations(updatedTranslations);
  };

  const addTranslation = () => {
    if (!newTranslation.key || !newTranslation.en || !newTranslation.ne) {
      return;
    }

    const translation: DynamicTranslation = {
      id: Date.now().toString(),
      key: newTranslation.key!,
      en: newTranslation.en!,
      ne: newTranslation.ne!,
      context: newTranslation.context || '',
      category: newTranslation.category || 'general',
      priority: newTranslation.priority || 'medium',
      status: newTranslation.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...translations, translation];
    saveDynamicTranslations(updated);

    // Reset form
    setNewTranslation({
      key: '',
      en: '',
      ne: '',
      context: '',
      category: 'general',
      priority: 'medium',
      status: 'active'
    });
  };

  const updateTranslation = (id: string, updates: Partial<DynamicTranslation>) => {
    const updated = translations.map(t => 
      t.id === id 
        ? { ...t, ...updates, updatedAt: new Date().toISOString() }
        : t
    );
    saveDynamicTranslations(updated);
  };

  const deleteTranslation = (id: string) => {
    const updated = translations.filter(t => t.id !== id);
    saveDynamicTranslations(updated);
  };

  const exportTranslations = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      count: translations.length,
      translations: translations.map(t => ({
        key: t.key,
        en: t.en,
        ne: t.ne,
        context: t.context,
        category: t.category
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dynamic-translations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTranslations = translations.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ne.includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });

  const categories = ['general', 'medical', 'food', 'navigation', 'validation', 'custom'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Dynamic Translation Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manage">Manage</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="manage" className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Search translations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredTranslations.map(translation => (
                  <Card key={translation.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{translation.category}</Badge>
                        <Badge 
                          variant={
                            translation.priority === 'high' ? 'destructive' :
                            translation.priority === 'medium' ? 'default' : 'secondary'
                          }
                        >
                          {translation.priority}
                        </Badge>
                        <Badge variant={translation.status === 'active' ? 'default' : 'secondary'}>
                          {translation.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTranslation(translation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Key:</span>
                        <code className="ml-2 text-sm bg-muted px-1 rounded">{translation.key}</code>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">English:</span>
                        <p className="ml-2 text-sm">{translation.en}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Nepali:</span>
                        <p className="ml-2 text-sm font-devanagari">{translation.ne}</p>
                      </div>
                      
                      {translation.context && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Context:</span>
                          <p className="ml-2 text-sm text-muted-foreground">{translation.context}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                
                {filteredTranslations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No translations found matching your criteria.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Dynamic translations are stored locally and won't persist across devices. 
                  Use the export function to backup your translations.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Translation Key</label>
                  <Input
                    placeholder="e.g., custom.new_feature.title"
                    value={newTranslation.key || ''}
                    onChange={(e) => setNewTranslation({...newTranslation, key: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select 
                      value={newTranslation.category || 'general'} 
                      onValueChange={(value) => setNewTranslation({...newTranslation, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select 
                      value={newTranslation.priority || 'medium'} 
                      onValueChange={(value: 'high' | 'medium' | 'low') => setNewTranslation({...newTranslation, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">English Text</label>
                  <Textarea
                    placeholder="Enter English translation..."
                    value={newTranslation.en || ''}
                    onChange={(e) => setNewTranslation({...newTranslation, en: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Nepali Text</label>
                  <Textarea
                    placeholder="नेपाली अनुवाद प्रविष्ट गर्नुहोस्..."
                    value={newTranslation.ne || ''}
                    onChange={(e) => setNewTranslation({...newTranslation, ne: e.target.value})}
                    className="font-devanagari"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Context/Notes</label>
                  <Textarea
                    placeholder="Provide context for translators..."
                    value={newTranslation.context || ''}
                    onChange={(e) => setNewTranslation({...newTranslation, context: e.target.value})}
                  />
                </div>

                <Button onClick={addTranslation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Translation
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export & Backup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Export all dynamic translations to JSON file</p>
                        <p className="text-xs text-muted-foreground">
                          Total translations: {translations.length}
                        </p>
                      </div>
                      <Button onClick={exportTranslations} variant="outline">
                        Export JSON
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">By Category</div>
                        {categories.map(cat => {
                          const count = translations.filter(t => t.category === cat).length;
                          return count > 0 ? (
                            <div key={cat} className="flex justify-between">
                              <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                              <span>{count}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                      
                      <div>
                        <div className="font-medium">By Priority</div>
                        {['high', 'medium', 'low'].map(priority => {
                          const count = translations.filter(t => t.priority === priority).length;
                          return count > 0 ? (
                            <div key={priority} className="flex justify-between">
                              <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                              <span>{count}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
