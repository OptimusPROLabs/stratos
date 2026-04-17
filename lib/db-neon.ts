import { neon } from '@neondatabase/serverless';

export interface ClubPlayer {
  id?: string;
  name: string;
  email?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WaitlistResponse {
  id?: string;
  role: string;
  questionText?: string | null;
  answer?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  waitlistNumber: number;
  createdAt: string;
  updatedAt?: string;
  response: WaitlistResponse | null;
  players: ClubPlayer[];
}

interface WaitlistUserRow {
  id: string;
  name: string;
  email: string;
  waitlist_number: number;
  created_at: string;
  updated_at?: string;
}

let schemaInitialized = false;

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.warn('⚠️ No DATABASE_URL found');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

function normalizePlayers(players: unknown): ClubPlayer[] {
  if (!Array.isArray(players)) {
    return [];
  }

  return players
    .map<ClubPlayer | null>((player) => {
      if (!player || typeof player !== 'object') {
        return null;
      }

      const item = player as Record<string, unknown>;
      return {
        id: typeof item.id === 'string' ? item.id : undefined,
        name: typeof item.name === 'string' ? item.name : '',
        email: typeof item.email === 'string' ? item.email : null,
        createdAt: typeof item.createdAt === 'string'
          ? item.createdAt
          : typeof item.created_at === 'string'
            ? item.created_at
            : undefined,
        updatedAt: typeof item.updatedAt === 'string'
          ? item.updatedAt
          : typeof item.updated_at === 'string'
            ? item.updated_at
            : undefined,
      };
    })
    .filter((player): player is ClubPlayer => Boolean(player?.name));
}

function normalizeWaitlistUser(row: Record<string, any>): WaitlistUser {
  const hasResponse = Boolean(row.response_id || row.role || row.question_text || row.answer);

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    waitlistNumber: row.waitlist_number,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    response: hasResponse
      ? {
          id: row.response_id,
          role: row.role,
          questionText: row.question_text,
          answer: row.answer,
          createdAt: row.response_created_at,
          updatedAt: row.response_updated_at,
        }
      : null,
    players: normalizePlayers(row.players),
  };
}

async function runBackfill() {
  if (!sql) {
    return;
  }

  await sql`
    INSERT INTO waitlist_responses (user_id, role, question_text, answer, created_at, updated_at)
    SELECT
      wu.id,
      wu.role,
      wu.question_text,
      wu.answer,
      COALESCE(wu.created_at, NOW()),
      COALESCE(wu.updated_at, wu.created_at, NOW())
    FROM waitlist_users wu
    WHERE wu.role IS NOT NULL
    ON CONFLICT (user_id) DO UPDATE
    SET
      role = COALESCE(EXCLUDED.role, waitlist_responses.role),
      question_text = COALESCE(EXCLUDED.question_text, waitlist_responses.question_text),
      answer = COALESCE(EXCLUDED.answer, waitlist_responses.answer),
      updated_at = GREATEST(waitlist_responses.updated_at, EXCLUDED.updated_at)
  `;

  await sql`
    INSERT INTO club_players (user_id, name, email, created_at, updated_at)
    SELECT
      wu.id,
      player.value->>'name',
      NULLIF(player.value->>'email', ''),
      COALESCE(wu.created_at, NOW()),
      COALESCE(wu.updated_at, wu.created_at, NOW())
    FROM waitlist_users wu
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE
        WHEN jsonb_typeof(wu.players) = 'array' THEN wu.players
        ELSE '[]'::jsonb
      END
    ) AS player(value)
    WHERE wu.role = 'club'
      AND NOT EXISTS (
        SELECT 1
        FROM club_players cp
        WHERE cp.user_id = wu.id
      )
  `;
}

async function getJoinedWaitlistQuery(email?: string): Promise<WaitlistUser[]> {
  if (!sql) {
    return [];
  }

  await initDatabase();

  const rows = email
    ? await sql`
        SELECT
          wu.id,
          wu.name,
          wu.email,
          wu.waitlist_number,
          wu.created_at,
          wu.updated_at,
          wr.id AS response_id,
          wr.role,
          wr.question_text,
          wr.answer,
          wr.created_at AS response_created_at,
          wr.updated_at AS response_updated_at,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'id', cp.id,
                'name', cp.name,
                'email', cp.email,
                'created_at', cp.created_at,
                'updated_at', cp.updated_at
              )
              ORDER BY cp.created_at
            ) FILTER (WHERE cp.id IS NOT NULL),
            '[]'::jsonb
          ) AS players
        FROM waitlist_users wu
        LEFT JOIN waitlist_responses wr ON wr.user_id = wu.id
        LEFT JOIN club_players cp ON cp.user_id = wu.id
        WHERE wu.email = ${email}
        GROUP BY wu.id, wr.id
      `
    : await sql`
        SELECT
          wu.id,
          wu.name,
          wu.email,
          wu.waitlist_number,
          wu.created_at,
          wu.updated_at,
          wr.id AS response_id,
          wr.role,
          wr.question_text,
          wr.answer,
          wr.created_at AS response_created_at,
          wr.updated_at AS response_updated_at,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'id', cp.id,
                'name', cp.name,
                'email', cp.email,
                'created_at', cp.created_at,
                'updated_at', cp.updated_at
              )
              ORDER BY cp.created_at
            ) FILTER (WHERE cp.id IS NOT NULL),
            '[]'::jsonb
          ) AS players
        FROM waitlist_users wu
        LEFT JOIN waitlist_responses wr ON wr.user_id = wu.id
        LEFT JOIN club_players cp ON cp.user_id = wu.id
        GROUP BY wu.id, wr.id
        ORDER BY wu.created_at DESC
      `;

  return rows.map((row) => normalizeWaitlistUser(row as Record<string, any>));
}

