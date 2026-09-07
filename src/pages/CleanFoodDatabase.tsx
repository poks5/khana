
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleanedFoodDatabase } from "@/components/FoodMaster/CleanedFoodDatabase";
import { FoodDatabaseStats } from "@/components/FoodMaster/FoodDatabaseStats";

export const CleanFoodDatabase = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="database">🧾 Cleaned Database</TabsTrigger>
          <TabsTrigger value="stats">📊 Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="database">
          <CleanedFoodDatabase />
        </TabsContent>

        <TabsContent value="stats">
          <FoodDatabaseStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};
