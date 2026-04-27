import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import {
  createUser,
  verifyPassword,
  createToken,
  COOKIE_OPTIONS,
  COOKIE_NAME,
} from '@/lib/auth';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'atul-automation-jwt-secret-change-me'
);

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();

    if (!otp) {
      return NextResponse.json({ error: 'Verification code is required.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('signup-session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Session expired. Please try signing up again.' }, { status: 400 });
    }

    // Verify session
    let payload;
    try {
      const result = await jwtVerify(sessionToken, JWT_SECRET);
      payload = result.payload;
    } catch (e) {
      return NextResponse.json({ error: 'Session expired or invalid.' }, { status: 400 });
    }

    // Verify OTP
    const isValid = await verifyPassword(otp, payload.otpHash as string);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    // Create user in sheets
    await createUser(
      payload.name as string,
      payload.email as string,
      payload.passwordHash as string,
      'email'
    );

    // Create auth token
    const token = await createToken({
      name: payload.name as string,
      email: payload.email as string,
      role: 'user',
      provider: 'email'
    });

    // Build response WITH auth cookie and clear signup cookie
    const response = NextResponse.json({
      success: true,
      user: { name: payload.name, email: payload.email, role: 'user', provider: 'email' },
    });
    
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    response.cookies.delete('signup-session');

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Server error during verification. Please try again.' }, { status: 500 });
  }
}
