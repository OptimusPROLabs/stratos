/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [name, setName] = useState(searchParams.get("name") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(searchParams.get("error") || "");
  const [message, setMessage] = useState(searchParams.get("message") || "");

  const submitLabel = useMemo(
    () => (message ? "Verify and Sign In" : "Send Login Code"),
    [message]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!otp.trim()) {
        const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "sign-in",
        } as any);

        if (sendError) {
          setError(sendError.message || "Unable to send one-time code");
          return;
        }

        setMessage("One-time code sent. Check your email.");
        return;
      }

      const { error: verifyError } = await authClient.signIn.emailOtp({
        email,
        otp: otp.trim(),
      } as any);

      if (verifyError) {
        setError(verifyError.message || "Invalid one-time code");
        return;
      }

      router.push(next);
      router.refresh();
    } catch (unknownError) {
      const message =
        unknownError instanceof Error ? unknownError.message : "Unable to sign in";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md border border-[#1a2332] bg-[#0a0f14] p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Admin Sign In</h1>
          <p className="text-[#8899aa] text-sm">Protected by Neon Auth (email OTP).</p>
        </div>

        {error && (
          <div className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="border border-[#b8ff56]/40 bg-[#b8ff56]/10 p-4 text-sm text-[#d8ffb2]">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-[#c5d0db]">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-black border border-[#1a2332] px-4 py-3 outline-none focus:border-[#b8ff56]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-[#c5d0db]">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-black border border-[#1a2332] px-4 py-3 outline-none focus:border-[#b8ff56]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm text-[#c5d0db]">One-time code (OTP)</label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              placeholder="Leave empty to send code"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="w-full bg-black border border-[#1a2332] px-4 py-3 outline-none focus:border-[#b8ff56]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#b8ff56] text-[#001220] font-bold px-4 py-3 hover:bg-[#b8ff56]/90 transition-colors"
          >
            {isSubmitting ? "Please wait..." : submitLabel}
          </button>
        </form>

        <p className="text-center text-sm text-[#8899aa]">
          Admin access is restricted to the configured owner account.
        </p>
      </div>
    </main>
  );
}
