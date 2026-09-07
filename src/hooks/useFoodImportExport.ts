
import { Food } from "@/types";
import { FOOD_CATEGORIES } from "@/data/consolidatedFoodDatabase";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

export const useFoodImportExport = () => {
  const handleExportFoods = (allFoods: Food[]) => {
    try {
      const dataStr = JSON.stringify(allFoods, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'complete-food-database-export.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${allFoods.length} foods successfully`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Error exporting foods');
    }
  };

  const handleExportToExcel = (allFoods: Food[]) => {
    try {
      // Prepare data for Excel export
      const excelData = allFoods.map(food => ({
        'English Name': food.name.en,
        'Nepali Name': food.name.ne,
        'Category': FOOD_CATEGORIES.find(c => c.id === food.category)?.name.en || food.category,
        'Dialysis Safe': food.dialysisSafe ? 'Yes' : 'No',
        'Conditional Safe': food.conditionalSafe ? 'Yes' : 'No',
        'Serving Amount': food.serving.amount,
        'Serving Unit': food.serving.unit,
        'Calories': food.nutrients.calories,
        'Protein (g)': food.nutrients.protein,
        'Potassium (mg)': food.nutrients.potassium,
        'Phosphorus (mg)': food.nutrients.phosphorus,
        'Sodium (mg)': food.nutrients.sodium,
        'Fluid (ml)': food.nutrients.fluid,
        'Preparation Notes (EN)': food.preparationNotes?.en || '',
        'Preparation Notes (NE)': food.preparationNotes?.ne || '',
        'Cultural Notes (EN)': food.culturalNotes?.en || '',
        'Cultural Notes (NE)': food.culturalNotes?.ne || ''
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Auto-fit column widths
      const colWidths = [
        { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 12 }, { wch: 15 },
        { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 15 },
        { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 25 }, { wch: 25 },
        { wch: 25 }, { wch: 25 }
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Food Database');

      // Save file
      XLSX.writeFile(wb, 'complete-food-database-export.xlsx');
      toast.success(`Exported ${allFoods.length} foods to Excel successfully`);
    } catch (error) {
      console.error('Excel export error:', error);
      toast.error('Error exporting to Excel');
    }
  };

  const handleImportFoods = (event: React.ChangeEvent<HTMLInputElement>, adminFoods: Food[], saveAdminFoods: (foods: Food[]) => void) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedData) && importedData.length > 0) {
          // Validate that imported data has the correct structure
          const validFoods = importedData.filter(food => 
            food.id && food.name && food.name.en && food.name.ne
          );
          
          if (validFoods.length > 0) {
            const mergedFoods = [...adminFoods, ...validFoods];
            saveAdminFoods(mergedFoods);
            toast.success(`Imported ${validFoods.length} foods successfully`);
          } else {
            toast.error("No valid foods found in the import file");
          }
        } else {
          toast.error("Invalid file format - expected an array of foods");
        }
      } catch (error) {
        console.error('Import error:', error);
        toast.error("Error importing foods - invalid JSON format");
      }
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be imported again
    event.target.value = '';
  };

  return {
    handleExportFoods,
    handleExportToExcel,
    handleImportFoods
  };
};
