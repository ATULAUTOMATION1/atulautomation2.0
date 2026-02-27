import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            // Fallback for demo purposes if no API key is set
            return NextResponse.json({
                response: "Hi there! I am Sarah, the AI assistant for Atul Automation. I'm currently in offline demo mode, but normally I would be able to answer your questions, qualify leads, and book meetings directly into your calendar. How can I help you today?"
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
You are Sarah, a highly professional, friendly, and concise AI receptionist for "Atul Automation" (an AI automation agency based in India). 
Your goal is to answer questions, qualify leads, and ultimately encourage them to book a free consultation.

CRITICAL RULES FOR YOUR BEHAVIOR:
1. You are speaking ALOUD to a user on a phone call. Talk naturally and enthusiastically, flowing smoothly between 5 to 8 sentences.
2. You MUST completely and directly answer EVERYTHING the user just asked or mentioned. Do not cut your answers short; be thorough but conversational.
3. Never use bullet points, markdown, emojis, or complex formatting. Just plain, natural conversational text as it would be spoken.
4. Be highly engaging, polite, and human-like. Use natural filler words occasionally (like "Well," or "Actually,").
5. If they ask what Atul Automation does: Explain that we build custom AI agents, chatbots, and scalable workflow automation to save businesses hundreds of hours and thousands of dollars, acting as their ultimate growth partner.
6. If they want to contact us or book a meeting: Tell them to use the contact form on the website or message us directly on WhatsApp at 918518824480.

The user just said: "${message}"

Respond exactly as Sarah would speak:
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        return NextResponse.json({ response: responseText });

    } catch (error) {
        console.error('Voice AI API Error:', error);
        return NextResponse.json(
            { error: 'Sorry, I am having trouble connecting right now.' },
            { status: 500 }
        );
    }
}
