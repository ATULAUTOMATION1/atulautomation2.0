import { NextResponse } from 'next/server';

// Redirect to Monetumo's managed ads.txt
// Monetumo verifies by checking for a 301/302 redirect to their URL
export async function GET() {
    return NextResponse.redirect(
        'https://monetumo.com/ads-txt/atulautomation-com',
        { status: 301 }
    );
}
