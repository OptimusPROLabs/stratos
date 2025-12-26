import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ADLaM_Display as Clash_Display } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "@/lib/i18n"
import { getMessages } from "next-intl/server"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const clashDisplay = Clash_Display({
  subsets: ["latin"],
  variable: "--font-clash",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Stratos - The Future of Football",
  description: "Join the movement in the final steps towards a beautiful and transparent football ecosystem.",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang="en" suppressHydrationWarning={true} data-qb-installed="true">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${clashDisplay.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
