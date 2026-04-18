"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <h1 className="mb-5 flex flex-col items-center gap-2 sm:gap-3 md:mb-6 md:gap-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,6.5vw,4.5rem)] font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
          <span className="text-primary text-balance">{t("pitchSet")}</span>
          <span className="text-balance text-white">{t("gameBegins")}</span>
        </h1>
        <p className="mx-auto mb-3 max-w-2xl px-1 text-sm leading-relaxed text-white/80 sm:text-base md:max-w-4xl md:text-lg lg:text-xl">
          {t("subtitle")}
        </p>
        <p className="mb-8 text-xs font-semibold text-primary sm:mb-10 sm:text-sm md:mb-12 md:text-base">
          {t("limitedAccess")}
        </p>

        {/* Join Waitlist Button */}
        <Link href="/waitlist" className="mx-auto block max-w-sm sm:max-w-md">
          <Button className="h-12 w-full rounded-3xl bg-[#B8FF56] text-base font-semibold text-[#001220] hover:bg-[#B8FF56]/90">
            {t("joinWaitlist")}
          </Button>
        </Link>
      </div>
    </section>
  )
}
