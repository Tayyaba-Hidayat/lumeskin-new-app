
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeSkin = async (imageBase64: string) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
        { text: "Analyze this skin image for common dermatological concerns. Provide a summary including: Potential Condition, Severity (Low/Medium/High), and General Recommendations. Format the output as clean JSON." }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          condition: { type: Type.STRING },
          severity: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        },
        required: ["condition", "severity", "recommendations", "summary"]
      }
    }
  });

  const response = await model;
  return JSON.parse(response.text || '{}');
};

export const chatWithAI = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are LumeSkin AI, a helpful and empathetic dermatology assistant. Answer questions about skin care, products, and general health. Be concise and professional."
    }
  });
  
  const response = await chat.sendMessage({ message });
  return response.text;
};
