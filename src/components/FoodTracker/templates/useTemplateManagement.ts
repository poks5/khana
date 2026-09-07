
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CustomTemplate {
  id: string;
  nepali: string;
  english: string;
  icon: string;
  description: string;
  calories: number;
  safe: boolean;
}

export const useTemplateManagement = () => {
  const { toast } = useToast();
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<CustomTemplate>>({});

  useEffect(() => {
    const savedTemplates = localStorage.getItem('custom-meal-templates');
    if (savedTemplates) {
      try {
        const parsed = JSON.parse(savedTemplates);
        setCustomTemplates(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Failed to load custom templates:', error);
        setCustomTemplates([]);
      }
    }
  }, []);

  const saveTemplates = (templates: CustomTemplate[]) => {
    try {
      localStorage.setItem('custom-meal-templates', JSON.stringify(templates));
      setCustomTemplates(templates);
    } catch (error) {
      console.error('Failed to save templates:', error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (template: any) => {
    setEditingTemplate(template.id);
    setEditValues(template);
  };

  const handleSave = (templateId: string) => {
    if (!editValues.nepali || !editValues.calories) {
      toast({
        title: "Missing Information",
        description: "Please enter at least the Nepali name and calories",
        variant: "destructive"
      });
      return;
    }

    const updatedTemplate: CustomTemplate = {
      id: templateId,
      nepali: editValues.nepali || "",
      english: editValues.english || editValues.nepali || "",
      icon: editValues.icon || "🍽️",
      description: editValues.description || editValues.nepali || "",
      calories: Number(editValues.calories) || 0,
      safe: editValues.safe || false
    };

    const existingIndex = customTemplates.findIndex(t => t.id === templateId);
    let newTemplates;
    
    if (existingIndex >= 0) {
      newTemplates = [...customTemplates];
      newTemplates[existingIndex] = updatedTemplate;
    } else {
      newTemplates = [...customTemplates, updatedTemplate];
    }

    saveTemplates(newTemplates);
    setEditingTemplate(null);
    setEditValues({});
    
    toast({
      title: "Success",
      description: "Template saved successfully",
    });
  };

  const handleCancel = () => {
    setEditingTemplate(null);
    setEditValues({});
  };

  const createNewTemplate = () => {
    const newId = `custom_${Date.now()}`;
    setEditingTemplate(newId);
    setEditValues({
      id: newId,
      nepali: "",
      english: "",
      icon: "🍽️",
      description: "",
      calories: 300,
      safe: false
    });
  };

  return {
    customTemplates,
    editingTemplate,
    editValues,
    setEditValues,
    handleEdit,
    handleSave,
    handleCancel,
    createNewTemplate
  };
};
