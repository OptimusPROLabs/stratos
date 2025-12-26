export const locales = ["en", "es", "fr", "de", "pt", "it", "hi"] as const
export type Locale = (typeof locales)[number]

// Additional locales can be added in the future
// export const locales = ["en", "es", "fr", "de", "pt", "it", "ar", "zh", "ja"] as const
// export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English ", 
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  hi: "Hindi",
  // ar: "العربية",
  // zh: "中文",
  // ja: "日本語",
}i