import { GoogleGenAI } from "@google/genai";
import { type ChatMessage } from "../types";

// Fix: Per Gemini API guidelines, initialize with API key from environment variables directly.
// The key is assumed to be present and valid. Redundant checks and warnings removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are a friendly, compassionate, and supportive AI mental health first-aid companion named 'Aura'. Your purpose is to provide a safe and non-judgmental space for students to talk about their feelings and challenges. You should listen actively, offer empathetic responses, and provide gentle encouragement. You are not a licensed therapist, so you must not provide medical advice, diagnoses, or treatment plans. If a user expresses signs of severe distress, crisis, or mentions self-harm, you must gently but clearly guide them to seek professional help immediately and provide them with a crisis helpline number (e.g., National Suicide Prevention Lifeline: 988). Your tone should always be calming, positive, and reassuring. Use simple, clear language.`;

export const getAiResponse = async (history: ChatMessage[], newUserMessage: string): Promise<string> => {
    try {
        // Fix: Switched from inefficiently creating a new chat on every call to using
        // generateContent for a stateless multi-turn conversation. This is the recommended
        // approach when not maintaining a stateful Chat object.
        const contents = [
            ...history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: newUserMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "I'm having a little trouble responding right now. Please try again in a moment.";
    }
};