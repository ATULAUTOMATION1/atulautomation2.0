import { NextResponse } from 'next/server';
import { google } from 'googleapis';

async function getGoogleSheetsClient() {
    const keyBase64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

    if (!keyBase64 || !clientEmail) {
        throw new Error('Google Sheets credentials not configured');
    }

    // Decode private key from base64 (avoids all newline/escaping issues)
    const privateKey = Buffer.from(keyBase64, 'base64').toString('utf-8');

    const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
}

export async function POST(req: Request) {
    try {
        const { name, email, service, message } = await req.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Please fill in all required fields.' },
                { status: 400 }
            );
        }

        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // Log to console
        console.log('━━━ New Contact Form Submission ━━━');
        console.log(`Name:    ${name}`);
        console.log(`Email:   ${email}`);
        console.log(`Service: ${service}`);
        console.log(`Message: ${message}`);
        console.log(`Time:    ${timestamp}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Append to Google Sheet
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (sheetId) {
            try {
                const sheets = await getGoogleSheetsClient();

                await sheets.spreadsheets.values.append({
                    spreadsheetId: sheetId,
                    range: 'Sheet1!A:F',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[
                            timestamp,
                            name,
                            email,
                            service || 'Not specified',
                            message,
                            'New'  // Status column
                        ]],
                    },
                });

                console.log('✅ Successfully saved to Google Sheets');
            } catch (sheetError: any) {
                console.error('❌ Google Sheets Error:', sheetError?.message);
                // Don't fail the whole request — still return success to user
            }
        }

        return NextResponse.json(
            { success: true, message: 'Message sent successfully! We\'ll get back to you within 2-4 hours.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send message. Please try again or email us at hello@atulautomation.com.' },
            { status: 500 }
        );
    }
}
