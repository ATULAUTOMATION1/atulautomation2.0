import { SignJWT, jwtVerify, createRemoteJWKSet } from 'jose';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

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
  createdAt?: string;
  updatedAt?: string;
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
      onboardingCompleted: payload.onboardingCompleted as boolean | undefined,
      assignedChannel: payload.assignedChannel as string | undefined,
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
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

// ─── Cookie Helpers ────────────────────────────────────────
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// ─── Google ID Token Verification ──────────────────────────
export async function verifyGoogleToken(idToken: string) {
  try {
    const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    return {
      email: (payload.email as string)?.toLowerCase(),
      name: (payload.name as string) || (payload.email as string)?.split('@')[0],
      picture: payload.picture as string,
    };
  } catch (jwtErr: any) {
    console.warn('[Auth] jose jwtVerify failed, attempting tokeninfo fallback:', jwtErr.message);
    try {
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      if (res.ok) {
        const info = await res.json();
        if (info.email) {
          return {
            email: (info.email as string).toLowerCase(),
            name: info.name || info.email.split('@')[0],
            picture: info.picture as string,
          };
        }
      }
    } catch (fallbackErr: any) {
      console.error('[Auth] Tokeninfo fallback failed:', fallbackErr.message);
    }
    return null;
  }
}

// ─── Local JSON Database ───────────────────────────────────
function getLocalUsersFilePath(): string {
  return path.join(process.cwd(), 'data', 'users.json');
}

function getLocalUsers(): SheetUser[] {
  try {
    const filePath = getLocalUsersFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) || [];
  } catch (err: any) {
    console.error('[Auth] Error reading local users:', err.message);
    return [];
  }
}

function saveLocalUsers(users: SheetUser[]): void {
  try {
    const filePath = getLocalUsersFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err: any) {
    console.error('[Auth] Error saving local users:', err.message);
  }
}

// ─── Google Sheets Integration (Optional / Fallback) ───────
async function getSheetsClient() {
  const keyB64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64;
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  if (!keyB64 || !email) throw new Error('Google Sheets credentials not set');

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
  } catch (err: any) {
    console.warn('[Auth] ensureUsersTab skipped:', err.message);
  }
}

// ─── Unified User Operations ───────────────────────────────
export async function findUserByEmail(
  email: string
): Promise<SheetUser | null> {
  if (!email) return null;
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check local users database first (instant and reliable)
  const localUsers = getLocalUsers();
  const localUser = localUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );
  if (localUser) {
    return localUser;
  }

  // 2. Fallback to Google Sheets if configured
  try {
    const sheets = await getSheetsClient();
    const sheetId = getSheetId();

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Users!A:J',
    });

    const rows = res.data.values;
    if (rows && rows.length > 1) {
      for (const row of rows.slice(1)) {
        if (row[2]?.toLowerCase() === normalizedEmail) {
          const user: SheetUser = {
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
          // Cache user locally for future speed
          localUsers.push(user);
          saveLocalUsers(localUsers);
          return user;
        }
      }
    }
  } catch (sheetsErr: any) {
    // Graceful fallback: do not crash if Google Sheets is unreachable or service account expired
    console.warn('[Auth] Google Sheets lookup unavailable:', sheetsErr.message);
  }

  return null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  provider: string = 'email'
): Promise<SheetUser> {
  const normalizedEmail = email.trim().toLowerCase();
  const localUsers = getLocalUsers();
  const now = new Date().toISOString();

  const newUser: SheetUser = {
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    provider,
    role: 'user',
    status: 'active',
    onboardingCompleted: false,
    mindsetAnalysis: '',
    assignedChannel: '',
    createdAt: now,
    updatedAt: now,
  };

  // 1. Persist locally first (guaranteed success)
  const existingIndex = localUsers.findIndex(
    (u) => u.email.toLowerCase() === normalizedEmail
  );
  if (existingIndex >= 0) {
    localUsers[existingIndex] = { ...localUsers[existingIndex], ...newUser };
  } else {
    localUsers.push(newUser);
  }
  saveLocalUsers(localUsers);

  // 2. Best-effort Google Sheets sync (non-blocking)
  (async () => {
    try {
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
      console.log(`[Auth] User ${email} synced to Sheets`);
    } catch (err: any) {
      console.warn('[Auth] Google Sheets sync failed (local persistence intact):', err.message);
    }
  })();

  return newUser;
}

export async function updateUserOnboarding(
  email: string,
  mindsetAnalysis: string,
  assignedChannel: string
) {
  const normalizedEmail = email.trim().toLowerCase();
  const localUsers = getLocalUsers();
  const user = localUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user) {
    user.onboardingCompleted = true;
    user.mindsetAnalysis = mindsetAnalysis;
    user.assignedChannel = assignedChannel;
    user.updatedAt = new Date().toISOString();
    saveLocalUsers(localUsers);
  }

  // Best-effort sync to Google Sheets
  try {
    const sheets = await getSheetsClient();
    const sheetId = getSheetId();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Users!A:C',
    });

    const rows = res.data.values;
    if (rows && rows.length > 1) {
      let rowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][2]?.toLowerCase() === normalizedEmail) {
          rowIndex = i + 1;
          break;
        }
      }

      if (rowIndex !== -1) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `Users!H${rowIndex}:J${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [['TRUE', mindsetAnalysis, assignedChannel]],
          },
        });
      }
    }
  } catch (error: any) {
    console.warn('[Auth] Sheets onboarding update skipped:', error.message);
  }
}
