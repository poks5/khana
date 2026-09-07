
import { Food } from "@/types";
import { curatedNepaliDatabase } from "@/data/curatedNepaliDatabase";

const ADMIN_FOODS_KEY = 'admin-added-foods';

export class FoodService {
  private static instance: FoodService;
  private adminFoods: Food[] = [];

  private constructor() {
    this.loadAdminFoods();
  }

  public static getInstance(): FoodService {
    if (!FoodService.instance) {
      FoodService.instance = new FoodService();
    }
    return FoodService.instance;
  }

  private loadAdminFoods(): void {
    try {
      const savedFoods = localStorage.getItem(ADMIN_FOODS_KEY);  
      if (savedFoods) {
        const parsed = JSON.parse(savedFoods);
        if (Array.isArray(parsed)) {
          this.adminFoods = parsed;
        }
      }
    } catch (error) {
      console.error('Error loading admin foods:', error);
      this.adminFoods = [];
    }
  }

  public getAllFoods(): Food[] {
    return [...curatedNepaliDatabase, ...this.adminFoods];
  }

  public getFoodById(id: string): Food | undefined {
    return this.getAllFoods().find(food => food.id === id);
  }

  public searchFoods(searchTerm: string, category?: string): Food[] {
    const allFoods = this.getAllFoods();
    
    return allFoods.filter(food => {
      const matchesSearch = searchTerm === "" || 
        food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.name.ne.includes(searchTerm);
      const matchesCategory = !category || category === "all" || food.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  public getCategories(): string[] {
    const allFoods = this.getAllFoods();
    return Array.from(new Set(allFoods.map(f => f.category)));
  }

  public addAdminFood(food: Food): void {
    this.adminFoods.push(food);
    this.saveAdminFoods();
  }

  public updateAdminFood(foodId: string, updatedFood: Food): void {
    const index = this.adminFoods.findIndex(f => f.id === foodId);
    if (index !== -1) {
      this.adminFoods[index] = updatedFood;
      this.saveAdminFoods();
    }
  }

  public deleteAdminFood(foodId: string): void {
    this.adminFoods = this.adminFoods.filter(food => food.id !== foodId);
    this.saveAdminFoods();
  }

  private saveAdminFoods(): void {
    try {
      localStorage.setItem(ADMIN_FOODS_KEY, JSON.stringify(this.adminFoods));
    } catch (error) {
      console.error('Error saving admin foods:', error);
    }
  }

  public getAdminFoods(): Food[] {
    return [...this.adminFoods];
  }
}

// Export singleton instance
export const foodService = FoodService.getInstance();
