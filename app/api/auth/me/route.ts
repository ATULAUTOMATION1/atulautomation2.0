import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken, findUserByEmail } from '@/lib/auth';

export async function GET() {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    // Try to enrich with database record
    try {
      const dbUser = await findUserByEmail(payload.email);
      if (dbUser) {
        return NextResponse.json({
          user: {
            name: dbUser.name || payload.name,
            email: dbUser.email || payload.email,
            role: dbUser.role || payload.role,
            provider: dbUser.provider || payload.provider,
            onboardingCompleted: dbUser.onboardingCompleted ?? payload.onboardingCompleted ?? false,
            assignedChannel: dbUser.assignedChannel || payload.assignedChannel || '',
          }
        });
      }
    } catch (e: any) {
      console.warn('[Auth] /me db lookup warning:', e.message);
    }

    // Fallback to token payload so valid session is never dropped
    return NextResponse.json({
      user: {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        provider: payload.provider,
        onboardingCompleted: payload.onboardingCompleted ?? false,
        assignedChannel: payload.assignedChannel ?? '',
      }
    });
  } catch (error: any) {
    console.error('[Auth] /me error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
