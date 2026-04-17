import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewChapterSection } from "@/components/new-chapter-section"
import { StorySection } from "@/components/story-section"
import { CountdownSection } from "@/components/countdown-section"
import { FooterSection } from "@/components/footer-section"
//test
export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <NewChapterSection />
      <StorySection />
      <CountdownSection />
      <FooterSection />
    </main>
  )
}
