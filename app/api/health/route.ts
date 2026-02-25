import { NextResponse } from 'next/server';

// Health check endpoint — ping this every 5 minutes to prevent cold starts
// Use a cron service like cron-job.org to ping: https://atulautomation.com/api/health
export async function GET() {
    return NextResponse.json(
        {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
        {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        }
    );
}
