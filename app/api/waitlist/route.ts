import { NextRequest, NextResponse } from 'next/server';

// Try Neon first, with proper fallback to local JSON
let useNeon = true;
let dbNeon: any;
let dbJson: any;

try {
  dbNeon = require('@/lib/db-neon');
  if (!dbNeon.isDbAvailable || !dbNeon.isDbAvailable()) {
    useNeon = false;
  }
} catch (e) {
  useNeon = false;
}

try {
  dbJson = require('@/lib/db');
} catch (e) {
  console.error('Error loading JSON DB:', e);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, answer, players } = body;

    if (!email || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let dbModule = useNeon && dbNeon ? dbNeon : dbJson;
    let user: any;
    let existingUser: any;
    let waitlistNumber: number;

    try {
      existingUser = await dbModule.getUserByEmail(email);
    } catch (neonError) {
      // If Neon fails, try JSON
      console.warn('Neon failed, falling back to JSON');
      dbModule = dbJson;
      existingUser = await dbModule.getUserByEmail(email);
    }

    if (existingUser) {
      const existingWaitlistNumber = (existingUser as any).waitlistNumber || (existingUser as any).waitlist_number;
      return NextResponse.json(
        { 
          error: 'You have already joined the waitlist!',
          waitlistNumber: existingWaitlistNumber 
        },
        { status: 409 }
      );
    }

    try {
      user = await dbModule.addWaitlistUser({
        name,
        email,
        role,
        answer,
        players,
      });
    } catch (addError) {
      console.warn('Add user failed, falling back to JSON');
      dbModule = dbJson;
      user = await dbModule.addWaitlistUser({
        name,
        email,
        role,
        answer,
        players,
      });
    }

    waitlistNumber = (user as any).waitlistNumber || (user as any).waitlist_number;

    return NextResponse.json(
      {
        success: true,
        waitlistNumber,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let dbModule = useNeon && dbNeon ? dbNeon : dbJson;
    let users: any[];
    
    try {
      users = await dbModule.getWaitlistUsers();
    } catch (neonError) {
      console.warn('Neon GET failed, falling back to JSON');
      dbModule = dbJson;
      users = await dbModule.getWaitlistUsers();
    }
    
    // Normalize the fields for the admin dashboard (support both snake_case and camelCase)
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
    console.error('Waitlist GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
