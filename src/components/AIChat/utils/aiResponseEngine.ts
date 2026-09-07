
import { AIResponse } from "../types";
import { findRelatedFoods } from "./foodSearch";

export const getEnhancedAIResponse = (input: string): AIResponse => {
  const lowerInput = input.toLowerCase();
  let relatedFoods: any[] = [];
  let suggestions: string[] = [];
  let analysisType: 'nutrition' | 'safety' | 'preparation' | 'general' = 'general';
  let nutritionTips: string[] = [];
  let safetyWarnings: string[] = [];
  
  // Vegetable queries
  if (lowerInput.includes("vegetable") || lowerInput.includes("tarkari") || lowerInput.includes("sabji")) {
    relatedFoods = findRelatedFoods("vegetable");
    suggestions = ["How to prepare safely?", "Which vegetables are lowest in potassium?", "Daily vegetable limits"];
    analysisType = 'nutrition';
    nutritionTips = [
      "Double-boil high-potassium vegetables to reduce potassium content",
      "Limit vegetable intake to 2-3 servings per day",
      "Choose fresh vegetables over canned ones to control sodium"
    ];
    return {
      content: "Here are dialysis-safe vegetables from our database. Green badges indicate generally safe options, while yellow badges need special preparation like double-boiling. Always consult your dietitian for personalized portions.",
      relatedFoods,
      suggestions,
      analysisType,
      nutritionTips
    };
  }
  
  // Protein queries
  if (lowerInput.includes("protein") || lowerInput.includes("meat") || lowerInput.includes("masu") || lowerInput.includes("dal")) {
    relatedFoods = findRelatedFoods("protein");
    suggestions = ["Show me portion sizes", "Best cooking methods", "Protein timing with dialysis", "Phosphorus in proteins"];
    analysisType = 'nutrition';
    nutritionTips = [
      "Aim for 1.2g protein per kg body weight if on dialysis",
      "Choose high-quality proteins like fish, chicken, and eggs",
      "Take phosphate binders with protein-rich meals"
    ];
    safetyWarnings = [
      "Limit red meat to reduce phosphorus load",
      "Avoid processed meats high in sodium and preservatives"
    ];
    return {
      content: "Protein is crucial for dialysis patients to prevent malnutrition. Here are recommended high-quality, renal-friendly protein sources. Monitor phosphorus content and take binders as prescribed.",
      relatedFoods,
      suggestions,
      analysisType,
      nutritionTips,
      safetyWarnings
    };
  }
  
  // Potassium queries
  if (lowerInput.includes("potassium") || lowerInput.includes("k+") || lowerInput.includes("high potassium")) {
    relatedFoods = findRelatedFoods("").filter(food => 
      food.nutrients?.potassium && food.nutrients.potassium < 200
    ).slice(0, 4);
    suggestions = ["Show low-potassium foods", "Leaching techniques", "Monitor my potassium intake", "Emergency high potassium"];
    analysisType = 'safety';
    nutritionTips = [
      "Keep daily potassium under 2000mg if on hemodialysis",
      "Use leaching techniques: soak, boil, discard water, re-boil",
      "Low-potassium fruits: apples, berries, grapes, watermelon (small portions)"
    ];
    safetyWarnings = [
      "High potassium (>5.5 mEq/L) can cause dangerous heart rhythm problems",
      "Avoid: bananas, oranges, tomatoes, potatoes, avocados",
      "Call your doctor if you experience heart palpitations"
    ];
    return {
      content: "Potassium management is critical for dialysis patients. High levels can cause dangerous heart rhythm problems. Here are low-potassium food options and preparation techniques.",
      relatedFoods,
      suggestions,
      analysisType,
      nutritionTips,
      safetyWarnings
    };
  }

  // Phosphorus queries
  if (lowerInput.includes("phosphorus") || lowerInput.includes("phosphate") || lowerInput.includes("binder")) {
    suggestions = ["Show low-phosphorus foods", "When to take binders", "Natural vs added phosphorus", "Bone health tips"];
    analysisType = 'safety';
    nutritionTips = [
      "Take phosphate binders with every meal and snack",
      "Natural phosphorus (from plants) is less absorbed than added phosphorus",
      "Limit dairy products, nuts, and whole grains"
    ];
    safetyWarnings = [
      "High phosphorus causes bone disease and heart problems",
      "Avoid processed foods with phosphate additives",
      "Don't take binders on empty stomach - they won't work"
    ];
    return {
      content: "Phosphorus control prevents bone disease and cardiovascular complications. Take binders with all meals, limit dairy and processed foods with phosphate additives.",
      suggestions,
      analysisType,
      nutritionTips,
      safetyWarnings
    };
  }

  // Food safety queries
  if (lowerInput.includes("safe") || lowerInput.includes("can i eat") || lowerInput.includes("allowed")) {
    const searchTerm = lowerInput.replace(/can i eat|is|safe|allowed/g, '').trim();
    relatedFoods = findRelatedFoods(searchTerm);
    suggestions = ["Check food safety", "Show me alternatives", "Plan a safe meal", "Preparation methods"];
    analysisType = 'safety';
    return {
      content: "I've found foods related to your query. Check the safety badges - green means generally safe, yellow means needs special preparation, red means limit or avoid. Always verify portions with your dietitian.",
      relatedFoods,
      suggestions,
      analysisType
    };
  }

  // Meal planning queries
  if (lowerInput.includes("meal") || lowerInput.includes("breakfast") || lowerInput.includes("lunch") || lowerInput.includes("dinner")) {
    suggestions = ["Plan my breakfast", "Lunch ideas", "Dinner recipes", "Snack options", "Weekly meal plan"];
    analysisType = 'nutrition';
    nutritionTips = [
      "Spread protein intake throughout the day",
      "Include a carbohydrate source with each meal",
      "Plan meals around your dialysis schedule"
    ];
    return {
      content: "I can help you plan balanced, kidney-friendly meals. Focus on portion control, timing with dialysis, and balancing nutrients throughout the day.",
      suggestions,
      analysisType,
      nutritionTips
    };
  }

  // General nutrition questions
  suggestions = ["Ask about specific foods", "Plan a meal", "Check nutrient limits", "Learn about food safety", "Dialysis diet basics"];
  return {
    content: "I'm here to help with your kidney-friendly nutrition questions! Our database contains detailed information about Nepali foods, their safety for dialysis patients, and preparation methods. What would you like to know?",
    suggestions,
    analysisType: 'general'
  };
};
