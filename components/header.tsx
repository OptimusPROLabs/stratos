"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { useState,  useEffect } from "react"
import { getLocaleFromCookie } from "@/lib/i18n-client"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [locale, setLocale] = useState<string>("en")

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/stratoslogo.png" alt="Stratos Logo" className="h-7 md:h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#story" className="text-white/80 hover:text-white transition-colors text-sm">
            Story
          </Link>
          <Link href="#why-stratos" className="text-white/80 hover:text-white transition-colors text-sm">
            Why Stratos
          </Link>
          <Link href="#about" className="text-white/80 hover:text-white transition-colors text-sm">
            About
          </Link>
          <Link href="#ecosystem" className="text-white/80 hover:text-white transition-colors text-sm">
            Ecosystem
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale as any} />
          <Link href="/waitlist">
            <Button
              className="bg-white text-[#001220] hover:bg-white/90 font-medium rounded-3xl text-sm"
            >
              Join Waitlist
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-6">
          <nav className="flex flex-col gap-4 mb-6">
            <Link
              href="#story"
              className="text-white/80 hover:text-white transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Story
            </Link>
            <Link
              href="#why-stratos"
              className="text-white/80 hover:text-white transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why Stratos
            </Link>
            <Link
              href="#about"
              className="text-white/80 hover:text-white transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#ecosystem"
              className="text-white/80 hover:text-white transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ecosystem
            </Link>
          </nav>
          <div className="flex flex-col gap-3">
            <div className="flex justify-center">
              <LanguageSwitcher currentLocale={locale as any} />
            </div>
            <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                className="bg-white text-[#001220] hover:bg-white/90 font-medium rounded-3xl w-full"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
