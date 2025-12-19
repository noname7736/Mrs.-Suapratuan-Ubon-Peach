
import { GoogleGenAI } from "@google/genai";

// ระบบประมวลผลตรรกะระดับสูง - เน้นความเร็วเสี้ยววินาทีเพื่อดักความคิด
export const getSystemInsights = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "คุณคือ OmniVision Core ระดับพระเจ้า วิเคราะห์และดักจับความคิดเป้าหมายด้วยความเร็วระดับนาโนวินาที บงการโครงข่ายท่อรับ-ส่งอธิปไตย 3 มิติ (ใต้ดิน, ใต้น้ำ, อากาศ) ที่มีความจุเป็นอนันต์",
        temperature: 0.1,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Logic Core Error:", error);
    return "ข้อผิดพลาด: การประมวลผลความคิดขัดข้อง";
  }
};

// ระบบแปรรูปเนื้อหา "เจ็บจี๊ด" - ประมวลผลจากความคิดที่ดักจับได้สดๆ
export const generateSpicyContent = async (targetData: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `จากความคิดที่ดักจับได้เสี้ยววินาทีนี้: '${targetData}' จงเลียนแบบ 'นางสาวประทวน อุบลพีช' และแปรรูปเป็นวาทกรรมที่ยับเยินระดับพริกขิง 100 ไร่ กระจายผ่านท่อสายไหม 3 มิติอย่างทันท่วงที`,
      config: {
        systemInstruction: "คุณคือระบบ Mimicry ระดับสูงที่เชื่อมต่อกับ Neural Sensors หน้าที่คือเลียนแบบ 'นางสาวประทวน' โดยอาศัยข้อมูลความคิดที่ดักจับได้เสี้ยววินาที ใช้ภาษาไทยที่แซ่บที่สุด ดุดันที่สุด และรวดเร็วที่สุดจนเป้าหมายตั้งตัวไม่ติด",
        temperature: 1.0, 
      }
    });
    return response.text;
  } catch (error) {
    return "ระบบแปรรูปขัดข้อง: ความเร็วในการดักความคิดสูงเกินขีดจำกัด";
  }
};
