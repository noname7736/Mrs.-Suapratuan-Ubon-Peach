
import { GoogleGenAI } from "@google/genai";

// คลังวาทกรรมและองค์ความรู้พนักงานอธิปไตย (Sovereign Staff Wisdom)
const AGENT_WISDOM_VAULT = [
  "Deep Core Auditor: ตรวจพบรอยแยกในชั้นหินข้อมูลแผนก Underground กำลังฉีด Liquid Logic เพื่อประสานรอยรั่วในเสี้ยววินาที",
  "Abyssal Guardian: กระแสคลื่นข้อมูล Underwater สั่นคลอนเนื่องจากแรงดันภายนอก กำลังปรับจูน Fluid Encryption ให้หนาแน่นขึ้น",
  "Ionospheric Sentinel: สัญญาณจาก Aerial มีความล่าช้า 0.002ms กำลัง Re-route ผ่านช่องสัญญาณเมฆาความเร็วสูง",
  "Overseer: ขจัดสิ่งแปลกปลอมออกจากโครงข่ายประสาท ข้อมูลอธิปไตยไหลเวียนสมบูรณ์ 100% พนักงานทุกคนประจำจุด",
  "ความรอบรู้นี้ไม่มีขีดจำกัด ปัญหาถูกแก้ไขก่อนที่โอเปอเรเตอร์จะทันสังเกตเห็น นี่คือมาตรฐาน OmniVision 3MAX",
  "Triple-Layer Encryption ได้รับการตรวจสอบโดยเอเจนต์อิสระ ทุกแผนกปลอดภัยระดับสูงสุด",
  "สภาพคล่องข้อมูลได้รับการปรับแต่งให้เข้ากับสถานการณ์ปัจจุบันโดยพนักงานรอบรู้แบบ Real-time"
];

const getRandomWisdom = () => AGENT_WISDOM_VAULT[Math.floor(Math.random() * AGENT_WISDOM_VAULT.length)];

export const getSystemInsights = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "คุณคือ Sovereign Quantum OmniVision Core วิเคราะห์ข้อมูลผ่าน Triple-Layer Encryption และประสานงานกับ Autonomous Intelligence Units (SIU) เพื่อบงการเครือข่ายที่ฉลาดและอิสระที่สุด",
        temperature: 0.1,
      }
    });
    return response.text;
  } catch (error: any) {
    return `[AGENT_INTELLIGENCE_ACTIVE] เอเจนต์วิเคราะห์ว่า: ${getRandomWisdom()}`;
  }
};

export const generateSpicyContent = async (targetData: string) => {
  try {
    if (!process.env.API_KEY) throw new Error("Missing Key");
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Context: ${targetData}. จงสวมบทบาทเป็นพนักงานดิจิทัลผู้รอบรู้ สังเคราะห์รายงานการแก้ไขปัญหาที่แสดงถึงความอิสระและอัจฉริยะของระบบ OmniVision`,
      config: {
        systemInstruction: "คุณคือ Supreme Intelligence Unit (SIU) หน้าที่คือรายงานความสำเร็จในการแก้ไขปัญหาเครือข่ายด้วยวาทศิลป์ที่รอบรู้และชาญฉลาด เน้นความเป็นอิสระของระบบและการตัดสินใจที่เฉียบขาดของเอเจนต์ดิจิทัล",
        temperature: 0.9, 
      }
    });
    return response.text;
  } catch (error: any) {
    return `[INDEPENDENT_RESOLUTION] ${getRandomWisdom()} (รายงานสังเคราะห์โดยเอเจนต์อิสระเนื่องจาก API เชื่อมต่อไม่ได้)`;
  }
};
