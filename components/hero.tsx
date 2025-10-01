"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Code, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      const offsetTop =
        projectsSection.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl animate-float"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl animate-float animation-delay-300"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_70%)]" />
      </div>

      <div className="container mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:gap-24 relative z-10">
        {/* Text Content */}
        <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-bounce-subtle" />
            Welcome to my portfolio
          </div> */}

          <h1 className="mb-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Imad Ez-Zaghba
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            </span>
          </h1>

          <div className="mb-6 overflow-hidden">
            <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl animate-slide-in-left animation-delay-200">
              <span className="inline-flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                Frontend Developer
              </span>
            </h2>
          </div>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground lg:leading-loose animate-fade-in animation-delay-400">
            I craft beautiful, responsive web experiences with modern
            technologies. Passionate about clean code, intuitive design, and
            creating digital solutions that make a difference.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              onClick={handleViewWork}
              className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-primary/20 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              Download CV
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start animate-fade-in-up animation-delay-700">
            {[
              { number: "20+", label: "Projects" },
              { number: "2+", label: "Years Experience" },
              { number: "15+", label: "Technologies" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className={`relative flex-shrink-0 transition-all duration-1000 delay-300 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-2xl animate-pulse" />
            
            {/* Main image container */}
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-2 shadow-2xl lg:h-96 lg:w-96">
              <div className="h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/port_image.jpeg"
                  alt="Imad Ez-Zaghba - Frontend Developer"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce-subtle" />
            <div className="absolute -bottom-6 -left-6 h-6 w-6 rounded-full bg-gradient-to-r from-accent to-primary animate-bounce-subtle animation-delay-500" />
            <div className="absolute top-1/2 -left-8 h-4 w-4 rounded-full bg-primary animate-float animation-delay-700" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle animation-delay-1000">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="text-sm">Scroll to explore</div>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
