import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  createUser,
  hashPassword,
  createToken,
  COOKIE_NAME,
  COOKIE_OPTIONS,
} from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    // Create user in persistent database (and sync to Sheets if accessible)
    const user = await createUser(name.trim(), normalizedEmail, passwordHash, 'email');

    // Create JWT authentication session token
    const token = await createToken({
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      onboardingCompleted: false,
      assignedChannel: '',
    });

    // Best-effort welcome email (non-blocking)
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.hostinger.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        transporter.sendMail({
          from: `"Atul Automation" <${process.env.SMTP_USER}>`,
          to: normalizedEmail,
          subject: 'Welcome to Atul Automation!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Welcome to Atul Automation, ${name}!</h2>
              <p>Your account has been successfully created.</p>
              <p>You now have full access to our AI business tools, courses, and resources.</p>
              <p style="margin-top: 24px;">
                <a href="https://atulautomation.com/tools/" style="background: #ea580c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Launch Free AI Tools
                </a>
              </p>
            </div>
          `,
        }).catch((err) => console.warn('[Auth] Welcome email skipped:', err.message));
      } catch (err: any) {
        console.warn('[Auth] Email transporter skipped:', err.message);
      }
    }

    // Build response with active session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        onboardingCompleted: false,
        assignedChannel: '',
      },
    });

    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Server error during signup. Please try again.' }, { status: 500 });
  }
}
