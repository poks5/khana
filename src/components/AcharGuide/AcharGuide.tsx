
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { nepaliAchars } from "@/data/nepaliAchars";
import { AcharCard } from "./AcharCard";
import { AcharSafetyEducation } from "./AcharSafetyEducation";

export const AcharGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [safetyFilter, setSafetyFilter] = useState<'all' | 'ckd-safe' | 'dialysis-safe' | 'high-risk'>('all');

  const filteredAchars = nepaliAchars.filter(achar => {
    const matchesSearch = achar.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achar.name.ne.includes(searchTerm);
    
    if (safetyFilter === 'all') return matchesSearch;
    if (safetyFilter === 'ckd-safe') return matchesSearch && achar.safetyProfile.ckdSafe === 'safe';
    if (safetyFilter === 'dialysis-safe') return matchesSearch && achar.safetyProfile.dialysisSafe === 'safe';
    if (safetyFilter === 'high-risk') return matchesSearch && 
      (achar.safetyProfile.ckdSafe === 'avoid' || achar.safetyProfile.dialysisSafe === 'avoid');
    
    return matchesSearch;
  });

  const getSafetyStats = () => {
    const ckdSafe = nepaliAchars.filter(a => a.safetyProfile.ckdSafe === 'safe').length;
    const dialysisSafe = nepaliAchars.filter(a => a.safetyProfile.dialysisSafe === 'safe').length;
    const highRisk = nepaliAchars.filter(a => 
      a.safetyProfile.ckdSafe === 'avoid' || a.safetyProfile.dialysisSafe === 'avoid'
    ).length;
    
    return { ckdSafe, dialysisSafe, highRisk };
  };

  const stats = getSafetyStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
          🥒 Achar Safety Guide
        </h2>
        <p className="text-muted-foreground">
          Comprehensive pickle safety guide for kidney patients - know which achars are safe and which to avoid
        </p>
      </div>

      {/* Safety Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">CKD Safe</p>
              <p className="text-2xl font-bold text-green-600">{stats.ckdSafe}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Dialysis Safe</p>
              <p className="text-2xl font-bold text-blue-600">{stats.dialysisSafe}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">High Risk</p>
              <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guide">Achar Database</TabsTrigger>
          <TabsTrigger value="education">Safety Education</TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search achars... (English or Nepali)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={safetyFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSafetyFilter('all')}
                size="sm"
              >
                All ({nepaliAchars.length})
              </Button>
              <Button
                variant={safetyFilter === 'ckd-safe' ? 'default' : 'outline'}
                onClick={() => setSafetyFilter('ckd-safe')}
                size="sm"
              >
                CKD Safe ({stats.ckdSafe})
              </Button>
              <Button
                variant={safetyFilter === 'dialysis-safe' ? 'default' : 'outline'}
                onClick={() => setSafetyFilter('dialysis-safe')}
                size="sm"
              >
                Dialysis Safe ({stats.dialysisSafe})
              </Button>
              <Button
                variant={safetyFilter === 'high-risk' ? 'default' : 'outline'}
                onClick={() => setSafetyFilter('high-risk')}
                size="sm"
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                High Risk ({stats.highRisk})
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchars.map((achar) => (
              <AcharCard key={achar.id} achar={achar} />
            ))}
          </div>

          {filteredAchars.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No achars found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="education">
          <AcharSafetyEducation />
        </TabsContent>
      </Tabs>
    </div>
  );
};
