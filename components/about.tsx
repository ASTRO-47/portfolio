"use client"

import { Code2, Palette, Rocket, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful interfaces with attention to detail",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and user experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with teams and stakeholders",
  },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className={`mb-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">About Me</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </div>

        <div className="mx-auto max-w-3xl">
          <p
            className={`mb-6 text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}
          >
            I'm a passionate frontend developer with a keen eye for design and a love for creating seamless user
            experiences. With expertise in modern web technologies like React, Next.js, and Tailwind CSS, I bring ideas
            to life through code.
          </p>
          <p
            className={`mb-12 text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}
          >
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
            sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with
            the latest industry trends.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`group rounded-xl border border-border bg-card p-6 transition-all duration-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                    isVisible ? `animate-scale-in animation-delay-${(index + 3) * 100}` : "opacity-0"
                  }`}
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
