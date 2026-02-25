import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Uses the same credentials as contact form
const CREDENTIALS = {
    client_email: 'google-sheets-integration@eng-mechanism-487311-m3.iam.gserviceaccount.com',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCqTX0CMVdbhzOJ\nOrlNVj+OfGpTnXyLXNr/Pyla+WZJ3UFQrR1gZdrbEA37ilqTCexvHhb5hpSAFq6E\nuEDJiZIQ4gFzjNbanYahLBH/+4G0T672QecDzvRzoLhS01ZFs6WSz4/SANm7l7vN\nQjQJeVGzQWa9TZwjYACKQXU7DB3x43C2Wh6QiIAfEGBOfweyABNPSlCmkadgFu+8\nZXmRzGZ+oIrqauw5Sj1StRLOXH/ht1k0Qs26pCKzd7YDfBn1tU891yiwDJ8Lb1mH\nkJ95BgwfzohKwtRJxEiav35/AnLuTtVOibZMY3bzyJPzV4kUfdF/+K90hJIAPaUn\nBXlpUhT5AgMBAAECggEAJsogBVIWPvF4VlMzFi+lKc/iSvnFvptvgTBSe9dvCjd0\nU0se9BA3DWrmeGr+rtuViAivPHYAGH2yEeZC0XS9eY10vawwWtqC6e53Chpv5FE6\n/Xmsw/QNP1H18d2TmqwstBgFPtS1QzJwEvQ3lInWx1DH9Sm6fN82uEbpDAI6RtgD\nGsJwKpeMI6+2NCmlOsvOfzTkcxUbBYOSU7kuJ62eYAFRTMctSZGm8yjaI5+HZJS8\nb4dFhTWL+/EFCrKKaDbX0wzrbTDvWdZLeZmiFMnKvT4jvGW1yf2L54rPIX3OnOM3\nZldmgrxzQ180shVWoj8OE+CWWZeS2JftzrogWr0yBQKBgQDb+Ultpsf8PxoiQWZP\n4yGq03/jWIYSWAL50nL4bu1UJne4N7ChiF+V57XMDiwIDSglSCDEGkqsPPXP3Mju\n1dY+7FMGH9BJfs+e5bF+6CPB9GZ3tYxx5R0Fv+Yeh7UlxyIFpogeZ4SOJ5Qt3ezN\nCzKy2Bm2Y4tU2cZns0VeA6mpLQKBgQDGMauoh9TRC44X4LTu+LfTFRy7Ddo5HoRW\ncf0Akg/dyEKpoZdTjsA5lcOCIetLPj0hyCqLB+UQPdGMJ1U/9QojoqBeS19zuV2J\nxACQ+L7dwrEPJVuYp/glWfFlAL+QkNNGhVZCpxW2MiGKliA8dQi6JnbJusrrD0ZE\nHdFmt5yifQKBgAy4l+R9dqdBxvMgMRiBnBrS7FxrbCV3bYShBQEU+SiaqOXAYriU\nuGJk6gCI+Ubl6+JsD2kH1DWtuNFyhTQ6rY8p/4slH9iAOuWHhwI9zoOS7LITj7Gu\nfEUu2dH+Kx2qLG+DN+/6MJI/+7PDV8Rr11y8XpBLpW0cwvqQRXywXYlpAoGBAKW4\nfK9zvGh7f/nJQ6EaSSLv4VErORBPyxo5P/MNLsUkoVETs+QDVgoQhyS11ffZd+Za\nZ/BOzqMw/Zlyfh73dt3rKqsN3Sd3lJYQVOTjiT0GgWSHuTpBIQWiWm05HfT0lCTA\ncytSaJ4q9s7ZzuSee4ijhuoRDYFVCU0FncWEvC1FAoGBAM4UFqghpPKVKV9Gg84k\nLZnOk47MQN4+oEtra7cXhpdSY62Wr9pZlDUenpyYTfhWSew8RnfN0YAqaEGNmpeT\nRHDGTgg0WXkjCWGSvsK/EcrpttPqsie+RQ7GU53ayCdgrl/fvtgsYiU5oX0hxTpl\nTkQrVeR9P/vgJzL4Askd7UK3\n-----END PRIVATE KEY-----\n",
    sheet_id: '1vQrznzLm09YU200hOBNiTTz_84TjKRd2B93krDLT_J0',
};

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const auth = new google.auth.JWT(
            CREDENTIALS.client_email,
            undefined,
            CREDENTIALS.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        // Save to a "Subscribers" sheet (create if doesn't exist)
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        await sheets.spreadsheets.values.append({
            spreadsheetId: CREDENTIALS.sheet_id,
            range: 'Subscribers!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[timestamp, name || 'N/A', email, 'Lead Popup']],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
