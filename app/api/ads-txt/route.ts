import { NextResponse } from 'next/server';

const MONETUMO_ADS_TXT_URL = 'https://monetumo.com/ads-txt/atulautomation-com';

export async function GET() {
    try {
        const response = await fetch(MONETUMO_ADS_TXT_URL, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ads.txt: ${response.status}`);
        }

        const content = await response.text();

        return new NextResponse(content, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Error fetching ads.txt:', error);
        // Return a basic fallback
        return new NextResponse(
            'OWNERDOMAIN=atulautomation.com\nMANAGERDOMAIN=monetumo.com\nmonetumo.com, 439, DIRECT\n',
            {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                },
            }
        );
    }
}
