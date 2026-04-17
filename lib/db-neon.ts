import { neon } from '@neondatabase/serverless';

export interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  role: string;
  question_text?: string;
  answer?: string;
  players?: any;
  waitlist_number: number;
  created_at: string;
  updated_at?: string;
}

// Initialize Neon client - check for both common env var names
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.warn('⚠️ No DATABASE_URL found');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

// Create table if it doesn't exist
export async function initDatabase() {
  if (!sql) {
    console.warn('⚠️ No SQL client available');
    return;
  }
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT,
        question_text TEXT,
        answer TEXT,
        players JSONB,
        waitlist_number SERIAL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS question_text TEXT`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS players JSONB`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`;
    console.log('✅ Database table ready');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Get all users
export async function getWaitlistUsers(): Promise<WaitlistUser[]> {
  if (!sql) {
    return [];
  }
  
  await initDatabase();
  const users = await sql`
    SELECT * FROM waitlist_users ORDER BY created_at DESC
  `;
  return users as WaitlistUser[];
}

// Add new user (initial name/email)
export async function addWaitlistUser(userData: {
  name: string;
  email: string;
  role?: string;
  questionText?: string;
  answer?: string;
  players?: any;
}): Promise<WaitlistUser> {
  if (!sql) {
    throw new Error('No database connection');
  }
  
  await initDatabase();
  const serializedPlayers = userData.players ? JSON.stringify(userData.players) : null;
  
  try {
    const users = await sql`
      INSERT INTO waitlist_users (name, email, role, question_text, answer, players)
      VALUES (${userData.name}, ${userData.email}, ${userData.role || null}, ${userData.questionText || null}, ${userData.answer || null}, ${serializedPlayers}::jsonb)
      RETURNING *
    `;
    return users[0] as WaitlistUser;
  } catch (error: any) {
    if (error.code === '23505') { // Unique constraint violation
      const existingUser = await sql`
        SELECT * FROM waitlist_users WHERE email = ${userData.email}
      `;
      return existingUser[0] as WaitlistUser;
    }
    throw error;
  }
}

// Update existing user (add role/answer/players
export async function updateWaitlistUser(
  email: string,
  userData: {
    role?: string;
    questionText?: string;
    answer?: string;
    players?: any;
  }
): Promise<WaitlistUser> {
  if (!sql) {
    throw new Error('No database connection');
  }
  
  await initDatabase();
  const serializedPlayers = userData.players ? JSON.stringify(userData.players) : null;
  
  const users = await sql`
    UPDATE waitlist_users
    SET 
      role = COALESCE(${userData.role || null}, role),
      question_text = COALESCE(${userData.questionText || null}, question_text),
      answer = COALESCE(${userData.answer || null}, answer),
      players = COALESCE(${serializedPlayers}::jsonb, players),
      updated_at = NOW()
    WHERE email = ${email}
    RETURNING *
  `;
  
  return users[0] as WaitlistUser;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  if (!sql) {
    return null;
  }
  
  await initDatabase();
  const users = await sql`
    SELECT * FROM waitlist_users WHERE email = ${email}
  `;
  return users.length > 0 ? (users[0] as WaitlistUser) : null;
}

// Get next waitlist number (for local fallback)
export async function getWaitlistNumber(): Promise<number> {
  if (!sql) {
    return 1;
  }
  
  await initDatabase();
  const result = await sql`
    SELECT COALESCE(MAX(waitlist_number), 0) + 1 as next_number FROM waitlist_users
  `;
  return (result[0] as any).next_number;
}

export function isDbAvailable(): boolean {
  return !!sql;
}
