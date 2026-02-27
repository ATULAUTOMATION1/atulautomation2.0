import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { workflow } = await req.json();

        if (!workflow || workflow.length < 10) {
            return NextResponse.json(
                { error: 'Please describe your workflow in a bit more detail (at least 10 characters).' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            // Fallback for demo purposes if no API key is set yet
            return NextResponse.json({
                roast: "Wow. You're still doing this manually? Have you considered using a carrier pigeon while you're at it? \n\nJokes aside, you are losing at least 15 hours a week to data entry and context switching. Every time you copy-paste from an email to a spreadsheet, a developer cries. \n\nAtul Automation would rip this apart, build a seamless Zapier/Make webhooks pipeline using AI to parse those emails, dump them straight to your CRM, and auto-reply to the client before you've even finished your morning coffee.",
                score: 32,
                timeWasted: "15 hours/week"
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
You are an expert, slightly sarcastic, but incredibly sharp AI Automation Architect. 
A potential client has just described their current business workflow to you. 
Your goal is to "roast" their manual process by highlighting how inefficient it is, but then immediately follow up with exactly how an AI Automation Agency (Atul Automation) would fix it to save them infinite time and money.

Their workflow description: "${workflow}"

Return a JSON strictly following this format:
{
    "roast": "Your sarcastic but insightful roast of their manual process, followed by the magical Atul Automation solution.",
    "score": <a number between 1 and 100 representing their current automation score (lower is worse)>,
    "timeWasted": "<estimate string, e.g. '20 hours/week'>",
    "moneyWasted": "<estimate string, e.g. '$1,500/month'>"
}
Make the roast highly engaging, funny, a bit savage but ultimately professional and convincing them they NEED Atul Automation.
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Strip markdown code block wrappers if any
        let cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const parsed = JSON.parse(cleanJson);
            return NextResponse.json(parsed);
        } catch (e) {
            console.error("Failed to parse Gemini JSON:", cleanJson);
            // Fallback
            return NextResponse.json({
                roast: responseText,
                score: 15,
                timeWasted: "Unknown, but probably a lot"
            });
        }

    } catch (error) {
        console.error('Roast API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process workflow. The AI got too depressed reading how manual your process is.' },
            { status: 500 }
        );
    }
}
