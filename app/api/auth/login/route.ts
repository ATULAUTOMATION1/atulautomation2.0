import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  verifyPassword,
  createToken,
  setAuthCookie,
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
        { error: 'No account found with this email. Please sign up first.' },
        { status: 401 }
      );
    }

    // Google-only users cannot login with password
    if (user.provider === 'google' && !user.passwordHash) {
      return NextResponse.json(
        { error: 'This account uses Google Sign-In. Please use the Google button.' },
        { status: 401 }
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

    // Check status
    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Contact support.' },
        { status: 403 }
      );
    }

    // Create session
    const token = await createToken({
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
    });
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role, provider: user.provider },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
