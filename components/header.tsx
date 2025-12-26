"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "./waitlist-modal"
import { LanguageSwitcher } from "./language-switcher"
import { useState,  useEffect } from "react"
import { getLocaleFromCookie } from "@/lib/i18n-client"

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [locale, setLocale] = useState<string>("en")
  const t = useTranslations("header")

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/stratoslogo.png" alt="Stratos Logo" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#home" className="text-white/80 hover:text-white transition-colors text-sm">
              {t("home")}
            </Link>
            <Link href="#about" className="text-white/80 hover:text-white transition-colors text-sm">
              {t("about")}
            </Link>
            <Link href="#story" className="text-white/80 hover:text-white transition-colors text-sm">
              {t("story")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale as any} />
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#001220] hover:bg-white/90 font-medium rounded-3xl text-sm"
            >
              {t("getStarted")}
            </Button>
          </div>
        </div>
      </header>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
