import { NextResponse } from 'next/server';

// Opt out of any caching to prevent Vercel/Hostinger edge network 502 proxies
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const response = await fetch('https://monetumo.com/ads-txt/atulautomation-com', {
            // Ensure no Next.js fetch cache is used
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('Monetumo returned:', response.status);
            return new NextResponse('Error fetching downstream ads.txt', { status: 502 });
        }

        const text = await response.text();
        
        return new NextResponse(text, {
            status: 200,
            headers: {
                // Strictly enforce text/plain
                'Content-Type': 'text/plain; charset=utf-8',
                // Explicitly forbid downstream caching to force real-time evaluation
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Error fetching Monetumo ads.txt:', error);
        return new NextResponse('Internal Error fetching ads.txt configuration', { status: 500 });
    }
}
