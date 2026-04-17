import { signInAction } from '@/app/auth/actions';
import { neonAuthMissingEnv } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next || '/admin';

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md border border-[#1a2332] bg-[#0a0f14] p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Admin Sign In</h1>
          <p className="text-[#8899aa] text-sm">Protected by Neon Auth.</p>
        </div>

        {neonAuthMissingEnv.length > 0 && (
          <div className="border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            Missing env: {neonAuthMissingEnv.join(', ')}
          </div>
        )}

        {params.error && (
          <div className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            {params.error}
          </div>
        )}

        <form action={signInAction} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-[#c5d0db]">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-black border border-[#1a2332] px-4 py-3 outline-none focus:border-[#b8ff56]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-[#c5d0db]">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-black border border-[#1a2332] px-4 py-3 outline-none focus:border-[#b8ff56]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#b8ff56] text-[#001220] font-bold px-4 py-3 hover:bg-[#b8ff56]/90 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-[#8899aa]">
          Admin access is restricted to the configured owner account.
        </p>
      </div>
    </main>
  );
}
