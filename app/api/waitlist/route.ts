import { NextRequest, NextResponse } from 'next/server';
// Try Neon first, fall back to local JSON
let dbModule: any;
try {
  dbModule = require('@/lib/db-neon');
} catch (e) {
  dbModule = require('@/lib/db');
}

const { addWaitlistUser, getWaitlistUsers, getUserByEmail } = dbModule;

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

    const existingUser = await getUserByEmail(email);
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
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await getWaitlistUsers();
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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
