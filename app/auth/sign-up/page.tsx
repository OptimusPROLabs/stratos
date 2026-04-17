import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignUpPage({
  searchParams: _searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  void _searchParams;
  redirect('/auth/sign-in');
}
