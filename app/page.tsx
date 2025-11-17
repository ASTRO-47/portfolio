import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import FullStackSlider from "@/components/skills_slider"
import CarouselGames from "@/components/carousel"
import { ThreeDCardDemo } from "@/components/project_card"
export default function Home() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <main id="content" className="">
        <Hero />
        
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </div>
  )
}
