import { neon } from '@neondatabase/serverless';

export interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  role: string;
  answer?: string;
  players?: any;
  waitlist_number: number;
  created_at: string;
}

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

// Create table if it doesn't exist
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        answer TEXT,
        players JSONB,
        waitlist_number SERIAL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    console.log('✅ Database table ready');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Get all users
export async function getWaitlistUsers(): Promise<WaitlistUser[]> {
  await initDatabase();
  const users = await sql`
    SELECT * FROM waitlist_users ORDER BY created_at DESC
  `;
  return users as WaitlistUser[];
}

// Add new user
export async function addWaitlistUser(userData: {
  name: string;
  email: string;
  role: string;
  answer?: string;
  players?: any;
}): Promise<WaitlistUser> {
  await initDatabase();
  
  try {
    const users = await sql`
      INSERT INTO waitlist_users (name, email, role, answer, players)
      VALUES (${userData.name}, ${userData.email}, ${userData.role}, ${userData.answer || null}, ${userData.players || null})
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

// Get user by email
export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  await initDatabase();
  const users = await sql`
    SELECT * FROM waitlist_users WHERE email = ${email}
  `;
  return users.length > 0 ? (users[0] as WaitlistUser) : null;
}

// Get next waitlist number (for local fallback)
export async function getWaitlistNumber(): Promise<number> {
  await initDatabase();
  const result = await sql`
    SELECT COALESCE(MAX(waitlist_number), 0) + 1 as next_number FROM waitlist_users
  `;
  return (result[0] as any).next_number;
}
