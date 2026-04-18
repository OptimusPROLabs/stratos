"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function StorySection() {
  return (
    <section id="story" className="py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="container mx-auto">
        <h2
          id="why-stratos"
          className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-3 md:mb-5 text-white scroll-mt-24"
        >
          The Game Changer
        </h2>
        <p className="text-center text-primary mb-6 md:mb-8 text-lg font-medium">Leveling the Playing Field</p>
        <p className="text-center text-white/75 max-w-4xl mx-auto mb-10 md:mb-16">
          Stratos bridges the gap between grassroots and PRO; unlocking access, visibility, and opportunity at a global
          scale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* For Players */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/players.png" alt="For Players" className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">For Players</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">Develop. Get discovered. Go PRO.</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Build your digital identity, showcase your talent, and unlock opportunities beyond your local pitch.
              </p>
            </div>
          </div>

          {/* For Fans */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/fans.png" alt="For Fans" className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/60 to-black" />
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-accent text-xl md:text-2xl font-bold mb-2 md:mb-3">For Fans</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">More than spectators– be part of the journey.</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Support rising talent, engage deeper with the game, and shape the future of football.
              </p>
            </div>
          </div>

          {/* For Clubs */}
          <div className="relative group overflow-hidden rounded-lg">
            <img src="/clubs.png" alt="For Clubs" className="w-full h-[350px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-2 md:mb-3">For Clubs</h3>
              <p className="text-white font-medium text-sm md:text-base mb-2">See what others can&apos;t. Recruit the best.</p>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Discover and scout global grassroots talent with clarity, speed, and precision without borders or
                limitations.
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
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">What is Stratos?</h3>
          <p className="text-primary text-center mt-2 mb-10">Every Part of the Game. Connected.</p>
          <p className="text-center text-white/75 max-w-4xl mx-auto mb-12">
            Stratos is building a system that makes football talent discovery global, meritocratic, and accessible to any player anywhere.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">Digital identity for players</h4>
              <p className="text-primary mt-2">Own your profile. Control your journey.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">Intelligent tools (AI + Blockchain)</h4>
              <p className="text-primary mt-2">Smarter decisions, safer interactions, better outcomes.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">Global discovery engine</h4>
              <p className="text-primary mt-2">Find and be found from anywhere in the world.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-white font-semibold">Community-powered ecosystem</h4>
              <p className="text-primary mt-2">A network of supporters empowering dreams.</p>
            </div>
          </div>
        </div>

        <div id="ecosystem" className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">The Stratos Movement</h3>
          <p className="text-primary text-center mt-2 mb-10">One Global FOOTBALL Ecosystem</p>
          <p className="text-center text-white/75 max-w-4xl mx-auto mb-12">
            Built across continents. Connected as one ecosystem. Powering the world's biggest game.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center mb-8">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">2,847+</p>
              <p className="text-primary mt-1">Players</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">15</p>
              <p className="text-primary mt-1">Clubs</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-3xl font-bold text-white">524+</p>
              <p className="text-primary mt-1">Fans</p>
            </div>
          </div>
          <p className="text-center text-white/70 text-sm md:text-base">
            Alternatively: 2,847+ Athletes discovered | 38 Partner clubs and academies | 12 Countries and counting
          </p>
          <p className="text-center text-white/60 text-sm mt-4">
            Africa | South America | Asia | Europe | North America
          </p>
        </div>

        <div className="mt-16 md:mt-24 rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-6 md:p-10 text-center">
          <p className="text-white/80 text-sm mb-2">Go PRO in 2026.</p>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">Join the Waitlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8">
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">Players: Be First to Go PRO.</p>
              <p className="text-white/70 text-sm mt-2">Early access. Exclusive drops. Priority onboarding.</p>
            </div>
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">Fans: Be First to Support the PRO.</p>
              <p className="text-white/70 text-sm mt-2">Support rising talent and engage deeper with the game.</p>
            </div>
            <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
              <p className="text-primary font-semibold">Clubs: Get Access to Star Players.</p>
              <p className="text-white/70 text-sm mt-2">Discover global grassroots talent with precision.</p>
            </div>
          </div>
          <Link href="/waitlist">
            <Button className="bg-[#B8FF56] text-[#001220] hover:bg-[#B8FF56]/90 h-12 px-8 rounded-3xl font-semibold">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
