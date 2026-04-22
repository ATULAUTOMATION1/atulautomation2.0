import { SignJWT, jwtVerify, createRemoteJWKSet } from 'jose';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { cookies } from 'next/headers';

// ─── Constants ─────────────────────────────────────────────
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'atul-automation-jwt-secret-change-me'
);
const COOKIE_NAME = 'auth-token';
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/oauth2/v3/certs')
);

// ─── Types ─────────────────────────────────────────────────
export interface AuthUser {
  name: string;
  email: string;
  role: string;
  provider: string;
}

export interface SheetUser {
  name: string;
  email: string;
  passwordHash: string;
  provider: string;
  role: string;
  status: string;
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
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

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
  const sheets = await getSheetsClient();
  const sheetId = getSheetId();

  try {
    await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Users!A1',
    });
  } catch {
    // Tab doesn't exist — create it
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
          ['Timestamp', 'Name', 'Email', 'PasswordHash', 'Provider', 'Role', 'Status'],
        ],
      },
    });
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
      range: 'Users!A:G',
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
    range: 'Users!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamp, name, email, passwordHash, provider, 'user', 'active']],
    },
  });
}
