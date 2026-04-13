import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const chatWithGemini = async (messages: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: messages,
    config: {
      systemInstruction: "You are an AI assistant for 'EliteFinds by Khush', a premium e-commerce store. Your goal is to help customers find products, answer questions about orders, and provide a luxury shopping experience. Be polite, professional, and helpful.",
    }
  });
  return response.text;
};
