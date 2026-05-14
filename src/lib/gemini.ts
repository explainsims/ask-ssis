import { GoogleGenAI } from '@google/genai';

// @ts-ignore
const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. Pleas set it in the environment.");
}

export const ai = new GoogleGenAI({ apiKey });
