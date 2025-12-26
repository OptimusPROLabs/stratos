"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WaitlistModal } from "./waitlist-modal"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("fan")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("hero")

  const handleJoinWaitlist = () => {
    if (email) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
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
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance font-[family-name:var(--font-display)]">
            <span className="text-primary">{t("titleHighlight")}</span>
            <br />
            {t("title")}
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto text-pretty">
           {t("subtitle")}
           </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
            />

            <p className="text-white/70 text-sm md:text-md max-w-2xl mx-auto text-pretty">
            In which category do you fall?
          </p>
            <div className="flex gap-2 justify-center text-sm">
              <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                <input
                  type="button"
                  name="category"
                  value= {t("fan")}
                  checked={category === "fan"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="accent-[#B8FF56] bg-white/10 text-white placeholder:text-white/50 h-10 w-20 rounded-xl border border-[#ffffFA]/20 backdrop-blur-lg"
                />
                {/* Fan */}
              </label>
              <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                <input
                  type="button"
                  name="category"
                  value= {t("player")}
                  checked={category === "player"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="accent-[#B8FF56] bg-white/10 text-white placeholder:text-white/50 h-10 w-20 rounded-xl border border-[#ffffFA]/20 backdrop-blur-lg"
                />
                {/* Player */}
              </label>
              <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                <input
                  type="button"
                  name="category"
                  value={t("club")}
                  checked={category === "club"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="accent-[#B8FF56] bg-white/10 text-white placeholder:text-white/50 h-10 w-20 rounded-xl border border-[#ffffFA]/20 backdrop-blur-lg"
                />
                {/* Club */}
              </label>
            </div>

            <Button
              onClick={handleJoinWaitlist}
              className="w-80 rounded-3xl bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 text-base font-semibold"
            >
            {t("joinWaitlist")}
            </Button>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
