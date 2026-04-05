import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

// Google Sheets Credentials — MUST come from environment variables
function getGoogleCredentials() {
    const keyB64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64;
    const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!keyB64 || !email || !sheetId) {
        throw new Error('Google Sheets credentials are not configured. Set GOOGLE_SHEETS_PRIVATE_KEY_B64, GOOGLE_SHEETS_CLIENT_EMAIL, and GOOGLE_SHEET_ID in .env.local');
    }

    return {
        client_email: email,
        private_key: Buffer.from(keyB64, 'base64').toString('utf-8'),
        sheet_id: sheetId,
    };
}

const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com',
    'yopmail.com', 'discard.email', 'trashmail.com', 'getnada.com'
];

async function validateEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
    // 1. Basic format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { valid: false, reason: 'Invalid format' };

    const domain = email.split('@')[1].toLowerCase();

    // 2. Disposable check
    if (DISPOSABLE_DOMAINS.includes(domain)) {
        return { valid: false, reason: 'Disposable email not allowed' };
    }

    // 3. MX Record lookup
    try {
        const mxRecords = await resolveMx(domain);
        if (!mxRecords || mxRecords.length === 0) {
            return { valid: false, reason: 'Email domain has no mail servers' };
        }
    } catch {
        return { valid: false, reason: 'Domain does not exist' };
    }

    return { valid: true };
}

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();

        // 1. Validation
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const validation = await validateEmail(email);
        if (!validation.valid) {
            return NextResponse.json({ error: validation.reason }, { status: 400 });
        }

        // 2. Save to Google Sheets
        let sheetsError = false;
        try {
            const creds = getGoogleCredentials();
            const auth = new google.auth.JWT({
                email: creds.client_email,
                key: creds.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });
            const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            await sheets.spreadsheets.values.append({
                spreadsheetId: creds.sheet_id,
                range: 'Subscribers!A:E',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[timestamp, name || 'Subscriber', email, 'Lead Popup', 'Verified']],
                },
            });
        } catch (error) {
            console.error('Sheets error:', error);
            sheetsError = true;
        }

        // 3. Send Welcome Email
        let emailSent = false;
        if (process.env.SMTP_PASSWORD && process.env.SMTP_PASSWORD !== 'your_email_password_here') {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
                    port: parseInt(process.env.SMTP_PORT || '465'),
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER || 'hello@atulautomation.com',
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                const welcomeHtml = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                            <h1 style="color: #fff; margin: 0; font-size: 28px;">Welcome to Atul Automation!</h1>
                        </div>
                        <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                            <p style="font-size: 16px;">Hello <strong>${name || 'Automation Enthusiast'}</strong>,</p>
                            <p>Thank you for subscribing! You've joined a community of forward-thinking businesses scaling with AI.</p>
                            
                            <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin: 25px 0;">
                                <h2 style="font-size: 18px; color: #f97316; margin-top: 0;">🎁 Your Free Guide</h2>
                                <p style="margin-bottom: 0;">Our exclusive guide <strong>"10 Ways to Automate Your Business & Save 20+ Hours/Week"</strong> is attached to this email or accessible via the portal.</p>
                            </div>

                            <p>While you wait for the next update, why not see how ready your business is for AI?</p>
                            
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="https://atulautomation.com/tools/ai-readiness-quiz" style="background: #f97316; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; display: inline-block;">Take the AI Readiness Quiz</a>
                            </div>

                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">
                            <p style="font-size: 14px; color: #6b7280; text-align: center;">Transform your operations 24/7 with intelligent agents.</p>
                            <p style="font-size: 14px; color: #6b7280; text-align: center;">&copy; 2026 Atul Automation. All rights reserved.</p>
                        </div>
                    </div>
                `;

                await transporter.sendMail({
                    from: `"Atul Automation" <${process.env.SMTP_USER || 'hello@atulautomation.com'}>`,
                    to: email,
                    subject: "Welcome to Atul Automation! 🚀 Your Business Automation Guide Inside",
                    html: welcomeHtml,
                });
                emailSent = true;
            } catch (error) {
                console.error('Welcome email error:', error);
            }
        }

        return NextResponse.json({
            success: true,
            emailSent,
            sheetsSaved: !sheetsError
        });

    } catch (error) {
        console.error('Subscribe API error:', error);
        return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
    }
}
