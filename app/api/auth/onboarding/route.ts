import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken, updateUserOnboarding } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { whyInterested, automationIdea, thoughtProcess } = body;

    if (!whyInterested || !automationIdea || !thoughtProcess) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API Key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an AI Growth Strategist at Atul Automation.
      Analyze the following onboarding profile for a new user:
      
      1. Why interested in AI: ${whyInterested}
      2. Planned AI Automation applications: ${automationIdea}
      3. Strategy/Thought process: ${thoughtProcess}
      
      Provide your analysis in a strict JSON format with the following two keys:
      - "channel": One of exactly three options: ["Enterprise", "Creator", "Standard"]. Pick "Enterprise" if they discuss scaled business operations, ROI, or high budgets. Pick "Creator" if they talk about self-learning, coding bots, personal efficiency, or content creation. Otherwise, pick "Standard".
      - "mindsetAnalysis": A concise, inspiring 2-sentence summary highlighting their strategic focus and what AI capabilities in Atul Automation best fit their track.
      
      JSON output only.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    let channel = 'Standard';
    let mindsetAnalysis = 'Ready to deploy custom automation workflows.';
    
    try {
      const jsonStr = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      if (['Enterprise', 'Creator', 'Standard'].includes(parsed.channel)) {
        channel = parsed.channel;
      }
      if (parsed.mindsetAnalysis) {
        mindsetAnalysis = parsed.mindsetAnalysis;
      }
    } catch (e) {
      console.error('Failed to parse Gemini output:', responseText);
    }

    await updateUserOnboarding(user.email, mindsetAnalysis, channel);

    return NextResponse.json({
      success: true,
      channel,
      mindsetAnalysis
    });
  } catch (error: any) {
    console.error('Onboarding API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
