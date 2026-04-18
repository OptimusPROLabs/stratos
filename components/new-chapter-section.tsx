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
        const maxDistance = 220
        const highlight = wordElement.dataset.highlight

        if (distance < maxDistance) {
          if (highlight === "green") {
            wordElement.style.color = "#B8FF56"
          } else if (highlight === "blue") {
            wordElement.style.color = "#008EFA"
          } else {
            wordElement.style.color = "#FFFFFF"
          }
        } else {
          wordElement.style.color = "#8B95A5"
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const paragraphWords = t.raw("paragraphWords") as Array<{ text: string; highlight?: "green" | "blue" }>

  return (
    <section id="about" className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          <span className="text-blue-400 font-display">{t("titlePrefix")}</span> {t("titleSuffix")}
        </h2>

        <div ref={scrollTextRef} className="flex items-center">
          <p className="text-lg md:text-2xl lg:text-3xl leading-relaxed">
            {paragraphWords.map((word, index) => (
              <span
                key={`${word.text}-${index}`}
                className="scroll-word inline-block transition-colors duration-300 mr-2 md:mr-3"
                data-highlight={word.highlight}
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
