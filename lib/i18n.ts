import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"
import { defaultLocale, type Locale, locales } from "@/i18n/config"

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined

  if (locale && locales.includes(locale)) {
    return locale
  }

  return defaultLocale
}

export default getRequestConfig(async () => {
  const locale = await getLocale()

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
