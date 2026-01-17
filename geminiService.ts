
export const analyzeSkin = async (imageBase64: string) => {
  // Mock AI Analysis for stability
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
  return {
    condition: "Dermal Sensitivity",
    severity: "Low",
    recommendations: [
      "Use a pH-balanced cleanser twice daily",
      "Apply Lume Hydrating Serum to damp skin",
      "Avoid harsh chemical exfoliants for 48 hours"
    ],
    summary: "Based on our visual analysis, your skin shows slight redness consistent with mild sensitivity or environmental irritation."
  };
};

export const chatWithAI = async (message: string, history: any[]) => {
  // Mock AI Chat for stability
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return "Hello! I'm Lume, your skincare assistant. How can I help your glow today?";
  }
  if (lowerMsg.includes("acne")) {
    return "Acne can be tricky! I recommend our Pink Clay Mask for targeted pore purification and consulting with Dr. Sarah Smith.";
  }
  if (lowerMsg.includes("order") || lowerMsg.includes("buy")) {
    return "You can browse our Boutique in the Shop tab and add items directly to your clinical kit.";
  }
  
  return "That's an interesting question about your skin! While I'm a specialized assistant, I recommend booking a consultation with one of our dermatologists for a personalized medical plan.";
};
