"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function StorySection() {
  const t = useTranslations("story")
  return (
    <section id="story" className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="container mx-auto">
        <h2
          id="why-stratos"
          className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-3 md:mb-5 text-white scroll-mt-24"
        >
          {t("title")}
        </h2>
        <p className="text-center text-primary mb-6 md:mb-8 text-lg font-medium">{t("subtitle")}</p>
        <p className="text-center text-white/75 max-w-4xl mx-auto mb-10 md:mb-16">
          {t("description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* For Players */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/players.png" alt={t("players.title")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("players.title")}</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">{t("players.tagline")}</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("players.body")}
              </p>
            </div>
          </div>

          {/* For Fans */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/fans.png" alt={t("fans.title")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-black" />
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-accent text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("fans.title")}</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">{t("fans.tagline")}</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("fans.body")}
              </p>
            </div>
          </div>

          {/* For Clubs */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/clubs.png" alt={t("clubs.title")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("clubs.title")}</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">{t("clubs.tagline")}</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("clubs.body")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <div className="w-12 h-12 rounded-full border border-primary/60 flex items-center justify-center text-primary animate-bounce">
            →
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">{t("what.title")}</h3>
          <p className="text-primary text-center mt-2 mb-10">{t("what.subtitle")}</p>
          <p className="text-center text-white/75 max-w-4xl mx-auto mb-12">
            {t("what.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">{t("what.card1Title")}</h4>
              <p className="text-primary mt-2">{t("what.card1Body")}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">{t("what.card2Title")}</h4>
              <p className="text-primary mt-2">{t("what.card2Body")}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">{t("what.card3Title")}</h4>
              <p className="text-primary mt-2">{t("what.card3Body")}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">{t("what.card4Title")}</h4>
              <p className="text-primary mt-2">{t("what.card4Body")}</p>
            </div>
          </div>
        </div>

        <div id="ecosystem" className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">{t("movement.title")}</h3>
          <p className="text-primary text-center mt-2 mb-10">{t("movement.subtitle")}</p>
          <p className="text-center text-white/75 max-w-4xl mx-auto mb-12">
            {t("movement.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center mb-8">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">2,847+</p>
              <p className="text-primary mt-1">{t("movement.players")}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">15</p>
              <p className="text-primary mt-1">{t("movement.clubs")}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">524+</p>
              <p className="text-primary mt-1">{t("movement.fans")}</p>
            </div>
          </div>
          <p className="text-center text-white/70 text-sm md:text-base">
            {t("movement.alternative")}
          </p>
          <p className="text-center text-white/60 text-sm mt-4">
            {t("movement.regions")}
          </p>
        </div>

        <div className="mt-16 md:mt-24 rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-6 md:p-10 text-center">
          <p className="text-white/80 text-sm mb-2">{t("waitlist.tagline")}</p>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">{t("waitlist.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8">
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">{t("waitlist.playersTitle")}</p>
              <p className="text-white/70 text-sm mt-2">{t("waitlist.playersBody")}</p>
            </div>
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">{t("waitlist.fansTitle")}</p>
              <p className="text-white/70 text-sm mt-2">{t("waitlist.fansBody")}</p>
            </div>
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">{t("waitlist.clubsTitle")}</p>
              <p className="text-white/70 text-sm mt-2">{t("waitlist.clubsBody")}</p>
            </div>
          </div>
          <Link href="/waitlist">
            <Button className="bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 px-8 rounded-3xl font-semibold">
              {t("waitlist.cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
