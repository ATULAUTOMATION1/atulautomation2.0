import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth';

export async function GET() {
  const token = await getAuthCookie();
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}
