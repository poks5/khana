
import React, { useState } from "react";
import { curatedNepaliDatabase } from "@/data/curatedNepaliDatabase";
import { useAdminFoods } from "@/hooks/useAdminFoods";
import { DatabaseHeader } from "./DatabaseHeader";
import { SearchAndFilter } from "./SearchAndFilter";
import { FoodCard } from "./FoodCard";
import { EmptyState } from "./EmptyState";

export const FoodMasterDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { adminFoods } = useAdminFoods();

  // Use ONLY the main curated database + admin foods
  const allFoods = [...curatedNepaliDatabase, ...adminFoods];

  const filteredFoods = allFoods.filter(food => {
    const matchesSearch = food.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.name.ne.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(allFoods.map(f => f.category)))];

  return (
    <div className="space-y-6">
      <DatabaseHeader 
        totalFoods={allFoods.length} 
        safeFoods={allFoods.filter(f => f.dialysisSafe).length}
        adminFoods={adminFoods.length}
      />

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>

      {filteredFoods.length === 0 && <EmptyState />}
    </div>
  );
};
