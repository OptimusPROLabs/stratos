'use server';

import { redirect } from 'next/navigation';
import { auth, isNeonAuthConfigured } from '@/lib/auth/server';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function signInAction(formData: FormData) {
  if (!isNeonAuthConfigured) {
    redirect('/auth/sign-in?error=Neon%20Auth%20is%20not%20configured');
  }

  const email = getString(formData, 'email');
  const password = getString(formData, 'password');
  const next = getString(formData, 'next') || '/admin';

  const { error } = await auth.signIn.email({ email, password });

  if (error) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(error.message || 'Unable to sign in')}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  if (!isNeonAuthConfigured) {
    redirect('/auth/sign-up?error=Neon%20Auth%20is%20not%20configured');
  }

  const name = getString(formData, 'name');
  const email = getString(formData, 'email');
  const password = getString(formData, 'password');

  const { error } = await auth.signUp.email({ name, email, password });

  if (error) {
    redirect(`/auth/sign-up?error=${encodeURIComponent(error.message || 'Unable to sign up')}`);
  }

  redirect('/admin');
}

export async function signOutAction() {
  if (isNeonAuthConfigured) {
    await auth.signOut();
  }

  redirect('/auth/sign-in');
}
