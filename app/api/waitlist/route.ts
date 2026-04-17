import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistUser, getWaitlistUsers, getUserByEmail } from '@/lib/db';

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

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'You have already joined the waitlist!',
          waitlistNumber: existingUser.waitlistNumber 
        },
        { status: 409 }
      );
    }

    const user = addWaitlistUser({
      name,
      email,
      role,
      answer,
      players,
    });

    return NextResponse.json(
      {
        success: true,
        waitlistNumber: user.waitlistNumber,
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
    const users = getWaitlistUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Waitlist GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
