"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Herobg.png"
          alt="Football stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#000000]/40 to-[#000000]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 pb-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-balance font-[family-name:var(--font-display)]">
          <span className="text-primary">{t("titleHighlight")}</span>
          <br className="hidden sm:block" />
          {t("title")}
        </h1>
        <p className="text-white/70 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-pretty px-4">
         {t("subtitle")}
         </p>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto space-y-4 px-4">
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
          />

          <Link href="/waitlist">
            <Button
              className="w-full max-w-xs sm:max-w-md rounded-3xl bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 text-base font-semibold"
            >
            {t("joinWaitlist")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
