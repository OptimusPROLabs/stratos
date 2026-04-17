'use server';

import { redirect } from 'next/navigation';
import { adminEmail, auth, isAdminEmail, isNeonAuthConfigured } from '@/lib/auth/server';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function signInAction(formData: FormData) {
  if (!isNeonAuthConfigured) {
    redirect('/auth/sign-in?error=Neon%20Auth%20is%20not%20configured');
  }

  const name = getString(formData, 'name');
  const email = getString(formData, 'email');
  const otp = getString(formData, 'otp');
  const next = getString(formData, 'next') || '/admin';

  if (!email) {
    redirect(`/auth/sign-in?error=${encodeURIComponent('Email is required')}&next=${encodeURIComponent(next)}`);
  }

  if (!otp) {
    // Neon Auth expects sign-in OTP initiation via signIn.emailOtp.
    // Calling emailOtp.sendVerificationOtp in this flow may require an authenticated JWT.
    const { error } = await auth.signIn.emailOtp({ email });

    if (error) {
      redirect(`/auth/sign-in?error=${encodeURIComponent(error.message || 'Unable to send one-time code')}&next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
    }

    redirect(`/auth/sign-in?message=${encodeURIComponent('One-time code sent. Check your email.')}&next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
  }

  const { error } = await auth.signIn.emailOtp({ email, otp });
  if (error) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(error.message || 'Invalid one-time code')}&next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
  }

  const { data: session } = await auth.getSession();
  if (!isAdminEmail(session?.user?.email)) {
    await auth.signOut();
    redirect('/auth/sign-in?error=This%20account%20is%20not%20authorized%20for%20admin%20access');
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  void formData;
  const error = adminEmail
    ? `Admin sign-up is disabled. Ask the owner of ${adminEmail} to create the account directly in Neon Auth.`
    : 'Admin sign-up is disabled. Configure ADMIN_EMAIL and create the admin account in Neon Auth.';
  redirect(`/auth/sign-in?error=${encodeURIComponent(error)}`);
}

export async function signOutAction() {
  if (isNeonAuthConfigured) {
    await auth.signOut();
  }

  redirect('/auth/sign-in');
}
