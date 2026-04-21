"use client"

import { Facebook, Send, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"

export function FooterSection() {
  const t = useTranslations("footer")
  return (
    <footer className="relative py-12 md:py-24 px-4 md:px-6 bg-black overflow-hidden">
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
      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <img src="/stratoslogo.png" alt="Stratos" className="h-10 w-auto mx-auto mb-4" />
          <p className="text-white/70 text-sm md:text-base max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 md:pt-12 border-t border-white/10">
          <div>
            <p className="text-white font-semibold mb-3">{t("social")}</p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/StratosF00tball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1DSgRknkoG/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/+9EoWlO2Z62o2Nzk8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">{t("contact")}</p>
            <a href="mailto:team@stratosfootball.com" className="text-white/70 hover:text-white transition-colors">
            team@stratosfootball.com
            </a>
          </div>

        </div>

        <div className="pt-8 text-center">
          <p className="text-white/40 text-xs md:text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
