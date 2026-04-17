import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistUser, getWaitlistUsers, getUserByEmail, initDatabase, updateWaitlistUser } from '@/lib/db-neon';

// Initialize database on module load
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize DB if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { name, email, role, answer, players } = body;

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

    const user = await addWaitlistUser({
      name,
      email,
      role,
      answer,
      players,
    });

    const waitlistNumber = (user as any).waitlistNumber || (user as any).waitlist_number;

    return NextResponse.json(
      {
        success: true,
        waitlistNumber,
        user,
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
    const normalizedUsers = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      answer: u.answer,
      players: u.players,
      waitlistNumber: u.waitlistNumber || u.waitlist_number,
      createdAt: u.createdAt || u.created_at,
    }));
    
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
    const { email, role, answer, players } = body;
    
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
    
    const updated = await updateWaitlistUser(email, { role, answer, players });
    const waitlistNumber = (updated as any).waitlistNumber || (updated as any).waitlist_number;
    
    return NextResponse.json(
      {
        success: true,
        waitlistNumber,
        user: {
          id: (updated as any).id,
          name: (updated as any).name,
          email: (updated as any).email,
          role: (updated as any).role,
          answer: (updated as any).answer,
          players: (updated as any).players,
          waitlistNumber,
          createdAt: (updated as any).createdAt || (updated as any).created_at,
        },
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
