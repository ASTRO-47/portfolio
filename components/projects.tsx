"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Ft_transcendence",
    description: "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    image: "/trans.png",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates, drag-and-drop interface, and team features.",
    image: "/task-management-dashboard.png",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather app with forecasts, interactive maps, and location-based recommendations.",
    image: "/weather-app-interface.png",
    tags: ["Next.js", "API", "Charts"],
  },
  {
    title: "Portfolio Generator",
    description: "Tool for developers to create stunning portfolios with customizable themes and templates.",
    image: "/portfolio-website-builder.png",
    tags: ["React", "CMS", "Design"],
  },
]

export function Projects() {
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
    <section id="projects" ref={sectionRef} className="bg-secondary/30 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className={`mb-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Featured Projects</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Here are some of my recent works</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`group overflow-hidden border-border bg-card transition-all duration-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                isVisible ? `animate-scale-in animation-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2 p-6 pt-0">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent transition-all hover:scale-105">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Button>
                <Button size="sm" className="flex-1 transition-all hover:scale-105">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
