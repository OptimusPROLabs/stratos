"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "./waitlist-modal"
import { useTranslations } from "next-intl"

export function CountdownSection() {
  const [targetDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  })

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("countdown")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <>
      <section className="py-24 px-6 bg-[#000000]">
        <div className="container mx-auto text-center">
          <h2 className="text-[#008EFA] text-3xl md:text-4xl font-bold mb-12 font-[family-name:var(--font-display)]">
            {t("title")}
          </h2>

          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold text-white font-[family-name:var(--font-display)]">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-white text-sm mt-2">{t("days")}</div>
            </div>

            <div className="text-6xl md:text-8xl font-bold text-white/60 font-[family-name:var(--font-display)]">:</div>

            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold text-white/41 font-[family-name:var(--font-display)]">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-white/70 text-sm mt-2">{t("hours")}</div>
            </div>

            <div className="text-6xl md:text-8xl font-bold text-white/20 font-[family-name:var(--font-display)]">:</div>

            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold text-white/20 font-[family-name:var(--font-display)]">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-white/50 text-sm mt-2">{t("minutes")}</div>
            </div>

            <div className="text-6xl md:text-8xl font-bold text-white/20 font-[family-name:var(--font-clash)]">:</div>

            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold text-white/20 font-[family-name:var(--font-clash)]">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-white/60 text-sm mt-2">{t("seconds")}</div>
            </div>

          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 px-8 text-base rounded-3xl font-semibold"
          >
           {t("signUp")}
          </Button>
        </div>
      </section>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
