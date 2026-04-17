"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}
//change
export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const t = useTranslations("waitlist")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "fan",
  })
  
  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(true)
      const timer = setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setErrorMessage(null)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted, onClose])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitWaitlist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.category,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error || "Could not join waitlist. Please try again.")
        return
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        category: "fan",
      })
    } catch (error) {
      console.error("Error submitting waitlist modal:", error)
      setErrorMessage("Could not join waitlist. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Herobg.png"
          alt="Football stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/60 to-[#000000]/90" />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white/80 hover:text-white transition-colors"
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
                {t("title")}
              </h2>
              <p className="text-white/70 text-base md:text-lg">{t("description")}</p>
            </div>

            <form onSubmit={submitWaitlist} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-white/90 mb-2 block text-sm md:text-base">
                 {t("firstName")}
                </Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/25 text-white placeholder:text-white/50 h-12 md:h-14 rounded-xl backdrop-blur-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white/90 mb-2 block text-sm md:text-base">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/25 text-white placeholder:text-white/50 h-12 md:h-14 rounded-xl backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label className="text-white/90 mb-3 block text-sm md:text-base">{t("category")}</Label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 text-white/90 cursor-pointer bg-white/10 border border-white/25 px-4 py-3 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value="fan"
                      checked={formData.category === "fan"}
                      onChange={handleInputChange}
                      className="accent-[#B8FF56] w-4 h-4"
                    />
                    {t("fan")}
                  </label>
                  <label className="flex items-center gap-2 text-white/90 cursor-pointer bg-white/10 border border-white/25 px-4 py-3 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value="player"
                      checked={formData.category === "player"}
                      onChange={handleInputChange}
                      className="accent-[#B8FF56] w-4 h-4"
                    />
                    {t("player")}
                  </label>
                  <label className="flex items-center gap-2 text-white/90 cursor-pointer bg-white/10 border border-white/25 px-4 py-3 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value="club"
                      checked={formData.category === "club"}
                      onChange={handleInputChange}
                      className="accent-[#B8FF56] w-4 h-4"
                    />
                    {t("club")}
                  </label>
                </div>
              </div>

              <Button
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 md:h-14 text-base md:text-lg rounded-3xl font-semibold mt-4"
              >
                {isSubmitting ? "Submitting..." : t("submit")}
              </Button>

              {errorMessage && (
                <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#B8FF56] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#001220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
              Welcome to Stratos!
            </h3>
            <p className="text-white/70 text-base md:text-lg">You're on the list. We'll be in touch soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
