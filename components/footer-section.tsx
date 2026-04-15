"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

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
      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-2 md:mb-4 font-[family-name:var(--font-display)]">
          {t("title")}
        </h2>
        <p className="text-white/70 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          {t("subtitle")}
        </p>
        <Link href="/waitlist">
          <Button
            className="bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 px-6 md:px-8 text-base rounded-3xl font-semibold mb-12 md:mb-24"
          >
            {t("getStarted")}
          </Button>
        </Link>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-8 md:pt-12 border-t border-white/10">
          <div className="flex items-center gap-2">
            <img src="/stratoslogo.png" alt="Stratos" className="h-8 w-auto" />
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

          <p className="text-white/40 text-xs md:text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
