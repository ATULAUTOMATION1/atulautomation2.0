import { SignJWT, jwtVerify, createRemoteJWKSet } from 'jose';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { cookies } from 'next/headers';

// ─── Constants ─────────────────────────────────────────────
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'atul-automation-jwt-secret-change-me'
);
export const COOKIE_NAME = 'auth-token';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/oauth2/v3/certs')
);

// ─── Types ─────────────────────────────────────────────────
export interface AuthUser {
  name: string;
  email: string;
  role: string;
  provider: string;
  onboardingCompleted?: boolean;
  assignedChannel?: string;
}

export interface SheetUser {
  name: string;
  email: string;
  passwordHash: string;
  provider: string;
  role: string;
  status: string;
  onboardingCompleted: boolean;
  mindsetAnalysis: string;
  assignedChannel: string;
}


// ─── JWT Helpers ───────────────────────────────────────────
export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
      provider: payload.provider as string,
    };
  } catch {
    return null;
  }
}

// ─── Password Helpers ──────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Cookie Helpers ────────────────────────────────────────

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// ─── Google ID Token Verification ──────────────────────────
export async function verifyGoogleToken(idToken: string) {
  const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });
  return {
    email: payload.email as string,
    name: payload.name as string,
    picture: payload.picture as string,
  };
}

// ─── Google Sheets – User Operations ───────────────────────
async function getSheetsClient() {
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64 || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
    try {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const lines = envContent.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const firstEquals = trimmed.indexOf('=');
          if (firstEquals > 0) {
            const key = trimmed.substring(0, firstEquals).trim();
            const val = trimmed.substring(firstEquals + 1).trim();
            process.env[key] = val;
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse fallback .env.local:', e);
    }
  }

  const keyB64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64;
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  if (!keyB64 || !email) throw new Error('Google Sheets not configured');


  const privateKey = Buffer.from(keyB64, 'base64').toString('utf-8');
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

function getSheetId() {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error('GOOGLE_SHEET_ID not set');
  return id;
}

async function ensureUsersTab() {
  try {
    const sheets = await getSheetsClient();
    const sheetId = getSheetId();

    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Users!A1',
      });
    } catch {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            { addSheet: { properties: { title: 'Users' } } },
          ],
        },
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Users!A1:G1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            ['Timestamp', 'Name', 'Email', 'PasswordHash', 'Provider', 'Role', 'Status', 'OnboardingCompleted', 'MindsetAnalysis', 'AssignedChannel'],
          ],
        },
      });
    }
  } catch (err) {
    console.error('ensureUsersTab failed gracefully:', err);
  }
}


export async function findUserByEmail(
  email: string
): Promise<SheetUser | null> {
  const sheets = await getSheetsClient();
  const sheetId = getSheetId();

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Users!A:J',
    });

    const rows = res.data.values;
    if (!rows || rows.length <= 1) return null;

    for (const row of rows.slice(1)) {
      if (row[2]?.toLowerCase() === email.toLowerCase()) {
        return {
          name: row[1] || '',
          email: row[2] || '',
          passwordHash: row[3] || '',
          provider: row[4] || 'email',
          role: row[5] || 'user',
          status: row[6] || 'active',
          onboardingCompleted: row[7] === 'TRUE',
          mindsetAnalysis: row[8] || '',
          assignedChannel: row[9] || '',
        };
      }
    }
  } catch {
    await ensureUsersTab();
    return null;
  }

  return null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  provider: string = 'email'
) {
  await ensureUsersTab();
  const sheets = await getSheetsClient();
  const sheetId = getSheetId();
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Users!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamp, name, email, passwordHash, provider, 'user', 'active', 'FALSE', '', '']],
    },
  });
}

export async function updateUserOnboarding(
  email: string,
  mindsetAnalysis: string,
  assignedChannel: string
) {
  const sheets = await getSheetsClient();
  const sheetId = getSheetId();

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Users!A:C',
    });

    const rows = res.data.values;
    if (!rows || rows.length <= 1) return;

    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][2]?.toLowerCase() === email.toLowerCase()) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex === -1) return;

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Users!H${rowIndex}:J${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['TRUE', mindsetAnalysis, assignedChannel]],
      },
    });
  } catch (error) {
    console.error('Error updating onboarding state in Sheets:', error);
  }
}
