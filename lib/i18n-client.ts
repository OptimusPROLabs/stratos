import { defaultLocale, type Locale, locales } from "@/i18n/config"

export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale

  const cookies = document.cookie.split("; ")
  const localeCookie = cookies.find((c) => c.startsWith("NEXT_LOCALE="))

  if (localeCookie) {
    const locale = localeCookie.split("=")[1] as Locale
    if (locales.includes(locale)) {
      return locale
    }
  }

  return defaultLocale
}

export function setLocaleCookie(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
}
