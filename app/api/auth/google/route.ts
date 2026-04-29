import { NextResponse } from 'next/server';
import {
  verifyGoogleToken,
  findUserByEmail,
  createUser,
  createToken,
  COOKIE_OPTIONS,
  COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { error: 'Google credential is required.' },
        { status: 400 }
      );
    }

    // Verify Google ID token
    const googleUser = await verifyGoogleToken(credential);
    if (!googleUser?.email) {
      return NextResponse.json(
        { error: 'Invalid Google credential.' },
        { status: 401 }
      );
    }

    // Check if user exists
    let user = await findUserByEmail(googleUser.email);

    if (!user) {
      // Create new user from Google Sign-In
      await createUser(googleUser.name, googleUser.email, '', 'google');
      user = {
        name: googleUser.name,
        email: googleUser.email,
        passwordHash: '',
        provider: 'google',
        role: 'user',
        status: 'active',
        onboardingCompleted: false,
        mindsetAnalysis: '',
        assignedChannel: '',
      };

    }

    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Contact support.' },
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
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Google sign-in failed. Please try again.' },
      { status: 500 }
    );
  }
}
