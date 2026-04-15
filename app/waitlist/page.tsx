"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useForm, ValidationError } from '@formspree/react'
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function WaitlistPage() {
  const t = useTranslations("waitlist")
  const [state, handleSubmit] = useForm("xblzaokr")
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true)
    }
  }, [state.succeeded])

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Herobg.png"
          alt="Football stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/60 to-[#000000]/90" />
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 md:top-8 md:left-8 z-50 text-white/80 hover:text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-sm md:text-base">Back</span>
      </Link>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg px-4">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
                {t("title")}
              </h1>
              <p className="text-white/70 text-base md:text-lg">{t("description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-white/90 mb-2 block text-sm md:text-base">
                 {t("firstName")}
                </Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  required
                  className="bg-white/10 border-white/25 text-white placeholder:text-white/50 h-12 md:h-14 rounded-xl backdrop-blur-sm"
                  placeholder="Enter your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <Label htmlFor="email" className="text-white/90 mb-2 block text-sm md:text-base">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="bg-white/10 border-white/25 text-white placeholder:text-white/50 h-12 md:h-14 rounded-xl backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <Button
                type="submit" 
                disabled={state.submitting}
                className="w-full bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 md:h-14 text-base md:text-lg rounded-3xl font-semibold mt-4"
              >
                {state.submitting ? "Submitting..." : t("submit")}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#B8FF56] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#001220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
              Welcome to Stratos!
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8">You're on the list. We'll be in touch soon.</p>
            <Link href="/">
              <Button className="bg-white/10 text-white hover:bg-white/20 h-12 px-8 rounded-3xl border border-white/25">
                Go Back Home
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
