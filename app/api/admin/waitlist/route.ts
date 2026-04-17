import { NextResponse } from 'next/server';
import { auth, isNeonAuthConfigured } from '@/lib/auth/server';
import { getWaitlistUsers } from '@/lib/db-neon';
import { buildWaitlistAdminSnapshot } from '@/lib/waitlist-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isNeonAuthConfigured) {
    return NextResponse.json(
      { error: 'Neon Auth is not configured' },
      { status: 503 }
    );
  }

  const { data: session, error } = await auth.getSession();

  if (error) {
    return NextResponse.json(
      { error: error.message || 'Unable to validate admin session' },
      { status: 401 }
    );
  }

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const users = await getWaitlistUsers();
  const snapshot = buildWaitlistAdminSnapshot(users);

  return NextResponse.json(snapshot);
}
