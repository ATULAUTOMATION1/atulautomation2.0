import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://monetumo.com/ads-txt/atulautomation-com', {
            // Revalidate the cache every hour (3600 seconds)
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ads.txt: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        
        return new NextResponse(text, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Error fetching Monetumo ads.txt:', error);
        return new NextResponse('Error fetching ads.txt configuration', { status: 500 });
    }
}
