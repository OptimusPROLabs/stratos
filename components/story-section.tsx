"use client"

import { useTranslations } from "next-intl"

export function StorySection() {
  const t = useTranslations("story")

  return (
    <section className="py-2 px-6 bg-black">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">{t("title")}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* For Players */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/players.png" alt={t("forPlayers")} className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-primary text-2xl font-bold mb-3">{t("forPlayers")}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("forPlayersDesc")}
              </p>
            </div>
          </div>

          {/* For Fans */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/fans.png" alt={t("forFans")} className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-black" />
            <div className="absolute top-0 left-0 right-0 p-6">
              <h3 className="text-accent text-2xl font-bold mb-3">{t("forFans")}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("forFansDesc")}
              </p>
            </div>
          </div>

          {/* For Clubs */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/clubs.png" alt={t("forClubs")} className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-primary text-2xl font-bold mb-3">{t("forClubs")}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("forClubsDesc")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-primary text-lg md:text-xl mt-16 max-w-3xl mx-auto">
            {t.rich("conclusion", {
            highlight: (chunks) => <span className="text-white">{chunks}</span>,
          })}
        </p>
      </div>
    </section>
  )
}
