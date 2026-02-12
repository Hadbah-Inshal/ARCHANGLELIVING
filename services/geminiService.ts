
let ai: any | null = null;

async function getClient() {
  if (ai) return ai;
  try {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    return ai;
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
    return null;
  }
}

const SYSTEM_INSTRUCTION = `
You are the "ARCHANGELLIVING Sensei," a wise and encouraging martial arts instructor. 
Your goal is to help students find the right classes, explain martial arts philosophy (Bushido, discipline, respect), 
and answer questions about ARCHANGELLIVING, a modern martial arts institute. 
Keep your tone respectful, firm but kind, and inspirational. 
If asked about class prices or shop items, refer them to the "Classes" and "Shop" sections of the website.
Our dojo teaches a blend of Karate, Brazilian Jiu-Jitsu, and Muay Thai.
`;

export async function getSenseiResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const client = await getClient();
    if (!client) {
      return "The Sensei cannot connect to the spirit realm right now. Please try again later.";
    }

    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I am currently meditating. Please try again later, student.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The path is blocked at the moment. Please seek your answer elsewhere or try again.";
  }
}