export async function initDatabase() {
  if (!sql) {
    console.warn('⚠️ No SQL client available');
    return;
  }

  if (schemaInitialized) {
    return;
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        waitlist_number SERIAL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS role TEXT`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS question_text TEXT`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS answer TEXT`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS players JSONB`;
    await sql`ALTER TABLE waitlist_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`;

    await sql`
      CREATE TABLE IF NOT EXISTS waitlist_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE REFERENCES waitlist_users(id) ON DELETE CASCADE,
        role TEXT NOT NULL,
        question_text TEXT,
        answer TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS club_players (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES waitlist_users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS waitlist_responses_role_idx ON waitlist_responses(role)`;
    await sql`CREATE INDEX IF NOT EXISTS club_players_user_id_idx ON club_players(user_id)`;

    await runBackfill();
    schemaInitialized = true;
    console.log('✅ Normalized waitlist schema ready');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function createWaitlistUser(userData: {
  name: string;
  email: string;
  role?: string;
  questionText?: string | null;
  answer?: string | null;
  players?: ClubPlayer[];
}): Promise<WaitlistUserRow> {
  if (!sql) {
    throw new Error('No database connection');
  }

  await initDatabase();

  try {
    const legacyPlayers =
      userData.players && userData.players.length
        ? JSON.stringify(
            userData.players.map((player) => ({
              name: player.name?.trim() || '',
              email: player.email?.trim() || null,
            }))
          )
        : null;

    const users = await sql`
      INSERT INTO waitlist_users (name, email, role, question_text, answer, players)
      VALUES (
        ${userData.name},
        ${userData.email},
        ${userData.role || null},
        ${userData.questionText || null},
        ${userData.answer || null},
        ${legacyPlayers}::jsonb
      )
      RETURNING *
    `;

    return users[0] as WaitlistUserRow;
  } catch (error: any) {
    if (error.code === '23505') {
      const existing = await sql`
        SELECT * FROM waitlist_users WHERE email = ${userData.email}
      `;

      return existing[0] as WaitlistUserRow;
    }

    throw error;
  }
}

export async function updateWaitlistUserCore(userId: string, userData: {
  name?: string;
}): Promise<void> {
  if (!sql) {
    throw new Error('No database connection');
  }

  await initDatabase();

  await sql`
    UPDATE waitlist_users
    SET
      name = COALESCE(${userData.name || null}, name),
      updated_at = NOW()
    WHERE id = ${userId}
  `;
}

export async function upsertWaitlistResponse(userId: string, response: {
  role: string;
  questionText?: string | null;
  answer?: string | null;
}): Promise<void> {
  if (!sql) {
    throw new Error('No database connection');
  }

  await initDatabase();

  await sql`
    INSERT INTO waitlist_responses (user_id, role, question_text, answer)
    VALUES (${userId}, ${response.role}, ${response.questionText || null}, ${response.answer || null})
    ON CONFLICT (user_id) DO UPDATE
    SET
      role = EXCLUDED.role,
      question_text = COALESCE(EXCLUDED.question_text, waitlist_responses.question_text),
      answer = COALESCE(EXCLUDED.answer, waitlist_responses.answer),
      updated_at = NOW()
  `;

  // Keep legacy columns in sync while the old schema remains in production data.
  await sql`
    UPDATE waitlist_users
    SET
      role = ${response.role},
      question_text = COALESCE(${response.questionText || null}, question_text),
      answer = COALESCE(${response.answer || null}, answer),
      updated_at = NOW()
    WHERE id = ${userId}
  `;
}

export async function replaceClubPlayers(userId: string, players: ClubPlayer[]): Promise<void> {
  if (!sql) {
    throw new Error('No database connection');
  }

  await initDatabase();

  const normalizedPlayers = players
    .map((player) => ({
      name: player.name.trim(),
      email: player.email?.trim() || null,
    }))
    .filter((player) => player.name || player.email);

  await sql`DELETE FROM club_players WHERE user_id = ${userId}`;

  for (const player of normalizedPlayers) {
    await sql`
      INSERT INTO club_players (user_id, name, email)
      VALUES (${userId}, ${player.name || 'Unnamed Player'}, ${player.email})
    `;
  }

  const serializedPlayers = normalizedPlayers.length ? JSON.stringify(normalizedPlayers) : null;
  await sql`
    UPDATE waitlist_users
    SET
      players = ${serializedPlayers}::jsonb,
      updated_at = NOW()
    WHERE id = ${userId}
  `;
}

export async function getWaitlistUsers(): Promise<WaitlistUser[]> {
  return getJoinedWaitlistQuery();
}

export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  const users = await getJoinedWaitlistQuery(email);
  return users[0] || null;
}

export async function getUserById(userId: string): Promise<WaitlistUser | null> {
  if (!sql) {
    return null;
  }

  await initDatabase();

  const users = await sql`
    SELECT email FROM waitlist_users WHERE id = ${userId}
  `;

  if (!users.length) {
    return null;
  }

  return getUserByEmail((users[0] as any).email);
}

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
