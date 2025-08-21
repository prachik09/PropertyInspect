// src/utils/aiApis.js

// Mock Gemini API for text analysis
export const callGeminiAPI = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const keywords = [
    "natural lighting", "modern appliances", "stainless steel", 
    "spacious", "hardwood floors", "walk-in closet", 
    "good condition", "minor maintenance", "updated fixtures"
  ];
  return keywords.slice(0, Math.floor(Math.random() * 5) + 4);
};

// Mock CLIP API for image analysis
export const callCLIPAPI = async (imageData) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const amenities = [
    "Kitchen Island", "Granite Countertops", "Modern Appliances", 
    "Pendant Lighting", "Tile Backsplash", "Stainless Steel Sink",
    "Hardwood Floors", "Crown Molding", "Recessed Lighting"
  ];
  return amenities.slice(0, Math.floor(Math.random() * 4) + 3);
};
