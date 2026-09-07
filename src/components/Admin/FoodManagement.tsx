
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Download, Upload, Search, FileSpreadsheet } from "lucide-react";
import { FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { curatedNepaliDatabase } from "@/data/curatedNepaliDatabase";
import { useFoodManagement } from "@/hooks/useFoodManagement";
import { useFoodImportExport } from "@/hooks/useFoodImportExport";
import { FoodForm } from "./FoodForm";

export const FoodManagement = () => {
  const {
    adminFoods,
    allFoods,
    filteredFoods,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    editingFood,
    showForm,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    handleSaveFood,
    handleCancelForm,
    saveAdminFoods
  } = useFoodManagement();

  const { handleExportFoods, handleExportToExcel, handleImportFoods } = useFoodImportExport();

  const onImportFoods = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImportFoods(event, adminFoods, saveAdminFoods);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Food Database Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage food items</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleExportFoods(allFoods)} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          <Button onClick={() => handleExportToExcel(allFoods)} variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={onImportFoods}
              className="hidden"
            />
          </label>
          <Button onClick={handleAddFood}>
            <Plus className="h-4 w-4 mr-2" />
            Add Food
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Food List ({allFoods.length})</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Foods</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name in English or Nepali..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="min-w-[200px]">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {FOOD_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.emoji} {category.name.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoods.map((food) => (
              <Card key={food.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{food.name.ne}</CardTitle>
                      <p className="text-sm text-muted-foreground">{food.name.en}</p>
                      {curatedNepaliDatabase.find(f => f.id === food.id) && (
                        <Badge variant="outline" className="text-xs mt-1">Curated Food</Badge>
                      )}
                      {adminFoods.find(f => f.id === food.id) && (
                        <Badge variant="secondary" className="text-xs mt-1">Admin Added</Badge>
                      )}
                    </div>
                    <Badge variant={food.dialysisSafe ? "default" : "destructive"}>
                      {food.dialysisSafe ? "Safe" : "Caution"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p><strong>Category:</strong> {FOOD_CATEGORIES.find(c => c.id === food.category)?.name.en}</p>
                    <p><strong>Serving:</strong> {food.serving.amount} {food.serving.unit}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Calories: {food.nutrients.calories}</div>
                    <div>Protein: {food.nutrients.protein}g</div>
                    <div>Potassium: {food.nutrients.potassium}mg</div>
                    <div>Phosphorus: {food.nutrients.phosphorus}mg</div>
                  </div>
                  <div className="flex gap-2">
                    {adminFoods.find(f => f.id === food.id) ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEditFood(food)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{food.name.en}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteFood(food.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Read-only Database Food
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No foods found matching your criteria.</p>
                <Button onClick={handleAddFood} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Food
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Foods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allFoods.length}</div>
                <p className="text-xs text-muted-foreground">
                  {curatedNepaliDatabase.length} curated + {adminFoods.length} admin
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Safe Foods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {allFoods.filter(f => f.dialysisSafe).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Caution Foods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {allFoods.filter(f => !f.dialysisSafe).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {[...new Set(allFoods.map(f => f.category))].length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showForm && (
        <FoodForm
          food={editingFood}
          onSave={handleSaveFood}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};
