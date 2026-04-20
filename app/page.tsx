import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewChapterSection } from "@/components/new-chapter-section"
import { StorySection } from "@/components/story-section"
import { PricingSection } from "@/components/pricing-section"
import { FooterSection } from "@/components/footer-section"

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <NewChapterSection />
      <StorySection />
      <PricingSection />
      <FooterSection />
    </main>
  )
}
