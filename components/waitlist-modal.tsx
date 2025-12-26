"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import {useForm, ValidationError} from '@formspree/react'
import { useTranslations } from "next-intl"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   category: "fan",
  // })
  const t = useTranslations("waitlist")

  const [state, handleSubmit] = useForm("xblzaokr");

  const [isSubmitted, setIsSubmitted] = useState(false)
  
  useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true)
      const timer = setTimeout(() => {
        onClose()
        setIsSubmitted(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state.succeeded, onClose])

  if (!isOpen) return null
  
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log("[v0] Form submitted:", formData)
  //   setIsSubmitted(true)
  //   setTimeout(() => {
  //     onClose()
  //     setIsSubmitted(false)
  //     setFormData({ name: "", email: "", category: "fan" })
  //   }, 2000)
  // }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#00000] border border-[#ffffFA]/20 rounded-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-display]">
              {t("title")}
            </h2>
            <p className="text-white/60 mb-6">{t("description")}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/80 mb-2 block">
                 {t("firstName")}
                </Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  required
                  // value={formData.name}
                  // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
                  placeholder="Enter your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <Label htmlFor="email" className="text-white/80 mb-2 block">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  // value={formData.email}
                  // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
                  placeholder="Enter your email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <Label className="text-white/80 mb-3 block">{t("category")}</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="fan"
                      // checked={formData.category === "fan"}
                      // onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="accent-[#B8FF56]"
                    />
                    {t("fan")}
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="player"
                      // checked={formData.category === "player"}
                      // onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="accent-[#B8FF56]"
                    />
                    {t("player")}
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="club"
                      // checked={formData.category === "club"}
                      // onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="accent-[#B8FF56]"
                    />
                    {t("club")}
                  </label>
                </div>
              </div>

              <Button
                type="submit" 
                disabled={state.submitting}
                className="w-full bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 text-base rounded-3xl font-semibold"
              >
                {t("submit")}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#B8FF56] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#001220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-display)]">
              Welcome to Stratos!
            </h3>
            <p className="text-white/60">You're on the list. We'll be in touch soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
