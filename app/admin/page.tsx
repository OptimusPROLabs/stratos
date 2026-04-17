import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/app/admin/admin-dashboard';
import { signOutAction } from '@/app/auth/actions';
import { auth, isAdminEmail, isNeonAuthConfigured, neonAuthMissingEnv } from '@/lib/auth/server';
import { getWaitlistUsers } from '@/lib/db-neon';
import { buildWaitlistAdminSnapshot } from '@/lib/waitlist-admin';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isNeonAuthConfigured) {
    return (
      <main className="min-h-screen bg-black text-white p-6 md:p-12">
        <div className="max-w-3xl mx-auto border border-[#1a2332] bg-[#0a0f14] p-8 space-y-4">
          <h1 className="text-3xl font-bold">Admin Setup Required</h1>
          <p className="text-[#8899aa]">
            Neon Auth is required before the live admin can be used.
          </p>
          <div className="border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            Missing env: {neonAuthMissingEnv.join(', ')}
          </div>
          <p className="text-sm text-[#8899aa]">
            Add these variables in Neon and Vercel, then reload this page.
          </p>
          <Link href="/" className="inline-flex border border-[#1a2332] px-4 py-2 hover:border-[#b8ff56] transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/auth/sign-in?next=/admin');
  }

  if (!isAdminEmail(session.user.email)) {
    redirect('/auth/sign-in?error=This%20account%20is%20not%20authorized%20for%20admin%20access');
  }

  const users = await getWaitlistUsers();
  const snapshot = buildWaitlistAdminSnapshot(users);
  const userName = session.user.name || session.user.email || 'Admin';

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Waitlist Admin</h1>
            <p className="text-[#8899aa]">
              Signed in as {userName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="border border-[#1a2332] px-4 py-2 hover:border-[#b8ff56] transition-colors">
              Back to Home
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="border border-[#1a2332] px-4 py-2 hover:border-red-400 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        <AdminDashboard initialData={snapshot} />
      </div>
    </main>
  );
}
