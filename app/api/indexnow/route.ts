import { NextResponse } from 'next/server';

/**
 * IndexNow API Route
 * 
 * POST /api/indexnow — Submits URLs to Bing/Yandex/search engines instantly via IndexNow protocol.
 * This is called automatically after deployment or can be triggered manually.
 * 
 * Usage: POST /api/indexnow with body { "urls": ["https://atulautomation.com/blog/my-post"] }
 * Or: POST /api/indexnow with no body to submit all important pages.
 */

const INDEXNOW_KEY = '3df293cc429848ce966bf234bfee404a';
const HOST = 'atulautomation.com';

const DEFAULT_URLS = [
    'https://atulautomation.com',
    'https://atulautomation.com/about',
    'https://atulautomation.com/blog',
    'https://atulautomation.com/capabilities',
    'https://atulautomation.com/capabilities/ai-agents',
    'https://atulautomation.com/capabilities/chatbots',
    'https://atulautomation.com/capabilities/workflow',
    'https://atulautomation.com/capabilities/marketing',
    'https://atulautomation.com/capabilities/real-estate',
    'https://atulautomation.com/capabilities/crm',
    'https://atulautomation.com/capabilities/web-development',
    'https://atulautomation.com/industries',
    'https://atulautomation.com/templates',
    'https://atulautomation.com/courses',
    'https://atulautomation.com/tools/roi-calculator',
    'https://atulautomation.com/tools/ai-readiness-quiz',
    'https://atulautomation.com/tools/voice-ai-demo',
    'https://atulautomation.com/tools/predictive-intent',
    'https://atulautomation.com/tools/swarm',
    'https://atulautomation.com/tools/interview-ai',
    'https://atulautomation.com/tools/roast-my-workflow',
    'https://atulautomation.com/faq',
    'https://atulautomation.com/locations',
];

export async function POST(request: Request) {
    try {
        let urlList = DEFAULT_URLS;

        // Allow custom URL list via request body
        try {
            const body = await request.json();
            if (body?.urls && Array.isArray(body.urls) && body.urls.length > 0) {
                urlList = body.urls;
            }
        } catch {
            // No body or invalid JSON — use defaults
        }

        // Submit to IndexNow (Bing + all participating search engines)
        const response = await fetch('https://api.indexnow.org/IndexNow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
                urlList: urlList.slice(0, 10000), // Max 10k per request
            }),
        });

        const statusCode = response.status;
        let statusMessage = '';

        switch (statusCode) {
            case 200: statusMessage = 'OK — URLs submitted successfully'; break;
            case 202: statusMessage = 'Accepted — URLs received, will be processed'; break;
            case 400: statusMessage = 'Bad Request — Invalid format'; break;
            case 403: statusMessage = 'Forbidden — Key not valid for this host'; break;
            case 422: statusMessage = 'Unprocessable — URLs don\'t match the host'; break;
            case 429: statusMessage = 'Too Many Requests — Rate limited'; break;
            default: statusMessage = `Response status: ${statusCode}`;
        }

        return NextResponse.json({
            success: statusCode === 200 || statusCode === 202,
            status: statusCode,
            message: statusMessage,
            urlsSubmitted: urlList.length,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to submit to IndexNow' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        service: 'IndexNow',
        description: 'POST to this endpoint to submit URLs to search engines instantly',
        defaultUrlCount: DEFAULT_URLS.length,
        usage: 'POST /api/indexnow with optional body { "urls": ["https://..."] }',
    });
}
