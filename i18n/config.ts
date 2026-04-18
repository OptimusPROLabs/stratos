export const locales = ["en", "es", "pt", "fr", "de", "nl", "id"] as const
export type Locale = (typeof locales)[number]

// Additional locales can be added in the future
// export const locales = ["en", "es", "fr", "de", "pt", "it", "ar", "zh", "ja"] as const
// export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "🇺🇸 English",
  es: "🇪🇸 Español",
  pt: "🇧🇷 Português",
  fr: "🇫🇷 Français",
  de: "🇩🇪 German",
  nl: "🇳🇱 Dutch",
  id: "🇮🇩 Bahasa",
}