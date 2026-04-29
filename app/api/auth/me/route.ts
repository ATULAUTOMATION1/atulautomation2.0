import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken, findUserByEmail } from '@/lib/auth';

export async function GET() {
  const token = await getAuthCookie();
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  const dbUser = await findUserByEmail(payload.email);
  if (!dbUser) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      provider: dbUser.provider,
      onboardingCompleted: dbUser.onboardingCompleted,
      assignedChannel: dbUser.assignedChannel,
    }
  });
}

