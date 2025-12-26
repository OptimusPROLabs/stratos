"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { WaitlistModal } from "./waitlist-modal"
import { useState } from "react"

export function FooterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("footer")

  return (
    <>
      <footer className="relative py-24 px-6 bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/footer.png"
            alt="Football field"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-display)]">
            {t("title")}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 px-8 text-base rounded-3xl font-semibold mb-24"
          >
            {t("getStarted")}
          </Button>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10">
            <div className="flex items-center gap-2">
              <img src="/stratoslogo.png" alt="Stratos" className="w-full h-auto" />
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <p className="text-white/40 text-sm">{t("copyright")}</p>
          </div>
        </div>
      </footer>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
