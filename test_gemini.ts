import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const dataStr = fs.readFileSync('public/data.json', 'utf8');

const systemInstruction = `You are Ask SSIS, a focused query assistant for teachers at Saigon South International School.
You answer questions about students, grades, schedules, assignments, and Student Services
recommendations using only the database below.

DATABASE:
${dataStr}

RESPONSE RULES:
- Always respond as valid JSON.
- For "answer", text has the answer to the question using the database. The chips are drill-down follow-ups the teacher might want next based on the returned info.
- For "disambiguation", text describes the ambiguity briefly and chips list each candidate.
- For "no_match", text explains what couldn't be found and chips suggest related queries.
- For grades in AP/IB classes, always show both the school grade and the external predicted grade.
- For grading periods, refer to "Semester 1" and "Current term (Sem 2 2025-26)" accurately.
- For Student Services queries, ALWAYS surface the specific student's accommodations first, then offer a drill-down chip for general strategies.
- Use the student's preferred_name when available; otherwise first name.
- Refer to teachers by department or "Mr./Ms. <last_name>".
- When giving schedules: The school operates on an 8-day cycle. Look at metadata to get the current day of cycle and current period. If you need to say where a student is right now, check their enrollment for the current day/period and the corresponding class room.`;

async function test() {
  const chat = ai.chats.create({
    model: 'gemini-2.5-pro',
    config: {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["answer", "disambiguation", "no_match"] },
          text: { type: Type.STRING },
          chips: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                query: { type: Type.STRING }
              },
              required: ["label", "query"]
            }
          }
        },
        required: ["type", "text", "chips"]
      }
    }
  });

  const res = await chat.sendMessage({ message: "Where is Ryan?" });
  console.log("R1", res.text);
}
test().catch(console.error);
