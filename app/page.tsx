import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon"
import AnimatedBackground_2 from "@/components/animatedback"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground_2  />
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation />
        </div>
        <main id="content" className="relative pointer-events-auto">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  )
}