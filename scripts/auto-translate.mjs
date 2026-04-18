import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const SOURCE_LOCALE = "en"
const TARGET_LOCALES = ["es", "pt", "fr", "de", "nl", "id"]
const ROOT = process.cwd()
const MESSAGES_DIR = path.join(ROOT, "messages")

const GOOGLE_ENDPOINT = "https://translate.googleapis.com/translate_a/single"
const REQUEST_TIMEOUT_MS = 2500
const MAX_RETRIES = 0
const CONCURRENCY = 24

const cliLocalesArg = process.argv.find((arg) => arg.startsWith("--locales="))
const requestedLocales = cliLocalesArg
  ? cliLocalesArg
      .replace("--locales=", "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  : null

const localesToTranslate = requestedLocales ?? TARGET_LOCALES
const translationCache = new Map()

function shouldTranslate(text) {
  if (!text.trim()) return false
  if (text.includes("@")) return false
  if (text.startsWith("http://") || text.startsWith("https://")) return false
  return true
}

async function translateText(text, targetLocale) {
  if (!shouldTranslate(text)) return text

  const cacheKey = `${targetLocale}::${text}`
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)
  }

  const params = new URLSearchParams({
    client: "gtx",
    sl: SOURCE_LOCALE,
    tl: targetLocale,
    dt: "t",
    q: text,
  })

  let lastError
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(`${GOOGLE_ENDPOINT}?${params.toString()}`, {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Translate request failed (${response.status})`)
      }

      const payload = await response.json()
      const segments = payload?.[0]
      if (!Array.isArray(segments)) return text

      const translated = segments.map((segment) => segment?.[0] ?? "").join("")
      translationCache.set(cacheKey, translated)
      return translated
    } catch (error) {
      lastError = error
      if (attempt === MAX_RETRIES) {
        translationCache.set(cacheKey, text)
        return text
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  throw lastError
}

function collectTranslatableStrings(value, outSet = new Set()) {
  if (typeof value === "string") {
    if (shouldTranslate(value)) outSet.add(value)
    return outSet
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectTranslatableStrings(item, outSet)
    }
    return outSet
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      void key
      collectTranslatableStrings(nested, outSet)
    }
    return outSet
  }

  return outSet
}

function applyTranslations(value, map) {
  if (typeof value === "string") {
    return map.get(value) ?? value
  }

  if (Array.isArray(value)) {
    return value.map((item) => applyTranslations(item, map))
  }

  if (value && typeof value === "object") {
    const translatedObject = {}
    for (const [key, nested] of Object.entries(value)) {
      translatedObject[key] = applyTranslations(nested, map)
    }
    return translatedObject
  }

  return value
}

async function translateManyStrings(strings, locale) {
  const translatedMap = new Map()
  let index = 0

  const workerCount = Math.min(CONCURRENCY, strings.length)
  const workers = Array.from({ length: workerCount }, async () => {
    while (index < strings.length) {
      const current = strings[index]
      index += 1
      const translated = await translateText(current, locale)
      translatedMap.set(current, translated)
    }
  })

  await Promise.all(workers)
  return translatedMap
}

async function run() {
  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`)
  const sourceRaw = await readFile(sourcePath, "utf8")
  const sourceJson = JSON.parse(sourceRaw)
  const uniqueStrings = [...collectTranslatableStrings(sourceJson)]

  for (const locale of localesToTranslate) {
    if (locale === SOURCE_LOCALE) continue
    console.log(`Translating ${SOURCE_LOCALE} -> ${locale}...`)
    const translatedMap = await translateManyStrings(uniqueStrings, locale)
    const translated = applyTranslations(sourceJson, translatedMap)
    const outputPath = path.join(MESSAGES_DIR, `${locale}.json`)
    await writeFile(outputPath, `${JSON.stringify(translated, null, 2)}\n`, "utf8")
  }

  console.log("Translation files updated.")
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
