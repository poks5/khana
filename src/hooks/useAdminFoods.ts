
import { useState, useEffect } from 'react';
import { Food } from '@/types';

const ADMIN_FOODS_KEY = 'admin-added-foods';

export const useAdminFoods = () => {
  const [adminFoods, setAdminFoods] = useState<Food[]>([]);

  useEffect(() => {
    const loadAdminFoods = () => {
      try {
        const savedFoods = localStorage.getItem(ADMIN_FOODS_KEY);
        if (savedFoods) {
          const parsed = JSON.parse(savedFoods);
          if (Array.isArray(parsed)) {
            setAdminFoods(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading admin foods:', error);
      }
    };

    loadAdminFoods();

    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ADMIN_FOODS_KEY) {
        loadAdminFoods();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addAdminFood = (food: Food) => {
    const updatedFoods = [...adminFoods, food];
    localStorage.setItem(ADMIN_FOODS_KEY, JSON.stringify(updatedFoods));
    setAdminFoods(updatedFoods);
  };

  const updateAdminFood = (updatedFood: Food) => {
    const updatedFoods = adminFoods.map(food => 
      food.id === updatedFood.id ? updatedFood : food
    );
    localStorage.setItem(ADMIN_FOODS_KEY, JSON.stringify(updatedFoods));
    setAdminFoods(updatedFoods);
  };

  const deleteAdminFood = (foodId: string) => {
    const updatedFoods = adminFoods.filter(food => food.id !== foodId);
    localStorage.setItem(ADMIN_FOODS_KEY, JSON.stringify(updatedFoods));
    setAdminFoods(updatedFoods);
  };

  return {
    adminFoods,
    addAdminFood,
    updateAdminFood,
    deleteAdminFood
  };
};
