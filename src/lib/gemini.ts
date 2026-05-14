import { GoogleGenAI } from '@google/genai';

declare global {
  interface Window {
    RUNTIME_CONFIG?: {
      API_KEY?: string;
      GEMINI_API_KEY?: string;
    };
  }
}

const runtimeConfig = typeof window !== 'undefined' ? window.RUNTIME_CONFIG : undefined;

// @ts-ignore
const apiKey =
  runtimeConfig?.GEMINI_API_KEY ||
  runtimeConfig?.API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. Please set it in the environment.");
}

export const ai = new GoogleGenAI({ apiKey });
