import { NextResponse } from 'next/server';
import {
  findUserByEmail,
  hashPassword,
} from '@/lib/auth';
import { SignJWT } from 'jose';
import nodemailer from 'nodemailer';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'atul-automation-jwt-secret-change-me'
);

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

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[Auth] OTP generated for ${email}: ${otp}`);
    const otpHash = await hashPassword(otp);
    const passwordHash = await hashPassword(password);

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Atul Automation" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Verify your Atul Automation account',
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Welcome to Atul Automation!</h2>
            <p>Hi ${name},</p>
            <p>Please use the verification code below to complete your registration:</p>
            <div style="background: #f4f4f5; padding: 16px; text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold; border-radius: 8px; margin: 24px 0;">
              ${otp}
            </div>
            <p>This code will expire in 15 minutes.</p>
          </div>
        `,
      });
    } catch (emailError: any) {
      console.error('SMTP Email Error:', emailError);
      return NextResponse.json(
        { error: `Email delivery failed. Please check your SMTP server settings. Details: ${emailError.message}` },
        { status: 500 }
      );
    }

    // Create temporary session token
    const token = await new SignJWT({ name, email, passwordHash, otpHash })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true, step: 'otp' });
    response.cookies.set('signup-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60, // 15 minutes
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Server error during signup. Please try again.' }, { status: 500 });
  }
}
