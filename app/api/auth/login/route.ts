import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  verifyPassword,
  createToken,
  COOKIE_OPTIONS,
  COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user (checks local DB first, then Sheets)
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email. Please check your spelling or sign up.' },
        { status: 401 }
      );
    }

    // Google-only users can't login with password
    if (user.provider === 'google' && !user.passwordHash) {
      return NextResponse.json(
        { error: 'This account was registered with Google. Please click "Continue with Google".' },
        { status: 400 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Please contact support.' },
        { status: 403 }
      );
    }

    // Create session token
    const token = await createToken({
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      onboardingCompleted: user.onboardingCompleted,
      assignedChannel: user.assignedChannel,
    });

    // Build response WITH cookie
    const response = NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        onboardingCompleted: user.onboardingCompleted,
        assignedChannel: user.assignedChannel,
      },
    });
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error during login. Please try again.' },
      { status: 500 }
    );
  }
}
