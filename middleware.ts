import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Monetumo Ads.txt Redirect
    if (request.nextUrl.pathname === '/ads.txt') {
        return NextResponse.redirect('https://monetumo.com/ads-txt/atulautomation-com', 301);
    }
    
    return NextResponse.next();
}

export const config = {
    // Only run middleware on ads.txt to avoid performance hit on other routes
    matcher: ['/ads.txt'],
};
