import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  createUser,
  hashPassword,
  createToken,
  COOKIE_OPTIONS,
  COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please login instead.' },
        { status: 409 }
      );
    }

    // Create user
    const passwordHash = await hashPassword(password);
    await createUser(name, email, passwordHash, 'email');

    // Create session token
    const token = await createToken({ name, email, role: 'user', provider: 'email' });

    // Build response WITH cookie set on the response itself
    const response = NextResponse.json({
      success: true,
      user: { name, email, role: 'user', provider: 'email' },
    });
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Server error during signup. Please try again.' },
      { status: 500 }
    );
  }
}
