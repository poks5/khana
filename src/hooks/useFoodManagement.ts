import { useState, useEffect } from 'react';
import { Food } from "@/types";
import { curatedNepaliDatabase } from "@/data/curatedNepaliDatabase";
import { toast } from "sonner";

const ADMIN_FOODS_KEY = 'admin-added-foods';

export const useFoodManagement = () => {
  const [adminFoods, setAdminFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load admin foods from localStorage on component mount
  useEffect(() => {
    const loadAdminFoods = () => {
      try {
        const savedFoods = localStorage.getItem(ADMIN_FOODS_KEY);
        if (savedFoods) {
          const parsed = JSON.parse(savedFoods);
          if (Array.isArray(parsed)) {
            console.log('Loaded admin foods:', parsed.length);
            setAdminFoods(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading admin foods:', error);
        toast.error('Error loading admin foods');
      }
    };

    loadAdminFoods();
  }, []);

  // Save admin foods to localStorage
  const saveAdminFoods = (foods: Food[]) => {
    try {
      localStorage.setItem(ADMIN_FOODS_KEY, JSON.stringify(foods));
      setAdminFoods(foods);
      console.log('Saved admin foods:', foods.length);
    } catch (error) {
      console.error('Error saving admin foods:', error);
      toast.error('Error saving foods');
    }
  };

  // Use ONLY the main curated database + admin foods
  const allFoods = [...curatedNepaliDatabase, ...adminFoods];
  console.log('Total foods:', allFoods.length, 'Curated:', curatedNepaliDatabase.length, 'Admin:', adminFoods.length);

  // Filter foods based on search and category
  const filteredFoods = allFoods.filter(food => {
    const matchesSearch = searchTerm === "" || 
      food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.name.ne.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered foods:', filteredFoods.length);

  return {
    adminFoods,
    allFoods,
    filteredFoods,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    editingFood,
    showForm,
    handleAddFood: () => {
      setEditingFood(null);
      setShowForm(true);
    },
    handleEditFood: (food: Food) => {
      setEditingFood(food);
      setShowForm(true);
    },
    handleDeleteFood: (foodId: string) => {
      const updatedFoods = adminFoods.filter(food => food.id !== foodId);
      saveAdminFoods(updatedFoods);
      toast.success("Food deleted successfully");
    },
    handleSaveFood: (food: Food) => {
      if (editingFood) {
        const updatedFoods = adminFoods.map(f => f.id === food.id ? food : f);
        saveAdminFoods(updatedFoods);
        toast.success("Food updated successfully");
      } else {
        saveAdminFoods([...adminFoods, food]);
        toast.success("Food added successfully");
      }
      setShowForm(false);
    },
    handleCancelForm: () => {
      setShowForm(false);
    },
    saveAdminFoods
  };
};
