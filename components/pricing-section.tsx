"use client"

import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

const pricingGroups = [
  {
    title: "Africa / Asia / LATAM",
    glow: "from-[#008EFA]/25 via-[#008EFA]/10 to-transparent",
    tiers: [
      { name: "Starter", price: "Free", note: "Get discovered and start your journey." },
      { name: "PRO Path", price: "$5-$10 / month", note: "Weekly visibility boosts and profile analytics." },
      { name: "Star Path", price: "$20-$30 / month", note: "Premium placement in scout and club feeds." },
      { name: "Super Star Circle", price: "$250-$500 one-time or annual", note: "High-touch strategy support and elite positioning." },
    ],
  },
  {
    title: "Europe / North America",
    glow: "from-[#B8FF56]/25 via-[#B8FF56]/10 to-transparent",
    tiers: [
      { name: "Starter", price: "Free", note: "Start building your football identity." },
      { name: "PRO Path", price: "$10-$20 / month", note: "Performance insights and advanced profile tools." },
      { name: "Star Path", price: "$40-$60 / month", note: "Top-priority exposure for scouts and clubs." },
      { name: "Super Star Circle", price: "$750-$1,500 limited access", note: "Concierge-level support for elite talent." },
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-black px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[#008EFA]/25 blur-[110px]" />
        <div className="absolute bottom-0 right-10 h-44 w-44 rounded-full bg-[#B8FF56]/20 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-white md:text-5xl">Regionally sensitive, investor-safe pricing</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70 md:text-base">
            Prices are indicative and can be adjusted per market. Scholarships and waivers are reserved for exceptional talents.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pricingGroups.map((group) => (
            <article
              key={group.title}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#050505] p-6 shadow-[0_16px_60px_-20px_rgba(0,142,250,0.5)] md:p-8"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${group.glow}`} />
              <div className="relative">
                <h3 className="mb-6 text-xl font-bold text-white md:text-2xl">{group.title}</h3>
                <ul className="space-y-4">
                  {group.tiers.map((tier) => (
                    <li key={tier.name} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{tier.name}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{tier.price}</p>
                      <p className="mt-2 text-sm text-white/65">{tier.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-primary/35 bg-gradient-to-r from-primary/15 via-[#008EFA]/10 to-primary/10 p-6 text-center md:mt-12 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Unlock Full Momentum</p>
          <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">Go Pro and get elite visibility</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 md:text-base">
            Upgrade to accelerate your pathway, get priority scouting presence, and unlock advanced career tools built for serious talent.
          </p>
          <Link
            href="https://gopro.stratosfootball.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-3xl bg-primary px-7 py-3 text-sm font-semibold text-[#001220] transition hover:scale-[1.02] hover:bg-[#c7ff7d] md:text-base"
          >
            Go Pro
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
