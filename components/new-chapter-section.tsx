"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"

export function NewChapterSection() {
  const scrollTextRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("newChapter")

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTextRef.current) return

      const section = scrollTextRef.current
      const words = section.querySelectorAll(".scroll-word")
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrollPosition = window.scrollY + window.innerHeight / 2

      words.forEach((word, index) => {
        const wordElement = word as HTMLElement
        const wordPosition = sectionTop + (index / words.length) * sectionHeight
        const distance = Math.abs(scrollPosition - wordPosition)
        const maxDistance = 200

        // Keep all words visible
        wordElement.style.opacity = "1"

        const isHighlighted = wordElement.hasAttribute("data-highlight")

        if (distance < maxDistance) {
          wordElement.style.color = isHighlighted ? "#B8FF56" : "#ffffff"
        } else {
          wordElement.style.color = "#808080" // standard gray
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const paragraphWords = t.raw("paragraphWords") as Array<{ text: string; highlight: boolean }>

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-0.5">
          <span className="text-blue-400 font-display">{t("title")}</span>
          {t("titleSuffix")}
        </h2>

        <div ref={scrollTextRef} className="min-h-[100vh] flex items-center">
          <p className="text-xl md:text-4xl leading-relaxed">
            {paragraphWords.map((word, index) => (
              <span
                key={index}
                className="scroll-word inline-block transition-colors duration-300 mr-3 text-white"
                {...(word.highlight && { "data-highlight": true })}
              >
                {word.text}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
