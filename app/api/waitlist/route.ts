import { NextRequest, NextResponse } from 'next/server';
import {
  createWaitlistUser,
  getUserByEmail,
  getWaitlistUsers,
  initDatabase,
  replaceClubPlayers,
  updateWaitlistUserCore,
  upsertWaitlistResponse,
} from '@/lib/db-neon';

// Initialize database on module load
let dbInitialized = false;

function normalizeUser(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.response?.role || null,
    questionText: user.response?.questionText || null,
    answer: user.response?.answer || null,
    players: user.players,
    waitlistNumber: user.waitlistNumber,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Initialize DB if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { name, email, role, questionText, answer, players } = body;

    if (!email || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      const waitlistNumber = (existingUser as any).waitlistNumber || (existingUser as any).waitlist_number;
      return NextResponse.json(
        { 
          error: 'You have already joined the waitlist!',
          waitlistNumber 
        },
        { status: 409 }
      );
    }

    const createdUser = await createWaitlistUser({
      name,
      email,
      role,
      questionText,
      answer,
      players,
    });
    await updateWaitlistUserCore(createdUser.id, { name });
    await upsertWaitlistResponse(createdUser.id, { role, questionText, answer });

    if (role === 'club' && Array.isArray(players)) {
      await replaceClubPlayers(createdUser.id, players);
    }

    const user = await getUserByEmail(email);
    const normalizedUser = normalizeUser(user);

    return NextResponse.json(
      {
        success: true,
        waitlistNumber: normalizedUser.waitlistNumber,
        user: normalizedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('🚨 Waitlist POST Error:', error);
    return NextResponse.json(
      { 
        error: 'We are currently performing maintenance. Please try again shortly!',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 503 }
    );
  }
}

export async function GET() {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }
    
    const users = await getWaitlistUsers();
    
    // Normalize fields
    const normalizedUsers = users.map((u: any) => normalizeUser(u));
    
    return NextResponse.json({ users: normalizedUsers });
  } catch (error) {
    console.error('🚨 Waitlist GET Error:', error);
    return NextResponse.json(
      { 
        error: 'We are currently performing maintenance. Please try again shortly!',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 503 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }
    
    const body = await request.json();
    const { email, role, questionText, answer, players } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required to update waitlist record' },
        { status: 400 }
      );
    }
    
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found for provided email' },
        { status: 404 }
      );
    }
    
    if (role) {
      await upsertWaitlistResponse(existingUser.id, { role, questionText, answer });
    }

    if (Array.isArray(players)) {
      await replaceClubPlayers(existingUser.id, players);
    }

    const updated = await getUserByEmail(email);
    const normalizedUser = normalizeUser(updated);
    
    return NextResponse.json(
      {
        success: true,
        waitlistNumber: normalizedUser.waitlistNumber,
        user: normalizedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('🚨 Waitlist PUT Error:', error);
    return NextResponse.json(
      { 
        error: 'We are currently performing maintenance. Please try again shortly!',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 503 }
    );
  }
}
