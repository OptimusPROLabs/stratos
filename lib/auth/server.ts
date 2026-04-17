import { createNeonAuth } from '@neondatabase/auth/next/server';

const MIN_COOKIE_SECRET_LENGTH = 32;
const fallbackSecret = 'development-only-neon-auth-cookie-secret-1234567890';
const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
const hasValidCookieSecret = Boolean(cookieSecret && cookieSecret.length >= MIN_COOKIE_SECRET_LENGTH);
const hasBaseUrl = Boolean(baseUrl);

export const isNeonAuthConfigured = hasBaseUrl && hasValidCookieSecret;

export const neonAuthMissingEnv = [
  !hasBaseUrl ? 'NEON_AUTH_BASE_URL' : null,
  !cookieSecret ? 'NEON_AUTH_COOKIE_SECRET' : null,
  cookieSecret && !hasValidCookieSecret
    ? `NEON_AUTH_COOKIE_SECRET (must be at least ${MIN_COOKIE_SECRET_LENGTH} chars)`
    : null,
].filter((value): value is string => Boolean(value));

export const auth = createNeonAuth({
  baseUrl: baseUrl || 'https://invalid.neon.auth.local',
  cookies: {
    // Always pass a safe secret length to avoid module-load crashes from invalid env values.
    secret: hasValidCookieSecret ? cookieSecret : fallbackSecret,
  },
});
