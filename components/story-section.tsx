"use client"

import { useTranslations } from "next-intl"

export function StorySection() {
  const t = useTranslations("story")

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-10 md:mb-16 text-white">{t("title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* For Players */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/players.png" alt={t("forPlayers")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("forPlayers")}</h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("forPlayersDesc")}
              </p>
            </div>
          </div>

          {/* For Fans */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/fans.png" alt={t("forFans")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-black" />
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-accent text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("forFans")}</h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("forFansDesc")}
              </p>
            </div>
          </div>

          {/* For Clubs */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/clubs.png" alt={t("forClubs")} className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("forClubs")}</h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                {t("forClubsDesc")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-primary text-base md:text-lg lg:text-xl mt-10 md:mt-16 max-w-3xl mx-auto px-4">
            {t.rich("conclusion", {
            highlight: (chunks) => <span className="text-white">{chunks}</span>,
          })}
        </p>
      </div>
    </section>
  )
}
