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

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email.' },
        { status: 401 }
      );
    }

    // Google-only users can't login with password
    if (user.provider === 'google' && !user.passwordHash) {
      return NextResponse.json(
        { error: 'This account uses Google Sign-In. Please use the Google button.' },
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
        { error: 'Your account has been suspended.' },
        { status: 403 }
      );
    }

    // Create session token
    const token = await createToken({
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
    });

    // Build response WITH cookie
    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role, provider: user.provider },
    });
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error during login. Please try again.' },
      { status: 500 }
    );
  }
}
