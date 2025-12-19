
import { GoogleGenAI } from "@google/genai";

// Standard implementation for fetching system insights
export const getSystemInsights = async (prompt: string) => {
  try {
    // Initializing Gemini client with mandatory apiKey from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High-level logic tasks use the pro model
      contents: prompt,
      config: {
        // System instruction configured as part of model config
        systemInstruction: "You are an AI logic core for the OmniVision system. Analyze this input using high-level logic and data analysis.",
        temperature: 0.1, // High logic, low creativity
        topK: 1
      }
    });
    return response.text;
  } catch (error) {
    console.error("Logic Core Error:", error);
    return "Error: System response latency exceeded limits.";
  }
};
