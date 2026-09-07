import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Food } from "@/types";
import { FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { toast } from "sonner";

interface FoodFormProps {
  food: Food | null;
  onSave: (food: Food) => void;
  onCancel: () => void;
}

export const FoodForm = ({ food, onSave, onCancel }: FoodFormProps) => {
  const [formData, setFormData] = useState<Partial<Food>>({
    id: food?.id || '',
    name: food?.name || { en: '', ne: '' },
    category: food?.category || 'main-foods-grains',
    dialysisSafe: food?.dialysisSafe ?? true,
    conditionalSafe: food?.conditionalSafe ?? false,
    nutrients: food?.nutrients || {
      calories: 0,
      protein: 0,
      potassium: 0,
      phosphorus: 0,
      sodium: 0,
      fluid: 0
    },
    serving: food?.serving || { amount: 1, unit: 'cup' },
    preparationNotes: food?.preparationNotes || { en: '', ne: '' },
    culturalNotes: food?.culturalNotes || { en: '', ne: '' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.en || !formData.name?.ne) {
      toast.error("Please provide both English and Nepali names");
      return;
    }

    const newFood: Food = {
      id: formData.id || crypto.randomUUID(),
      name: formData.name,
      category: formData.category!,
      dialysisSafe: formData.dialysisSafe!,
      conditionalSafe: formData.conditionalSafe,
      nutrients: formData.nutrients!,
      serving: formData.serving!,
      preparationNotes: formData.preparationNotes,
      culturalNotes: formData.culturalNotes
    };

    onSave(newFood);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{food ? 'Edit Food' : 'Add New Food'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name-en">English Name *</Label>
                <Input
                  id="name-en"
                  value={formData.name?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name!, en: e.target.value }
                  })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name-ne">Nepali Name *</Label>
                <Input
                  id="name-ne"
                  value={formData.name?.ne || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: { ...formData.name!, ne: e.target.value }
                  })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {FOOD_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.emoji} {category.name.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serving-amount">Serving Amount *</Label>
                <Input
                  id="serving-amount"
                  type="number"
                  step="0.1"
                  value={formData.serving?.amount || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    serving: { ...formData.serving!, amount: Number(e.target.value) }
                  })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="serving-unit">Serving Unit *</Label>
                <Input
                  id="serving-unit"
                  value={formData.serving?.unit || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    serving: { ...formData.serving!, unit: e.target.value }
                  })}
                  placeholder="e.g., cup, piece, gram"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.nutrients?.calories || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, calories: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={formData.nutrients?.protein || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, protein: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="potassium">Potassium (mg)</Label>
                <Input
                  id="potassium"
                  type="number"
                  value={formData.nutrients?.potassium || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, potassium: Number(e.target.value) }
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="phosphorus">Phosphorus (mg)</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  value={formData.nutrients?.phosphorus || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, phosphorus: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="sodium">Sodium (mg)</Label>
                <Input
                  id="sodium"
                  type="number"
                  value={formData.nutrients?.sodium || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, sodium: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="fluid">Fluid (ml)</Label>
                <Input
                  id="fluid"
                  type="number"
                  value={formData.nutrients?.fluid || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    nutrients: { ...formData.nutrients!, fluid: Number(e.target.value) }
                  })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dialysis-safe"
                  checked={formData.dialysisSafe}
                  onChange={(e) => setFormData({ ...formData, dialysisSafe: e.target.checked })}
                />
                <Label htmlFor="dialysis-safe">Dialysis Safe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="conditional-safe"
                  checked={formData.conditionalSafe}
                  onChange={(e) => setFormData({ ...formData, conditionalSafe: e.target.checked })}
                />
                <Label htmlFor="conditional-safe">Conditional Safe</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prep-notes-en">Preparation Notes (English)</Label>
                <Textarea
                  id="prep-notes-en"
                  value={formData.preparationNotes?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    preparationNotes: { ...formData.preparationNotes!, en: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="prep-notes-ne">Preparation Notes (Nepali)</Label>
                <Textarea
                  id="prep-notes-ne"
                  value={formData.preparationNotes?.ne || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    preparationNotes: { ...formData.preparationNotes!, ne: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cultural-notes-en">Cultural Notes (English)</Label>
                <Textarea
                  id="cultural-notes-en"
                  value={formData.culturalNotes?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    culturalNotes: { ...formData.culturalNotes!, en: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="cultural-notes-ne">Cultural Notes (Nepali)</Label>
                <Textarea
                  id="cultural-notes-ne"
                  value={formData.culturalNotes?.ne || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    culturalNotes: { ...formData.culturalNotes!, ne: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {food ? 'Update Food' : 'Add Food'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};