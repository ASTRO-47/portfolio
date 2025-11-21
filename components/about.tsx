"use client"

import { Code2, Database, Globe, Server, Box, GitBranch } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"]
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "Django", "Flask"]
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
  },
  {
    icon: Box,
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "Linux", "Nginx", "GitHub Actions"]
  }
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
    <section id="about" ref={sectionRef} className="py-8 md:py-12 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className={`mb-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="mx-auto max-w-4xl">
          <p
            className={`mb-6 text-center text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}
          >
            I'm a full-stack developer with a passion for building modern web applications. From crafting intuitive user interfaces 
            to architecting robust backend systems, I bring ideas to life through clean, efficient code. My experience spans across 
            freelance projects, automation systems, and full-scale web applications.
          </p>
          <p
            className={`mb-12 text-center text-lg leading-relaxed text-muted-foreground transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}
          >
            Educated at 1337 Coding School and trained in modern development practices, I'm constantly exploring new technologies 
            and contributing to innovative projects. I believe in writing code that's not just functional, but maintainable and scalable.
          </p>

          {/* Skills Section */}
          <div
            className={`transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}
          >
            <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
              Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Technologies</span>
            </h3>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">{category.title}</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant="secondary"
                          className="bg-background/80 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
